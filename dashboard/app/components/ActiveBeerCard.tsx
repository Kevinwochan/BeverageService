import Image from 'next/image';
import React from 'react';
import { ActiveBeer } from '../types';

const ActiveBeerCard: React.FC<ActiveBeer> = ({ brand, name, abv, description, temperature, fillLevel, image, location }) => {

  const thermometerColor = (fillLevel: number) => {
    if (fillLevel < 25) return 'bg-rose-500';
    if (fillLevel < 50) return 'bg-orange-500';
    if (fillLevel < 75) return 'bg-amber-500';
    return 'bg-gray-400';
  }

  return (
    <div className="bg-white rounded-lg shadow w-1/5 relative">
      <div className='flex flex-row h-60 gap-3'>
        {fillLevel &&
          <div className='self-center'>
            <div className="relative w-10 bg-gray-200 h-60">
              <div className="absolute inset-0 flex flex-col justify-end items-center overflow-hidden ">
                <div
                  className={`h-full w-full bg-gray-200"`}
                  style={{ height: `${fillLevel}%` }}
                >
                  <div className={`${thermometerColor(fillLevel)} flex items-center justify-center h-full w-full text-white font-bold"`}>
                    {fillLevel}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className='self-end'>
          <Image
            src={image ? `/images/${image}` : '/images/default.png'}
            alt="Progress Bar Image"
            height={400}
            width={3500}
          />
        </div>

        {(temperature !== undefined || fillLevel !== undefined) && (
          <div className="absolute top-0 right-0 p-1">
            {temperature !== undefined && (
              <div className="text-lg font-bold text-black">{temperature}°C</div>
            )}

          </div>
        )}


        <span className="absolute left-1/2 -translate-x-1/2 bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{abv}% ABV</span>

      </div>
      <div className='p-5 relative'>
        <div className="text-base font-bold mb-2">{name}</div>
        <div className="text-sm font-bold">{brand}</div>
        <p className="text-gray-700 text-base">
          {location}
        </p>
        <p className="text-gray-700 text-base mt-2 truncate-text">
          {description}
        </p>
      </div>

      <a href={`https://www.kegsonlegs.com.au/search?q=${name}`} className="m-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Order more
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </a>
    </div>

  );
};


export default ActiveBeerCard;