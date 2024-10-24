import React from 'react';
import { ActiveBeer, BeerMetadata } from '../types';
import ActiveBeerCard from './ActiveBeerCard';
import BeerCard from './BeerCard';

interface BeerSectionProps {
  beers: ActiveBeer[] | BeerMetadata[];
  isActiveBeer?: boolean;
}

const BeerSection: React.FC<BeerSectionProps> = ({ beers, isActiveBeer }) => {
  return (
    <section className="mb-8" >
      {
        isActiveBeer ?
          <div className="flex flex-wrap  gap-12 justify-between">
            {beers.map((beer, index) => (<ActiveBeerCard key={index} {...beer} />))}
          </div >
          : (
            <div className="flex flex-wrap gap-12">
              {
                beers.map((beer, index) => (<BeerCard key={index} {...beer} />))}
            </div>
          )
      }
    </section >
  )
};

export default BeerSection;