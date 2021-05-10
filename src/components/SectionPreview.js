import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { LoadingAnimation } from "./Lottie";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import sdaLogo from "../res/adventist-symbol--campfire.svg";

export default function SectionPreview(props){

    const [khc, setKHC] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const FRIDAY = 5, SABBATH = 6;
   
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

    useEffect(()=>{
        async function fetchData(){

            const khc = {};

            //get the promise from firebase
            let request = await firebase.firestore().collection("khc").doc("accounts").get();
            khc.accounts = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("announcements").get();
            khc.announcements = request.data();


            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("departmentalHeads").get();
            khc.departmentalHeads = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("departments").get();
            khc.departments = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("front").get();
            khc.front = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("firstService").get();
            khc.firstService = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("secondService").get();
            khc.secondService = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("sabbathSchool").get();
            khc.sabbathSchool = request.data();

            //get the promise from firebase
            request = await firebase.firestore().collection("khc").doc("zones").get();
            khc.zones = request.data();

             
            //set in use effect variable
            setKHC(khc);
            return request;
        }
        fetchData();
    },[]); //if [] run the async work once
    

    const Title = () => {
        return  <Container style={{marginTop:50, marginBottom:50}}>
                    <div className="centralise">
                        <h1>Kabula Hill SDA <strong>Bulletin</strong></h1>
                        <hr/>
                    </div>
                </Container>
    }

    
    const onDownload  = () => {
        //parameters orientation - potrait, units - points, size A4
        const doc = new jsPDF("l", "pt", "a4");
        const bulletElement = document.getElementById('bulletin');
        doc.html(bulletElement, {callback: (pdf) => pdf.save("KHC Bulletin") });

        const element = document.getElementById('bulletin');
        const opt = {
            margin:       1,
            filename:     'KHC Bulletin 3.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            //jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        
        // New Promise-based usage:
        html2pdf().from(element).set(opt).save();
        
        // Old monolithic-style usage:
        //html2pdf(element, opt);
    }

    if(props.page){
        if((new Date().getDay() !==  FRIDAY || new Date().getDay() !== SABBATH)){
                return <Container style={{paddingTop:100, paddingBottom:40}}>
                            <LoadingAnimation width={200} title="Bulletin Is still in progress Friday or Saturday"/>
                            <br/>
                            <div className="centralise">
                                <Button variant="primary" size="lg" href="http://kabulahillsdachurch.com">
                                    <strong>VISIT OUR WEBSITE</strong>
                                </Button>
                            </div>
                        </Container>
            }
    }
    

    if(khc === null){
        return <Container style={{paddingTop:100, paddingBottom:40}}>
                <LoadingAnimation width={200} title="Loading Bulletin..."/>
            </Container>
    }


    // Calculating date for bulletin
    const months = ["January", "Febuary", "March", "April",
    "May", "June", "July", "August", "September", 
    "October", "Novemeber", "December"];

    const date = new Date(khc.front.date);
    let suffix = "th";
    if(date.getDate().toString()[date.getDate().toString().length - 1] === "1"){
        suffix = "st";
    }else if(date.getDate().toString()[date.getDate().toString().length - 1] === "1"){
        suffix = "nd";
    }else if(date.getDate().toString()[date.getDate().toString().length - 1] === "1"){
        suffix = "rd";
    }

    const day = date.getDate() + suffix;
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return (
        <>
            {
                props.page ? <Title/> : <></>
            }

            <Container fluid>
                
                <div className="centralise" style={{paddingTop:20, paddingBottom:20}}>
                    <Button size="lg" variant="warning" onClick={onDownload}>
                        <strong>Download Bulletin</strong>
                    </Button>
                </div>

                <Card>
                    <Card.Body>
                        <Row xs={1} sm={2} md={3}>
                            <Col>
                                <Card>
                                    <Card.Header style={{textAlign:"center"}}>
                                        <h4><strong>CHURCH ACCOUNTS</strong></h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <h6><strong>Bank details are as follows:</strong></h6>
                                        <ul>
                                            <li>Bank Name: {khc.accounts.bankName}</li>
                                            <li>Account Name: {khc.accounts.accountName}</li>
                                            <li>Tithe and Offering Account No : {khc.accounts.titleAndOffering}</li>
                                            <li>Church Building Account No : {khc.accounts.churchBuilding} </li>
                                        </ul>
                                        <hr/>
                                        {khc.accounts.tnmTitleAndOffering.trim() === "" && khc.accounts.tnmChurchBuilding.trim() === "" ? <></>:
                                        <>
                                            <h6><strong>TNM Mpamba Mobile Money Accounts:</strong></h6>
                                            <ul>
                                                <li>Church Building Account No : {khc.accounts.tnmTitleAndOffering} </li>
                                                <li>Church Building Merchant Code: {khc.accounts.tnmChurchBuilding} </li>
                                            </ul>
                                        </>
                                        }
                                        <br/>
                                        {khc.accounts.airtelTitleAndOffering.trim() === "" && khc.accounts.airtelTitleAndOffering.trim() === "" ? <></>:
                                        <>
                                            <h6><strong>Airtel Money Accounts:</strong></h6>
                                            <ul>
                                                <li>Church Building Account No : {khc.accounts.airtelTitleAndOffering}</li>
                                                <li>Church Building Merchant Code: {khc.accounts.airtelChurchBuilding}</li>
                                            </ul>
                                        </>
                                        }
                                    </Card.Body>
                                </Card>
                                <br/><br/>
                                <div  className="banner">

                                
                                <Card>
                                    <Card.Header>
                                        <h4><strong>Departmental Heads</strong></h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table variant="light">
                                            <thead></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Church Pastor</td>
                                                    <td>{khc.departmentalHeads.churchPastor.name}</td>
                                                    <td>{khc.departmentalHeads.churchPastor.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>First Elder</td>
                                                    <td>{khc.departmentalHeads.firstElder.name}</td>
                                                    <td>{khc.departmentalHeads.firstElder.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Second Elder</td>
                                                    <td>{khc.departmentalHeads.secondElder.name}</td>
                                                    <td>{khc.departmentalHeads.secondElder.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Head Deacon</td>
                                                    <td>{khc.departmentalHeads.headDeacon.name}</td>
                                                    <td>{khc.departmentalHeads.headDeacon.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Head Deaconess</td>
                                                    <td>{khc.departmentalHeads.headDeaconess.name}</td>
                                                    <td>{khc.departmentalHeads.headDeaconess.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Treasurer</td>
                                                    <td>{khc.departmentalHeads.treasurer.name}</td>
                                                    <td>{khc.departmentalHeads.treasurer.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Church Clerk</td>
                                                    <td>{khc.departmentalHeads.churchClerk.name}</td>
                                                    <td>{khc.departmentalHeads.churchClerk.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Stewardship</td>
                                                    <td>{khc.departmentalHeads.stewardship.name}</td>
                                                    <td>{khc.departmentalHeads.stewardship.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Communications</td>
                                                    <td>{khc.departmentalHeads.communications.name}</td>
                                                    <td>{khc.departmentalHeads.communications.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Personal Ministries</td>
                                                    <td>{khc.departmentalHeads.personalMinistries.name}</td>
                                                    <td>{khc.departmentalHeads.personalMinistries.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sabbath School</td>
                                                    <td>{khc.departmentalHeads.sabbathSchool.name}</td>
                                                    <td>{khc.departmentalHeads.sabbathSchool.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Family Ministries</td>
                                                    <td>{khc.departmentalHeads.familyMinistries1.name}</td>
                                                    <td>{khc.departmentalHeads.familyMinistries1.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Family Ministries</td>
                                                    <td>{khc.departmentalHeads.familyMinistries2.name}</td>
                                                    <td>{khc.departmentalHeads.familyMinistries2.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Projects</td>
                                                    <td>{khc.departmentalHeads.projects.name}</td>
                                                    <td>{khc.departmentalHeads.projects.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Interest Coordinator</td>
                                                    <td>{khc.departmentalHeads.interestCoordinator.name}</td>
                                                    <td>{khc.departmentalHeads.interestCoordinator.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Community Service</td>
                                                    <td>{khc.departmentalHeads.communityService.name}</td>
                                                    <td>{khc.departmentalHeads.communityService.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Children Ministries</td>
                                                    <td>{khc.departmentalHeads.childrenMinistries.name}</td>
                                                    <td>{khc.departmentalHeads.childrenMinistries.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Adventist Youth</td>
                                                    <td>{khc.departmentalHeads.adventistYouth.name}</td>
                                                    <td>{khc.departmentalHeads.adventistYouth.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Pathfinder Director</td>
                                                    <td>{khc.departmentalHeads.pathfinderDirector.name}</td>
                                                    <td>{khc.departmentalHeads.pathfinderDirector.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Ambassador</td>
                                                    <td>{khc.departmentalHeads.ambassador.name}</td>
                                                    <td>{khc.departmentalHeads.ambassador.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Youth Adults</td>
                                                    <td>{khc.departmentalHeads.youthAdults.name}</td>
                                                    <td>{khc.departmentalHeads.youthAdults.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Master Guide</td>
                                                    <td>{khc.departmentalHeads.masterGuide.name}</td>
                                                    <td>{khc.departmentalHeads.masterGuide.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Women Ministry</td>
                                                    <td>{khc.departmentalHeads.womenMinistry.name}</td>
                                                    <td>{khc.departmentalHeads.womenMinistry.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Adventist Men</td>
                                                    <td>{khc.departmentalHeads.adventistMen.name}</td>
                                                    <td>{khc.departmentalHeads.adventistMen.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Health Ministries</td>
                                                    <td>{khc.departmentalHeads.healthMinistries.name}</td>
                                                    <td>{khc.departmentalHeads.healthMinistries.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>PARL</td>
                                                    <td>{khc.departmentalHeads.parl.name}</td>
                                                    <td>{khc.departmentalHeads.parl.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Music</td>
                                                    <td>{khc.departmentalHeads.music.name}</td>
                                                    <td>{khc.departmentalHeads.music.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Education</td>
                                                    <td>{khc.departmentalHeads.education.name}</td>
                                                    <td>{khc.departmentalHeads.education.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Vespers</td>
                                                    <td>{khc.departmentalHeads.verspers.name}</td>
                                                    <td>{khc.departmentalHeads.verspers.phone}</td>
                                                </tr>
                                                
                                            </tbody>
                                        </Table>
                                        <br/>
                                        <div className="banner">
                                            <h5>{`Kabula Hill SDA Church © Copyright ${year}`}</h5>
                                        </div>
                                    </Card.Body>
                                </Card>
                                </div>
                            </Col>


                            <Col>
                                <div className="banner">
                                    <Card>
                                        <Card.Header>
                                            <strong>SABBATTH SCHOOL LESSON</strong>
                                        </Card.Header>
                                        <Card.Body>

                                        </Card.Body>
                                    </Card>
                                </div>
                                
                                <div  className="banner">
                                    <Card>
                                        <Card.Header>
                                            <strong>CHURCH ZONES</strong>  
                                        </Card.Header>
                                        <Card.Body>
                                            <Table variant="light">
                                                <thead>
                                                    <tr>
                                                        <th>ELDER</th>
                                                        <th>ZONES</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>{khc.zones.chileka}</th>
                                                        <th>Chileka, Chatha, Ngumbe</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.lunzu}</th>
                                                        <th>Lunzu, Ngumbe GDC</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.ndirande}</th>
                                                        <th>Ndirande, Nyambadwe, Kameza</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.chitawira}</th>
                                                        <th>Chitawira, Naperi, Tikumbe, Manja, Soche Hill, Njamba</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.kabula}</th>
                                                        <th>Kabula, Mt Pleasant, Mandala,College of Medicine</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.limbe}</th>
                                                        <th>Limbe, Bangwe, BCA, Chigumula</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.chilobew}</th>
                                                        <th>Chilobwe, Mpemba, Green Corner</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.masalema}</th>
                                                        <th>Masalema, Angelo, Chinyonga, Kanjedza, Chirichi</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.nkolokosa}</th>
                                                        <th>Nkolokosa, Soche E, Chimwankhunda, Zingwangwa</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.mbayani}</th>
                                                        <th>Mbayani, Chemusa, Chirimba, Chapima</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.namiwawa}</th>
                                                        <th>Namiwawa, Chilomoni/Fargo, Sigerege, Michiru</th>
                                                    </tr>
                                                    <tr>
                                                        <th>{khc.zones.sunnyside}</th>
                                                        <th>Sunnyside, Manase, Nacholi, CI</th>
                                                    </tr>
                                                </tbody>

                                            </Table>
                                        </Card.Body>
                                    </Card>
                                
                                </div>
                                
                       
                            </Col>
                            
                            <Col>
                                <div className="centralise">
                                    <img src={sdaLogo} alt="SEVETH DAY ADVENTIST CHURCH" width={200}/>
                                    <h3>Off Kabula Hill Road, Box 1969, Blantyre</h3>   
                                    <h2>{"Kabula Hill SDA Church".toUpperCase()}</h2>
                                    <h1>{`${day} ${month} ${year}`}</h1>
                                    <hr/>
                                    <img src={khc.front.image} alt="Kabula Hill" className="dropShadow" width={400} />
                                    <br/>
                                    <h4>{khc.front.tagLine}</h4>
                                    <div className="banner">
                                        <Row>
                                            <Col><h5>Zoom Link ID: {khc.front.zoomLinkId}</h5></Col>
                                            <Col><h5>Zoom Passcode: {khc.front.zoomPasscode}</h5></Col>
                                        </Row>
                                    </div>
                                    <br/>
                                    <h3>Welcome to Our Visitors</h3>
                                    <hr/>
                                    <h4>
                                        <i style={{color:"#471F1F"}}>
                                            {khc.front.welcomeMessage.split("\n").map(text => 
                                                text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}
                                        </i>
                                    </h4>
                                    <div className="banner">
                                        <h5 style={{fontFamily:"Arial"}}>Happy Sabbath to You All</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Card id="bulletin">
                    <Card.Body>
                        <Row xs={1} sm={2} md={3}>
                            <Col>
                                <div className="banner title">
                                    <h5>SABBATH PROGRAM</h5>
                                </div>
                                <div className="banner">
                                    <Row xs={2}>
                                        <Col><h5><strong>First Service: </strong></h5></Col><Col><h5><strong>{khc.firstService.startTime} - {khc.firstService.endTime}</strong></h5></Col>
                                        <Col><h6><strong>Elder On Duty: </strong></h6></Col><Col><h6>{khc.firstService.elderOnDuty}</h6></Col>
                                        <Col><h6><strong>Chorister: </strong></h6></Col><Col><h6>{khc.firstService.chorister}</h6></Col>
                                        <Col><h6><strong>Introit: </strong></h6></Col><Col><h6>#{khc.firstService.introit}</h6></Col>
                                        <Col><h6><strong>Responsive Reading: </strong></h6></Col><Col><h6>#{khc.firstService.responsiveReading}</h6></Col>
                                        <Col><h6><strong>Opening Hymn: </strong></h6></Col><Col><h6>#{khc.firstService.openingHymn}</h6></Col>
                                        <Col><h6><strong>First Prayer: </strong></h6></Col><Col><h6>{khc.firstService.firstPrayer}</h6></Col>
                                        <Col><h6><strong>Offering: </strong></h6></Col><Col><h6>{khc.firstService.offering}</h6></Col>
                                        <Col><h6><strong>Children Sermon: </strong></h6></Col><Col><h6>{khc.firstService.childrenSermon}</h6></Col>
                                        <Col><h6><strong>Children Sermon: </strong></h6></Col><Col><h6>{khc.firstService.musicalMediation}</h6></Col>
                                        <Col><h6><strong>Preacher: </strong></h6></Col><Col><h6>{khc.firstService.preacher}</h6></Col>
                                        <Col><h6><strong>Sermon Title: </strong></h6></Col><Col><h6>{khc.firstService.sermonTitle}</h6></Col>
                                        <Col><h6><strong>Sermon Title: </strong></h6></Col><Col><h6>#{khc.firstService.closingHymn}</h6></Col>
                                        <Col><h6><strong>Benediction: </strong></h6></Col><Col><h6>{khc.firstService.benediction}</h6></Col>
                                        <Col><h6><strong>Church Building Offering: </strong></h6></Col><Col><h6>{khc.firstService.churchBudgetOffering}</h6></Col>
                                    </Row>
                                    <br/><br/>
                                    <Row xs={2}>
                                        <Col><h5>Sabbth School: </h5></Col><Col><h5>{khc.sabbathSchool.startTime} - {khc.sabbathSchool.endTime}</h5></Col>
                                    </Row>
                                    <br/><br/>
                                    <Row xs={2}>
                                        <Col><h5><strong>Second Service: </strong></h5></Col><Col><h5><strong>{khc.secondService.startTime} - {khc.secondService.endTime}</strong></h5></Col>
                                        <Col><h6><strong>Elder On Duty: </strong></h6></Col><Col><h6>{khc.secondService.elderOnDuty}</h6></Col>
                                        <Col><h6><strong>Chorister: </strong></h6></Col><Col><h6>{khc.secondService.chorister}</h6></Col>
                                        <Col><h6><strong>Introit: </strong></h6></Col><Col><h6>#{khc.secondService.introit}</h6></Col>
                                        <Col><h6><strong>Responsive Reading: </strong></h6></Col><Col><h6>#{khc.secondService.responsiveReading}</h6></Col>
                                        <Col><h6><strong>Opening Hymn: </strong></h6></Col><Col><h6>#{khc.secondService.openingHymn}</h6></Col>
                                        <Col><h6><strong>second Prayer: </strong></h6></Col><Col><h6>{khc.secondService.secondPrayer}</h6></Col>
                                        <Col><h6><strong>Offering: </strong></h6></Col><Col><h6>{khc.secondService.offering}</h6></Col>
                                        <Col><h6><strong>Children Sermon: </strong></h6></Col><Col><h6>{khc.secondService.childrenSermon}</h6></Col>
                                        <Col><h6><strong>Children Sermon: </strong></h6></Col><Col><h6>{khc.secondService.musicalMediation}</h6></Col>
                                        <Col><h6><strong>Preacher: </strong></h6></Col><Col><h6>{khc.secondService.preacher}</h6></Col>
                                        <Col><h6><strong>Sermon Title: </strong></h6></Col><Col><h6>{khc.secondService.sermonTitle}</h6></Col>
                                        <Col><h6><strong>Sermon Title: </strong></h6></Col><Col><h6>#{khc.secondService.closingHymn}</h6></Col>
                                        <Col><h6><strong>Benediction: </strong></h6></Col><Col><h6>{khc.secondService.benediction}</h6></Col>
                                        <Col><h6><strong>Church Building Offering: </strong></h6></Col><Col><h6>{khc.secondService.churchBudgetOffering}</h6></Col>
                                    </Row>
                                </div>
                            </Col>
                            
                            <Col>
                                <div className="banner title">
                                    <h5>ANNOUNCEMENT - Page 1</h5>
                                </div>
                                <div className="banner">
                                    <h5><strong>Welcome Remarks</strong></h5>
                                    <h6>{khc.announcements.welcomeRemarks.split("\n").map(remark => <>{remark}<br/></>)}</h6>
                                    <br/><br/>

                                    {khc.announcements.covidPrevention.trim() === "" ? <></>:<>
                                    <h5><strong>Covid 19 - Preventation</strong></h5>
                                    <h6>{khc.announcements.covidPrevention.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }

                                    {khc.announcements.churchGatherings.trim() === "" ? <></>:<>
                                    <h5><strong>Church Gatherings</strong></h5>
                                    <h6>{khc.announcements.churchGatherings.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }

                                    {khc.announcements.achievementClasses.trim() === "" ? <></>:<>
                                    <h5><strong>Achievement Classes</strong></h5>
                                    <h6>{khc.announcements.achievementClasses.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }

                                    {announcements.length  === 0 ? <></> : 
                                    <>
                                        {
                                            announcements.map((an =>(
                                                <>
                                                    <h5><strong>{an.title}</strong></h5>
                                                    <h6>{an.text.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                                    <br/><br/>
                                                </>
                                            )))
                                        }
                                    </>
                                    }
                                </div>
                            </Col>

                            <Col>
                                <div className="banner title">
                                    <h5>ANNOUNCEMENT - Page 2</h5>
                                </div>
                                <div className="banner">
                                    <h5><strong>Counselling and Prayers</strong></h5>
                                    <h6>{khc.announcements.counsellingAndPrayers.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>

                                    {khc.announcements.wedding.trim() === "" ? <></>:<>
                                    <h5><strong>Wedding Announcements</strong></h5>
                                    <h6>{khc.announcements.wedding.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }

                                    {khc.announcements.bereavementsAndSicknesses.trim() === "" ? <></>:<>
                                    <h5><strong>Bereavements And Sicknesses</strong></h5>
                                    <h6>{khc.announcements.bereavementsAndSicknesses.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }


                                    {khc.announcements.pastorsEngagements.trim() === "" ? <></>:<>
                                    <h5><strong>Pastor's Engagements</strong></h5>
                                    <h6>{khc.announcements.pastorsEngagements.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }


                                    {khc.announcements.churchBoard.trim() === "" ? <></>:<>
                                    <h5><strong>Church Board</strong></h5>
                                    <h6>{khc.announcements.churchBoard.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }

                                    {khc.announcements.holyCommunion.trim() === "" ? <></>:<>
                                    <h5><strong>Holy Communion</strong></h5>
                                    <h6>{khc.announcements.holyCommunion.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }

                                    {khc.announcements.titheAndOfferings.trim() === "" ? <></>:<>
                                    <h5><strong>Tithe and Offering</strong></h5>
                                    <h6>{khc.announcements.titheAndOfferings.split("\n").map(text => text === "\n" ? <br/> : <ul><li>{text}</li></ul>)}</h6>
                                    <br/><br/>
                                    </>
                                    }

                                    <h5><strong>Next Sabbath</strong></h5>
                                    <h6>Elders on Duty Next Sabbath are <strong>{khc.announcements.nextSabbathOnDuty}</strong></h6>
                                    <br/>
                                    <h6>All announcements must reach elder of the month. <strong>{khc.announcements.elderOfTheMonth}</strong> ({khc.announcements.elderOfTheMonthPhone}) by Wedenesday for bulletin compilation and circulation.</h6>
                                    <br/>
                                </div>
                                
                                <div className="banner">
                                    <Card>
                                        <Table variant="light">
                                            <thead>
                                                <tr>
                                                    <th><strong>ELDER</strong></th>
                                                    <th><strong>DEPARTMENT(S)</strong></th>
                                                    <th><strong>PHONE</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                <tr>
                                                    <td>{khc.departments.administration}</td>
                                                    <td>Administration/Deaconry</td>
                                                    <td>{khc.departments.administrationPhone}</td>
                                                </tr>
                                                <tr>
                                                    <td>{khc.departments.stewardship}</td>
                                                    <td>Stewardship/Treasury</td>
                                                    <td>{khc.departments.stewardshipPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.familyMinistries}</td>
                                                    <td>Family Ministries/Adventist Youth</td>
                                                    <td>{khc.departments.familyMinistriesPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.personalMinistries}</td>
                                                    <td>Personal Ministries</td>
                                                    <td>{khc.departments.personalMinistriesPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.healthMinistries}</td>
                                                    <td>Health Ministries/Music</td>
                                                    <td>{khc.departments.healthMinistriesPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.projects}</td>
                                                    <td>Projects/Publishing and VOP</td>
                                                    <td>{khc.departments.projectsPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.sabbathSchool}</td>
                                                    <td>Sabbath School/PARL</td>
                                                    <td>{khc.departments.sabbathSchoolPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.communications}</td>
                                                    <td>Communications/PA System</td>
                                                    <td>{khc.departments.communicationsPhone}</td>
                                                </tr>


                                                <tr>
                                                    <td>{khc.departments.interestCoordination}</td>
                                                    <td>Interest Coordination/PA System</td>
                                                    <td>{khc.departments.interestCoordinationPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.amo}</td>
                                                    <td>AMO/Education</td>
                                                    <td>{khc.departments.amoPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.womenAndChildren}</td>
                                                    <td>Women and Children Ministries</td>
                                                    <td>{khc.departments.womenAndChildrenPhone}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departments.deaconessAndCommunity}</td>
                                                    <td>Deaconess/Community Services</td>
                                                    <td>{khc.departments.deaconessAndCommunityPhone}</td>
                                                </tr>

                                                <hr/>

                                                <tr>
                                                    <td>{khc.departmentalHeads.churchPastor}</td>
                                                    <td>Church Pastor</td>
                                                    <td>{khc.departmentalHeads.churchPastor}</td>
                                                </tr>

                                                <tr>
                                                    <td>{khc.departmentalHeads.churchClerk}</td>
                                                    <td>Church Clerk</td>
                                                    <td>{khc.departmentalHeads.churchClerk}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
                
        </>
    );
}