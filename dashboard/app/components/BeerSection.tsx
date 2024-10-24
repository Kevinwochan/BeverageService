import React from 'react';
import { BeerMetadata } from '../types';
import ActiveBeerCard from './ActiveBeerCard';
import BeerCard from './BeerCard';

interface BeerSectionProps {
  beers: BeerMetadata[];
  isActiveBeer?: boolean;
}

const BeerSection: React.FC<BeerSectionProps> = ({ beers, isActiveBeer }) => (
  <section className="mb-8">
    <div className="flex flex-wrap -mx-4">
      {beers.map((beer, index) => (
        isActiveBeer ? <ActiveBeerCard key={index} {...beer} /> : 
        <BeerCard key={index} {...beer} />
      ))}

    </div>
  </section>
);

export default BeerSection;