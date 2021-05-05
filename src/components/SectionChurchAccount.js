import { Button, Card, Form, FormControl } from "react-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import alertify from "alertifyjs";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "./Lottie";
export default function SectionChurchAccount(props){

    const [data, setData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request = await firebase.firestore().collection("khc").doc("accounts").get();
            //set in use effect variable
            setData(request.data());
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once

    const onUpdate = (e) => {
        e.preventDefault();
        const accounts = {
            bankName: document.getElementById('bankName').value,
            accountName: document.getElementById('accountName').value,
            titleAndOffering: document.getElementById('titleAndOffering').value,
            churchBuilding: document.getElementById('churchBuilding').value,
            tnmTitleAndOffering: document.getElementById('tnmTitleAndOffering').value,
            tnmChurchBuilding: document.getElementById('tnmChurchBuilding').value,
            airtelTitleAndOffering: document.getElementById('airtelTitleAndOffering').value,
            airtelChurchBuilding: document.getElementById('airtelChurchBuilding').value
        };

        if(isNaN(accounts.titleAndOffering)){
            alertify.warning("Please Enter Introit");
        }else if(isNaN(accounts.churchBuilding)){
            alertify.warning("Please Enter Responsive Reading");
        }else{
            const msg = 'Updated Church Accounts';
            firebase.firestore()
                .collection("khc")
                .doc("accounts")
                .update(accounts)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
        }
    }


    if(data === null){
        return <LoadingAnimation width={200} title="Loading Church Accounts..."/>
    }

    return (
        <Card>
                <Card.Header>
                    <Card.Title>Church Accounts</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onUpdate}>
                        <Form.Label as="h6">Bank Name</Form.Label>
                        <FormControl defaultValue={data.bankName} required id="bankName" size="lg" type="name" placeholder="Bank Name" />
                        <br/>
                        <Form.Label as="h6">Account Name</Form.Label>
                        <FormControl defaultValue={data.accountName}  required id="accountName" size="lg" type="name" placeholder="Account Name" />
                        <br/>
                        <Form.Label as="h6">Tithe and Offering Account No.</Form.Label>
                        <FormControl defaultValue={data.titleAndOffering}  required id="titleAndOffering" size="lg" type="number" min={0} placeholder="Tithe and Offering Account No." />
                        <br/>
                        <Form.Label as="h6">Church Building Account No.</Form.Label>
                        <FormControl defaultValue={data.churchBuilding}  required id="churchBuilding" size="lg" type="number" min={0} placeholder="Church Building Account No." />
                        <br/>
                        <Form.Label as="h5">Mobile Money Accounts</Form.Label>
                        <hr/>
                        <Form.Label as="h6"><i>TNM Mpamba:</i> Tithe and Offering Merchant Code</Form.Label>
                        <FormControl defaultValue={data.tnmTitleAndOffering}  id="tnmTitleAndOffering" size="lg" type="number" min={0} placeholder="TNM Mpamba: Tithe and Offering Merchant Code." />
                        <br/>
                        <Form.Label as="h6"><i>TNM Mpamba:</i> Church Building Merchant Code</Form.Label>
                        <FormControl defaultValue={data.tnmChurchBuilding}  id="tnmChurchBuilding" size="lg" type="number" min={0} placeholder="TNM Mpamba: Church Building Merchant Code." />
                        <br/>
                        <Form.Label as="h6"><i>Airtel Money:</i> Tithe and Offering Merchant Code</Form.Label>
                        <FormControl defaultValue={data.airtelTitleAndOffering}  id="airtelTitleAndOffering" size="lg" type="number" min={0} placeholder="Airtel Money: Tithe and Offering Merchant Code." />
                        <br/>
                        <Form.Label as="h6"><i>Airtel Money:</i> Church Building Merchant Code</Form.Label>
                        <FormControl defaultValue={data.airtelChurchBuilding}  id="airtelChurchBuilding" size="lg" type="number" min={0} placeholder="Airtel Money: Church Building Merchant Code." />
                        <br/>
                        <Button variant="dark" size="lg" type="submit">Update Church Accounts</Button>
                    </Form>
                </Card.Body>
            </Card>
    );
}