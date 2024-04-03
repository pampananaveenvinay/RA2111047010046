import React from 'react';
import Card from 'react-bootstrap/Card';

const Product = ({ productName, price, rating, discount, availability }) => {
  return (
    <Card style={{
      maxWidth: 345,
      borderRadius: '8px',
      backgroundColor: 'red'
    }}>
      <Card.Body>
        <Card.Title> {productName}</Card.Title>
        <Card.Text>Price: ${price}</Card.Text>
        <Card.Text>Rating: {rating}</Card.Text>
        <Card.Text>Discount: {discount}%</Card.Text>
        <Card.Text>Availability: {availability}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
