import React from 'react';

export default function StarRating({ value = 0, size = 'text-base' }) {
  return (
    <span className={`text-amber-500 ${size}`}>
      {'★'.repeat(Math.round(value))}
      <span className="text-gray-300 dark:text-gray-700">{'★'.repeat(5 - Math.round(value))}</span>
    </span>
  );
}
