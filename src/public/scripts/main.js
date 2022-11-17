const rows = document.getElementsByClassName('projects');

window.onload = () => {
    setProjects();
};

const setProjectsBtns = (btns) => {
    for (let i = 0; i < btns.children.length; i++) {
        btns.children[i].addEventListener('click', () => {
            window.location.href = `/projects/${btns.children[i].id}/index.html`;
        });
    }
};

const setProjectsBtnsWidth = (btns) => {
    let maxBtnWidth = btns.children[0].offsetWidth;

    for (let i = 1; i < btns.children.length; i++) {
        if (btns.children[i].offsetWidth > maxBtnWidth) {
            maxBtnWidth = btns.children[i].offsetWidth;
        }
    }

    for (let i = 0; i < btns.children.length; i++) {
        btns.children[i].style.width = `${maxBtnWidth + 1}px`;
    }
};

const setProjects = () => {
    for (let i = 0; i < rows.length; i++) {
        let btns = document.getElementsByClassName('projects')[i];

        setProjectsBtns(btns);
        setProjectsBtnsWidth(btns);
    }
};
