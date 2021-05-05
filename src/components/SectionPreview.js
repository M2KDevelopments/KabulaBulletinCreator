import { Container } from "react-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function SectionPreview(props){

    const Title = () => {
        return <Container style={{marginTop:50, marginBottom:50}}>
                    <div className="centralise">
                        <h1>Kabula Hill SDA <strong>Bulletin</strong></h1>
                        <hr/>
                    </div>
                </Container>
    }
    
    return (
        <>
            {
                props.page ? <Title/> : <></>
            }
        </>
    );
}