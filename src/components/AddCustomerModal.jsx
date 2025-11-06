import React, { useState } from 'react';
import api from '../api/axios';

export default function AddCustomerModal({ onClose, onSaved }) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!name.trim()) {
      alert('Name is required');
      return;
    }
    setSaving(true);
    try {
      await api.post('/', { name });
      setName('');
      if (onSaved) onSaved();
      if (onClose) onClose();
    } catch (err) {
      console.error('Failed to save', err);
      alert('Failed to save customer.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h3>Add Customer</h3>
      <div>
        <label>
          Name
          <input
            aria-label="customer-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={handleSave} disabled={saving}>Save</button>
        <button onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </div>
  );
}
