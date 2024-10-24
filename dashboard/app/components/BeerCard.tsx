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

const BeerCard: React.FC<ActiveBeer> = ({ brand, name, abv, description, temperature, fillLevel }) => {

  return (
    <div className="bg-white rounded-lg shadow w-1/5 relative">
      {(temperature !== undefined || fillLevel !== undefined) && (
        <div className="absolute top-0 right-0 py-3 m-1">
          å
        </div>
      )}
      <Image
        src={DefaultBeerImage}
        alt={name}
      />


      <div className='p-5 relative'>
        <div className="text-xl font-bold mb-2">{name}</div>
        <div className="text-l">{brand}</div>
        <div className="mt-2">{abv}% ABV</div>
        <p className="text-gray-700 text-base mt-2">
          {description}
        </p>
      </div>
      <a href="#" class="m-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Order more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </a>
    </div>

  );
};


export default BeerCard;