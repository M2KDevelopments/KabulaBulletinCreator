import alertify from "alertifyjs";
import { Button, Card, Form, FormControl } from "react-bootstrap";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./Lottie";


export default function SectionSabbathProgram(props){

    const {service} = props;

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request = await firebase.firestore().collection("khc").doc(`${service.toLowerCase()}Service`).get();
            //set in use effect variable
            setData(request.data());
            return request;
        }
        fetchData();
    },[service]); //if [] run the async work once

    const onSabbathProgram = (e) => {
        e.preventDefault();
        
        const currentSabbathProgram = {
            startTime: document.getElementById(`${service}StartTime`).value,
            endTime: document.getElementById(`${service}EndTime`).value,
            elderOnDuty: document.getElementById(`${service}ElderOnDuty`).value,
            chorister: document.getElementById(`${service}Chorister`).value,
            introit: document.getElementById(`${service}Introit`).value,
            responsiveReading: document.getElementById(`${service}ResponsiveReading`).value,
            openingHymn: document.getElementById(`${service}OpeningHymn`).value,
            firstPrayer: document.getElementById(`${service}FirstPrayer`).value,
            offering: document.getElementById(`${service}Offering`).value,
            childrenSermon: document.getElementById(`${service}ChildrenSermon`).value,
            musicalMeditation: document.getElementById(`${service}MusicalMeditation`).value,
            preacher: document.getElementById(`${service}Preacher`).value,
            sermonTitle: document.getElementById(`${service}SermonTitle`).value,
            closingHymn: document.getElementById(`${service}ClosingHymn`).value,
            benediction: document.getElementById(`${service}Benediction`).value,
            churchBudgetOffering: document.getElementById(`${service}ChurchBudgetOffering`).value,
        };

        if(isNaN(currentSabbathProgram.introit)){
            alertify.warning("Please Enter Introit");
        }else if(isNaN(currentSabbathProgram.responsiveReading)){
            alertify.warning("Please Enter Responsive Reading");
        }else if(isNaN(currentSabbathProgram.openingHymn)){
            alertify.warning("Please Enter Opening Hymn");
        }else{
            const msg = 'Updated Sabbath Program Details For ' + service + " Service";
            firebase.firestore()
                .collection("khc")
                .doc(`${service.toLowerCase()}Service`)
                .update(currentSabbathProgram)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
        }

    }

    if(data === null){
        return <LoadingAnimation width={200} title="Loading Sabbath Program..."/>
    }

    return(
            <Card>
                <Card.Header>
                    <Card.Title>Sabbath Program <strong>{service} Service</strong></Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onSabbathProgram}>
                        <Form.Label as="h6">Start Time</Form.Label>
                        <FormControl defaultValue={data.startTime} required id={`${service}StartTime`} size="lg" type="time" placeholder="Start Time" />
                        <br/>
                        <Form.Label as="h6">End Time</Form.Label>
                        <FormControl defaultValue={data.endTime} required id={`${service}EndTime`} size="lg" type="time" placeholder="End Time" />
                        <br/>
                        <Form.Label as="h6">Elder on Duty</Form.Label>
                        <FormControl defaultValue={data.elderOnDuty} required id={`${service}ElderOnDuty`} size="lg" type="name" placeholder="Elder on Duty" />
                        <br/> 
                        <Form.Label as="h6">Chorister</Form.Label>
                        <FormControl defaultValue={data.chorister} required id={`${service}Chorister`} size="lg" type="name" placeholder="Chorister" />
                        <br/>
                        <Form.Label as="h6">Introit</Form.Label>
                        <FormControl defaultValue={data.introit} required id={`${service}Introit`} size="lg" type="number" min={1} max={695} placeholder="Introit" />
                        <br/> 
                        <Form.Label as="h6">Responsive Reading</Form.Label>
                        <FormControl defaultValue={data.responsiveReading} required id={`${service}ResponsiveReading`} size="lg" type="number" min={695} max={830} placeholder="Responsive Reading" />
                        <br/> 
                        <Form.Label as="h6">Opening Hymn #</Form.Label>
                        <FormControl defaultValue={data.openingHymn} required id={`${service}OpeningHymn`} size="lg" type="number" min={1} max={695} placeholder="Opening Hymn #" />
                        <br/>   
                        <Form.Label as="h6">First Prayer</Form.Label>
                        <FormControl defaultValue={data.firstPrayer} required id={`${service}FirstPrayer`} size="lg" type="name" placeholder="First Prayer" />
                        <br/>   
                        <Form.Label as="h6">Offering</Form.Label>
                        <FormControl defaultValue={data.offering} required id={`${service}Offering`} size="lg" type="name" placeholder="Offering" />
                        <br/>       
                        <Form.Label as="h6">Children Sermon</Form.Label>
                        <FormControl defaultValue={data.childrenSermon} required id={`${service}ChildrenSermon`} size="lg" type="name" placeholder="Children Sermon" />
                        <br/>
                        <Form.Label as="h6">Musical Meditation</Form.Label>
                        <FormControl defaultValue={data.musicalMeditation} required id={`${service}MusicalMeditation`} size="lg" type="name" placeholder="Musical Meditation" />
                        <br/>
                        <Form.Label as="h6">Preacher</Form.Label>
                        <FormControl defaultValue={data.preacher} required id={`${service}Preacher`} size="lg" type="name" placeholder="Preacher" />
                        <br/>
                        <Form.Label as="h6">Sermon Title</Form.Label>
                        <FormControl defaultValue={data.sermonTitle} required id={`${service}SermonTitle`} size="lg" type="name" placeholder="Sermon Title" />
                        <br/>
                        <Form.Label as="h6">Closing Hymn #</Form.Label>
                        <FormControl defaultValue={data.closingHymn} required id={`${service}ClosingHymn`} size="lg" type="number" min={1} max={695} placeholder="Closing Hymn #" />
                        <br/>
                        <Form.Label as="h6">Benediction</Form.Label>
                        <FormControl defaultValue={data.benediction} required id={`${service}Benediction`} size="lg" type="name" placeholder="Benediction" />
                        <br/>
                        <Form.Label as="h6">Church Budget Offering</Form.Label>
                        <FormControl defaultValue={data.churchBudgetOffering} required id={`${service}ChurchBudgetOffering`} size="lg" type="name" placeholder="Church Budget Offering" />
                        <br/>
                        <Button variant="dark" size="lg" type="submit">Update Sabbath Program - {service} Service</Button> 
                    </Form>
                </Card.Body>
            </Card>
            
    );
}