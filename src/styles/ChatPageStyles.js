import { makeStyles } from '@material-ui/core'; 

var themeOrange = "#EA7200"; 
var themeTeal = "#006D76"; 

export const ChatPageStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex", 
        flexDirection: "column"
      },
    progress: {
        //margin: theme.spacing(2),
        color: themeOrange, 
    },
    loading: {
        //textAlign: "center",
        //verticalAlign: "middle"
        alignItems: "center", 
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(10),
    }, 
    loading2: {
        //verticalAlign: "middle"
    },
    navTitle: {
        padding: theme.spacing(2),
        textAlign: 'left',
        fontSize: 30,
        color: "white",
        backgroundColor: themeTeal 
    },
    button: {
        //marginTop: theme.spacing(2),
        backgroundColor: themeOrange,
        '&:hover': {
            opacity: 0.5,
            backgroundColor: themeOrange,
          },
        color: "white", 
        fontSize: 18,
    },
    buttonContainer: {
        margin: theme.spacing(2),
    }, 
    message: {
        color: themeTeal, 
    }
}));

