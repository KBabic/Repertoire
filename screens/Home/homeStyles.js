import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#ffffff"
   },
   title: {
      padding: "10rem",
      paddingLeft: "20rem",
      color: "#0040C9",
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
})