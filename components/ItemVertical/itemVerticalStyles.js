import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
   container: {
      flex: 1,
      marginTop: "15rem",
      marginLeft: "30rem",
      marginRight: "30rem",
      height: "270rem",
      borderRadius: "8rem",
      elevation: 1,
      shadowColor: "rgba(0,0,0,0.08)",
      shadowOffset: {
         width: "0rem",
         height: "5rem"
      },
      shadowOpacity: 0.8
   },
   imageContainer: {
      flex: 0.7,
      borderTopLeftRadius: "8rem",
      borderTopRightRadius: "8rem"
   },
   image: {
      width: "100%",
      height: "180rem",
      resizeMode: "stretch",
      borderTopLeftRadius: "8rem",
      borderTopRightRadius: "8rem"
   },
   textContainer: {
      flex: 0.3
   },
   title: {
      fontSize: "16rem",
      color: "#3e4042",
      padding: "5rem",
      paddingLeft: "10rem",
      fontWeight: "bold"
   },
   description: {
      fontSize: "14rem",
      color: "#3e4042",
      padding: "5rem",
      paddingLeft: "10rem"
   }
})