import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Message from "../../components/message/Message";
import { Preloader } from "../../components/preloader/Preloader";

const LoginPage = () => {
    let history = useHistory();
    const location = useLocation();
    // Setting component state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Initializing the dispatch object
    const dispatch = useDispatch();
    // Split the query sring on = and return the value in index 1
    const redirect = location.search ? location.search.split("=")[1] : "/";

    //Getting the userLogin state from the store.js
    const userLogin = useSelector((state) => state.userLogin);
    //The userLogin variable holds the userReducer and from this we can destructure the data from the variable
    const { loading, userInfo, error } = userLogin;

    // If user is logged in redirect to homepage
    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            history.push(redirect);
        }
        // The dependency array ensures that useEffect is only called if the data in the dependency array changes.
    }, [history, userInfo, redirect]);

    // Send an axios request to the backend to login when the form submit button is clicked, passing in the email and password as params
    // The submit handler dispatches the login action passing it the email and password from the form. The reducer then updates the state with the actions payload.
    const submitHandler = (e) => {
        // Prevent the page from refreshing
        e.preventDefault();
        // Dispatching the login action
        dispatch(login(email, password));
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <Row className="m-5 justify-content-md-center">
                {error && <Message variant="danger">{error}</Message>}
            </Row>
            <Row className="justify-content-center border-bottom ">
                <Col sm={6} md={6} lg={6}>
                    <p
                        style={{
                            fontSize: "30px",
                            width: "100%",
                            fontWeight: "bold",
                        }}
                        className="text-center"
                    >
                        Welcome to Fabrique
                    </p>
                </Col>
            </Row>
            <Row className="m-2 justify-content-center">
                <h2>Login</h2>
            </Row>
            <Row className="justify-content-center">
                <Col xs={8} sm={8} md={6} lg={6}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                //value is set to the email state
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                //value is set to the password state
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={8} sm={8} md={6} lg={6} className="mt-3">
                    New Customer?{" "}
                    <Link style={{ color: "#007bff" }} to="/register">
                        Register
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
