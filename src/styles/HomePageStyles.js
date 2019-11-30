import { makeStyles } from '@material-ui/core/styles';


export const HomePageStyles = makeStyles(theme => ({
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
