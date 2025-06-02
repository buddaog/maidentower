import React from 'react';
import { useParams } from 'react-router-dom';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1>Бронирование тура</h1>
      <p>Вы бронируете тур с ID: {id}</p>
    </div>
  );
};

export default BookingPage;
