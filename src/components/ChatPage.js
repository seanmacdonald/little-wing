import React, { useState } from 'react'; 
import { navigate } from '@reach/router';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ChatPageStyles } from '../styles/ChatPageStyles'; 
import axios from 'axios'; 


var connectWebsocket = (username, setConnected, setError) => {
    var socket = new WebSocket("ws://localhost:8080/connect?user=" + username);
    socket.onopen = () => {
        console.log("socket opened"); 
        setConnected(true);
    }
    socket.onclose = () => {
        console.log("socket closed immediately"); 
        setConnected(false);
        setError("Sorry, there was an error connecting to the server"); 
    }
    socket.onerror = () => {
        console.log("socket error");
        setConnected(false);
        setError("Sorry, there was an error connecting to the server"); 
    }

    setConnected(true);
}

function ChatPage(props) {
    const classes = ChatPageStyles();

    const [username, setUsername] = useState("");
    const [connected, setConnected] = useState(false); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(""); 
    const [join, setJoin] = useState(false); 
    const [joinLoading, setJoinLoading] = useState(false); 
    const [chats, setChats] = useState([]); 
    const [make, setMake] = useState(false); 
    

    //helper method used to route back to the homepage of the application
    var navHome = () => {
        navigate("/"); 
    }
    
    //if the props are null then route back to homepage 
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

    //if there is no username then route back to homepage 
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

    //while the page is loading: set the username and signal that loading is done
    if (loading) {
        setUsername(user); 
        setLoading(false); 
    }

    if(!connected && username !== "" && error === "") {
        connectWebsocket(username, setConnected, setError);
    }

    //Handler method for when join chat is pressed 
    var handleJoin = () => {
        console.log("join pressed"); 
        setJoinLoading(true); 
        setJoin(true); 
        axios.get("http://localhost:8080/chats")
            .then((response) => {
                setJoinLoading(false); 
                console.log(response.data); 
                if("Chats" in response.data){
                    setChats(response.data.Chats); 
                } else {
                    console.log("Could not get Chats"); 
                }
            })
            .catch((error) => {
                setJoinLoading(false); 
                console.log(error); 
            });
    }

    //Handler method for when make chat is pressed
    //TODO: implement
    var handleMake = () => {
        console.log("make pressed"); 
    }

    //TODO: implement 
    var handleJoinChat = (chat_name) => {
        console.log("join chat called: ", chat_name); 
    }

    var renderPage = () => {
        if (!loading && error === "") {
            return (
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Paper className={classes.navTitle}>Speak Free</Paper>
                            {renderContent()}
                        </Grid>
                    </Grid>
                </div>
            );
        } else if(!loading && error !== "") {
            return (
                <h4>{error}</h4>
            );
        }

        return renderSpinner();
    }

    //Renders a circular progress idicator
    var renderSpinner = () => {
        return (
            <div className={classes.loading}>
                <CircularProgress className={classes.progress}/>
            </div>
        );
    }

    //renders the appropriate content which may include:
    // 1 - The options to JOIN or MAKE a chat 
    // 2 - The available chats to select from 
    // 3 - A make chat interface 
    // 4 - A chat window that the user is now in 
    var renderContent = () => {
        if(!join && !make) {
            return renderOptions(); 
        } else if(join && joinLoading) {
            return renderSpinner(); 
        } else if(join && !joinLoading) {
            return renderChats(); 
        }
    }

    //Renders the possible options for the application which
    //are the options to either "join" or "make" a chat group
    var renderOptions = () => {
        return(
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.buttonContainer}
            >
                <h3 className={classes.message}>Hi {username}! Get started by joining or making a chat group.</h3>
                <Button 
                    className={classes.button} 
                    onClick={handleJoin.bind(this)}
                >Join Chat</Button><br/>
                <Button 
                    className={classes.button} 
                    onClick={handleMake.bind(this)}
                >Make Chat</Button>
            </Grid>
        );
    }

    //Renders a list of the available chats that the user can join 
    var renderChats = () => {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center">
                <ul className={classes.list}>
                    {chats.map(item => (
                        <li key={item}>
                            <Button 
                                className={classes.listButton} 
                                onClick={handleJoinChat.bind(this, item)}
                            >{item}</Button>
                        </li>
                    ))}
                </ul>
            </Grid>
        );
    }

    return (
        <div className={classes.root}>
            {renderPage()}
        </div>
    );
}

export default ChatPage; 