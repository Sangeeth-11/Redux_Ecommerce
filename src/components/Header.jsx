import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../redux/slices/productSlice';



function Header() {
    const { wishlist } = useSelector(state => state.wishlistReducer)
    const { cart } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Link to={''} style={{ color: 'black', textDecoration: "none" }}>
                            <i className="fa-solid fa-cart-shopping fa-bounce"></i>Redux-Cart
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/wishlist" className='border border-dark me-3 rounded p-1' style={{ color: 'black', textDecoration: "none" }}><i className="fa-solid fa-heart" style={{ color: "#eb0000" }}></i>Wishlist <Badge bg="secondary">{wishlist?.length}</Badge></Link>
                            <Link to="/cart" className='border border-dark me-3 rounded p-1' style={{ color: 'black', textDecoration: "none" }}><i className="fa-solid fa-cart-plus"></i>Cart <Badge bg="secondary">{cart?.length}</Badge></Link>
                        </Nav>

                    </Navbar.Collapse>
                        <Form inline>
                            <Row>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search"
                                        className=" mr-sm-2"
                                        onChange={(e)=>{dispatch(searchProduct(e.target.value.toLowerCase()))}}
                                    />
                                </Col>                      
                            </Row>
                        </Form>
                </Container>
            </Navbar>
            
        </div>
    )
}

export default Header