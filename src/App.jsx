import React, { useState } from 'react'
import './App.css'

function App() {
  //State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  //State to store the new task input
  const [newTask, setNewTask] = useState('');

  //Function to handle adding a new task
  const addTask = () => {
    if(newTask.trim() !== ''){
      //Add the new task to the list
      setTasks([...tasks, newTask])
      //Clear the input field
      setNewTask('')
    }
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

        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks added yet!</p>
          ) : (
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>{task}
                <button onClick={() => deleteTask(index)} className='delete-btn'>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div> 
  );
}

export default App
