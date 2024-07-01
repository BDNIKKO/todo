// Add an event listener to the document that fires when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('new-todo');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    const addTodo = () => {
        // Get the trimmed value of the input field i.e whitespace in string
        const todoText = input.value.trim();
         // If the input field is empty, return early and do nothin
        if (todoText === '') return;

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = todoText;
        li.addEventListener('click', () => {
            li.classList.add('crossed');
            setTimeout(() => {
                li.remove();
                saveTodos();
            }, 1000);
        });

        todoList.appendChild(li);
        input.value = '';
        saveTodos();
    };

    const saveTodos = () => {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({ text: li.textContent, crossed: li.classList.contains('crossed') });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    };
    // Function to load todos from localStorage
    const loadTodos = () => {
        // Parse the todos from localStorage or use an empty array if none exist
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = todo.text;
            // If the todo is crossed, add the 'crossed' class to the list item
            if (todo.crossed) li.classList.add('crossed');
            li.addEventListener('click', () => {
                li.classList.add('crossed');
                setTimeout(() => {
                    li.remove();
                    saveTodos();
                }, 1000);
            });
            todoList.appendChild(li);
        });
    };

    addButton.addEventListener('click', addTodo);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    loadTodos();
});
