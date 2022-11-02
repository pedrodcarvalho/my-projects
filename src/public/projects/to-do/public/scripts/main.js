const table = document.querySelector('table');
const task = document.querySelector('input[type="text"]');

window.onload = () => {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(localStorage.key(i)) === 'task') {
            table.innerHTML += `
            <tr>
            <td>
            <button value="done">Done</button>
            </td>
            <td class="task">${localStorage.key(i)}</td>
            <td>
            <button value="delete">Delete</button>
            </td>
            </tr>
            `;
        }
    }
};

document.querySelector('button').addEventListener('click', () => {
    if (task.value) {
        localStorage.setItem(`${task.value}`, 'task');

        table.innerHTML += `
        <tr>
        <td>
        <button value="done">Done</button>
        </td>
        <td class="task">${task.value}</td>
        <td>
        <button value="delete">Delete</button>
        </td>
        </tr>
        `;

        task.value = '';
    }
});

document.querySelector('table').addEventListener('click', (e) => {
    if (e.target.value === 'delete') {
        e.target.parentElement.parentElement.classList.add('delete');

        setTimeout(() => {
            localStorage.removeItem(`${e.target.parentElement.parentElement.children[1].textContent}`);
            e.target.parentElement.parentElement.remove();
        }, 500);
    }
    else if (e.target.value === 'done') {
        e.target.parentElement.parentElement.classList.add('done');
    }
});
