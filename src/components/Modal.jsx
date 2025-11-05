import React from 'react';

export default function Modal({ children, onClose }) {
  if (!children) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // overlay slightly visible so user sees modal
        background: 'rgba(0,0,0,0.2)'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          padding: 16,
          borderRadius: 6,
          minWidth: 300
        }}
      >
        {children}
      </div>
    </div>
  );
}
