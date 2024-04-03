import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import Product from '../components/Products'; // Assuming you have the Product component

const Store = () => {
  const [products, setProducts] = useState([]);
  const [bearerToken, setBearerToken] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('AMZ');
  const [selectedCategory, setSelectedCategory] = useState('Phone');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9); // Number of products per page
  const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenResponse = await axios.post('http://20.244.56.144/test/auth', {
          companyName: "",
          clientID: "",
          clientSecret: "",
          ownerName: "",
          ownerEmail: "",
          rollNo: ""
        });

        const token = tokenResponse.data.access_token;
        setBearerToken(token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://20.244.56.144/test/companies/${selectedCompany}/categories/${selectedCategory}/products?top=100&minPrice=1000&maxPrice=10000`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCompany, selectedCategory, bearerToken]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Sort products by price
  const sortProductsByPrice = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={3}>
          {/* Add filtering options here */}
        </Col>
        <Col md={9}>
          <h2>Our Products</h2>
          <Row>
            <Col md={12}>
            <Form>
  <Form.Group controlId="company">
    <Form.Label style={{ marginBottom: '0.5rem', display: 'block' }}>Company:</Form.Label>
    <Form.Select
      value={selectedCompany}
      onChange={(e) => setSelectedCompany(e.target.value)}
      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ced4da', marginBottom: '1rem' }}
    >
      <option value="AMZ">AMZ</option>
      <option value="FLP">FLP</option>
      <option value="SNP">SNP</option>
      <option value="MYN">MYN</option>
      <option value="AZO">AZO</option>
    </Form.Select>
  </Form.Group>
</Form>

            </Col>
            <Col md={12}>
            <Form>
  <Form.Group controlId="category">
    <Form.Label style={{ marginBottom: '0.5rem', display: 'block' }}>Category:</Form.Label>
    <Form.Select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      style={{
        width: '100%',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        border: '1px solid #ced4da',
        marginBottom: '1rem',
     
      }}
    >
      <option value="Phone">Phone</option>
      <option value="Computer">Computer</option>
      <option value="TV">TV</option>
      {/* Add other categories here */}
    </Form.Select>
  </Form.Group>
</Form>

            </Col>
            <Col md={12}>
              <Button variant="primary" onClick={sortProductsByPrice}>
                Sort by Price {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
              </Button>
              {/* Add more sorting buttons if needed */}
            </Col>
          </Row>
          <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
  {currentProducts.map((product, index) => (
    <Col key={index} style={{ width: '25%', marginBottom: '1rem', margin: '1rem', textAlign: "center" }}>
      <Product {...product} />
    </Col>
  ))}
</Row>

          <Row>
            <Col md={12}>
              <PaginationComponent
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const PaginationComponent = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map(number => (
        <Pagination.Item key={number} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Store;
