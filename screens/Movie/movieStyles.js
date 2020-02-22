import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
   container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff"
   },
   imageContainer: {
       flex: 0.3,
       borderRadius: "8rem",
       marginLeft: "30rem",
       marginRight: "30rem"
   }, 
   imageStyle: {
        width: "100%",
        height: "230rem",
        resizeMode: "contain",
        borderRadius: "8rem"
   },
   textContainer: {
        flex: 0.5,
        marginLeft: "30rem",
        marginRight: "30rem"
   },
   textTitle: {
       fontSize: "18rem",
       fontWeight: "bold",
       color: "#0040C9",
       textAlign: "center",
       paddingBottom: "5rem"
   }, 
   textTagline: {
        fontSize: "16rem",
        fontWeight: "bold",
        color: "#0040C9",
        textAlign: "center",
        paddingBottom: "5rem"
   },
   textDescr: {
        fontSize: "16rem",
        color: "#32A1F0",
        paddingBottom: "5rem"
   },
   textTitleSmall: {
        fontSize: "16rem",
        fontWeight: "bold",
        color: "#0040C9",
        paddingBottom: "5rem"
   }
})