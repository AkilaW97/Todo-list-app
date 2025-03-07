import React, { useState } from 'react'
import './App.css'

function App() {
  
  const [tasks, setTasks] = useState([]); //State to store the list of tasks
  const [newTask, setNewTask] = useState(''); //State to store the new task input
  const [editIndex, setEditIndex] = useState(null); // Track which task is being edited
  const [editText, setEditText] = useState(''); // Store the edited text

  //Function to handle adding a new task
  const addTask = () => {
    if(newTask.trim() !== ''){
      //Add the new task to the list
      setTasks([...tasks, newTask])
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
  const updatedTasks = tasks.map((task, i) => (i === index ? editText : task));
  setTasks(updatedTasks);
  setEditIndex(null); //Exit edit mode
 }

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

        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks added yet!</p>
          ) : (
            <ul>
              {tasks.map((task, index) => (
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
                    {task}
                    <div>
                      <button onClick={() => startEdit(index, task)} className="edit-btn">
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
