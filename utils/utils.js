export const getShortText = (txt, num) => {
    if (txt && txt.length > num) {
        return txt.slice(0, num + 1) + "..."
    } else {
        return txt
    }
}
export const getJustifyContent = (val1, val2) => {
    if (!val1) {
        return "flex-end"
    }
    if (!val2) {
        return "flex-start"
    }
    return "space-between"
}