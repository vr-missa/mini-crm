import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function ViewCustomer({ id }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`/${id}`);
        if (mounted) setCustomer(res.data);
      } catch (err) {
        console.error('Failed to load customer', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!customer) return <div>No data</div>;

  return (
    <div>
      <h3>Customer</h3>
      <div><strong>ID:</strong> {customer.id}</div>
      <div><strong>Name:</strong> {customer.name}</div>
      <div><strong>Created Date:</strong> {customer.createdDate ?? '—'}</div>
      <div><strong>Modified Date:</strong> {customer.modifiedDate ?? '—'}</div>
    </div>
  );
}
