const table = document.querySelector('table');
const task = document.querySelector('input[type="text"]');

window.onload = () => {
    for (let i = 0; i < localStorage.length; i++) {
        table.innerHTML += `
        <tr>
          <td>
            <button id="done">
              <p id="done">Done</p>
              <i id="done" class="fa-solid fa-check"></i>
            </button>
          </td>
          ${localStorage.getItem(localStorage.key(i)) === 'done' ?
                `<td class="task done">${localStorage.key(i)}</td>` : `<td class="task">${localStorage.key(i)}</td>`}
          <td>
            <button id="delete">
              <p id="delete">Delete</p>
              <i id="delete" class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        `;
    }
};

document.querySelector('button').addEventListener('click', () => {
    if (task.value) {
        localStorage.setItem(`${task.value}`, 'undone');

        table.innerHTML += `
        <tr>
          <td>
            <button id="done">
              <p id="done">Done</p>
              <i id="done" class="fa-solid fa-check"></i>
            </button>
          </td>
          <td class="task">${task.value}</td>
          <td>
            <button id="delete">
              <p id="delete">Delete</p>
              <i id="delete" class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        `;

        task.value = '';

        table.tBodies[table.tBodies.length - 1].classList.add('add');

        setTimeout(() => {
            table.tBodies[table.tBodies.length - 1].classList.remove('add');
        }, 500);
    }
});

document.querySelector('table').addEventListener('click', (e) => {
    e.composedPath().map((el) => {
        if (el.nodeName === 'TR') {
            const tr = el;

            if (e.target.id === 'delete') {
                tr.classList.add('delete');

                setTimeout(() => {
                    localStorage.removeItem(`${tr.children[1].textContent}`);
                    tr.remove();
                }, 500);
            }
            else if (e.target.id === 'done') {
                localStorage.setItem(`${tr.children[1].textContent}`, 'done');
                tr.classList.add('done');
            }
        }
    });
});
