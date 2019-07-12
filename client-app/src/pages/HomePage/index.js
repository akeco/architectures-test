import React, { useState } from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";

const productsList = [
  {
    id: 1,
    title: 'Activity 1',
    description: 'Description long text',
    image: 'https://www.teambonding.com/wp-content/uploads/2013/08/blog-post-outrageous-games.jpg',
    rating: 4,
    owner: 'Owner name'
  },
  {
    id: 2,
    title: 'Activity 2',
    description: 'Description long text',
    image: 'https://twiskehaven.nl/wp-content/uploads/Outdoor-Teambuilding-Games.jpg',
    rating: 4,
    owner: 'Owner name'
  },
  {
    id: 3,
    title: 'Activity 3',
    description: 'Description long text',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXdiE64VEbCtYScd65nwCc_iHSd3-_sESb4u4r2Fb-qKjoBeiKw',
    rating: 4,
    owner: 'Owner name'
  },
];

const HomePage = (props) => {
  const [products, setProducts] = useState(productsList);

  const renderProducts = () => {
    return products.map(item => (
      <Card key={item.id} className={'bp3-dark'} interactive={true} elevation={Elevation.ONE}>
        <h5><a href="#">{item.title}</a></h5>
        <img src={item.image} />
        <p>{item.description}</p>
        <Button>Submit</Button>
      </Card>
    ))
  }

  return (
    <div>
      { renderProducts() }
    </div>
  )
};

export default HomePage;
