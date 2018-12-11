// const filterIngre = {
//     beef: false,
//     pork: false,
//     chicken: false,
//     tomato: false,
//     potato: false
// }

const filterIngre = [
    {
        name: 'beef',
        chosen: false
    },    {
        name: 'pork',
        chosen: false
    },    {
        name: 'chicken',
        chosen: false
    },    {
        name: 'tomato',
        chosen: false
    },    {
        name: 'potato',
        chosen: false
    }
]

const filterType = {
    type: 'any'
}

const getFilterIngre = () => filterIngre
const getFilterType = () => filterType

export { getFilterIngre, getFilterType }