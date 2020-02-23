import EStyleSheet from 'react-native-extended-stylesheet'
import '../../assets/global/globalStyles'
export const styles = EStyleSheet.create({
    innerContainer: {
        flex: 0.9,
        width: "190rem",
        backgroundColor: "#32A1F0",
        borderBottomRightRadius: "60rem",
    },
    listContainer: {
        flex: 0.92,
    },
    itemContainer: {
        flex: 0.1,
        width: "190rem",
        justifyContent: "center",
        backgroundColor: "#32A1F0",
    },
    itemText: {
        fontSize: "18rem",
        color: "#ffffff",
        paddingLeft: "20rem"
    },
    emptyBig: {
        flex: 0.2
    }
})