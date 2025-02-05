'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateTask } from '../app/actions/taskActions';
import { toast } from 'react-toastify';

export default function UpdateTaskForm({ task }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(async () => {
      try {
        await updateTask(formData);
        toast.success("Task updated successfully!");
        router.push('/tasks');
      } catch (error) {
        toast.error("Error updating task!");
        console.error('Error updating task:', error);
      }
    });
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <input type="hidden" name="id" value={task._id.toString()} />
      <div>
        <label className="block mb-1 font-medium text-gray-900">Title:</label>
        <input
          name="title"
          type="text"
          defaultValue={task.title}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-900">Description:</label>
        <textarea
          name="description"
          defaultValue={task.description}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        ></textarea>
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-900">Due Date:</label>
        <input
          name="dueDate"
          type="date"
          defaultValue={new Date(task.dueDate).toISOString().split('T')[0]}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        />
      </div>
      <div className="flex items-center">
        <input name="completed" type="checkbox" defaultChecked={task.completed} className="mr-2" />
        <label className="font-medium text-gray-900">Completed</label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 transition duration-300"
      >
        {isPending ? 'Updating...' : 'Update Task'}
      </button>
    </form>
  );
}
