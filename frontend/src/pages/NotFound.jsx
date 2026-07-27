import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center">
      <h1 className="text-6xl font-extrabold text-brand-600">404</h1>
      <p className="mt-4 text-gray-500">Page not found.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Go Home</Link>
    </div>
  );
}
