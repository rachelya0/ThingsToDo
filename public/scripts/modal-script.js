// import 'emoji-picker-element';

let pin_image_blob = null;

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

document.querySelector('.save').addEventListener('click', () => {
    const users_data = {
        author: 'Rachel',
        board: 'default',
        title: document.querySelector('#pin-title').value,
        description: document.querySelector('#pin-descr').value,
        destination: document.querySelector('#pin-dest').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector('#boards').value
    }

    console.log(users_data);
});

// // emoji picker not working
// document.querySelector('emoji-picker')
//   .addEventListener('emoji-click', event => console.log(event.detail));
