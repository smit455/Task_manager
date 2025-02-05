// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
          Welcome to Task Manager
        </h1>
        <Link
          href="/tasks"
          className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300"
        >
          Go to Tasks
        </Link>
      </div>
    </div>
  );
}
