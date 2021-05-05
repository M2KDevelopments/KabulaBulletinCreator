import { Button, Card, Form, FormControl } from "react-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import alertify from "alertifyjs";

export default function SectionDepartmentalHeads(props){
    const onUpdate = () => {
        const departmentalHeads = {
            churchPastor: document.getElementById('churchPastor').value,
            firstElder: document.getElementById('firstElder').value,
            secondElder: document.getElementById('secondElder').value,
            headDeacon: document.getElementById('headDeacon').value,
            headDeaconess: document.getElementById('headDeaconess').value,
            treasurer: document.getElementById('treasurer').value,
            chruchClerk: document.getElementById('chruchClerk').value,
            stewardship: document.getElementById('stewardship').value,
            communications: document.getElementById('communications').value,
            sabbathSchool: document.getElementById('sabbathSchool').value,
            familyMinistries1: document.getElementById('familyMinistries1').value,
            familyMinistries2: document.getElementById('familyMinistries2').value,
            projects: document.getElementById('projects').value,
            communityService: document.getElementById('communityService').value,
            adventistYouth: document.getElementById('adventistYouth').value,
            ambassador: document.getElementById('ambassador').value,
            youthAdults: document.getElementById('youthAdults').value,
            masterGuide: document.getElementById('masterGuide').value,
            womenMinistry: document.getElementById('womenMinistry').value,
            adventistMen: document.getElementById('adventistMen').value,
            healthMinistries: document.getElementById('healthMinistries').value,
            parl: document.getElementById('parl').value,
            music: document.getElementById('music').value,
            education: document.getElementById('education').value,
            verspers: document.getElementById('verspers').value,
        };

        const msg = 'Updated Departmental Heads';
            firebase.firestore()
                .collection("khc")
                .doc("departmentalHeads")
                .update(departmentalHeads)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
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
                        <FormControl required id="churchPastor" size="lg" type="name" placeholder="Church Pastor" />
                        <br/>

                        <Form.Label as="h6">First Elder</Form.Label>
                        <FormControl required id="firstElder" size="lg" type="name" placeholder="First Elder" />
                        <br/>
                        
                        <Form.Label as="h6">Second Elder</Form.Label>
                        <FormControl required id="secondElder" size="lg" type="name" placeholder="Second Elder" />
                        <br/>

                        <Form.Label as="h6">Head Deacon</Form.Label>
                        <FormControl required id="headDeacon" size="lg" type="name" placeholder="Head Deacon" />
                        <br/>

                        <Form.Label as="h6">Head Deaconess</Form.Label>
                        <FormControl required id="headDeaconess" size="lg" type="name" placeholder="Head Deaconess" />
                        <br/>
                        
                        <Form.Label as="h6">Treasurer</Form.Label>
                        <FormControl required id="treasurer" size="lg" type="name" placeholder="Treasurer" />
                        <br/>
                        
                        <Form.Label as="h6">Chruch Clerk</Form.Label>
                        <FormControl required id="chruchClerk" size="lg" type="name" placeholder="Chruch Clerk" />
                        <br/>
                        
                        <Form.Label as="h6">Stewardship</Form.Label>
                        <FormControl required id="stewardship" size="lg" type="name" placeholder="Stewardship" />
                        <br/>
                        
                        <Form.Label as="h6">Communications</Form.Label>
                        <FormControl required id="communications" size="lg" type="name" placeholder="Communications" />
                        <br/>
                        
                        <Form.Label as="h6">Personal Ministries</Form.Label>
                        <FormControl required id="personalMinistries" size="lg" type="name" placeholder="Personal Ministries" />
                        <br/>
                        
                        <Form.Label as="h6">Sabbath School</Form.Label>
                        <FormControl required id="sabbathSchool" size="lg" type="name" placeholder="Sabbath School" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Family Ministries 1</Form.Label>
                        <FormControl required id="familyMinistries1" size="lg" type="name" placeholder="Family Ministries 1" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Family Ministries 2</Form.Label>
                        <FormControl required id="familyMinistries2" size="lg" type="name" placeholder="Family Ministries 2" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Projects</Form.Label>
                        <FormControl required id="projects" size="lg" type="name" placeholder="Projects" />
                        <br/>
                        
                        <Form.Label as="h6">Interest Coordinator</Form.Label>
                        <FormControl required id="interestCoordinator" size="lg" type="name" placeholder="Interest Coordinator" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Community Service</Form.Label>
                        <FormControl required id="communityService" size="lg" type="name" placeholder="Community Service" />
                        <br/>
                        
                        <Form.Label as="h6">Children Ministries</Form.Label>
                        <FormControl required id="childrenMinistries" size="lg" type="name" placeholder="Children Ministries" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Adventist Youth</Form.Label>
                        <FormControl required id="adventistYouth" size="lg" type="name" placeholder="Adventist Youth" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Pathfinder Director</Form.Label>
                        <FormControl required id="pathfinderDirector" size="lg" type="name" placeholder="Pathfinder Director" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Ambassador</Form.Label>
                        <FormControl required id="ambassador" size="lg" type="name" placeholder="Ambassador" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Youth Adults</Form.Label>
                        <FormControl required id="youthAdults" size="lg" type="name" placeholder="Youth Adults" />
                        <br/>
                        
                        <Form.Label as="h6">Master Guide</Form.Label>
                        <FormControl required id="masterGuide" size="lg" type="name" placeholder="Master Guide" />
                        <br/>
                        
                        <Form.Label as="h6">Women Ministry</Form.Label>
                        <FormControl required id="womenMinistry" size="lg" type="name" placeholder="Women Ministry" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Adventist Men</Form.Label>
                        <FormControl required id="adventistMen" size="lg" type="name" placeholder="Adventist Men" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Health Ministries</Form.Label>
                        <FormControl required id="healthMinistries" size="lg" type="name" placeholder="Health Ministries" />
                        <br/>
                        
                        
                        <Form.Label as="h6">PARL</Form.Label>
                        <FormControl required id="parl" size="lg" type="name" placeholder="PARL" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Music</Form.Label>
                        <FormControl required id="music" size="lg" type="name" placeholder="Music" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Education</Form.Label>
                        <FormControl required id="education" size="lg" type="name" placeholder="Education" />
                        <br/>
                        
                        
                        <Form.Label as="h6">Verspers</Form.Label>
                        <FormControl required id="verspers" size="lg" type="name" placeholder="Verspers" />
                        <br/>
                        <Button variant="dark" size="lg" type="submit">Update Announcements</Button>
                    </Form>
                </Card.Body>
                
            </Card>
        </>
    );
}