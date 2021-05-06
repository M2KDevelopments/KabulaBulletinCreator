// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import alertify from "alertifyjs";
import { LoadingAnimation } from "./Lottie";
import { useEffect, useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";

export default function SectionDepartments(props){

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request = await firebase.firestore().collection("khc").doc("departments").get();
            //set in use effect variable
            setData(request.data());
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once

    const onUpdate = (e) => {
        e.preventDefault();
        const departments = {
            administration: document.getElementById('administration').value,
            administrationPhone: document.getElementById('administrationPhone').value,
            stewardship: document.getElementById('stewardship').value,
            stewardshipPhone: document.getElementById('stewardshipPhone').value,
            familyMinistries: document.getElementById('familyMinistries').value,
            familyMinistriesPhone: document.getElementById('familyMinistriesPhone').value,
            personalMinistries: document.getElementById('personalMinistries').value,
            personalMinistriesPhone: document.getElementById('personalMinistriesPhone').value,
            healthMinistries: document.getElementById('healthMinistries').value,
            healthMinistriesPhone: document.getElementById('healthMinistriesPhone').value,
            projects: document.getElementById('projects').value,
            projectsPhone: document.getElementById('projectsPhone').value,
            sabbathSchool: document.getElementById('sabbathSchool').value,
            communications: document.getElementById('communications').value,
            communicationsPhone: document.getElementById('communicationsPhone').value,
            interestCoordination: document.getElementById('interestCoordination').value,
            interestCoordinationPhone: document.getElementById('interestCoordinationPhone').value,
            amo: document.getElementById('amo').value,
            amoPhone: document.getElementById('amoPhone').value,
            womenAndChildren: document.getElementById('awomenAndChildrenmo').value,
            womenAndChildrenPhone: document.getElementById('awomenAndChildrenmoPhone').value,
            deaconessAndCommunity: document.getElementById('deaconessAndCommunity').value,
            deaconessAndCommunityPhone: document.getElementById('deaconessAndCommunityPhone').value,
        };

        const msg = 'Updated Departmental Heads';
            firebase.firestore()
                .collection("khc")
                .doc("departments")
                .update(departments)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
    }

    if(data === null){
        return <LoadingAnimation width={200} title="Loading Department Elders..."/>
    }

    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Departmental Heads</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onUpdate}>
                        <Form.Label as="h6">Administration/Deaconry</Form.Label>
                        <FormControl defaultValue={data.administration} required id="administration" size="lg" type="name" placeholder="Administration/Deaconry" />
                        <FormControl defaultValue={data.administrationPhone} required id="administrationPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Stewardship/Treasury</Form.Label>
                        <FormControl defaultValue={data.stewardship} required id="stewardship" size="lg" type="name" placeholder="Stewardship/Treasury" />
                        <FormControl defaultValue={data.stewardshipPhone} required id="stewardshipPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Family Ministries/Adventist Youth</Form.Label>
                        <FormControl defaultValue={data.familyMinistries} required id="familyMinistries" size="lg" type="name" placeholder="Family Ministries/Adventist Youth" />
                        <FormControl defaultValue={data.familyMinistriesPhone} required id="familyMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Personal Ministries</Form.Label>
                        <FormControl defaultValue={data.personalMinistries} required id="personalMinistries" size="lg" type="name" placeholder="Personal Ministries" />
                        <FormControl defaultValue={data.personalMinistriesPhone} required id="personalMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Health Ministries/Music</Form.Label>
                        <FormControl defaultValue={data.healthMinistries} required id="healthMinistries" size="lg" type="name" placeholder="Health Ministries/Music" />
                        <FormControl defaultValue={data.healthMinistriesPhone} required id="healthMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Projects/Publishing and VOP</Form.Label>
                        <FormControl defaultValue={data.projects} required id="projects" size="lg" type="name" placeholder="Projects/Publishing and VOP" />
                        <FormControl defaultValue={data.projectsPhone} required id="projectsPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Sabbath School/PARL</Form.Label>
                        <FormControl defaultValue={data.sabbathSchool} required id="sabbathSchool" size="lg" type="name" placeholder="Sabbath School/PARL" />
                        <FormControl defaultValue={data.sabbathSchoolPhone} required id="sabbathSchoolPhone" size="lg" type="phone" placeholder="Phone Number" />

                        <Form.Label as="h6">Communications/PA System</Form.Label>
                        <FormControl defaultValue={data.communications} required id="communications" size="lg" type="name" placeholder="Communications/PA System" />
                        <FormControl defaultValue={data.communicationsPhone} required id="communicationsPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Interest Coordination/PA System</Form.Label>
                        <FormControl defaultValue={data.interestCoordination} required id="interestCoordination" size="lg" type="name" placeholder="Interest Coordination/PA System" />
                        <FormControl defaultValue={data.interestCoordinationPhone} required id="interestCoordinationPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">AMO/Education</Form.Label>
                        <FormControl defaultValue={data.amo} required id="amo" size="lg" type="name" placeholder="AMO/Education" />
                        <FormControl defaultValue={data.amoPhone} required id="amoPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Women and Children Ministries</Form.Label>
                        <FormControl defaultValue={data.womenAndChildren} required id="womenAndChildren" size="lg" type="name" placeholder="Women and Children Ministries" />
                        <FormControl defaultValue={data.womenAndChildrenPhone} required id="womenAndChildrenPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Deaconess/Community Services</Form.Label>
                        <FormControl defaultValue={data.deaconessAndCommunity} required id="deaconessAndCommunity" size="lg" type="name" placeholder="Deaconess/Community Services" />
                        <FormControl defaultValue={data.deaconessAndCommunityPhone} required id="deaconessAndCommunityPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Button variant="dark" size="lg" type="submit">Update Department Elders</Button>
                    </Form>
                </Card.Body>
                
            </Card>
        </>
    );
}