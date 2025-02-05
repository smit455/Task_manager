// components/DeleteTaskButton.jsx
'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTask } from '../app/actions/taskActions';
import { toast } from 'react-toastify';

export default function DeleteTaskButton({ id }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this task?')) {
      const formData = new FormData();
      formData.append('id', id);

      startTransition(async () => {
        try {
          await deleteTask(formData);
          toast.success("Task deleted successfully!");
          router.push('/tasks');
        } catch (error) {
          toast.error("Error deleting task!");
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:scale-105 transition duration-300"
    >
      {isPending ? 'Deleting...' : 'Delete Task'}
    </button>
  );
}
