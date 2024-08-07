"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('new-todo');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const addTodo = () => {
        const todoText = input.value.trim();
        if (todoText === '')
            return;
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = todoText;
        li.addEventListener('click', () => {
            li.classList.add('crossed');
            setTimeout(() => {
                li.classList.add('fading');
                setTimeout(() => {
                    li.remove();
                    saveTodos();
                }, 1000); // Duration of the fade-out transition
            }, 1000); // Initial delay before starting fade-out
        });
        todoList.appendChild(li);
        input.value = '';
        saveTodos();
    };
    const saveTodos = () => {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({ text: li.textContent || '', crossed: li.classList.contains('crossed') });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    };
    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = todo.text;
            if (todo.crossed)
                li.classList.add('crossed');
            li.addEventListener('click', () => {
                li.classList.add('crossed');
                setTimeout(() => {
                    li.classList.add('fading');
                    setTimeout(() => {
                        li.remove();
                        saveTodos();
                    }, 1000); // Duration of the fade-out transition
                }, 1000); // Initial delay before starting fade-out
            });
            todoList.appendChild(li);
        });
    };
    addButton.addEventListener('click', addTodo);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter')
            addTodo();
    });
    loadTodos();
});
