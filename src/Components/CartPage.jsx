import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartTotal,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../Config/reduxConfig/cartSlice";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );
  const dispatch = useDispatch();
  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <section className="h-100 gradient-custom mt-5">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  Cart - {totalQuantity} items
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {cart.length > 0 ? (
                  cart.map((product) => (
                    <MDBRow className="my-3">
                      <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                        <MDBRipple
                          rippleTag="div"
                          rippleColor="light"
                          className="bg-image rounded hover-zoom hover-overlay"
                        >
                          <img src={product.image} className="w-100" />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.2)",
                              }}
                            ></div>
                          </a>
                        </MDBRipple>
                      </MDBCol>

                      <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                        <p>
                          <strong>{product.title}</strong>
                        </p>
                        <MDBTooltip
                          wrapperProps={{ size: "sm" }}
                          wrapperClass="me-1 mb-2"
                          title="Remove item"
                        >
                          <MDBIcon
                            fas
                            icon="trash"
                            block
                            onClick={() => dispatch(removeItem(product.id))}
                          />
                        </MDBTooltip>
                      </MDBCol>
                      <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "300px" }}
                        >
                          <MDBBtn
                            className="px-3 me-2"
                            onClick={() => dispatch(decreaseQuantity(product.id))}
                          >
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>

                          <MDBInput
                            min={0}
                            value={product.quantity === 0 ? dispatch(removeItem(product.id)): product.quantity}
                            type="number"
                          />

                          <MDBBtn
                            className="px-3 ms-2"
                            onClick={() => handleIncreaseQuantity(product.id)}
                          >
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </div>

                        <p className="text-start text-md-center">
                          <strong>${product.price * product.quantity}</strong>
                        </p>
                      </MDBCol>
                      <hr className="my-4" />
                    </MDBRow>
                  ))
                ) : (
                  <h2>No Product Available</h2>
                )}
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody>
                <p>
                  <strong>We accept</strong>
                </p>
                <MDBCardImage
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <MDBCardImage
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <MDBCardImage
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                <MDBCardImage
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                  alt="PayPal acceptance mark"
                />
                <Link to="/">
                  <MDBBtn size="md" className="mx-5 btn-dark">
                    Continue Shopping
                  </MDBBtn>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Total Quantity
                    <span>{totalQuantity}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${totalPrice}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
                <MDBBtn block size="lg">
                  Go to checkout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
