import alertify from "alertifyjs";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { LoadingAnimation } from "./Lottie";


export default function SectionSabbathSchool(props){

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request = await firebase.firestore().collection("khc").doc("sabbathSchool").get();
            //set in use effect variable
            setData(request.data());
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once


    const onSabbathSchoolTime = (e) =>{
        e.preventDefault();
        
        const sabbathSchool = {
           startTime: document.getElementById('sabbathSchoolStartTime').value,
           endTime: document.getElementById('sabbathSchoolEndTime').value
        };

        if(sabbathSchool.startTime.trim() === ""){
            alertify.warning("Please Enter Start Time for Sabbath School")
        }else if(sabbathSchool.endTime.trim() === ""){
            alertify.warning("Please Enter End Time for Sabbath School");
        }else{
            const msg = 'Updated Sabbath School Program Details';
            firebase.firestore()
                .collection("khc")
                .doc("sabbathSchool")
                .update(sabbathSchool)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
        }
    }

    if(data === null){
        return <LoadingAnimation width={200} title="Loading Sabbath School..."/>
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>Sabbath School</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={onSabbathSchoolTime}>
                    <Form.Label as="h6">Start Time</Form.Label>
                    <FormControl defaultValue={data.startTime} required id="sabbathSchoolStartTime" size="lg" type="time"placeholder="Start Time" />
                    <br/>
                    <Form.Label as="h6">End Time</Form.Label>
                    <FormControl defaultValue={data.endTime} required id="sabbathSchoolEndTime" size="lg" type="time" placeholder="End Time" />
                    <br/>
                    <Button variant="dark" size="lg" type="submit">Update Sabbath School Program</Button> 
                </Form>
            </Card.Body>
        </Card>            
    );
}