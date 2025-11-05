import React from 'react';

export default function CustomerGrid({ customers, onView, onDelete }) {
  if (!customers) return null;

  return (
    <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.length === 0 ? (
          <tr>
            <td colSpan="4">No customers found.</td>
          </tr>
        ) : (
          customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.createdDate ?? '-'}</td>
              <td>
                <button onClick={() => onView(c.id)} style={{ marginRight: 8 }}>View</button>
                <button onClick={() => onDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
