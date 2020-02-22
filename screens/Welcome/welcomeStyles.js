import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#ffffff"
   },
   textContainer: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center"
   },
   text: {
      fontSize: "24rem",
      color: "#0040C9"
   },
   logo: {
      width: "150rem",
      height: "150rem",
      resizeMode: "contain",
      marginBottom: "50rem"
   }
})