//Bootstrap Components
import {Container, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../res/logo.png";

//CSS Styles
import "../css/footer.css";

export default function Footer(){

    const year = new Date().getFullYear();
    
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col>
                        <Container className="centralise">
                            <img style={{width:250}} src={icon} alt={`Kabula Hill SDA Church © Copyright ${year}`} />
                            <br/>
                            <h6 className="centralise"><a href="http://kabulahillsdachurch.com">Kabula Hill SDA Church © Copyright 2021</a></h6>
                            <br/>
                        </Container>
                    </Col>
                    <Col sm={12} md={6} lg={3}>
                        <h5><strong>Kabula Hill SDA Church</strong></h5>
                        <p>
                            <Link to="/downloads">Download</Link> many amazing free apps here and if your feeling up to it give us feed back on how we can improve our beta and upcoming apps.
                            <br/>Take a look around.
                        </p>
                        <h5><strong>Follow Us</strong></h5>
                        <br/>
                        <Row xs={1}>
                            <Col>
                                <a href="https://www.facebook.com/m2kdevelopments" target="_">
                                    <img className="hover" src="https://img.icons8.com/nolan/64/facebook-new.png" style={{width:80}}alt="Facebook"  />
                                </a>
                            </Col>
                        </Row>
                    </Col>
            
                    <Col sm={12} md={6} lg={3}>
                        <h5><strong>Quick Links</strong></h5>
                        <ul>
                            <li className="mbr-text item-wrap"><Link to="privacyPolicy">Private Policy</Link></li>
                            <li className="mbr-text item-wrap"><Link to="terms">Terms and Conditions</Link></li>
                        </ul>
                        
                    </Col>
                </Row>
                
            </Container>
            
        </div>
    );
}