//Bootstrap Components
import {Container, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../res/adventist-symbol--white.svg";

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
                        <p>Kabula Hill SDA church is an English speaking church located off Kabula Hill Road, P.O Box 1969, Blantyre. We are next to  Blantyre Adventist Hospital
                            <br/>Feel free to come visit us.
                        </p>
                        <h5><strong>Follow Us</strong></h5>
                        <br/>
                        <Row xs={1}>
                            <Col>
                                <a href="https://www.facebook.com/kabulahillsdachurch" target="_">
                                    <img className="hover" src="https://img.icons8.com/fluent/80/ffffff/facebook-new.png" alt="Facebook"  />
                                </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} md={6} lg={3}>
                        <h5><strong>Our Mission</strong></h5>
                        <ul>
                            <li className="mbr-text item-wrap">Nurture of members spiritually</li>
                            <li className="mbr-text item-wrap">Creating a conducive worshiping environment,</li>
                            <li className="mbr-text item-wrap">Grooming members to Reflect Christ daily,</li>
                            <li className="mbr-text item-wrap">Encouraging members to commit their resources</li>
                            <li className="mbr-text item-wrap">Encouraging members to take part in church activities</li>
                            <li className="mbr-text item-wrap">Working as a team</li>
                            <li className="mbr-text item-wrap">Equipping members to reach out and win new souls</li>
                        </ul>
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