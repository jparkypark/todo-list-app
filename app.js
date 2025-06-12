/**
 * Todo List App
 * A modern, intuitive todo list application built with vanilla JavaScript
 * 
 * Features:
 * - Add, edit, delete, and toggle todo items
 * - Filter tasks by status (All/Active/Completed)
 * - Task counter showing remaining items
 * - Data persistence using localStorage
 * - Responsive design with smooth animations
 * - Full keyboard accessibility
 * 
 * @author Josh Parks
 * @version 1.0.0
 * @license MIT
 */

class TodoApp {
    /**
     * Initialize the Todo App
     * Sets up data structures, gets DOM elements, and initializes the application
     */
    constructor() {
        // Application state
        this.todos = [];                    // Array to store all todo items
        this.currentFilter = 'all';         // Current filter: 'all', 'active', or 'completed'
        this.nextId = 1;                    // Auto-incrementing ID for new todos
        
        // DOM element references with error checking
        this.todoInput = document.getElementById('todo-input');
        this.addBtn = document.getElementById('add-btn');
        this.todoList = document.getElementById('todo-list');
        this.todoFooter = document.getElementById('todo-footer');
        this.activeCount = document.getElementById('active-count');
        this.itemText = document.getElementById('item-text');
        this.filterBtns = {
            all: document.getElementById('filter-all'),
            active: document.getElementById('filter-active'),
            completed: document.getElementById('filter-completed')
        };
        this.clearCompletedBtn = document.getElementById('clear-completed');
        
        // Check if all required elements are found
        const requiredElements = [
            this.todoInput, this.addBtn, this.todoList, this.todoFooter,
            this.activeCount, this.itemText, this.clearCompletedBtn
        ];
        
        const missingElements = requiredElements.filter(el => !el);
        if (missingElements.length > 0) {
            console.error('TodoApp: Missing required DOM elements:', missingElements);
            return;
        }
        
        // Check filter buttons
        Object.keys(this.filterBtns).forEach(key => {
            if (!this.filterBtns[key]) {
                console.error(`TodoApp: Missing filter button: ${key}`);
                return;
            }
        });
        
        // Initialize the app
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.loadTodos();
        this.bindEvents();
        this.render();
    }
}
    /**
     * Bind event listeners
     */
    bindEvents() {
        console.log('TodoApp: Binding events...');
        
        // Add task events
        this.addBtn.addEventListener('click', () => {
            console.log('TodoApp: Add button clicked');
            this.addTodo();
        });
        
        this.todoInput.addEventListener('keypress', (e) => {
            console.log('TodoApp: Key pressed:', e.key);
            if (e.key === 'Enter') {
                console.log('TodoApp: Enter key - adding todo');
                this.addTodo();
            }
        });
        
        // Filter events
        Object.keys(this.filterBtns).forEach(filter => {
            this.filterBtns[filter].addEventListener('click', () => {
                this.setFilter(filter);
            });
        });
        
        // Clear completed event
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });
        
        // Todo list events (using event delegation)
        this.todoList.addEventListener('click', (e) => {
            const todoItem = e.target.closest('.todo-item');
            if (!todoItem) return;
            
            const todoId = parseInt(todoItem.dataset.id);
            
            if (e.target.classList.contains('todo-checkbox')) {
                this.toggleTodo(todoId);
            } else if (e.target.classList.contains('delete-btn')) {
                this.deleteTodo(todoId);
            }
        });
        
        // Edit events (using event delegation)
        this.todoList.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('todo-text')) {
                const todoItem = e.target.closest('.todo-item');
                const todoId = parseInt(todoItem.dataset.id);
                this.editTodo(todoId);
            }
        });
        
        this.todoList.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('todo-edit')) {
                this.saveEdit(e.target);
            }
        });
        
        this.todoList.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && e.target.classList.contains('todo-edit')) {
                this.cancelEdit(e.target);
            }
        });
        
        this.todoList.addEventListener('blur', (e) => {
            if (e.target.classList.contains('todo-edit')) {
                this.saveEdit(e.target);
            }
        }, true);
    }

    /**
     * Add a new todo
     */
    addTodo() {
        console.log('TodoApp: addTodo called');
        const text = this.todoInput.value.trim();
        console.log('TodoApp: Input text:', text);
        
        if (!text) {
            console.log('TodoApp: Empty text, returning');
            return;
        }
        
        const todo = {
            id: this.nextId++,
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        console.log('TodoApp: Adding todo:', todo);
        this.todos.push(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
        
        console.log('TodoApp: Todo added, total todos:', this.todos.length);
        
        // Add slide-in animation
        setTimeout(() => {
            const todoElement = this.todoList.querySelector(`[data-id="${todo.id}"]`);
            if (todoElement) {
                todoElement.classList.add('adding');
                setTimeout(() => todoElement.classList.remove('adding'), 300);
            }
        }, 0);
    }
    
    /**
     * Toggle todo completion status
     */
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }
    
    /**
     * Delete a todo
     */
    deleteTodo(id) {
        const todoElement = this.todoList.querySelector(`[data-id="${id}"]`);
        
        if (todoElement) {
            // Add slide-out animation
            todoElement.classList.add('removing');
            setTimeout(() => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    /**
     * Edit a todo
     */
    editTodo(id) {
        const todoElement = this.todoList.querySelector(`[data-id="${id}"]`);
        if (!todoElement) return;
        
        const textElement = todoElement.querySelector('.todo-text');
        const editElement = todoElement.querySelector('.todo-edit');
        
        textElement.classList.add('editing');
        editElement.classList.add('editing');
        editElement.value = textElement.textContent;
        editElement.focus();
        editElement.select();
    }
    
    /**
     * Save edit
     */
    saveEdit(editElement) {
        const todoItem = editElement.closest('.todo-item');
        const todoId = parseInt(todoItem.dataset.id);
        const newText = editElement.value.trim();
        
        if (newText) {
            const todo = this.todos.find(t => t.id === todoId);
            if (todo) {
                todo.text = newText;
                this.saveTodos();
            }
        }
        
        this.cancelEdit(editElement);
        this.render();
    }
    
    /**
     * Cancel edit
     */
    cancelEdit(editElement) {
        const todoItem = editElement.closest('.todo-item');
        const textElement = todoItem.querySelector('.todo-text');
        
        textElement.classList.remove('editing');
        editElement.classList.remove('editing');
    }
    
    /**
     * Set filter
     */
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        Object.values(this.filterBtns).forEach(btn => btn.classList.remove('active'));
        this.filterBtns[filter].classList.add('active');
        
        // Save filter to session storage
        sessionStorage.setItem('todoFilter', filter);
        
        this.render();
    }

    /**
     * Clear completed todos
     */
    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.render();
    }
    
    /**
     * Get filtered todos based on current filter
     */
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }
    
    /**
     * Render the todo list
     */
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        // Clear current list
        this.todoList.innerHTML = '';
        
        // Show/hide footer based on whether there are todos
        if (this.todos.length === 0) {
            this.todoFooter.style.display = 'none';
            this.todoList.innerHTML = '<li class="empty-state">No todos yet. Add one above!</li>';
            return;
        } else {
            this.todoFooter.style.display = 'flex';
        }
        
        // Render filtered todos
        if (filteredTodos.length === 0 && this.currentFilter !== 'all') {
            const filterText = this.currentFilter === 'active' ? 'active' : 'completed';
            this.todoList.innerHTML = `<li class="empty-state">No ${filterText} todos</li>`;
        } else {
            filteredTodos.forEach(todo => {
                this.todoList.appendChild(this.createTodoElement(todo));
            });
        }
        
        // Update counters and controls
        this.updateCounter();
        this.updateClearButton();
    }

    /**
     * Create a todo element
     */
    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <input type="text" class="todo-edit" value="${this.escapeHtml(todo.text)}">
            <button class="delete-btn" title="Delete task">×</button>
        `;
        
        return li;
    }
    
    /**
     * Update the active todo counter
     */
    updateCounter() {
        const activeCount = this.todos.filter(todo => !todo.completed).length;
        this.activeCount.textContent = activeCount;
        this.itemText.textContent = activeCount === 1 ? 'item' : 'items';
    }
    
    /**
     * Update clear completed button visibility
     */
    updateClearButton() {
        const hasCompleted = this.todos.some(todo => todo.completed);
        this.clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';
    }
    
    /**
     * Load todos from localStorage
     */
    loadTodos() {
        try {
            const savedTodos = localStorage.getItem('todos');
            const savedFilter = sessionStorage.getItem('todoFilter');
            
            if (savedTodos) {
                this.todos = JSON.parse(savedTodos);
                // Update nextId to avoid conflicts
                if (this.todos.length > 0) {
                    this.nextId = Math.max(...this.todos.map(t => t.id)) + 1;
                }
            }
            
            if (savedFilter && this.filterBtns[savedFilter]) {
                this.setFilter(savedFilter);
            }
        } catch (error) {
            console.error('Error loading todos:', error);
            this.todos = [];
        }
    }

    /**
     * Save todos to localStorage
     */
    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    }
    
    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Get app statistics
     */
    getStats() {
        return {
            total: this.todos.length,
            active: this.todos.filter(t => !t.completed).length,
            completed: this.todos.filter(t => t.completed).length
        };
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TodoApp;
}