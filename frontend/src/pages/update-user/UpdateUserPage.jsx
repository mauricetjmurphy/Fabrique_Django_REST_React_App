import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getLoggedInUserDetails,
    getUserDetails,
    updateUser,
} from "../../actions/userActions";
import { USER_UPDATE_RESET } from "../../constants/userConstants";

import Message from "../../components/message/Message";
import { Preloader } from "../../components/preloader/Preloader";

const UpdateUserPage = ({ match }) => {
    // Initialising Hooks
    let history = useHistory();

    const dispatch = useDispatch();

    //Setting component state
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    // const userId = history.location.pathname.split("/")[3];

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userId = match.params.id;

    //Getting the userLogin state from the store.js
    const userDetails = useSelector((state) => state.userDetails);
    //The userLogin variable holds the userReducer and from this we can destructure the data from the variable
    const { user, error, loading } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = userUpdate;

    // If user is loggied in redirect to homepage
    useEffect(() => {
        window.scrollTo(0, 0);
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push("/user-list/");
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            } else {
                setId(user._id);
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, userInfo, user, userId, successUpdate, history]);

    //Send an axios request to the backend to login when the form submit button is clicked, passing in the email and password as params
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getLoggedInUserDetails());
        dispatch(updateUser({ id: id, name, email, isAdmin }));
    };

    const goBack = (e) => {
        e.preventDefault();
        dispatch(getLoggedInUserDetails());
        history.push("/user-list/?param=");
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <Row>
                <Button
                    type="button"
                    onClick={goBack}
                    style={{
                        margin: "20px",
                        border: "none",
                        backgroundColor: "#343a40",
                    }}
                >
                    Go Back
                </Button>
            </Row>

            {loading ? (
                <Preloader />
            ) : loading ? (
                <Preloader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Container>
                    <Row className="m-5 justify-content-md-center">
                        <h1>Edit User</h1>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <Form onSubmit={submitHandler}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formName"
                                >
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Full Name"
                                        //value is set to the password state
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone
                                        else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="isadmin"
                                >
                                    <Form.Check
                                        type="checkbox"
                                        label="Is Admin"
                                        //value is set to the password state
                                        checked={isAdmin}
                                        onChange={(e) =>
                                            setIsAdmin(e.target.checked)
                                        }
                                    />
                                </Form.Group>

                                <Button
                                    variant="dark"
                                    className="btn-block"
                                    type="submit"
                                >
                                    Update
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )}
        </Container>
    );
};

export default UpdateUserPage;
