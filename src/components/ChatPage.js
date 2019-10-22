import React, { useState } from 'react'; 
import { navigate } from '@reach/router'; 

function ChatPage(props) {
    const [username, setUsername] = useState("");
    
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

    console.log(user)

    return (
        <div>
            <p>ChatPage</p>
        </div>
    );
}

export default ChatPage; 