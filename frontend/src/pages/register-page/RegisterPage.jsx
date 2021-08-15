import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Message from "../../components/message/Message";

const RegisterPage = () => {
    let history = useHistory();
    const location = useLocation();
    //Setting component state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split("=")[1] : "/";

    //Getting the userLogin state from the store.js
    const userRegister = useSelector((state) => state.userRegister);
    //The userLogin variable holds the userReducer and from this we can destructure the data from the variable
    const { userInfo, error } = userRegister;

    // If user is loggied in redirect to homepage
    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    //Send an axios request to the backend to login when the form submit button is clicked, passing in the email and password as params
    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
        }

        dispatch(register(name, email, password));
    };

    return (
        <div>
            <Container style={{ marginTop: "100px", minHeight: "90vh" }}>
                {message && (
                    <Row className="m-5 justify-content-md-center">
                        <Message variant="danger">{message}</Message>
                    </Row>
                )}

                {error && (
                    <Row className="m-5 justify-content-md-center">
                        <Message variant="danger">{error}</Message>
                    </Row>
                )}

                <Row className="mt-5 justify-content-center">
                    <h1>Register</h1>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={4}>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Full Name"
                                    //value is set to the password state
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
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
                                    required
                                    type="password"
                                    placeholder="Password"
                                    //value is set to the password state
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formConfirmPassword"
                            >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Confirm Password"
                                    //value is set to the password state
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button
                                className="mb-2"
                                variant="primary"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg={4}>
                        Have an account?{" "}
                        <Link style={{ color: "#007bff" }} to="/login">
                            Sign In
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterPage;
