import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review student submissions', completed: false },
    { id: '2', title: 'Update course materials', completed: false },
    { id: '3', title: 'Respond to student questions', completed: true },
    { id: '4', title: 'Record new lecture videos', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setTasks([...tasks, {
      id: Date.now().toString(),
      title: newTask,
      completed: false
    }]);
    setNewTask('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
      
      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
            onClick={() => toggleTask(task.id)}
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
            <span className={`flex-1 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}