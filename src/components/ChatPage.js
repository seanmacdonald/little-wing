import React, { useState } from 'react'; 
import { navigate } from '@reach/router'; 

function ChatPage(props) {
    const [username, setUsername] = useState(""); 
    
    if (props === null || props.location === null ||
        props.location.state === null) {
        console.log("No props. Route to home page."); 
        navigate("/"); 
        return null; 
    }

    const user = props.location.state.username; 
    if(user === null || user === "") {
        console.log("No username specified. Route to home page."); 
        navigate("/"); 
        return null; 
    }

    return (
        <div>
            <p>ChatPage</p>
        </div>
    );
}

export default ChatPage; 