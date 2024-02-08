import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NAVBAR() {
    return (
        <Navbar expand="lg" className="bg-dark-blue mb-3 py-4"> 
            <Container fluid>
                <Navbar.Brand href="#" className="text-warning fs-1 pl-1">Funny Songs</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel" className="text-warning fs-2">
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="#action1" className="text-warning fs-4 mx-3">Home</Nav.Link>
                            <Nav.Link href="#action2" className="text-warning fs-4 mx-3">Link</Nav.Link>
                            <NavDropdown
                                title={<span style={{ color: "rgb(255, 193, 7)", fontSize: "24px" }}>Category</span>}
                                className="text-warning fs-5 mx-3"
                                id="offcanvasNavbarDropdown"
                            >
                                <NavDropdown.Item href="#Songs" className="text-warning fs-5">Songs</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#Audio" className="text-warning fs-5">
                                    Audio
                                </NavDropdown.Item>
                                {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5" className="text-warning fs-5">
                                    Others
                                </NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex mx-3">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NAVBAR;
