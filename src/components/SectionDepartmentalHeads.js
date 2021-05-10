import { Button, Card, Form, FormControl } from "react-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import alertify from "alertifyjs";
import { LoadingAnimation } from "./Lottie";
import { useEffect, useState } from "react";

export default function SectionDepartmentalHeads(props){

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request = await firebase.firestore().collection("khc").doc("departmentalHeads").get();
            //set in use effect variable
            setData(request.data());
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once

    const onUpdate = (e) => {
        e.preventDefault();
        const departmentalHeads = {
            churchPastor:{name: document.getElementById('churchPastor').value, phone:document.getElementById('churchPastorPhone').value}, 
            firstElder: {name: document.getElementById('firstElder').value, phone:document.getElementById('firstElderPhone').value}, 
            secondElder: {name: document.getElementById('secondElder').value, phone:document.getElementById('secondElderPhone').value}, 
            headDeacon: {name: document.getElementById('headDeacon').value, phone:document.getElementById('headDeaconPhone').value}, 
            headDeaconess: {name: document.getElementById('headDeaconess').value, phone:document.getElementById('headDeaconessPhone').value}, 
            treasurer: {name: document.getElementById('treasurer').value,phone:document.getElementById('treasurerPhone').value}, 
            churchClerk: {name: document.getElementById('churchClerk').value, phone:document.getElementById('churchClerkPhone').value}, 
            stewardship: {name: document.getElementById('stewardship').value, phone:document.getElementById('stewardshipPhone').value}, 
            communications: {name: document.getElementById('communications').value, phone:document.getElementById('communicationsPhone').value}, 
            personalMinistries: {name: document.getElementById('personalMinistries').value, phone:document.getElementById('personalMinistriesPhone').value}, 
            sabbathSchool: {name: document.getElementById('sabbathSchool').value, phone:document.getElementById('sabbathSchoolPhone').value}, 
            familyMinistries1: {name: document.getElementById('familyMinistries1').value, phone:document.getElementById('familyMinistries1Phone').value}, 
            familyMinistries2: {name: document.getElementById('familyMinistries2').value, phone:document.getElementById('familyMinistries2Phone').value}, 
            projects: {name: document.getElementById('projects').value, phone:document.getElementById('projectsPhone').value}, 
            interestCoordinator: {name: document.getElementById('interestCoordinator').value, phone:document.getElementById('interestCoordinatorPhone').value}, 
            communityService:{name: document.getElementById('communityService').value, phone:document.getElementById('communityServicePhone').value},  
            childrenMinistries: {name: document.getElementById('childrenMinistries').value, phone:document.getElementById('childrenMinistriesPhone').value},  
            adventistYouth: {name:  document.getElementById('adventistYouth').value, phone:document.getElementById('adventistYouthPhone').value},
            ambassador: {name: document.getElementById('ambassador').value, phone:document.getElementById('ambassadorPhone').value}, 
            youthAdults: {name: document.getElementById('youthAdults').value,phone:document.getElementById('youthAdultsPhone').value}, 
            masterGuide: {name: document.getElementById('masterGuide').value, phone:document.getElementById('masterGuidePhone').value}, 
            womenMinistry: {name:  document.getElementById('womenMinistry').value, phone:document.getElementById('womenMinistryPhone').value},
            adventistMen: {name: document.getElementById('adventistMen').value, phone:document.getElementById('adventistMenPhone').value}, 
            pathfinderDirector:{name: document.getElementById('pathfinderDirector').value, phone:document.getElementById('pathfinderDirectorPhone').value}, 
            healthMinistries: {name:  document.getElementById('healthMinistries').value, phone:document.getElementById('healthMinistriesPhone').value},
            parl: {name: document.getElementById('parl').value, phone:document.getElementById('parlPhone').value}, 
            music: {name: document.getElementById('music').value, phone:document.getElementById('musicPhone').value}, 
            education: {name: document.getElementById('education').value, phone:document.getElementById('educationPhone').value}, 
            verspers: {name: document.getElementById('verspers').value, phone:document.getElementById('verspersPhone').value}, 
        };

        const msg = 'Updated Departmental Heads';
            firebase.firestore()
                .collection("khc")
                .doc("departmentalHeads")
                .update(departmentalHeads)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
    }

    if(data === null){
        return <LoadingAnimation width={200} title="Loading Departmental Heads..."/>
    }


    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Departmental Heads</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onUpdate}>
                        <Form.Label as="h6">Church Pastor</Form.Label>
                        <FormControl defaultValue={data.churchPastor.name} required id="churchPastor" size="lg" type="name" placeholder="Church Pastor" />
                        <FormControl defaultValue={data.churchPastor.phone} required id="churchPastorPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">First Elder</Form.Label>
                        <FormControl defaultValue={data.firstElder.name} required id="firstElder" size="lg" type="name" placeholder="First Elder" />
                        <FormControl defaultValue={data.firstElder.phone} required id="firstElderPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Second Elder</Form.Label>
                        <FormControl defaultValue={data.secondElder.name} required id="secondElder" size="lg" type="name" placeholder="Second Elder" />
                        <FormControl defaultValue={data.secondElder.phone} required id="secondElderPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Head Deacon</Form.Label>
                        <FormControl defaultValue={data.headDeacon.name} required id="headDeacon" size="lg" type="name" placeholder="Head Deacon" />
                        <FormControl defaultValue={data.headDeacon.phone} required id="headDeaconPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Head Deaconess</Form.Label>
                        <FormControl defaultValue={data.headDeaconess.name} required id="headDeaconess" size="lg" type="name" placeholder="Head Deaconess" />
                        <FormControl defaultValue={data.headDeaconess.phone} required id="headDeaconessPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Treasurer</Form.Label>
                        <FormControl defaultValue={data.treasurer.name} required id="treasurer" size="lg" type="name" placeholder="Treasurer" />
                        <FormControl defaultValue={data.treasurer.phone} required id="treasurerPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Church Clerk</Form.Label>
                        <FormControl defaultValue={data.churchClerk.name} required id="churchClerk" size="lg" type="name" placeholder="Church Clerk" />
                        <FormControl defaultValue={data.churchClerk.phone} required id="churchClerkPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Stewardship</Form.Label>
                        <FormControl defaultValue={data.stewardship.name} required id="stewardship" size="lg" type="name" placeholder="Stewardship" />
                        <FormControl defaultValue={data.stewardship.phone} required id="stewardshipPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Communications</Form.Label>
                        <FormControl defaultValue={data.communications.name} required id="communications" size="lg" type="name" placeholder="Communications" />
                        <FormControl defaultValue={data.communications.phone} required id="communicationsPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Personal Ministries</Form.Label>
                        <FormControl defaultValue={data.personalMinistries.name} required id="personalMinistries" size="lg" type="name" placeholder="Personal Ministries" />
                        <FormControl defaultValue={data.personalMinistries.phone} required id="personalMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Sabbath School</Form.Label>
                        <FormControl defaultValue={data.sabbathSchool.name} required id="sabbathSchool" size="lg" type="name" placeholder="Sabbath School" />
                        <FormControl defaultValue={data.sabbathSchool.phone} required id="sabbathSchoolPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Family Ministries 1</Form.Label>
                        <FormControl defaultValue={data.familyMinistries1.name} required id="familyMinistries1" size="lg" type="name" placeholder="Family Ministries 1" />
                        <FormControl defaultValue={data.familyMinistries1.phone} required id="familyMinistries1Phone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Family Ministries 2</Form.Label>
                        <FormControl defaultValue={data.familyMinistries2.name} required id="familyMinistries2" size="lg" type="name" placeholder="Family Ministries 2" />
                        <FormControl defaultValue={data.familyMinistries2.phone} required id="familyMinistries2Phone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Projects</Form.Label>
                        <FormControl defaultValue={data.projects.name} required id="projects" size="lg" type="name" placeholder="Projects" />
                        <FormControl defaultValue={data.projects.phone} required id="projectsPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Interest Coordinator</Form.Label>
                        <FormControl defaultValue={data.interestCoordinator.name} required id="interestCoordinator" size="lg" type="name" placeholder="Interest Coordinator" />
                        <FormControl defaultValue={data.interestCoordinator.phone} required id="interestCoordinatorPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Community Service</Form.Label>
                        <FormControl defaultValue={data.communityService.name} required id="communityService" size="lg" type="name" placeholder="Community Service" />
                        <FormControl defaultValue={data.communityService.phone} required id="communityServicePhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Children Ministries</Form.Label>
                        <FormControl defaultValue={data.childrenMinistries.name} required id="childrenMinistries" size="lg" type="name" placeholder="Children Ministries" />
                        <FormControl defaultValue={data.childrenMinistries.phone} required id="childrenMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Adventist Youth</Form.Label>
                        <FormControl defaultValue={data.adventistYouth.name} required id="adventistYouth" size="lg" type="name" placeholder="Adventist Youth" />
                        <FormControl defaultValue={data.adventistYouth.phone} required id="adventistYouthPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Pathfinder Director</Form.Label>
                        <FormControl defaultValue={data.pathfinderDirector.name} required id="pathfinderDirector" size="lg" type="name" placeholder="Pathfinder Director" />
                        <FormControl defaultValue={data.pathfinderDirector.phone} required id="pathfinderDirectorPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Ambassador</Form.Label>
                        <FormControl defaultValue={data.ambassador.name} required id="ambassador" size="lg" type="name" placeholder="Ambassador" />
                        <FormControl defaultValue={data.ambassador.phone} required id="ambassadorPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Youth Adults</Form.Label>
                        <FormControl defaultValue={data.youthAdults.name} required id="youthAdults" size="lg" type="name" placeholder="Youth Adults" />
                        <FormControl defaultValue={data.youthAdults.phone} required id="youthAdultsPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Master Guide</Form.Label>
                        <FormControl defaultValue={data.masterGuide.name} required id="masterGuide" size="lg" type="name" placeholder="Master Guide" />
                        <FormControl defaultValue={data.masterGuide.phone} required id="masterGuidePhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Women Ministry</Form.Label>
                        <FormControl defaultValue={data.womenMinistry.name} required id="womenMinistry" size="lg" type="name" placeholder="Women Ministry" />
                        <FormControl defaultValue={data.womenMinistry.phone} required id="womenMinistryPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Adventist Men</Form.Label>
                        <FormControl defaultValue={data.adventistMen.name} required id="adventistMen" size="lg" type="name" placeholder="Adventist Men" />
                        <FormControl defaultValue={data.adventistMen.phone} required id="adventistMenPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Health Ministries</Form.Label>
                        <FormControl defaultValue={data.healthMinistries.name} required id="healthMinistries" size="lg" type="name" placeholder="Health Ministries" />
                        <FormControl defaultValue={data.healthMinistries.phone} required id="healthMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">PARL</Form.Label>
                        <FormControl defaultValue={data.parl.name} required id="parl" size="lg" type="name" placeholder="PARL" />
                        <FormControl defaultValue={data.parl.phone} required id="parlPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Music</Form.Label>
                        <FormControl defaultValue={data.music.name} required id="music" size="lg" type="name" placeholder="Music" />
                        <FormControl defaultValue={data.music.phone} required id="musicPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Education</Form.Label>
                        <FormControl defaultValue={data.education.name} required id="education" size="lg" type="name" placeholder="Education" />
                        <FormControl defaultValue={data.education.phone} required id="educationPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Verspers</Form.Label>
                        <FormControl defaultValue={data.verspers.name} required id="verspers" size="lg" type="name" placeholder="Verspers" />
                        <FormControl defaultValue={data.verspers.phone} required id="verspersPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        <Button variant="dark" size="lg" type="submit">Update Departmental Heads</Button>
                    </Form>
                </Card.Body>
                
            </Card>
        </>
    );
}