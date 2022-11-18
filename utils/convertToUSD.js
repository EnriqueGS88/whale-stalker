export function exchangeRate(str) {
    if (str.indexOf('€') != -1) {
        return 1.1
    } else {
        return 1
    }
}
export function decimalsMultiplier(str) {
    if (str.indexOf('K') != -1) {
        return 3
    } else {
        return 6
    }
}
export function numberify(str) {
    let number = str
        .replace('€', '')
        .replace('$', '')
        .replace('K', '')
        .replace('M', '')

    let value = Number(number)
    return value
}
export function convertToUSD(text) {

    const decimalsMover = 10 ** (decimalsMultiplier(text))
    const valueInUSD = numberify(text) * exchangeRate(text) * decimalsMover

    console.log(valueInUSD)
    return valueInUSD

}

export function randomNumber( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min ) + min );
}


