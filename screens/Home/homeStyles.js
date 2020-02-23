import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#ffffff"
   },
   spinner: {
      flex: 1,
      backgroundColor: "#ffffff",
      justifyContent: "center",
      alignItems: "center"
   },
   title: {
      padding: "10rem",
      textAlign: "center",
      color: "#4a4f54",
      fontSize: "18rem",
      fontWeight: "bold"
   },
   menu: {
      flex: 1,
      position: "absolute", 
      top: "50rem",
      left: "0rem", 
      right: "0rem", 
      bottom: "0rem", 
      zIndex: 100,  
      backgroundColor: '#00000070'
  },
  list: {
     paddingBottom: "90rem"
  }
})