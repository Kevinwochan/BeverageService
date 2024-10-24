import React from 'react';
import { BeerMetadata } from '../types';


const BeerCard: React.FC<BeerMetadata> = ({ name, abv, description }) => (
  <div className="w-full md:w-1/3 p-4 flex-item">
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <p className="mb-2">ABV: {abv}%</p>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default BeerCard;