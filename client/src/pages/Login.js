import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Modal from "../components/Modal";

class Login extends Component {
    state = {
        isLoggedIn: false,
        username: "",
        password: ""
    }
    render() {

        return (
            <Container fliud otherClass='my-5'>
                <Row>
                    <Col size="sm-12 md-3">
                    </Col>
                    <Col size="sm-12 md-6">
                        <Modal />
                    </Col>
                    <Col size="sm-12 md-3">
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
