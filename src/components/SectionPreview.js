import { Button, Card, Col, Container, Row } from "react-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { LoadingAnimation } from "./Lottie";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js"

export default function SectionPreview(props){

    const [khc, setKHC] = useState(null);

    useEffect(()=>{
        async function fetchData(){

            const khc = {};

            //get the promise from firebase
            let request = await firebase.firestore().collection("khc").doc("accounts").get();
            khc.accounts = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("announcements").get();
            khc.announcements = request.data();


            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("departmentalHeads").get();
            khc.departmentalHeads = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("departments").get();
            khc.departments = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("front").get();
            khc.front = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("firstService").get();
            khc.firstService = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("secondService").get();
            khc.secondService = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("sabbathSchool").get();
            khc.sabbathSchool = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("zones").get();
            khc.zones = request.data();

             
            //set in use effect variable
            setKHC(khc);
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once
    

    const Title = () => {
        return <Container style={{marginTop:50, marginBottom:50}}>
                    <div className="centralise">
                        <h1>Kabula Hill SDA <strong>Bulletin</strong></h1>
                        <hr/>
                    </div>
                </Container>
    }

    const onDownload  = () => {
        //parameters orientation - potrait, units - points, size A4
        const doc = new jsPDF("l", "pt", "a4");
        const bulletElement = document.getElementById('bulletin');
        doc.html(bulletElement, {callback: (pdf) => pdf.save("KHC Bulletin") });

        const element = document.getElementById('bulletin');
        const opt = {
            margin:       1,
            filename:     'KHC Bulletin 3.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 },
            //jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        
        // New Promise-based usage:
        html2pdf().from(element).set(opt).save();
        
        // Old monolithic-style usage:
        //html2pdf(element, opt);
    }

    if(khc === null){
        return <LoadingAnimation width={200} title="Loading Bulletin..."/>
    }
    
    return (
        <>
            {
                props.page ? <Title/> : <></>
            }

            <Container fluid>
                
                <div className="centralise" style={{paddingTop:20, paddingBottom:20}}>
                    <Button size="lg" variant="warning" onClick={onDownload}>
                        <strong>Download Bulletin</strong>
                    </Button>
                </div>

                <Card id="bulletin">
                    <Card.Body>
                        <Row xs={1} sm={2} md={3}>
                            <Col>
                                <div className="banner title"><h5>SABBATH PROGRAM</h5></div>
                                <Row xs={2}>
                                    <Col><h5><strong>First Service: </strong></h5></Col><Col><h5><strong>{khc.firstService.startTime} - {khc.firstService.endTime}</strong></h5></Col>
                                    <Col><h6><strong>Elder On Duty: </strong></h6></Col><Col><h6>{khc.firstService.elderOnDuty}</h6></Col>
                                    <Col><h6><strong>Chorister: </strong></h6></Col><Col><h6>{khc.firstService.chorister}</h6></Col>
                                    <Col><h6><strong>Introit: </strong></h6></Col><Col><h6>#{khc.firstService.introit}</h6></Col>
                                    <Col><h6><strong>Responsive Reading: </strong></h6></Col><Col><h6>#{khc.firstService.responsiveReading}</h6></Col>
                                    <Col><h6><strong>Opening Hymn: </strong></h6></Col><Col><h6>#{khc.firstService.openingHymn}</h6></Col>
                                    <Col><h6><strong>First Prayer: </strong></h6></Col><Col><h6>{khc.firstService.firstPrayer}</h6></Col>
                                    <Col><h6><strong>Offering: </strong></h6></Col><Col><h6>{khc.firstService.offering}</h6></Col>
                                    <Col><h6><strong>Children Sermon: </strong></h6></Col><Col><h6>{khc.firstService.childrenSermon}</h6></Col>
                                    <Col><h6><strong>Children Sermon: </strong></h6></Col><Col><h6>{khc.firstService.musicalMediation}</h6></Col>
                                    <Col><h6><strong>Preacher: </strong></h6></Col><Col><h6>{khc.firstService.preacher}</h6></Col>
                                    <Col><h6><strong>Sermon Title: </strong></h6></Col><Col><h6>{khc.firstService.sermonTitle}</h6></Col>
                                    <Col><h6><strong>Sermon Title: </strong></h6></Col><Col><h6>#{khc.firstService.closingHymn}</h6></Col>
                                    <Col><h6><strong>Benediction: </strong></h6></Col><Col><h6>{khc.firstService.benediction}</h6></Col>
                                    <Col><h6><strong>Church Building Offering: </strong></h6></Col><Col><h6>{khc.firstService.churchBudgetOffering}</h6></Col>
                                </Row>
                                <br/><br/>
                                <Row xs={2}>
                                    <Col><h5>Sabbth School: </h5></Col><Col><h5>{khc.sabbathSchool.startTime} - {khc.sabbathSchool.endTime}</h5></Col>
                                </Row>
                                <br/><br/>
                                <Row xs={2}>
                                    <Col><h5><strong>Second Service: </strong></h5></Col><Col><h5><strong>{khc.secondService.startTime} - {khc.secondService.endTime}</strong></h5></Col>
                                    <Col><h6><strong>Elder On Duty: </strong></h6></Col><Col><h6>{khc.secondService.elderOnDuty}</h6></Col>
                                    <Col><h6><strong>Chorister: </strong></h6></Col><Col><h6>{khc.secondService.chorister}</h6></Col>
                                    <Col><h6><strong>Introit: </strong></h6></Col><Col><h6>#{khc.secondService.introit}</h6></Col>
                                    <Col><h6><strong>Responsive Reading: </strong></h6></Col><Col><h6>#{khc.secondService.responsiveReading}</h6></Col>
                                    <Col><h6><strong>Opening Hymn: </strong></h6></Col><Col><h6>#{khc.secondService.openingHymn}</h6></Col>
                                    <Col><h6><strong>second Prayer: </strong></h6></Col><Col><h6>{khc.secondService.secondPrayer}</h6></Col>
                                    <Col><h6><strong>Offering: </strong></h6></Col><Col><h6>{khc.secondService.offering}</h6></Col>
                                    <Col><h6><strong>Children Sermon: </strong></h6></Col><Col><h6>{khc.secondService.childrenSermon}</h6></Col>
                                    <Col><h6><strong>Children Sermon: </strong></h6></Col><Col><h6>{khc.secondService.musicalMediation}</h6></Col>
                                    <Col><h6><strong>Preacher: </strong></h6></Col><Col><h6>{khc.secondService.preacher}</h6></Col>
                                    <Col><h6><strong>Sermon Title: </strong></h6></Col><Col><h6>{khc.secondService.sermonTitle}</h6></Col>
                                    <Col><h6><strong>Sermon Title: </strong></h6></Col><Col><h6>#{khc.secondService.closingHymn}</h6></Col>
                                    <Col><h6><strong>Benediction: </strong></h6></Col><Col><h6>{khc.secondService.benediction}</h6></Col>
                                    <Col><h6><strong>Church Building Offering: </strong></h6></Col><Col><h6>{khc.secondService.churchBudgetOffering}</h6></Col>
                                </Row>
                            </Col>
                            
                            <Col>
                                <div className="banner title"><h5>ANNOUNCEMENT - Page 1</h5></div>
                                <h5><strong>Welcome Remarks</strong></h5>
                                <h6>{khc.announcements.welcomeRemarks.split("\n").map(remark => <>{remark}<br/></>)}</h6>
                                <br/><br/>

                                <h5><strong>Covid 19 - Preventation</strong></h5>
                                <h6>{khc.announcements.covidPrevention.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                <br/><br/>


                                <h5><strong>Church Gatherings</strong></h5>
                                <h6>{khc.announcements.churchGatherings.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                <br/><br/>


                                <h5><strong>Achievement Classes</strong></h5>
                                <h6>{khc.announcements.achievementClasses.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                <br/><br/>

                            </Col>

                            <Col>
                                <div className="banner title"><h5>ANNOUNCEMENT - Page 2</h5></div>
                                <h5><strong>Counselling and Prayers</strong></h5>
                                <h6>{khc.announcements.counsellingAndPrayers.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                <br/><br/>

                                
                                <h5><strong>Wedding Announcements</strong></h5>
                                <h6>{khc.announcements.wedding.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                <br/><br/>


                                <h5><strong>Bereavements And Sicknesses</strong></h5>
                                <h6>{khc.announcements.bereavementsAndSicknesses.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                <br/><br/>


                                <h5><strong>Tithe and Offering</strong></h5>
                                <h6>{khc.announcements.titheAndOfferings.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                <br/><br/>


                                <h5><strong>Next Sabbath</strong></h5>
                                <h6>Elders on Duty Next Sabbath are <strong>{khc.announcements.nextSabbathOnDuty}</strong></h6>
                                <br/>
                                <h6>All announcements must reach elder of the month. <strong>{khc.announcements.elderOfTheMonth}</strong> ({khc.announcements.elderOfTheMonthPhone}) by Wedenesday for bulletin compilation and circulation.</h6>
                                <br/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
                
        </>
    );
}