import axios from "axios";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../Config/reduxConfig/cartSlice";
import { Link } from 'react-router-dom';
import { Box } from "@mui/material";
import Loader from "./Loader/Loader";
function Cards() {
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(false);
  const dispatch =  useDispatch(); 
  axios
    .get(`https://fakestoreapi.com/products`)
    .then((res) => {
      setLoading(true);
      const productsWithQuantity = res.data.map(product => {
        // Add the quantity property with an initial value of 0 to each product object
        return {
          ...product,
          quantity: 1
        };
      });
      setData(productsWithQuantity);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
    // setData(data);

  return (
    <>
      <Container className="mt-5">
        <Row>
          {!loading ? (
            <Box sx={{display : "flex" , justifyContent : "center" , alignItems : "center" , height : "100vh"}}>
              <Loader />
            </Box>
          ) : (

            data.map((product) => (
              <Col md={3} sm={12} lg={3} className="my-2 mt-5">
              <Card
                key={product.id}
                style={{ height: "100%", border: "1px lightblue solid" }}
              >
                <Card.Img
                variant="top"
                  src={product.image}
                  style={{
                    maxHeight: "250px",
                    objectFit: "cover",
                    borderRadius: "20px 20px 0 0",
                  }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text key={product.id}>
                    <p > $ {product.price}</p>
                    </Card.Text>
                  <Link to="/cart">
                  <Button variant="dark" onClick={() => dispatch(addToCart(product))}>Add To Cart</Button>

                  </Link>
                  </Card.Body>
              </Card>
            </Col>
          ))
          )}
        </Row>
      </Container>
    </>
  );
}

export default Cards;
