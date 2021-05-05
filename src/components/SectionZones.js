import { Button, Card, Form, FormControl } from "react-bootstrap";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import alertify from "alertifyjs";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./Lottie";

export default function SectionZones(props){

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request = await firebase.firestore().collection("khc").doc("zones").get();
            //set in use effect variable
            setData(request.data());
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once

    const onUpdate = (e) => {
        e.preventDefault();
        const zones = {
            chileka: document.getElementById('chileka').value,
            lunzu: document.getElementById('lunzu').value,
            ndirande: document.getElementById('ndirande').value,
            chitawira: document.getElementById('chitawira').value,
            kabula: document.getElementById('kabula').value,
            limbe: document.getElementById('limbe').value,
            chilobew: document.getElementById('chilobew').value,
            masalema: document.getElementById('masalema').value,
            nkolokosa: document.getElementById('nkolokosa').value,
            mbayani: document.getElementById('mbayani').value,
            namiwawa: document.getElementById('namiwawa').value,
            sunnyside: document.getElementById('sunnyside').value
        };

        const msg = 'Updated Church Zones Elders';
            firebase.firestore()
                .collection("khc")
                .doc("zones")
                .update(zones)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
    }

    if(data === null){
        return <LoadingAnimation width={200} title="Loading Church Elders for Zones..."/>
    }

    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Church Zones Elders</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onUpdate}>
                        <Form.Label as="h6">Chileka, Chatha, Ngumbe</Form.Label>
                        <FormControl defaultValue={data.chileka} required id="chileka" size="lg" type="name" placeholder="Chileka, Chatha, Ngumbe" />
                        <br/>
                        
                        <Form.Label as="h6">Lunzu, Ngumbe GDC</Form.Label>
                        <FormControl defaultValue={data.lunzu} required id="lunzu" size="lg" type="name" placeholder="Lunzu, Ngumbe GDC" />
                        <br/>
                        
                        <Form.Label as="h6">Ndirande, Nyambadwe, Kameza</Form.Label>
                        <FormControl defaultValue={data.ndirande} required id="ndirande" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Chitawira, Naperi, Tikumbe, Manja, Soche Hill, Njamba</Form.Label>
                        <FormControl defaultValue={data.chitawira} required id="chitawira" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Kabula, Mt Pleasant, Mandala,College of Medicine</Form.Label>
                        <FormControl defaultValue={data.kabula} required id="kabula" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Limbe, Bangwe, BCA, Chigumula</Form.Label>
                        <FormControl defaultValue={data.limbe} required id="limbe" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Chilobew, Mpemba, Green Corner</Form.Label>
                        <FormControl defaultValue={data.chilobew} required id="chilobew" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Masalema, Angelo, Chinyonga, Kanjedza, Chirichi</Form.Label>
                        <FormControl defaultValue={data.masalema} required id="masalema" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Nkolokosa, Soche E, Chimwankhunda, Zingwangwa</Form.Label>
                        <FormControl defaultValue={data.nkolokosa} required id="nkolokosa" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Mbayani, Chemusa, Chirimba, Chapima</Form.Label>
                        <FormControl defaultValue={data.mbayani} required id="mbayani" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Namiwawa, Chilomoni/Fargo, Sigerege, Michiru</Form.Label>
                        <FormControl defaultValue={data.namiwawa} required id="namiwawa" size="lg" type="name" placeholder="Elder Name" />
                        <br/>

                        <Form.Label as="h6">Sunnyside, Manase, Nacholi, CI</Form.Label>
                        <FormControl defaultValue={data.sunnyside} required id="sunnyside" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        <Button variant="dark" size="lg" type="submit">Update Zone Details</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}