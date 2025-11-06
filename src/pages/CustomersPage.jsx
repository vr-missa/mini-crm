import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import CustomerGrid from '../components/CustomerGrid';
import Modal from '../components/Modal';
import ViewCustomer from '../components/ViewCustomer';
import AddCustomerModal from '../components/AddCustomerModal';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get('/');
      setCustomers(res.data);
    } catch (err) {
      console.error('Error loading customers', err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this customer?')) return;
    try {
      await api.delete(`/${id}`);
      await load();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed');
    }
  }

  return (
    <div>
      <h2>Customers</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setShowAdd(true)}>Add</button>
      </div>

      {loading ? <div>Loading customers...</div> : (
        <CustomerGrid customers={customers} onView={(id) => setViewId(id)} onDelete={handleDelete} />
      )}

      {viewId && (
        <Modal onClose={() => setViewId(null)}>
          <div>
            <button onClick={() => setViewId(null)} style={{ float: 'right' }}>Close</button>
            <ViewCustomer id={viewId} />
          </div>
        </Modal>
      )}

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <AddCustomerModal
            onClose={() => setShowAdd(false)}
            onSaved={() => load()}
          />
        </Modal>
      )}
    </div>
  );
}
