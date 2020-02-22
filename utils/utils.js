export const getShortText = (txt, num) => {
    if (txt && txt.length > num) {
        return txt.slice(0, num + 1) + "..."
    } else {
        return txt
    }
}