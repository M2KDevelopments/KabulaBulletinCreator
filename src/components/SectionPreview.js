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

            <Container>
                
                <div className="centralise" style={{paddingTop:20, paddingBottom:20}}>
                    <Button size="lg" variant="warning" onClick={onDownload}>
                        <strong>Download Bulletin</strong>
                    </Button>
                </div>

                <Card id="bulletin">
                    <Card.Body>
                        <Row xs={1} sm={2} md={3}>
                            <Col>
                                <div className="banner title">
                                    <h5>SABBATH PROGRAM</h5>
                                </div>
                                <Row xs={2}>
                                    <Col><h6><strong>Elder On Duty:</strong></h6></Col><Col><h6>{khc.elderOnDuty}</h6></Col>
                                </Row>
                            </Col>
                            
                            <Col>
                            </Col>

                            <Col>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
                
        </>
    );
}