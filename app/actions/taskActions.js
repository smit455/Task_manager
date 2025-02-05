'use server';

import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

/**
 * Create a new task
 */
export async function createTask(formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');

  const newTask = {
    title,
    description,
    dueDate: new Date(dueDate),
    completed: false,
  };

  const client = await clientPromise;
  const db = client.db('taskdb');
  await db.collection('tasks').insertOne(newTask);
}

/**
 * Update an existing task
 */
export async function updateTask(formData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');
  const completed = formData.get('completed') === 'on';

  const client = await clientPromise;
  const db = client.db('taskdb');
  await db.collection('tasks').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, description, dueDate: new Date(dueDate), completed } }
  );
}

/**
 * Delete a task
 */
export async function deleteTask(formData) {
  const id = formData.get('id');

  const client = await clientPromise;
  const db = client.db('taskdb');
  await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
}

export async function toggleTaskStatus(id, currentStatus) {
    const client = await clientPromise;
    const db = client.db('taskdb');
    await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: !currentStatus } }
    );
  }