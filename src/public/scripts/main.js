const rows = document.getElementsByClassName('projects');
const bounceIcons = document.querySelector('.social').children;
const title = document.querySelector('.text');

const setProjectsBtns = () => {
    for (const btns of rows) {
        for (const btn of btns.children) {
            btn.addEventListener('click', () => {
                window.location.href = `/projects/${btn.id}/index.html`;
            });
        }
    }
};

const setIconsBounce = () => {
    let delay = 500;

    for (const icon of bounceIcons) {
        setTimeout(() => {
            icon.classList.add('fa-bounce');


            icon.addEventListener('click', () => {
                if (icon.classList.contains('fa-github')) {
                    window.open('https://github.com/pedrodcarvalho');
                }
                else if (icon.classList.contains('fa-linkedin')) {
                    window.open('https://www.linkedin.com/in/pedro-carvalho-a92bab210/');
                }
                else if (icon.classList.contains('fa-envelope')) {
                    window.open('mailto:pedrodc51203@gmail.com');
                }
            });

            icon.addEventListener('mouseover', () => {
                icon.classList.remove('fa-bounce');
            });
        }, delay);

        delay += 250;
    }
};

setProjectsBtns();
setIconsBounce();
