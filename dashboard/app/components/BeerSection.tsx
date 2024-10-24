import React from 'react';
import { ActiveBeer } from '../types';
import ActiveBeerCard from './ActiveBeerCard';
import BeerCard from './BeerCard';

interface BeerSectionProps {
  beers: ActiveBeer[];
  isActiveBeer?: boolean;
}

const BeerSection: React.FC<BeerSectionProps> = ({ beers, isActiveBeer }) => {
  return (

    < section className="mb-8" >
      {
        isActiveBeer ?
          <div className="flex flex-wrap -mx-4 gap-12 justify-center">
            {beers.map((beer, index) => (<ActiveBeerCard key={index} {...beer} />))}
          </div >
          : (
            <div className="flex flex-wrap -mx-4 gap-12">
              {
                beers.map((beer, index) => (<BeerCard key={index} {...beer} />))}
            </div>
          )
      }
    </section >
  )
};

export default BeerSection;