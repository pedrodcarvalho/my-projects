const imageElement = document.getElementById('image');
const imagesHTML = document.querySelector('.images');

document.getElementById('submit').addEventListener('click', () => {
    const image = imageElement.value;

    fetch(`/image?image=${image}`).then((res) => {
        return res.json();
    }).then(data => {
        const imagesObj = {
            newRow: true,
            imgCount: 1,
            imagesTemplate: ''
        };

        data.imgs.map((img) => {
            if (imagesObj.newRow) {
                imagesObj.imagesTemplate += '<div class="flex row">';
                imagesObj.newRow = false;
            }

            imagesObj.imagesTemplate += `
            <div class="image-frame">
              <img src="${img}">
            </div>
            `;

            if (imagesObj.imgCount % 5 === 0 && imagesObj.imgCount !== 0) {
                imagesObj.imagesTemplate += '</div>';
                imagesObj.newRow = true;
            }

            imagesObj.imgCount++;
        });

        imagesHTML.innerHTML = imagesObj.imagesTemplate;
    });
});
