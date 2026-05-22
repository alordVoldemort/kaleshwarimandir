import React, { useState, useEffect } from 'react';
import './Donationdata.css';

const Donationdata = () => {
  const [donations, setDonations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('donations') || '[]');
    setDonations(saved);
  }, []);

  return (
    <div className="donation-admin">
      <h2>All Donations</h2>
      <table className="donation-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Amount</th><th>Date</th><th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((don, i) => (
            <tr key={i}>
              <td>{don.name}</td>
              <td>{don.email}</td>
              <td>{don.phone}</td>
              <td>₹ {don.amount}</td>
              <td>{don.date}</td>
              <td>
                <button onClick={() => setSelected(don)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="admin-receipt-popup">
          <h3>Receipt Preview</h3>
          <p><strong>Name:</strong> {selected.name}</p>
          <p><strong>Email:</strong> {selected.email}</p>
          <p><strong>Phone:</strong> {selected.phone}</p>
          <p><strong>Amount:</strong> ₹ {selected.amount}</p>
          <p><strong>Date:</strong> {selected.date}</p>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Donationdata;
