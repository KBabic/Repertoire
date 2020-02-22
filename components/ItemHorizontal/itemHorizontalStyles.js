import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
    container: {
       flex: 1,
       marginTop: "15rem",
       marginLeft: "30rem",
       marginRight: "30rem",
       marginBottom: "15rem",
       height: "200rem",
       width: "200rem",
       borderRadius: "8rem",
       elevation: 1,
       shadowColor: "rgba(0,0,0,0.08)",
       shadowOffset: {
          width: "0rem",
          height: "5rem"
       },
       shadowOpacity: 0.8,
       // borderWidth: 2
    },
    imageContainer: {
       // flex: 0.7,
       borderTopLeftRadius: "8rem",
       borderTopRightRadius: "8rem"
    },
    image: {
       width: "100%",
       height: "120rem",
       resizeMode: "stretch",
       borderTopLeftRadius: "8rem",
       borderTopRightRadius: "8rem"
    },
    textContainer: {
       // flex: 0.3
       marginBottom: "10rem"
    },
    title: {
       fontSize: "14rem",
       color: "#3e4042",
       padding: "10rem",
       fontWeight: "bold"
    },
    description: {
       fontSize: "14rem",
       color: "#3e4042",
       paddingLeft: "5rem"
    }
 })