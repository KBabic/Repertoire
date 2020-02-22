import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
   button: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: "30rem",
      marginLeft: "30rem",
      marginRight: "30rem",
      borderRadius: "8rem",
      elevation: 1,
      shadowColor: "rgba(0,0,0,0.08)",
      shadowOffset: {
         width: "0rem",
         height: "5rem"
      },
      shadowOpacity: 0.8
   },
   buttonText: {
      fontSize: "18rem",
      color: "#ffffff"
   }
})