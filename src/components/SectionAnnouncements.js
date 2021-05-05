import { Button, Card, Form, FormControl } from "react-bootstrap";


// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import alertify from "alertifyjs";


export default function SectionAnnouncements(props){

    const onUpdate = () => {
        const announcements = {
            welcomeRemarks: document.getElementById('welcomeRemarks').value,
            covidPrevention: document.getElementById('covidPrevention').value,
            churchGatherings: document.getElementById('churchGatherings').value,
            achievementClasses: document.getElementById('achievementClasses').value,
            counsellingAndPrayers: document.getElementById('counsellingAndPrayers').value,
            wedding: document.getElementById('wedding').value,
            bereavementsAndSicknesses: document.getElementById('bereavementsAndSicknesses').value,
            titheAndOfferings: document.getElementById('titheAndOfferings').value,
            nextSabbathOnDuty: document.getElementById('nextSabbathOnDuty').value,
            elderOfTheMonth: document.getElementById('elderOfTheMonth').value
        };
        
        const msg = 'Updated Annoucements Details';
            firebase.firestore()
                .collection("khc")
                .doc("announcements")
                .update(announcements)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
    }

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Announcements</Card.Title>
                    <Card.Subtitle><i>Separate each announcement with a new line</i></Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onUpdate}> 
                        <Form.Label as="h6">Welcome Remarks</Form.Label>
                        <FormControl required id="welcomeRemarks" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Welcome Remarks" />
                        <br/>

                        <Form.Label as="h6">Covid Prevention</Form.Label>
                        <FormControl required id="covidPrevention" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Covid Prevention" />
                        <br/>
                        
                        <Form.Label as="h6">Church Gatherings</Form.Label>
                        <FormControl required id="churchGatherings" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Church Gatherings" />
                        <br/>
                        
                        <Form.Label as="h6">Achievement Classes</Form.Label>
                        <FormControl required id="achievementClasses" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Achievement Classes" />
                        <br/>

                        <Form.Label as="h6">Counselling and Prayers</Form.Label>
                        <FormControl required id="counsellingAndPrayers" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Counselling and Prayers" />
                        <br/>

                        <Form.Label as="h6">Wedding Announcements</Form.Label>
                        <FormControl required id="wedding" size="lg" type="text" as="textarea" style={{height:250}} placeholder="Wedding Announcements" />
                        <br/>

                        <Form.Label as="h6">Bereavements and Sicknesses</Form.Label>
                        <FormControl required id="bereavementsAndSicknesses" size="lg" type="text" as="textarea" style={{height:250}} placeholder="Bereavements and Sicknesses" />
                        <br/>

                        <Form.Label as="h6">Tithes and Offerings</Form.Label>
                        <FormControl required id="titheAndOfferings" size="lg" type="text" as="textarea" style={{height:250}} placeholder="Tithes and Offerings" />
                        <br/>

                        <Form.Label as="h5"><strong>Next Sabbath</strong></Form.Label>
                        <hr/>
                        <Form.Label as="h6">Elders on Duty</Form.Label>
                        <FormControl required id="nextSabbathOnDuty" size="lg" type="text" placeholder="Elders on duty next Sabbath" />
                        <br/>

                        <Form.Label as="h6">Elder of the Month</Form.Label>
                        <FormControl required id="elderOfTheMonth" size="lg" type="text" placeholder="Elder of the month" />
                        <br/>
                        <Button variant="dark" size="lg" type="submit">Update Announcements</Button> 
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
