// app/tasks/create/page.js
'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '../../actions/taskActions';
import { toast } from 'react-toastify';

export default function CreateTaskPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(async () => {
      try {
        await createTask(formData);
        toast.success("Task created successfully!");
        router.push('/tasks');
      } catch (error) {
        toast.error("Error creating task!");
        console.error('Error creating task:', error);
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Create New Task
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Title:
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Description:
            </label>
            <textarea
              name="description"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Due Date:
            </label>
            <input
              name="dueDate"
              type="date"
              required
              min={today}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:scale-105 transition duration-300"
          >
            {isPending ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
