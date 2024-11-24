import React from 'react';

const ActionCard = ({ title, actions }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="list-disc ml-6 text-gray-600">
        {actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActionCard;
