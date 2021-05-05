import { Button, Card, Form, FormControl } from "react-bootstrap";
import alertify from "alertifyjs";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { useState } from "react";
import { LoadingAnimation } from "./Lottie";

export default function SectionHome(props){

    const [loading, setLoading] = useState(false);

    const onUpdate = () => {
        const front = {
            date: document.getElementById('date').value,
            facebook: document.getElementById('facebook').value,
            website: document.getElementById('website').value,
            zoomLinkId: document.getElementById('zoomLinkId').value,
            zoomPasscode: document.getElementById('zoomPasscode').value,
            welcomeMessage: document.getElementById('welcomeMessage').value,
        };

        if(isNaN(front.zoomLinkId)){
            alertify.warning("Please Enter A Number for Zoom Link Id");
        }else if(isNaN(front.zoomPasscode)){
            alertify.warning("Please Enter A Number for Zoom Passcode");
        }else{
            const msg = 'Updated Front Page';
            firebase.firestore()
                .collection("khc")
                .doc("front")
                .update(front)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
        }
    }

    const onUploadImage = (e) => {
        const file = e.targer.files[0];
        //validate file input
        if(file === null){
            alertify.warning(`File was not uploaded properly`);
        }else if(file.type.indexOf("image") === -1){
            alertify.warning(`File should be images` );
            e.target.value = null;
        }else if(loading  === true){
            alertify.warning(`Image is uploading please wait...` );
        }else {
            setLoading(true);

            //'image/jpeg'
            const metadata = {contentType: file.type};
          
            firebase.storage().ref().child('image.png').put(file, metadata).then((onTaskSnap)=>{
                onTaskSnap.ref.getDownloadURL().then((downloadUrl) => { 
                    const data = {
                        image : downloadUrl, 
                        updated : firebase.firestore.Timestamp.now()
                    };
                    
                    firebase.firestore().collection("khc").doc("front")
                        .update(data)
                        .then((ref)=>{
                            alertify.success("Front Page Details Updated");
                            setLoading(false);
                            const url = URL.createObjectURL(file);
                            document.getElementById('image').src = url;
                        }).catch((error) => alertify.error(error.message));

                });
            }).catch((error) => {
                alertify.warning("Unable to upload file. "+ error.message);
                setLoading(false);
            });
        }
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>Bulletin Front Page</Card.Title>
                <Card.Subtitle><i>Separate each <strong>welcome message</strong> with a new line</i></Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={onUpdate}>

                    <div className="centralise">
                        {loading ? <LoadingAnimation width={300} title="Uploading Image..." /> :
                        <>
                            <img id="image" src="" alt="Kabula Hill SDA Church" width={400} />
                            <input id="file" type="file" filter="image/*" size={1} onChange={onUploadImage} style={{visibility:"hidden", position:"absolute"}} />
                        </>
                        }
                        <br/>
                        <label htmlFor="file" as={Button} size="lg" disabled={loading} className="btn btn-info">Upload Image</label>
                    </div>

                    <Form.Label as="h6">Date</Form.Label>
                    <FormControl required id="date" size="lg" type="date" placeholder="Date" />
                    <br/>

                    <Form.Label as="h6">Facebook Page Link</Form.Label>
                    <FormControl required id="facebook" size="lg" type="url" placeholder="Facebook Page Link" />
                    <br/>

                    <Form.Label as="h6">Website</Form.Label>
                    <FormControl required id="website" size="lg" type="url" placeholder="Website" />
                    <br/>

                    <Form.Label as="h6">Zoom Link ID</Form.Label>
                    <FormControl required id="zoomLinkId" size="lg" type="number" placeholder="Zoom Link ID" />
                    <br/>

                    <Form.Label as="h6">Zoom Passcode</Form.Label>
                    <FormControl required id="zoomPasscode" size="lg" type="number" placeholder="Zoom Passcode" />
                    <br/>

                    <Form.Label as="h6">Welcome Message</Form.Label>
                    <FormControl required id="welcomeMessage" as="textarea" style={{height:250}} size="lg" type="text" placeholder="Welcome Message" />
                    <br/>

                    <Button variant="dark" size="lg" type="submit">Update Front Page Details</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}