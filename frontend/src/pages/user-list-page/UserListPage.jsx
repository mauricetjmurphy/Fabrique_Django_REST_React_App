import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../../actions/userActions";
import Message from "../../components/message/Message";
import { Preloader } from "../../components/preloader/Preloader";

function UserListPage() {
    const dispatch = useDispatch();
    let history = useHistory();

    const userLogin = useSelector((state) => state.userList);
    const { userInfo } = userLogin;

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        // if (userInfo) {
        //     dispatch(listUsers());
        // } else {
        //     history.push("/login");
        // }
        dispatch(listUsers());
    }, [dispatch, history, successDelete]);

    const deleteHandler = (id) => {
        dispatch(deleteUser(id));
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <Row className="justify-content-md-center">
                <h1 className="text-center m-5">Users</h1>
            </Row>

            {loading ? (
                <Preloader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td>
                                    <LinkContainer
                                        to={`/admin/user/${user.id}`}
                                    >
                                        <Button variant="light" className="btn">
                                            Edit
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteHandler(user.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default UserListPage;
