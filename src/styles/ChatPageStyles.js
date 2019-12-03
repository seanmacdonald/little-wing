import { makeStyles } from '@material-ui/core'; 

export const ChatPageStyles = makeStyles(theme => ({
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
    },
    navTitle: {
        padding: theme.spacing(2),
        textAlign: 'left',
        fontSize: 30,
        color: "white",
        backgroundColor: "#006D76" //teal
    },
}));

