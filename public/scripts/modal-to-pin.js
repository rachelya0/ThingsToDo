const create_pin_modal = document.querySelector('.create-pin-modal');

// display modal when create pin button is clicked
document.querySelector('.new-pin-button').addEventListener('click', () => {
  create_pin_modal.style.opacity = 1;
  create_pin_modal.style.pointerEvents = 'all';
});

// modal disappears when clicking ellipsis
document.querySelector('.btn-circle-modal').addEventListener('click', () => {
  away_from_modal();
});

let pin_image_blob = null;

// checking image type, adding image child
document.querySelector('#image-upload').addEventListener('change', event => {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();

            reader.onload = function () {
                const new_image = new Image();

                new_image.src = reader.result;
                pin_image_blob = reader.result;

                new_image.onload = function () {
                    const modals_pin = document.querySelector('.create-pin .hidden-pin');

                    new_image.classList.add('pin-max-width');

                    document.querySelector('.create-pin .uploaded-pin').appendChild(new_image);
                    document.querySelector('#image-upload-label').style.display = 'none';

                    modals_pin.style.display = 'block';

                    modals_pin.style.opacity = 1;
                }
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    document.querySelector('#image-upload').value = '';
});

// tracking user input for each new pin
document.querySelector('.save').addEventListener('click', () => {
    const users_data = {
        author: 'Rachel',
        board: 'default',
        title: document.querySelector('#pin-title').value,
        description: document.querySelector('#pin-descr').value,
        destination: document.querySelector('#pin-dest').value,
        img_blob: pin_image_blob,
        pin_board: document.querySelector('#boards').value
    }

    create_pin(users_data);
    away_from_modal();
});

function create_pin(pin_info) {
  const new_pin = document.createElement('DIV');
  const new_image = new Image();

  new_image.src = pin_info.img_blob;
  new_pin.style.opacity = 0;

  new_image.onload = function() {
    new_pin.classList.add('card');
    new_image.classList.add('pin-max-width');

    new_pin.innerHTML =`
    <div class="pin-name">${pin_info.title}</div>
    <div class="modal">
      <div class="modal-header">
        <p class="board-name">${pin_info.pin_board}</p>
        <button class="save" name="button">Save</button>
      </div>

      <div class="modal-footer">
        <div class="external-link">
          <img class="external-icon" src="images/upper-right-arrow.png" alt="redirect">
          <p class="destination-site">${pin_info.destination}</p>
        </div>
        <button class="btn-circle"><i class="fa-solid fa-arrow-up-from-bracket"></i></button>
        <button class="btn-circle"><i class="fa-solid fa-ellipsis"></i></button>
      </div>
    </div>
    <div class="uploaded-image">

    </div>`;

    document.querySelector('.pin-container').appendChild(new_pin);
    new_pin.children[2].appendChild(new_image);

    if (
            new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
            new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
        ) {
            new_image.classList.remove('pin-max-width');
            new_image.classList.add('pin-max-height');
        }

    new_pin.style.opacity = 1;
  }
}

function away_from_modal() {
  const modals_pin = document.querySelector('.create-pin-modal .hidden-pin');

  create_pin_modal.style.opacity = 0;
  create_pin_modal.style.pointerEvents = 'none';
  document.querySelector('#image-upload-label').style.display = 'block';
  modals_pin.style.display = 'none';
  modals_pin.style.opacity = 0;

  // if child exists, image is being displayed, needs to be removed
  if (modals_pin.children[0].children[0]) {
    modals_pin.children[0].removeChild(modals_pin.children[0].children[0]);
  }

  // remove values inputted by user
  document.querySelector('#pin-title').value = '';
  document.querySelector('#pin-descr').value = '';
  document.querySelector('#pin-dest').value = '';
  document.querySelector('#boards').value = '';
  pin_image_blob = null;
}
