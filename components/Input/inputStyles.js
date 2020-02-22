import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
   container: {
      flex: 0.1,
      flexDirection: "row",
      alignItems: "center",
      marginTop: "10rem",
      marginLeft: "30rem",
      marginRight: "30rem",
      borderColor: "#32A1F0",
      borderWidth: "1rem",
      borderRadius: "8rem",
      elevation: 1,
      shadowColor: "rgba(0,0,0,0.08)",
      shadowOffset: {
         width: "0rem",
         height: "5rem"
      },
      shadowOpacity: 0.8
   },
   input: {
      flex: 0.6,
      fontSize: "16rem"
   },
   iconContainer: {
      flex: 0.2
   }
})