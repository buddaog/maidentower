import React from 'react';
import { useParams } from 'react-router-dom';

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1>Детали тура</h1>
      <p>Вы просматриваете тур с ID: {id}</p>
    </div>
  );
};

export default TourDetailPage;