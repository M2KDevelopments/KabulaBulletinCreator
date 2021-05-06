import { Button, Card, Form, FormControl, OverlayTrigger, Popover, Table } from "react-bootstrap";

// Firebase App (the core Firebase SDK) is always  and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import alertify from "alertifyjs";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./Lottie";


export default function SectionAnnouncements(props){

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request  = await firebase.firestore().collection("khc").doc("announcements").get();
            //set in use effect variable
            setData(request.data());
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once

    const onUpdate = (e) => {
        e.preventDefault();
        const announcements = {
            welcomeRemarks: document.getElementById('welcomeRemarks').value,
            covidPrevention: document.getElementById('covidPrevention').value,
            churchGatherings: document.getElementById('churchGatherings').value,
            achievementClasses: document.getElementById('achievementClasses').value,
            counsellingAndPrayers: document.getElementById('counsellingAndPrayers').value,
            wedding: document.getElementById('wedding').value,
            holyCommunion: document.getElementById('holyCommunion').value,
            churchBoard: document.getElementById('churchBoard').value,
            pastorsEngagements: document.getElementById('pastorsEngagements').value,
            bereavementsAndSicknesses: document.getElementById('bereavementsAndSicknesses').value,
            titheAndOfferings: document.getElementById('titheAndOfferings').value,
            nextSabbathOnDuty: document.getElementById('nextSabbathOnDuty').value,
            elderOfTheMonth: document.getElementById('elderOfTheMonth').value,
            elderOfTheMonthPhone: document.getElementById('elderOfTheMonthPhone').value
        };
        
        const msg = 'Updated Annoucements Details';
            firebase.firestore()
                .collection("khc")
                .doc("announcements")
                .update(announcements)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
    }

    if(data === null){
        return <LoadingAnimation width={200} title="Loading Announcements..."/>
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
                        <FormControl defaultValue={data.welcomeRemarks} id="welcomeRemarks" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Welcome Remarks" />
                        <br/>

                        <Form.Label as="h6">Covid Prevention</Form.Label>
                        <FormControl defaultValue={data.covidPrevention} id="covidPrevention" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Covid Prevention" />
                        <br/>
                        
                        <Form.Label as="h6">Church Gatherings</Form.Label>
                        <FormControl defaultValue={data.churchGatherings} id="churchGatherings" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Church Gatherings" />
                        <br/>
                        
                        <Form.Label as="h6">Achievement Classes</Form.Label>
                        <FormControl defaultValue={data.achievementClasses} id="achievementClasses" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Achievement Classes" />
                        <br/>

                        <Form.Label as="h6">Counselling and Prayers</Form.Label>
                        <FormControl defaultValue={data.counsellingAndPrayers} id="counsellingAndPrayers" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Counselling and Prayers" />
                        <br/>

                        <Form.Label as="h6">Holy Communion</Form.Label>
                        <FormControl defaultValue={data.holyCommunion} id="holyCommunion" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Holy Communion" />
                        <br/>

                        <Form.Label as="h6">Pastor's Engagements</Form.Label>
                        <FormControl defaultValue={data.pastorsEngagements} id="pastorsEngagements" size="lg" type="text"  as="textarea" style={{height:250}} placeholder="Pastor's Engagements" />
                        <br/>

                        <Form.Label as="h6">Wedding Announcements</Form.Label>
                        <FormControl defaultValue={data.wedding} id="wedding" size="lg" type="text" as="textarea" style={{height:250}} placeholder="Wedding Announcements" />
                        <br/>

                        <Form.Label as="h6">Bereavements and Sicknesses</Form.Label>
                        <FormControl defaultValue={data.bereavementsAndSicknesses} id="bereavementsAndSicknesses" size="lg" type="text" as="textarea" style={{height:250}} placeholder="Bereavements and Sicknesses" />
                        <br/>

                        <Form.Label as="h6">Church Board</Form.Label>
                        <FormControl defaultValue={data.churchBoard} id="churchBoard" size="lg" type="text" as="textarea" style={{height:250}} placeholder="Church Board" />
                        <br/>

                        <Form.Label as="h6">Tithes and Offerings</Form.Label>
                        <FormControl defaultValue={data.titheAndOfferings} id="titheAndOfferings" size="lg" type="text" as="textarea" style={{height:250}} placeholder="Tithes and Offerings" />
                        <br/>

                        <Form.Label as="h5"><strong>Next Sabbath</strong></Form.Label>
                        <hr/>
                        <Form.Label as="h6">Elders on Duty</Form.Label>
                        <FormControl defaultValue={data.nextSabbathOnDuty} id="nextSabbathOnDuty" size="lg" type="text" placeholder="Elders on duty next Sabbath" />
                        <br/>

                        <Form.Label as="h6">Elder of the Month</Form.Label>
                        <FormControl defaultValue={data.elderOfTheMonth} id="elderOfTheMonth" size="lg" type="text" placeholder="Elder of the month" />
                        <br/>

                        <Form.Label as="h6">Elder of the Month Phone</Form.Label>
                        <FormControl defaultValue={data.elderOfTheMonthPhone} id="elderOfTheMonthPhone" size="lg" type="phone" placeholder="Phone Number" />
                        <br/>


                        <Button variant="dark" size="lg" type="submit">Update Announcements</Button> 
                    </Form>
                </Card.Body>
            </Card>
            <br/>
            <SectionExtraAnnouncements />
        </>
    );
}

