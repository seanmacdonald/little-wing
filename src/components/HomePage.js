import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        backgroundColor: "#006D76"
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: "#EA7200",
        '&:hover': {
            opacity: 0.5,
            backgroundColor: "#EA7200",
          },
    },
    bodyTitle: {
        color: "#006D76"
    }
  }));

function HomePage() {
    const classes = useStyles();

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
                placeholder="user123"
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />
            <br />
            <Button className={classes.button}>
                Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>

    );
}

export default HomePage;
