//import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import { useState } from "react";
import {Form, InputGroup, Button} from "react-bootstrap";

const SendMessageForm =({sendMessage})=>{

    const [msg, setMessage] = useState('');

    return (
        <Form onSubmit={e=>{
            e.preventDefault();
            sendMessage(msg);
            setMessage('');
        }}>
           <InputGroup> 
              <InputGroup.Text>Chat </InputGroup.Text> 
              <Form.Control onChange={e=>setMessage(e.target.value)} value={msg} placeholder='message' />
              <Button variant='primary' type='submit' disabled={!msg.trim()}>Send</Button>
           </InputGroup> 

        </Form>
    )

}

export default SendMessageForm;