import React, { useState } from 'react'; 
import { navigate } from '@reach/router'; 

var connectWebsocket = (username, setConnected) => {
    var socket = new WebSocket("ws://localhost:8080/connect?user=" + username);
    socket.onopen = () => {
        setConnected(true);
        console.log("socket opened"); 
    }
    socket.onclose = () => {
        setConnected(false);
        console.log("socket closed immediately"); 
    }
    socket.onerror = () => {
        //could not connect - route back to home page
        setConnected(false);
        //setSubmitError("Sorry, there was an error connecting to the server.")
        console.log("socket error");
    }

    setConnected(true);
}

function ChatPage(props) {
    const [username, setUsername] = useState("");
    const [connected, setConnected] = useState(false); 
    const [loading, setLoading] = useState(true); 
    
    var navHome = () => {
        navigate("/"); 
    }
    
    if (props === null || props.location === null ||
        props.location.state === null) {
        console.log("No props. Route to home page."); 
        setTimeout(navHome.bind(this), 1000);  
        return (
            <div>
                Redirecting...
            </div>
        );
    }

    const user = props.location.state.username; 
    if(user === null || user === "" || user === undefined) {
        console.log("No username specified. Route to home page."); 
        setTimeout(navHome.bind(this), 1000);  
        return (
            <div>
                Redirecting...
            </div>
        ); 
    }

    //attempt to create a websocket connection with the user value 
    if (loading) {
        setUsername(user); 
        setLoading(false); 
    }

    //need to work on the state behaviour because it is re rendering 
    //all the time and causing multiple webscocket connections to be sent

    console.log("here")
    console.log(username)
    console.log(typeof(username))

    if(!connected && username !== "") {
        connectWebsocket(username, setConnected);
    }

    return (
        <div>
            <p>ChatPage</p>
        </div>
    );
}

export default ChatPage; 