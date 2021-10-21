import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    media : {
      height : 140,
    },
    productContainer : {
      marginTop : "3rem"
    },
    cardDismissBtn : {
      position : "absolute",
      top: "0rem",
      right: "0.5rem",
  },
  productDetailContainer : {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sort : {
    padding : theme.spacing(1.5),
    textAlign : "center"
  },
  legend : {
    textAlign : "center"
  },
  label : {
    margin : theme.spacing(1.5),
  },
  filter : {
    padding : theme.spacing(1.5),
    textAlign : "center"
  },
  }));

  export default useStyles;

 
     