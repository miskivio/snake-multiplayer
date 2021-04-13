module.exports = {
    makeId
}

const makeId = (length) => {
    var result = ''
    var characters = 'ABCDEF'
    var characterLenght = characters.length
    for( var i = 0; i < i.length; i++){
        result +=  characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

