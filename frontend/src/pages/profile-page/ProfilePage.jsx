import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Preloader } from "../../components/preloader/Preloader";
import Message from "../../components/message/Message";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { listMyOrders } from "../../actions/orderActions";
import PaginationComponent from "../../components/pagination-component/PaginationComponent";

function ProfileScreen({ history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const {
        loading: loadingOrders,
        error: errorOrders,
        orders,
        page,
        pages,
    } = orderListMy;

    console.log(orders);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(listMyOrders());
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
                // dispatch(listMyOrders());
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(
                updateUserProfile({
                    id: user._id,
                    name: name,
                    email: email,
                    password: password,
                })
            );
            setMessage("Profile updated");

            const timeoutID = window.setTimeout(() => {
                setMessage("");
            }, 5000);
        }
        setPassword("");
        setConfirmPassword("");
    };
    return (
        <Container style={{ marginTop: "70px", minHeight: "100vh" }}>
            <Row className="justify-content-center">
                <h2 className="text-center mt-5">Update Profile</h2>
            </Row>
            <Row className="m-5 justify-content-md-center">
                <Col md={6}>
                    {message && <Message variant="success">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Preloader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="passwordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="dark"
                            className="btn-block"
                        >
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="m-5 justify-content-center">
                <Col md={9}>
                    <h2 className="text-center m-5">My Orders</h2>
                    {loadingOrders ? (
                        <Preloader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : (
                        <Table striped responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            {order.createdOn.substring(0, 10)}
                                        </td>
                                        <td>${order.totalPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
            <PaginationComponent page={page} pages={pages} />
        </Container>
    );
}

export default ProfileScreen;
