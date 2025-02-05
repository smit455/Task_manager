// components/ToggleStatusButton.jsx
'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toggleTaskStatus } from '../app/actions/taskActions';

export default function ToggleStatusButton({ id, completed }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleToggle() {
    startTransition(async () => {
      try {
        await toggleTaskStatus(id, completed);
        router.refresh(); // Refresh the page to reflect the updated status
      } catch (error) {
        console.error('Error toggling task status:', error);
      }
    });
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="px-4 py-2 bg-blue-500 text-white rounded-md transform hover:bg-blue-700 hover:scale-105 transition duration-300"
    >
      {completed ? 'Mark Incomplete' : 'Mark Complete'}
    </button>
  );
}
