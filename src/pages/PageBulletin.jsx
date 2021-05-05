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

export default function PageBulletin(){

    const SECTION = {
        HOME: "Front Page",
        ANNOUNCEMENTS: "Announcements",
        PROGRAM_FIRST: "Sabbath Program First Service",
        PROGRAM_SECOND: "Sabbath Program Second Service",
        SABBATHSCHOOL: "Sabbath School Program",
        CHURCHACCOUNTS: "Church Accounts",
        DEPARTMENTALHEADS: "Departmental Heads",
        ZONES: "Church Zones",
        PREVIEW: "Preview",
    }

    const [section, setSection] = useState(SECTION.PREVIEW);
    
    const onReset = () => {

    }

    const onDownload  = () => {

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
            case SECTION.PROGRAM_FIRST:
                return <SectionSabbathProgram service="First" />
            case SECTION.PROGRAM_SECOND:
                return <SectionSabbathProgram service="Second" />
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
                    <br/>
                    <Button size="lg" variant="warning" onClick={onDownload}><strong>Download Bulletin</strong></Button>
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
                                <Col><Button variant={section === SECTION.PROGRAM_FIRST ? "info" : "light"} onClick={() => setSection(SECTION.PROGRAM_FIRST)}>FIRST SERVICE</Button></Col>
                                <Col><Button variant={section === SECTION.PROGRAM_SECOND ? "info" : "light"} onClick={() => setSection(SECTION.PROGRAM_SECOND)}>SECOND SERVICE</Button></Col>
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