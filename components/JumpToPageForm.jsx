// components/JumpToPageForm.jsx
"use client";
import { useRouter } from "next/navigation";

export default function JumpToPageForm({ currentPage, totalPages }) {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const pageInput = e.target.elements.page.value;
    router.push(`/tasks?page=${pageInput}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex justify-center items-center space-x-2">
      <label htmlFor="page" className="text-gray-700">
        Jump to page:
      </label>
      <input
        type="number"
        name="page"
        min="1"
        max={totalPages}
        defaultValue={currentPage}
        className="w-16 px-2 py-1 border rounded text-gray-900"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Go
      </button>
    </form>
  );
}
