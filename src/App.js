
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container} from 'react-bootstrap';
import WaitingRoom from './components/WaitingRoom';
import ChatRoom from './components/ChatRoom';
import React, { useState } from 'react';
//import * as signalR from '@microsoft/signalr';
import {  HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {

 const [conn, setConnection]= useState();
 const [messages, setMessages]= useState([]);

 const joinChatRoom = async(username, chatroom)=>{
  try{
    //initiate a connection
    const conn = new HubConnectionBuilder()
               .withUrl("https://localhost:7217/chat")
               .configureLogging(LogLevel.Information)
               .build();
   //set up handle
   conn.on("JoinSpecificChatRoom",(username, msg)=>{
    //console.log("msg: ", msg);
    //console.log("username: ", username);
    setMessages(messages=>[...messages,{username, msg}]);
   });

   conn.on("ReceiveSpecificMessage",(username, msg)=>{
   setMessages(messages=>[...messages,{username, msg}]);
   });

   await conn.start();
   await conn.invoke("JoinSpecificChatRoom", {username, chatroom});
   setConnection(conn);

  }catch(e){
    console.log(e);
  }
 }

 const sendMessage = async(message)=>{
  try{

    await conn.invoke("SendMessage", message);
    console.log("Message being sent:", message);
  }catch(e){
    console.log(e);
  }
 }


 return (
    <div>
      <main>
        <Container>
          <Row class='px-5 my-5'>
            <Col sm='12'>
              <h1 class="font-weight-light">Welcome to Signal ChatApp</h1>
            </Col>
          </Row>
          
          {!conn 
          ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
           :
          <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          }
         

        </Container>
      </main>
     
    </div>
  );
}

export default App;
