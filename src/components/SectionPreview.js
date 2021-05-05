import { Card, Col, Container, Row } from "react-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { LoadingAnimation } from "./Lottie";
import { useEffect, useState } from "react";

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

    if(khc === null){
        return <LoadingAnimation width={200} title="Loading Bulletin..."/>
    }
    
    return (
        <>
            {
                props.page ? <Title/> : <></>
            }
            <Container>
                <Card>
                    <Card.Body>
                        <Row xs={2}>
                            <Col><h4><strong>Elder On Duty:</strong></h4></Col><Col><h4>{khc.firstService.elderOnDuty}</h4></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
                
        </>
    );
}