import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import Message from "../../components/message/Message";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const ProfilePage = () => {
    const history = useHistory();

    //Setting component state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    //Getting the userLogin state from the store.js
    const userDetails = useSelector((state) => state.userDetails);
    //The userLogin variable holds the userReducer and from this we can destructure the data from the variable
    const { user, error } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        // If user is not logged in redirect to login page
        if (!userInfo) {
            history.push("/login");
        } else {
            // Check if we have loaded in the state data
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });

                //-------------THIS FUNCTION HAS ISSUES------------//
                // dispatch(getUserDetails("profile"));
            } else {
                // set the component state
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    //Send an axios request to the backend to login when the form submit button is clicked, passing in the email and password as params
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUserProfile({
                id: user._id,
                name: name,
                email: email,
                password: password,
            })
        );
        setMessage("");
    };

    return (
        <Container>
            <Row className="m-5 justify-content-md-center">
                {message && <Message variant="danger">{message}</Message>}
            </Row>
            <Row className="m-5 justify-content-md-center">
                {error && <Message variant="danger">{error}</Message>}
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                    <h2>User Profile</h2>
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
                            Update
                        </Button>
                    </Form>
                </Col>

                <Col md={4}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
