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
        <div>
            <Container>
                <Row className="m-5 justify-content-md-center">
                    {error && <Message variant="danger">{error}</Message>}
                </Row>
                <Row className="m-5 justify-content-md-center">
                    {loading && <Preloader />}
                </Row>
                <Row className="m-5 justify-content-md-center">
                    <h1>Login</h1>
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg={4}>
                        <Form onSubmit={submitHandler}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    //value is set to the email state
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    //value is set to the password state
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg={4} className="mt-3">
                        New Customer?{" "}
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : "/register"
                            }
                        >
                            Register
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginPage;
