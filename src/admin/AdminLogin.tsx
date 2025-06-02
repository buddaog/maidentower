import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'ruvshan' && password === 'LifeP579518660') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 border rounded shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Вход в админку</h2>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Войти
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
