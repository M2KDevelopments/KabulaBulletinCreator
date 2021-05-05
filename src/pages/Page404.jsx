import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../res/adventist-symbol--campfire.svg";

export default function Page404(){
    return(
    <Container  style={{paddingTop:50, paddingBottom:50}}>
        <Alert variant="danger">
            <img src={icon} alt="KHC SDA" height={300}/>
            <h1>404 Page Not Found</h1>
            <br/>
            <h3>Go to <Link to="/">Home Page</Link></h3>
        </Alert>
    </Container>
    );
}