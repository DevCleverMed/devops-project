import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchItems();
    checkHealth();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/health`);
      setStatus(response.data.status);
    } catch (error) {
      setStatus('Error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/items`, newItem);
      setNewItem({ name: '', description: '' });
      fetchItems();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>DevOps Project - Multi-Container App</h1>
      <div>
        <h2>Backend Status: <span style={{ color: status === 'OK' ? 'green' : 'red' }}>{status || 'Checking...'}</span></h2>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Items List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;