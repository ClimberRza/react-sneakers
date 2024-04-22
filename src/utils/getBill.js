export default function getBill(arr) {
    if(!arr || !arr.some((elem) => elem.price)) {
        return
    }
    return arr.reduce((sum, item) =>
    sum + +item.price.split(' ').join(''), 0)
}