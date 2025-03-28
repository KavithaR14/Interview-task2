import React, { useState } from 'react';
import './Task.css';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim() === '') return;

        // Create a new task object
        const task = { 
            text: newTask, 
            completed: false,
            timestamp: Date.now() // Add a timestamp for additional sorting control
        };

        // Add new task to the BEGINNING of the array (descending order)
        setTasks([task, ...tasks]);
        setNewTask('');
    };

    const handleEditTask = (index) => {
        setEditIndex(index);
        setEditTask(tasks[index].text);
    };

    const handleUpdateTask = (index) => {
        if (editTask.trim() === '') return;

        const updatedTasks = [...tasks];
        updatedTasks[index].text = editTask;

        setTasks(updatedTasks);
        setEditIndex(null);
        setEditTask('');
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;

        // Move completed tasks to the end while maintaining descending order
        const activeTask = updatedTasks.splice(index, 1)[0];
        if (activeTask.completed) {
            // Push completed tasks to the end
            updatedTasks.push(activeTask);
        } else {
            // If unchecking, put the task back in descending order
            const insertIndex = updatedTasks.findIndex(
                task => !task.completed || task.timestamp < activeTask.timestamp
            );
            updatedTasks.splice(
                insertIndex !== -1 ? insertIndex : updatedTasks.length, 
                0, 
                activeTask
            );
        }

        setTasks(updatedTasks);
    };

    return (
        <div className="app-container">
            

            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            <div className="tasks-container">
                {tasks.map((task, index) => (
                    <div 
                        key={task.timestamp} // Use timestamp as unique key
                        className={`task-item ${task.completed ? 'completed' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleComplete(index)}
                        />
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editTask}
                                    onChange={(e) => setEditTask(e.target.value)}
                                />
                                <button onClick={() => handleUpdateTask(index)}>Update</button>
                            </>
                        ) : (
                            <>
                                <span>{task.text}</span>
                                {!task.completed && (
                                    <>
                                        <button onClick={() => handleEditTask(index)}>Edit</button>
                                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;