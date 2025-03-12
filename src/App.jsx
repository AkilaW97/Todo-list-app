import React, { useState } from 'react'
import './App.css'

function App() {
  
  const [tasks, setTasks] = useState([]); //State to store the list of tasks
  const [newTask, setNewTask] = useState(''); //State to store the new task input
  const [editIndex, setEditIndex] = useState(null); // Track which task is being edited
  const [editText, setEditText] = useState(''); // Store the edited text
  const [filter, setFilter] = useState('all'); //state to filter the current filter

  //Function to handle adding a new task
  const addTask = () => {
    if(newTask.trim() !== ''){
      //Add the new task to the list
      setTasks([...tasks, {text: newTask, completed: false}]);
      //Clear the input field
      setNewTask('')
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Filter out the task to delete
    setTasks(updatedTasks);
  };

  // Function to handle editing a task
  const startEdit = (index, task) => {
    setEditIndex(index);
    setEditText(task);
  };

  //Function to save the edited task
 const saveEdit = (index) => {
  const updatedTasks = tasks.map((task, i) =>
    i === index ? { ...task, text: editText } : task // Update only the text property
  );
  setTasks(updatedTasks);
  setEditIndex(null); // Exit edit mode
};

 //Toggling the completion of a task
 const toggleCompletion = (index) => {
  const updatedTasks = tasks.map((task, i) =>
    i === index ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
};

  return (
 
      <div className='App'>
        <h1>To-Do List</h1>
        <div className="task-list">
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='Add a new task'
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}> All </button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}> Completed </button>
        <button onClick={() => setFilter('incomplete')} className={filter === 'incomplete' ? 'active' : ''}> Incomplete </button>
      </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks added yet!</p>
          ) : (
            <ul>
              {tasks
              .filter((task) => {
                if (filter === 'completed') return task.completed;
                if (filter === 'incomplete') return !task.completed;
                return true; // Show all tasks if filter is 'all'
              })
              .map((task, index) => (
              <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => saveEdit(index)} className="save-btn">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed} // Use task.completed instead of tasks[index].completed
                    onChange={() => toggleCompletion(index)}
                    className="complete-checkbox"
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none', // Use task.completed
                      color: task.completed ? '#888' : '#f0f0f0', // Use task.completed
                    }}
                  >
                    {task.text} {/* Use task.text instead of tasks[index].text */}
                  </span>
                  <div>
                    <button onClick={() => startEdit(index, task.text)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => deleteTask(index)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
            ))}
            </ul>
          )}
        </div>
      </div> 
  );
}

export default App
