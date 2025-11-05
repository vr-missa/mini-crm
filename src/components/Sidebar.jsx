import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const loc = useLocation();
  return (
    <nav style={{ width: 180, padding: 16, borderRight: '1px solid #eee' }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <Link to="/" aria-current={loc.pathname === '/' ? 'page' : undefined}>Home</Link>
        </li>
        <li style={{ marginTop: 8 }}>
          <Link to="/customers" aria-current={loc.pathname === '/customers' ? 'page' : undefined}>Customers</Link>
        </li>
      </ul>
    </nav>
  );
}
