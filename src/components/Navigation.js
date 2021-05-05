import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import icon from "../res/adventist-symbol--campfire.svg";
import {Link, useHistory} from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Alert, Container, Modal } from "react-bootstrap";
import { useState } from "react";
import {LoadingAnimation} from "../components/Lottie";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import alertify from "alertifyjs";

export default function Navigation(){

    const [showingAuth, setAuthDialogue] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState(null);

    //listen if user exist
    firebase.auth().onAuthStateChanged((u) => setUser(u));

    const onLogout = () => {
        firebase.auth().signOut();
        history.push("/");
    }

    const onBulletin = () => {
        setAuthDialogue(false);
        history.push("/bulletin");
    }

    return(
        <>
            <Navbar sticky="top" expand="lg" bg="light" variant="dark" className="dropShadow">
                <Container>
                <Navbar.Brand style={{margin:0, marginLeft:40}}>
                    <img src={icon} width="50" height="50" className="hover d-inline-block align-top" alt="React Bootstrap logo" />
                </Navbar.Brand>
                <Nav.Link><h3 style={{color:"#333"}}><strong>KHC TOOLS</strong></h3></Nav.Link>
                <Nav className="mr-auto">
                </Nav>
                <Nav>                    
                    {
                        user === null ?
                        <>
                        <Button size="lg" style={{ marginLeft: 10 }} variant="dark" as={Link} to="/" className="dropShadow">
                            <img src="https://img.icons8.com/ios-filled/26/ffffff/view-file.png"  alt="login"/>
                            {" "}
                            <strong>Preview</strong></Button>
                        <Button size="lg" style={{ marginLeft: 10 }} variant="dark" onClick={(e)=>setAuthDialogue(true)} className="dropShadow">
                            <img src="https://img.icons8.com/ios-filled/26/ffffff/login-rounded-right.png"  alt="login"/>
                            {" "}
                            <strong>Admin Sign In</strong>
                        </Button>
                        </>
                        :
                        <>
                            <Button size="lg" style={{ marginLeft: 10 }} className="hover" variant="primary" onClick={onBulletin}>
                                <img src="https://img.icons8.com/material-outlined/26/ffffff/documents--v1.png" alt="Download"/>
                                {" "}
                                <strong>Bulletin Creator</strong>
                            </Button>
                                {" "}
                            <Button size="lg" style={{ marginLeft: 10 }} variant="dark" onClick={onLogout} className="dropShadow hover">
                                <img src="https://img.icons8.com/metro/26/ffffff/exit.png" alt="logout"/>
                                {" "}
                                <strong>Log Out</strong></Button>
                        </>
                    }
                </Nav>
                </Container>
            </Navbar>
            <PopupAuth visibility={showingAuth} close={()=>setAuthDialogue(false)}/>
        </>
    );
}

function PopupAuth(props){

    const [verifiedEmail, setVerificationEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onEmailSign = () => {
        const email = document.getElementById('nav-email').value;
        const password = document.getElementById('nav-password').value;

        setLoading(true);
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
            const user = result.user;
            alertify.success(user ? "You have logged in as admin":"Could not sign in");
            onClose();
            setLoading(false);
        }).catch(error => {
            onClose();
            setLoading(false);
            alertify.warning(error.message)
        });

        //clear fields
        clearFields();
    }

    const clearFields = ()=>{
        document.getElementById('nav-email').value = "";
        document.getElementById('nav-password').value = "";
    }

    const onClose = ()=>{
        setLoading(false);
        setVerificationEmail("");
        props.close();
    }

    
    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={props.visibility} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title as="h1" className="colorPrimary" ><img src={icon}  width="60" alt="logo" />{" "}<strong>Sign In</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                    loading === true ? <LoadingAnimation width={300} /> :
                <Form onSubmit={onEmailSign}>
                    {
                        verifiedEmail === "" ? null :
                        <>
                        <br/>
                        <Alert variant="primary"><h5><strong>{verifiedEmail}</strong>, check your email to verify your account</h5></Alert>
                        <br/>
                        </>
                    }
                    <FormControl required  id="nav-email" size="lg" type="email" placeholder="Email" />
                    <br/>
                    <FormControl required  id="nav-password" size="lg" type="password" placeholder="Password" />
                    <br/>
                    <Button disabled={loading} type="submit" size="lg" variant="dark">
                        <img src="https://img.icons8.com/fluent/48/000000/send-mass-email.png" width="40" alt="Email" />
                        {" "}
                        Sign In
                    </Button>
                </Form>
            }
            </Modal.Body>
        </Modal>
    );
}

