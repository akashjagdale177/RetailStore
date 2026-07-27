import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllUsers, toggleBlockUser } from '../../services/userService';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAllUsers({ search, page, limit: 10 })
      .then((r) => { setUsers(r.data); setPagination(r.pagination); })
      .finally(() => setLoading(false));
  };

  useEffect(load, [search, page]);

  const toggleBlock = async (id) => {
    try {
      await toggleBlockUser(id);
      toast.success('User status updated');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">User Management</h1>

      <input
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        placeholder="Search users by name..."
        className="input mb-4 max-w-sm"
      />

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-800">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">Loading...</td></tr>
            ) : users.map((u) => (
              <tr key={u._id} className="border-b border-gray-100 dark:border-gray-900">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${u.isBlocked ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'}`}>
                    {u.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <button onClick={() => toggleBlock(u._id)} className={`text-xs font-semibold hover:underline ${u.isBlocked ? 'text-green-600' : 'text-red-600'}`}>
                    {u.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: pagination.pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`h-8 w-8 rounded-lg text-sm ${page === i + 1 ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
