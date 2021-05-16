import alertify from "alertifyjs";
import axios from "axios";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { LoadingAnimation } from "./Lottie";


export default function SectionSabbathSchool(props){

    const [data, setData] = useState(null);
    const [sabbathSchoolLesson, setSabbathSchoolLesson] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            //get the promise from firebase
            const request = await firebase.firestore().collection("khc").doc("sabbathSchool").get();
            //set in use effect variable
            setData(request.data());

            const {lessonYear, lessonQuarter, lessonNumber} = request.data();

            const instance = axios.create();
            const requestLesson = await instance.get(`https://sabbathschoollesson.herokuapp.com?year=${lessonYear}&quarter=${lessonQuarter}&lesson=${lessonNumber}`).catch((error)=>console.log(error));
    
            //set data from api
            setSabbathSchoolLesson(requestLesson.data);

            return request;
        }
        fetchData();
    },[reload]); //if [] run the async work once

    const onSabbathSchoolTime = (e) =>{
        e.preventDefault();
        
        const sabbathSchool = {
           startTime: document.getElementById('sabbathSchoolStartTime').value,
           endTime: document.getElementById('sabbathSchoolEndTime').value
        };

        if(sabbathSchool.startTime.trim() === ""){
            alertify.warning("Please Enter Start Time for Sabbath School")
        }else if(sabbathSchool.endTime.trim() === ""){
            alertify.warning("Please Enter End Time for Sabbath School");
        }else{
            const msg = 'Updated Sabbath School Program Details';
            firebase.firestore()
                .collection("khc")
                .doc("sabbathSchool")
                .update(sabbathSchool)
                .then((ref) => alertify.success(msg))
                .catch((error)=> alertify.error(error.message));
        }
    };

    const onSabbathSchoolLesson = (e) => {
        e.preventDefault();

        try{
            const sabbathSchoolGuide = {
                lessonYear: parseInt(document.getElementById('lessonYear').value),
                lessonQuarter:parseInt(document.getElementById('lessonQuarter').value),
                lessonNumber:document.getElementById('lessonNumber').value,
            };

            if(isNaN(sabbathSchoolGuide.lessonYear)||isNaN(sabbathSchoolGuide.lessonQuarter)){
                alertify.warning('Please select a year and quarter');
            }else{
                
                const msg = "Update Sabbath School Lesson Guide for the week";
                firebase.firestore()
                    .collection("khc")
                    .doc("sabbathSchool")
                    .update(sabbathSchoolGuide)
                    .then((ref) => {alertify.success(msg);setReload(!reload)})
                    .catch((error)=> alertify.error(error.message));
            }
        }catch(e){
            alertify.warning('Please select a year and quarter');
        }
        
    };

    if(data === null){
        return <LoadingAnimation width={200} title="Loading Sabbath School..."/>
    }

    return (
        <>
        <Card>
            <Card.Header>
                <Card.Title>Sabbath School</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={onSabbathSchoolTime}>
                    <Form.Label as="h6">Start Time</Form.Label>
                    <FormControl defaultValue={data.startTime} required id="sabbathSchoolStartTime" size="lg" type="time"placeholder="Start Time" />
                    <br/>
                    <Form.Label as="h6">End Time</Form.Label>
                    <FormControl defaultValue={data.endTime} required id="sabbathSchoolEndTime" size="lg" type="time" placeholder="End Time" />
                    <br/>
                    <Button variant="dark" size="lg" type="submit">Update Sabbath School Program</Button> 
                </Form>
            </Card.Body>
        </Card> 
        <br/>
        <Card>
            <Card.Header>
                <Card.Title>Sabbath School Lesson</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={onSabbathSchoolLesson}>
                    <Form.Label as="h4">Lesson Number</Form.Label>
                    <select defaultValue={data.lessonNumber} id="lessonNumber">
                        <option value="01">Lesson 1</option>
                        <option value="02">Lesson 2</option>
                        <option value="03">Lesson 3</option>
                        <option value="04">Lesson 4</option>
                        <option value="05">Lesson 5</option>
                        <option value="06">Lesson 6</option>
                        <option value="07">Lesson 7</option>
                        <option value="08">Lesson 8</option>
                        <option value="09">Lesson 9</option>
                        <option value="10">Lesson 10</option>
                        <option value="11">Lesson 11</option>
                        <option value="12">Lesson 12</option>
                        <option value="13">Lesson 13</option>
                    </select>
                    <br/><br/>
                    <Form.Label as="h4">Quarter</Form.Label>
                    <select defaultValue={data.lessonQuarter} id="lessonQuarter">
                        <option value={1}>Quarter 1 - Jan, Feb, Mar</option>
                        <option value={2}>Quarter 2 - Apr, May, Jun</option>
                        <option value={3}>Quarter 3 - Jul, Aug, Sep</option>
                        <option value={4}>Quarter 4 - Oct, Nov, Dec</option>
                    </select>
                    <br/><br/>
                    <Form.Label as="h4">Lesson Number</Form.Label>
                    <FormControl
                        min={2000} max={2100} 
                        defaultValue={data.lessonYear} required 
                        id="lessonYear" size="lg" 
                        type="number" placeholder="Start Time" />
                    <br/>
                    <Button variant="dark" size="lg" type="submit">Update Sabbath School Lesson</Button> 
                </Form>
            </Card.Body>
        </Card> 

        <br/><br/>

        {
            sabbathSchoolLesson === null ? <LoadingAnimation title="Loading Sabbath School" />: 
            <div className="centralise">
                <h2>Preview</h2>
                <hr/>
                <br/>
                <h4><strong>Lesson {data.lessonNumber}: {sabbathSchoolLesson.title}</strong></h4>
                <h5><strong>Read for this Week's Study: </strong>{sabbathSchoolLesson.verses}</h5>
                <br/>
                <h5><strong>Memory Text: </strong>{sabbathSchoolLesson.memoryVerse}</h5>
                <hr/>
                {
                    sabbathSchoolLesson.description.map((text, index)=><h6 key={"ssd"+index}>{text}<br/></h6>)
                }
            </div>
        }
        
        </>           
    );
}