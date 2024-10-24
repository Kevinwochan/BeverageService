import Image from 'next/image';
import React from 'react';
interface ActiveBeer {
  brand: string;
  name: string;
  abv: number;
  description: string;
  fillLevel?: number;
  temperature?: number;
}

const BeerCard: React.FC<ActiveBeer> = ({ brand, name, abv, description, temperature, fillLevel, image }) => {
  return (
    <div className="bg-white rounded-lg shadow w-1/5 relative">

      <Image
        src={image ? `/images/${image}` : '/images/default.png'}
        alt={name}
        width={3500}
        height={500}
      />
      <div className='p-5 relative'>
        <div className="text-xl font-bold mb-2">{name}</div>
        <div className="text-l">{brand}</div>
        <div className="mt-2">{abv}% ABV</div>
        <p className="text-gray-700 text-base mt-2 truncate-text">
          {description}
        </p>
      </div>
      <a href={`https://www.kegsonlegs.com.au/search?q=${name}`} className="m-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Order again
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </a>
    </div>

  );
};


export default BeerCard;