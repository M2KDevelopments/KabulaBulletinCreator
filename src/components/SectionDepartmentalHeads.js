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
            churchPastor: document.getElementById('churchPastor').value, 
            churchPastorPhone :document.getElementById('churchPastorPhone').value, 
            
            firstElder: document.getElementById('firstElder').value,
            firstElderPhone:document.getElementById('firstElderPhone').value, 
            
            secondElder: document.getElementById('secondElder').value,
            secondElderPhone: document.getElementById('secondElderPhone').value,
            
            headDeacon: document.getElementById('headDeacon').value, 
            headDeaconPhone: document.getElementById('headDeaconPhone').value, 
            
            headDeaconess: document.getElementById('headDeaconess').value,
            headDeaconessPhone: document.getElementById('headDeaconessPhone').value,
            
            treasurer: document.getElementById('treasurer').value, 
            treasurerPhone: document.getElementById('treasurerPhone').value, 
            
            churchClerk: document.getElementById('churchClerk').value, 
            churchClerkPhone: document.getElementById('churchClerkPhone').value, 
            
            stewardship: document.getElementById('stewardship').value, 
            stewardshipPhone: document.getElementById('stewardshipPhone').value, 
            
            communications: document.getElementById('communications').value, 
            communicationsPhone: document.getElementById('communicationsPhone').value, 
            
            personalMinistries: document.getElementById('personalMinistries').value, 
            personalMinistriesPhone: document.getElementById('personalMinistriesPhone').value, 
            
            sabbathSchool: document.getElementById('sabbathSchool').value,
            sabbathSchoolPhone: document.getElementById('sabbathSchoolPhone').value, 
            
            familyMinistries1: document.getElementById('familyMinistries1').value,
            familyMinistries1Phone: document.getElementById('familyMinistries1Phone').value, 
            
            familyMinistries2: document.getElementById('familyMinistries2').value,
            familyMinistries2Phone: document.getElementById('familyMinistries2Phone').value, 
            
            projects: document.getElementById('projects').value,
            projectsPhone: document.getElementById('projectsPhone').value, 
            
            interestCoordinator: document.getElementById('interestCoordinator').value,
            interestCoordinatorPhone: document.getElementById('interestCoordinatorPhone').value, 
            
            communityService: document.getElementById('communityService').value,
            communityServicePhone: document.getElementById('communityServicePhone').value,  
            
            childrenMinistries: document.getElementById('childrenMinistries').value,
            childrenMinistriesPhone: document.getElementById('childrenMinistriesPhone').value,  
            
            adventistYouth: document.getElementById('adventistYouth').value, 
            adventistYouthPhone: document.getElementById('adventistYouthPhone').value,
            
            ambassador: document.getElementById('ambassador').value,
            ambassadorPhone: document.getElementById('ambassadorPhone').value, 
            
            youthAdults: document.getElementById('youthAdults').value,
            youthAdultsPhone: document.getElementById('youthAdultsPhone').value, 
            
            masterGuide: document.getElementById('masterGuide').value,
            masterGuidePhone: document.getElementById('masterGuidePhone').value,
            
            womenMinistry: document.getElementById('womenMinistry').value,
            womenMinistryPhone: document.getElementById('womenMinistryPhone').value,
            
            adventistMen: document.getElementById('adventistMen').value, 
            adventistMenPhone: document.getElementById('adventistMenPhone').value, 
            
            pathfinderDirector:document.getElementById('pathfinderDirector').value, 
            pathfinderDirectorPhone:document.getElementById('pathfinderDirectorPhone').value, 
            
            healthMinistries: document.getElementById('healthMinistries').value,
            healthMinistriesPhone: document.getElementById('healthMinistriesPhone').value,
            
            parl: document.getElementById('parl').value, 
            parlPhone: document.getElementById('parlPhone').value, 
            
            music: document.getElementById('music').value, 
            musicPhone: document.getElementById('musicPhone').value, 
            
            education: document.getElementById('education').value, 
            educationPhone: document.getElementById('educationPhone').value, 
            
            verspers: document.getElementById('verspers').value, 
            verspersPhone: document.getElementById('verspersPhone').value
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
                        <FormControl defaultValue={data.churchPastor} required id="churchPastor" size="lg" type="name" placeholder="Church Pastor" />
                        <FormControl defaultValue={data.churchPastorPhone} required id="churchPastorPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">First Elder</Form.Label>
                        <FormControl defaultValue={data.firstElder} required id="firstElder" size="lg" type="name" placeholder="First Elder" />
                        <FormControl defaultValue={data.firstElderPhone} required id="firstElderPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Second Elder</Form.Label>
                        <FormControl defaultValue={data.secondElder} required id="secondElder" size="lg" type="name" placeholder="Second Elder" />
                        <FormControl defaultValue={data.secondElderPhone} required id="secondElderPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Head Deacon</Form.Label>
                        <FormControl defaultValue={data.headDeacon} required id="headDeacon" size="lg" type="name" placeholder="Head Deacon" />
                        <FormControl defaultValue={data.headDeaconPhone} required id="headDeaconPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>

                        <Form.Label as="h6">Head Deaconess</Form.Label>
                        <FormControl defaultValue={data.headDeaconess} required id="headDeaconess" size="lg" type="name" placeholder="Head Deaconess" />
                        <FormControl defaultValue={data.headDeaconessPhone} required id="headDeaconessPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Treasurer</Form.Label>
                        <FormControl defaultValue={data.treasurer} required id="treasurer" size="lg" type="name" placeholder="Treasurer" />
                        <FormControl defaultValue={data.treasurerPhone} required id="treasurerPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Church Clerk</Form.Label>
                        <FormControl defaultValue={data.churchClerk} required id="churchClerk" size="lg" type="name" placeholder="Church Clerk" />
                        <FormControl defaultValue={data.churchClerkPhone} required id="churchClerkPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Stewardship</Form.Label>
                        <FormControl defaultValue={data.stewardship} required id="stewardship" size="lg" type="name" placeholder="Stewardship" />
                        <FormControl defaultValue={data.stewardshipPhone} required id="stewardshipPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Communications</Form.Label>
                        <FormControl defaultValue={data.communications} required id="communications" size="lg" type="name" placeholder="Communications" />
                        <FormControl defaultValue={data.communicationsPhone} required id="communicationsPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Personal Ministries</Form.Label>
                        <FormControl defaultValue={data.personalMinistries} required id="personalMinistries" size="lg" type="name" placeholder="Personal Ministries" />
                        <FormControl defaultValue={data.personalMinistriesPhone} required id="personalMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Sabbath School</Form.Label>
                        <FormControl defaultValue={data.sabbathSchool} required id="sabbathSchool" size="lg" type="name" placeholder="Sabbath School" />
                        <FormControl defaultValue={data.sabbathSchoolPhone} required id="sabbathSchoolPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Family Ministries 1</Form.Label>
                        <FormControl defaultValue={data.familyMinistries1} required id="familyMinistries1" size="lg" type="name" placeholder="Family Ministries 1" />
                        <FormControl defaultValue={data.familyMinistries1Phone} required id="familyMinistries1Phone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Family Ministries 2</Form.Label>
                        <FormControl defaultValue={data.familyMinistries2} required id="familyMinistries2" size="lg" type="name" placeholder="Family Ministries 2" />
                        <FormControl defaultValue={data.familyMinistries2Phone} required id="familyMinistries2Phone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Projects</Form.Label>
                        <FormControl defaultValue={data.projects} required id="projects" size="lg" type="name" placeholder="Projects" />
                        <FormControl defaultValue={data.projectsPhone} required id="projectsPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Interest Coordinator</Form.Label>
                        <FormControl defaultValue={data.interestCoordinator} required id="interestCoordinator" size="lg" type="name" placeholder="Interest Coordinator" />
                        <FormControl defaultValue={data.interestCoordinatorPhone} required id="interestCoordinatorPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Community Service</Form.Label>
                        <FormControl defaultValue={data.communityService} required id="communityService" size="lg" type="name" placeholder="Community Service" />
                        <FormControl defaultValue={data.communityServicePhone} required id="communityServicePhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Children Ministries</Form.Label>
                        <FormControl defaultValue={data.childrenMinistries} required id="childrenMinistries" size="lg" type="name" placeholder="Children Ministries" />
                        <FormControl defaultValue={data.childrenMinistriesPhone} required id="childrenMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Adventist Youth</Form.Label>
                        <FormControl defaultValue={data.adventistYouth} required id="adventistYouth" size="lg" type="name" placeholder="Adventist Youth" />
                        <FormControl defaultValue={data.adventistYouthPhone} required id="adventistYouthPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Pathfinder Director</Form.Label>
                        <FormControl defaultValue={data.pathfinderDirector} required id="pathfinderDirector" size="lg" type="name" placeholder="Pathfinder Director" />
                        <FormControl defaultValue={data.pathfinderDirectorPhone} required id="pathfinderDirectorPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Ambassador</Form.Label>
                        <FormControl defaultValue={data.ambassador} required id="ambassador" size="lg" type="name" placeholder="Ambassador" />
                        <FormControl defaultValue={data.ambassadorPhone} required id="ambassadorPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Youth Adults</Form.Label>
                        <FormControl defaultValue={data.youthAdults} required id="youthAdults" size="lg" type="name" placeholder="Youth Adults" />
                        <FormControl defaultValue={data.youthAdultsPhone} required id="youthAdultsPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Master Guide</Form.Label>
                        <FormControl defaultValue={data.masterGuide} required id="masterGuide" size="lg" type="name" placeholder="Master Guide" />
                        <FormControl defaultValue={data.masterGuidePhone} required id="masterGuidePhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        <Form.Label as="h6">Women Ministry</Form.Label>
                        <FormControl defaultValue={data.womenMinistry} required id="womenMinistry" size="lg" type="name" placeholder="Women Ministry" />
                        <FormControl defaultValue={data.womenMinistryPhone} required id="womenMinistryPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Adventist Men</Form.Label>
                        <FormControl defaultValue={data.adventistMen} required id="adventistMen" size="lg" type="name" placeholder="Adventist Men" />
                        <FormControl defaultValue={data.adventistMenPhone} required id="adventistMenPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Health Ministries</Form.Label>
                        <FormControl defaultValue={data.healthMinistries} required id="healthMinistries" size="lg" type="name" placeholder="Health Ministries" />
                        <FormControl defaultValue={data.healthMinistriesPhone} required id="healthMinistriesPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">PARL</Form.Label>
                        <FormControl defaultValue={data.parl} required id="parl" size="lg" type="name" placeholder="PARL" />
                        <FormControl defaultValue={data.parlPhone} required id="parlPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Music</Form.Label>
                        <FormControl defaultValue={data.music} required id="music" size="lg" type="name" placeholder="Music" />
                        <FormControl defaultValue={data.musicPhone} required id="musicPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Education</Form.Label>
                        <FormControl defaultValue={data.education} required id="education" size="lg" type="name" placeholder="Education" />
                        <FormControl defaultValue={data.educationPhone} required id="educationPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Verspers</Form.Label>
                        <FormControl defaultValue={data.verspers} required id="verspers" size="lg" type="name" placeholder="Verspers" />
                        <FormControl defaultValue={data.verspersPhone} required id="verspersPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>
                        <Button variant="dark" size="lg" type="submit">Update Departmental Heads</Button>
                    </Form>
                </Card.Body>
                
            </Card>
        </>
    );
}