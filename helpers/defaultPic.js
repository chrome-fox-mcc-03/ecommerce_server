const SUPPLEMENTS = 'https://img.okezone.com/content/2020/01/27/481/2159096/cegah-peredaran-obat-ilegal-rempah-dan-jamu-tradisional-bisa-jadi-solusi-gYQvd8AErO.jpg'
const FOOD = 'https://media.timeout.com/images/105183116/630/472/image.jpg'
const DRUGS = 'https://timesofoman.com/uploads/images/2019/11/10/1074475.jpg'

module.exports = function(payload) {
    let pic
    let status = payload.category
    switch(status) {
        case 'food':
            pic = FOOD
            break
        case 'medicine':
            pic = DRUGS
            break
        case 'supplements':
            pic = SUPPLEMENTS
            break
        default:
            pic = SUPPLEMENTS
    }

    return pic

}