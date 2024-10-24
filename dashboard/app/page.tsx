'use client'
import React, { useEffect, useState } from 'react';
import BeerSection from './components/BeerSection';
import Layout from './components/Layout';
import { ActiveBeer, BeerMetadata } from './types';

const mockBeerMetadata: BeerMetadata[] = [

  {
    brand: "Guinness",
    name: "Guinness Draught",
    abv: 4.2,
    description: "Iconic Irish dry stout known for its creamy head, dark color, and smooth, roasted flavor with notes of coffee and malt.",
    image: 'guiness-draught.jpeg'
  },
  {
    brand: "Paulaner",
    name: "Oktoberfest Bier",
    abv: 6.0,
    description: "Traditional Märzen-style festival beer with a rich amber color, full-bodied malty taste and subtle hop balance.",
    image: 'octoberfest.jpeg'
  },
  {
    brand: "Heineken",
    name: "Heineken Lager",
    abv: 5.0,
    description: "Premium Dutch lager with a distinctive bright golden color, crisp taste and slight bitter finish.",
    image: 'heineken.png'
  },
  {
    brand: "Asahi",
    name: "Asahi Super Dry",
    abv: 5.2,
    description: "Japan's number one beer, known for its clean, crisp taste and quick, dry finish with subtle rice notes.",
    image: 'super-dry.png'
  },
  {
    brand: "Coastal Brews",
    name: "Ocean Breeze Lager",
    abv: 4.8,
    description: "Light and smooth lager with subtle notes of citrus, perfect for a day at the beach."
  },
  {
    brand: "Urban Hops",
    name: "City Nights IPA",
    abv: 6.5,
    description: "Bold and hoppy IPA with tropical fruit flavors and a strong bitter finish."
  },
  {
    brand: "Countryside Ales",
    name: "Harvest Moon Wheat",
    abv: 5.0,
    description: "Smooth wheat beer with hints of banana and clove, inspired by traditional Bavarian styles."
  },
  {
    brand: "Peak Brewers",
    name: "Summit Stout",
    abv: 7.2,
    description: "Rich and full-bodied stout with deep roasted flavors and a hint of dark chocolate."
  }
]
  ;



const Home: React.FC = () => {

  const [onTapBeers, setOnTapBeers] = useState(null);
  const [previousBeers, setPreviousBeers] = useState(mockBeerMetadata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://i4rnvp74o77q546of5ya56eqty0vmqhu.lambda-url.ap-southeast-2.on.aws/');
        const jsonData = await response.json();
        setOnTapBeers(jsonData.filter((beer: ActiveBeer) => beer.isActive));
        setPreviousBeers(mockBeerMetadata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">On Tap 🚰</h1>
      {onTapBeers ? <BeerSection beers={onTapBeers} isActiveBeer /> : <p>Loading...</p>}
      <h1 className="text-4xl font-bold mb-8">Previous Bevvies 🍻</h1>
      <BeerSection beers={previousBeers} />
    </Layout>
  );
};

export default Home;
