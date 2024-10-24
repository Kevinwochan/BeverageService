import Image from 'next/image';
import React from 'react';
import DefaultBeerImage from '../public/images/mountain-culture-status-quo-pale-ale.jpeg';

interface ActiveBeer {
  brand: string;
  name: string;
  abv: number;
  description: string;
  fillLevel?: number;
  temperature?: number;
}

const ActiveBeerCard: React.FC<ActiveBeer> = ({ brand, name, abv, description, temperature, fillLevel }) => {
  
  return (
    <div className="max-w-sm rounded overflow-hidden gap-1 bg-white">
      <div className="relative">
        <Image
          src={DefaultBeerImage}
          alt={name}
          width={400}
          height={300}
          layout="responsive"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-navy bg-opacity-75 p-4">
          <div className="text-peach text-2xl font-bold mb-2">{brand}</div>
          <div className="text-white text-xl">{name}</div>
          <div className="text-blue-400 mt-2">{abv}% ABV</div>
        </div>
        {(temperature !== undefined || fillLevel !== undefined) && (
          <div className="absolute top-0 right-0 bg-white p-2 m-2">
            {temperature !== undefined && (
              <div className="text-lg font-bold">{temperature}°C</div>
            )}
            {fillLevel !== undefined && (
              <div className="w-6 h-20 border-2 border-gray-300 relative">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-peach"
                  style={{ height: `${fillLevel}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          ABV: {abv}%
        </p>
        <p className="text-gray-700 text-base mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};


export default ActiveBeerCard;