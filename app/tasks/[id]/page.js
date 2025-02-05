// app/tasks/[id]/page.js
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import UpdateTaskForm from '../../../components/UpdateTaskForm';
import DeleteTaskButton from '../../../components/DeleteTaskButton';

export default async function TaskDetailPage({ params }) {
  // Destructure the id from params
  const { id } = params;

  // Connect to MongoDB and fetch the task
  const client = await clientPromise;
  const db = client.db('taskdb');
  const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });

  // If no task is found, display a simple message
  if (!task) {
    return <div className="p-4 text-center text-xl text-gray-700">Task not found</div>;
  }

  // Convert the task object into a plain object
  // - Convert _id from ObjectId to string
  // - Convert dueDate (if exists) to a string (ISO format)
  const plainTask = {
    ...task,
    _id: task._id.toString(),
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Edit Task</h1>
        <UpdateTaskForm task={plainTask} />
        <DeleteTaskButton id={plainTask._id} />
      </div>
    </div>
  );
}
