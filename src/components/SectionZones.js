import { Button, Card, Form, FormControl } from "react-bootstrap";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import alertify from "alertifyjs";

export default function SectionZones(props){

    const onUpdate = () => {
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

    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Church Zones Elders</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onUpdate}>
                        <Form.Label as="h6">Chileka, Chatha, Ngumbe</Form.Label>
                        <FormControl required id="chileka" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Lunzu, Ngumbe GDC</Form.Label>
                        <FormControl required id="lunzu" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Ndirande, Nyambadwe, Kameza</Form.Label>
                        <FormControl required id="ndirande" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Chitawira, Naperi, Tikumbe, Manja, Soche Hill, Njamba</Form.Label>
                        <FormControl required id="chitawira" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Kabula, Mt Pleasant, Mandala,College of Medicine</Form.Label>
                        <FormControl required id="kabula" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Limbe, Bangwe, BCA, Chigumula</Form.Label>
                        <FormControl required id="limbe" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Chilobew, Mpemba, Green Corner</Form.Label>
                        <FormControl required id="chilobew" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Masalema, Angelo, Chinyonga, Kanjedza, Chirichi</Form.Label>
                        <FormControl required id="masalema" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Nkolokosa, Soche E, Chimwankhunda, Zingwangwa</Form.Label>
                        <FormControl required id="nkolokosa" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Mbayani, Chemusa, Chirimba, Chapima</Form.Label>
                        <FormControl required id="mbayani" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        
                        <Form.Label as="h6">Namiwawa, Chilomoni/Fargo, Sigerege, Michiru</Form.Label>
                        <FormControl required id="namiwawa" size="lg" type="name" placeholder="Elder Name" />
                        <br/>

                        <Form.Label as="h6">Sunnyside, Manase, Nacholi, CI</Form.Label>
                        <FormControl required id="sunnyside" size="lg" type="name" placeholder="Elder Name" />
                        <br/>
                        <Button variant="dark" size="lg" type="submit">Update Zone Details</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}