import { Button, Card, Col, Container, Row, } from "react-bootstrap";
import { useState } from "react";
import SectionSabbathProgram from "../components/SectionSabbathProgram";
import SectionAnnouncements from "../components/SectionAnnouncements";
import SectionSabbathSchool from "../components/SectionSabbathSchool";
import SectionChurchAccount from "../components/SectionChurchAccount";
import SectionDepartmentalHeads from "../components/SectionDepartmentalHeads";
import SectionZones from "../components/SectionZones";
import SectionHome from "../components/SectionHome";
import SectionPreview from "../components/SectionPreview";
import SectionDepartments from "../components/SectionDepartments";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useHistory } from "react-router";

export default function PageBulletin(){

    const SECTION = {
        HOME: "Front Page",
        ANNOUNCEMENTS: "Announcements",
        PROGRAM: "Sabbath Program ",
        SABBATHSCHOOL: "Sabbath School Program",
        CHURCHACCOUNTS: "Church Accounts",
        DEPARTMENTALHEADS: "Departmental Heads",
        ZONES: "Church Zones",
        PREVIEW: "Preview",
    }

    const [section, setSection] = useState(SECTION.PREVIEW);
    const history = useHistory();
    //listen if user exist
    firebase.auth().onAuthStateChanged((user) => {
        if(user === null){
            history.push("/");
        }
    });

    const onReset = () => {

    }

    const showSection = () => {
        switch(section){
            case SECTION.HOME:
                return <SectionHome />
            case SECTION.ANNOUNCEMENTS:
                return <SectionAnnouncements />
            case SECTION.CHURCHACCOUNTS:
                return <SectionChurchAccount />
            case SECTION.SABBATHSCHOOL:
                return <SectionSabbathSchool />
            case SECTION.PROGRAM:
                return <>
                            <Row xs={1} sm={1} md={2}>
                                <Col><SectionSabbathProgram service="First" /></Col>
                                <Col><SectionSabbathProgram service="Second" /></Col>
                            </Row>
                            <hr/>
                            <SectionDepartments />
                        </>
            case SECTION.DEPARTMENTALHEADS:
                return <SectionDepartmentalHeads />
            case SECTION.ZONES:
                return <SectionZones />
            case SECTION.PREVIEW:
                return <SectionPreview />
            default :
                return <SectionAnnouncements />;
        }
    }
    
    return (
        <>
            <Container style={{marginTop:50, marginBottom:50}}>
                <div className="centralise">
                    <h1>Kabula Hill SDA <strong>Bulletin Tool</strong></h1>
                    <hr/>
                    <Button size="lg" variant="info" onClick={onReset}>Reset Bulletin</Button>
                    <br/>
                </div>
            </Container>
            <Container>
                <div className="centralise">
                    <h1>{section}</h1>
                    
                    <hr/>

                    <Card className="dropShadow">
                        <Card.Body>
                            <Row xs={2} sm={2} md={3}>
                                <Col><Button variant={section === SECTION.HOME ? "info" : "light"} onClick={() => setSection(SECTION.HOME)}>FRONT PAGE</Button></Col>
                                <Col><Button variant={section === SECTION.ANNOUNCEMENTS ? "info" : "light"} onClick={() => setSection(SECTION.ANNOUNCEMENTS)}>ANNOUNCEMENTS</Button></Col>
                                <Col><Button variant={section === SECTION.PROGRAM ? "info" : "light"} onClick={() => setSection(SECTION.PROGRAM)}>SABBATH SERVICE</Button></Col>
                                <Col><Button variant={section === SECTION.SABBATHSCHOOL ? "info" : "light"} onClick={() => setSection(SECTION.SABBATHSCHOOL)}>SABBATH SCHOOL</Button></Col>
                                <Col><Button variant={section === SECTION.CHURCHACCOUNTS ? "info" : "light"} onClick={() => setSection(SECTION.CHURCHACCOUNTS)}>CHURCH ACCOUNTS</Button></Col>
                                <Col><Button variant={section === SECTION.DEPARTMENTALHEADS ? "info" : "light"} onClick={() => setSection(SECTION.DEPARTMENTALHEADS)}>DEPARTMENTAL HEADS</Button></Col>
                                <Col><Button variant={section === SECTION.ZONES ? "info" : "light"} onClick={() => setSection(SECTION.ZONES)}>CHURCH ZONES ELDERS</Button></Col>
                                <Col><Button variant={section === SECTION.PREVIEW ? "dark" : "outline-dark"} onClick={() => setSection(SECTION.PREVIEW)}>PREVIEW</Button></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                   
                </div>
            </Container>

            <Container style={{marginTop:50, marginBottom:50}}>
                {showSection()}
            </Container>

        </>
        
    );
}