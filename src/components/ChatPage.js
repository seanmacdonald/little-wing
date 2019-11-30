import React, { useState } from 'react'; 
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles'; 
import CircularProgress from '@material-ui/core/CircularProgress';


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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex", 
        flexDirection: "column"
      },
    progress: {
        //margin: theme.spacing(2),
        color: "#EA7200", 
    },
    loading: {
        //textAlign: "center",
        //verticalAlign: "middle"
        alignItems: "center", 
        display: "flex",
        justifyContent: "center",
    }, 
    loading2: {
        //verticalAlign: "middle"
    }
}));

function ChatPage(props) {
    const classes = useStyles();

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
                <div>
                    <p>ChatPage</p>
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