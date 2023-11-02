module.exports = function (str) {
    if (!str) {
        return ''
    }

    let startIndex = 0

    for (let i = 0; i < str.length; i++) {
        if (
            str[i] === str[i].toUpperCase() &&
            str[i] !== str[i].toLowerCase()
        ) {
            startIndex = i
            break
        }
    }

    return str.substring(startIndex)
}
