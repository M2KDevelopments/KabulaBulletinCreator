import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import icon from "../res/logo.png";

export default function Page404(){
    return(
    <Container  style={{paddingTop:300, paddingBottom:300}}>
        <Alert variant="primary">
            <img src={icon} alt="KHC SDA"/>
            <h1>404 Page Not Found</h1>
            <br/>
            <h3>Go to <Link to="/">Home Page</Link></h3>
        </Alert>
    </Container>
    );
}