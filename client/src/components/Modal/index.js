import React, { Component } from "react";

import { Button, Modal as BSModal, Form, FormGroup, Col, FormControl } from 'react-bootstrap';

class Modal extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        show: false,
        msModalBtnTitle: "Login",
        msModalTitle: "Modal Title"

    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {

        return (
            <div>

                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    {this.state.msModalBtnTitle}
                </Button>

                <BSModal  show={this.state.show} onHide={this.handleClose}>
                    
                    <BSModal.Header closeButton bsClass="text-center modal-title">
                        <BSModal.Title>{this.state.msModalTitle}</BSModal.Title>
                    </BSModal.Header>
                    <BSModal.Body >
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" />
                                </Col>
                            </FormGroup>

                        </Form>
                    </BSModal.Body>
                    <BSModal.Footer>
                        <Col>
                            <Button bsStyle="primary" type="submit">Sign in</Button>
                        </Col>
                    </BSModal.Footer>
                </BSModal>
            </div>
        );
    }

};

export default Modal;