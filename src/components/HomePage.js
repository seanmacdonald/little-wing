import React, { useState } from 'react'; 
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { navigate } from '@reach/router'; 
import { HomePageStyles } from '../styles/HomePageStyles'; 

function HomePage() {
    const classes = HomePageStyles();

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
        } else if(username === "") {
            setSubmitted(false);
            setSubmitError("Username cannot be empty."); 
            return; 
        }
        
        //connectWebsocket(); 
        navigate("/chat", { state: {username: username }}); 
    }


    //checks if the username has a colon
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
