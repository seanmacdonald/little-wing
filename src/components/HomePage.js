import React, { useState } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    navTitle: {
        padding: theme.spacing(2),
        textAlign: 'left',
        fontSize: 30,
        color: "white",
        backgroundColor: "#006D76" //teal
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: "#EA7200", //orange
        '&:hover': {
            opacity: 0.5,
            backgroundColor: "#EA7200",
          },
    },
    bodyTitle: {
        color: "#006D76"
    },
    progress: {
        margin: theme.spacing(2),
        color: "#EA7200"
    },
    textField: {
    }, 
    text: {
        color: "red",
        fontSize: 14
    }
  }));


function HomePage() {
    const classes = useStyles();

    const [submitted, setSubmitted] = useState(false); 
    const [username, setUsername] = useState(""); 
    const [submitError, setSubmitError] = useState(""); 

    var handleSubmit = () => {
        setSubmitted(true);
        setSubmitError(""); 
        
        if(!validUserName(username)){
            setSubmitted(false);
            setSubmitError("Cannot have a colon in the username."); 
            return;   
        }
        
        connectWebsocket(); 
    }

    var connectWebsocket = () => {
        var socket = new WebSocket("ws://localhost:8080/connect?user=" + username);
        socket.onopen = () => {
            setSubmitted(false);
            console.log("socket opened"); 
            //route to chats page 
        }
        socket.onclose = () => {
            setSubmitted(false);
            console.log("socket closed immediately"); 
        }
        socket.onerror = () => {
            setSubmitted(false);
            setSubmitError("Sorry, there was an error connecting to the server.")
            console.log("socket error");
            //could not connect - display error
        }
    }

    var validUserName = (username) => {
        if(username.includes(":")){
            return false; 
        }

        return true; 
    }

    var changeUsername = (e) => {
        setUsername(e.target.value);
    }

    var renderSubmit = () => {
        if(!submitted) {
            return (
                <Button className={classes.button} onClick={handleSubmit.bind(this)}>
                    Submit
                </Button>
            );
        } 

        return  <CircularProgress className={classes.progress} />
    }

    var renderSubmitError = () => {
        if(submitError !== "") {
            return (
                <p>
                    {submitError}
                </p>
            );
        }
    }

    return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.navTitle}>Speak Free</Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1 className={classes.bodyTitle}>
                Enter username:
            </h1>
            <TextField
                id="outlined-with-placeholder"
                label="username"
                placeholder="example-user"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={changeUsername.bind(this)}
            />
            <br />
            <div className={classes.text}>
                {renderSubmitError()}
            </div>
            <div>
                {renderSubmit()}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>

    );
}

export default HomePage;
