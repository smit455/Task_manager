import Link from 'next/link';
import clientPromise from '../../lib/mongodb';
import ToggleStatusButton from '../../components/ToggleStatusButton';
import JumpToPageForm from '../../components/JumpToPageForm';

export default async function TasksPage({ searchParams }) {
  // Await the entire searchParams object
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const page = Math.max(1, parseInt(pageParam) || 1);
  const limit = 10; // tasks per page
  const skip = (page - 1) * limit;

  // Connect to MongoDB and fetch tasks
  const client = await clientPromise;
  const db = client.db('taskdb');
  const totalCount = await db.collection('tasks').countDocuments();
  const tasks = await db
    .collection('tasks')
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray();
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Task List
        </h1>
        <div className="flex justify-end mb-6">
          <Link
            href="/tasks/create"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md transform hover:bg-green-700 hover:scale-105 transition duration-300"
          >
            + Create New Task
          </Link>
        </div>
        {tasks.length === 0 ? (
          <div className="text-center text-xl text-gray-700">
            No tasks available.{' '}
            <Link href="/tasks/create" className="text-blue-600 hover:underline">
              Add a new task
            </Link>
            .
          </div>
        ) : (
          <>
            <ul className="space-y-6">
              {tasks.map((task) => (
                <li
                  key={task._id.toString()}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <Link href={`/tasks/${task._id.toString()}`}>
                        <span className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300">
                          {task.title}
                        </span>
                      </Link>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                          task.completed
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {task.completed ? "Completed" : "Incomplete"}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href={`/tasks/${task._id.toString()}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md transform hover:bg-blue-700 hover:scale-105 transition duration-300"
                      >
                        Edit
                      </Link>
                      <ToggleStatusButton
                        id={task._id.toString()}
                        completed={task.completed}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* Pagination Navigation */}
            <div className="flex flex-col items-center mt-8">
              <div className="flex justify-center space-x-4">
                {page > 1 && (
                  <Link
                    href={`/tasks?page=${page - 1}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 text-gray-700">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/tasks?page=${page + 1}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Next
                  </Link>
                )}
              </div>
              {/* Jump to page form as a client component */}
              <JumpToPageForm currentPage={page} totalPages={totalPages} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
