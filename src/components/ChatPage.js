import React, { useState } from 'react'; 
import { navigate } from '@reach/router';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ChatPageStyles } from '../styles/ChatPageStyles'; 


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
    const classes = ChatPageStyles();

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

    //while the page is loading: set the username and signal that loading is done
    if (loading) {
        setUsername(user); 
        setLoading(false); 
    }

    console.log("here")
    console.log(username)
    console.log(typeof(username))

    if(!connected && username !== "") {
        connectWebsocket(username, setConnected);
    }

    var renderPage = () => {
        if (!loading) {
            return (
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Paper className={classes.navTitle}>Speak Free</Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }

        return (
            <div className={classes.loading}>
                    <CircularProgress className={classes.progress}/>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            {renderPage()}
        </div>
    );
}

export default ChatPage; 