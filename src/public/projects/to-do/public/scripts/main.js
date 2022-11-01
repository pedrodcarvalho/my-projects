const table = document.querySelector('table');
const task = document.querySelector('input[type="text"]');

document.querySelector('button').addEventListener('click', () => {
    if (task.value) {
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
            e.target.parentElement.parentElement.remove();
        }, 500);
    }
    else if (e.target.value === 'done') {
        e.target.parentElement.parentElement.classList.add('done');
    }
});
