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

  const thermometerColor = (fillLevel: number) => {
    if (fillLevel < 25) return 'bg-rose-300';
    if (fillLevel < 50) return 'bg-amber-300';
    if (fillLevel < 75) return 'bg-orange-300';
    return 'bg-gray-200';
  }
  console.log(name)

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative w-1/6">
      {(temperature !== undefined || fillLevel !== undefined) && (
        <div className="absolute top-0 right-0 p-2 m-2">
          {temperature !== undefined && (
            <div className="text-lg font-bold text-white">{temperature}°C</div>
          )}
          {fillLevel !== undefined && (
            <div className="w-7 h-48 border-2 border-gray-300 relative bg-white">
              <div
                className={`absolute bottom-0 left-0 right-0 ${thermometerColor(fillLevel)}`}
                style={{ height: `${fillLevel}%` }}
              ></div>
              <p className='absolute top-1/2 text-xs' style={{ lineHeight: 0 }}>{fillLevel}%</p>
            </div>
          )}
        </div>
      )}

      <Image
        src={DefaultBeerImage}
        alt={name}
        className="w-xs"
      />

      <div className='p-5'>
        <div className="text-xl font-bold mb-2">{name}</div>
        <div className="text-l">{brand}</div>
        <div className="mt-2">{abv}% ABV</div>
        <p className="text-gray-700 text-base mt-2">
          {description}
        </p>
      </div>
    </div>

  );
};


export default ActiveBeerCard;