function SectionExtraAnnouncements(props){
    
    const [announcements, setAnnouncements] = useState([]);
     
    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request  = await firebase.firestore().collection("announcements").get();
            //set in use effect variable

            const list = [];
            request.forEach(snap =>{
                const an = snap.data();
                an.id = snap.id;
                list.push(an);
            });

            setAnnouncements(list);
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once

    const onAddAnnouncement = (e) => {
        e.preventDefault();
        const an = {
            title: document.getElementById('title').value,
            text: document.getElementById('text').value
        };
        
        //add to firebase
        firebase.firestore().collection("announcements")
            .add(an).then((ref) => {
                alertify.success(an.title + " was added successfully");
                an.id = ref.id;
                const list = [];
                announcements.forEach(old => list.push(old));
                list.push(an)
                setAnnouncements(list);
            }).catch(error=>alertify.error(error.message));

        document.getElementById('title').value = "";
        document.getElementById('text').value = "";
    }

    const onDelete = (deleteAnnouncement) => {
        if(deleteAnnouncement === null){
            alertify.warning("Please select announcement to delete");
        }else{

            //delete from firebase
            firebase.firestore().collection("announcements")
                .doc(deleteAnnouncement.id)
                .delete()
                .then((ref) => {
                    alertify.success(deleteAnnouncement.title + " was deleted successfully");
                     
                    //remove deleted announcements
                    const list = [];
                    for(const an of announcements){
                        if(an.id === deleteAnnouncement.id){
                            continue;
                        }else{
                            list.push(an);
                        }
                    }
                    setAnnouncements(list);
                }).catch(error=>alertify.error(error.message));
        }
    };
    

    return(
        <>
        <Card>
            <Card.Header><Card.Title><strong>Extra Announcements</strong></Card.Title></Card.Header>
            <Card.Body>
                <Form onSubmit={onAddAnnouncement}>
                <Form.Label as="h6">Title</Form.Label>
                    <FormControl required id="title" size="lg" type="text" placeholder="Title" />
                    <br/>

                    <Form.Label as="h6">Announcement Message</Form.Label>
                    <FormControl required id="text" as="textarea" style={{height:250}} size="lg" type="text" placeholder="Announcement..." />
                    <br/>

                    <Button variant="dark" size="lg" type="submit">Add Extra Announcements</Button> 
                </Form>

                <br/>

                <Table variant="light">
                    <thead>
                        <tr>
                            <th><strong>TITLE</strong></th>
                            <th><strong>ANNOUNCEMENT(S)</strong></th>
                            <th><strong>ACTION</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((an) => (
                            <tr key={an.id}>
                                <td>{an.title}</td>
                                <td>{an.text}</td>
                                <td>
                                <OverlayTrigger trigger="click" key="bottom" placement="bottom"
                                    overlay={
                                        <Popover>
                                            <Popover.Title><h4>Delete {an.title}</h4></Popover.Title>
                                            <Popover.Content>
                                                <h5>Are you sure you want to <strong>delete {an.title}?</strong></h5>
                                                <hr/>
                                                <Button variant="danger" onClick={() => onDelete(an)}>DELETE {an.title.toUpperCase()}</Button>
                                            </Popover.Content>
                                        </Popover>
                                    }>
                                    <Button variant="light">DELETE</Button>
                                </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
        </>
    );
}
