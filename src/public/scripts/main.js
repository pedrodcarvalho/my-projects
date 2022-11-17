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

const setProjects = () => {
    for (let i = 0; i < rows.length; i++) {
        let btns = document.getElementsByClassName('projects')[i];

        setProjectsBtns(btns);
    }
};
