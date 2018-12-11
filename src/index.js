import { renderList } from './view'
import { getFilterIngre, getFilterType } from './filters'



// const setFilterIntre = ({beef, pork, chicken, tomato, potato}) => {
//     filterIngre.beef = beef
//     filterIngre.pork = pork
//     filterIngre.chicken = chicken
//     filterIngre.tomato = tomato
//     filterIngre.potato = potato
// }

renderList()

// Destructuring
// const { beef, pork, chicken, tomato, potato } = filterIngre

document.querySelector('#ingredients').addEventListener('change', (e)=> {
    const filterIngre = getFilterIngre()
    // filterIngre[e.target.value] = e.target.checked
    filterIngre.forEach((ingre) => {
        if (ingre.name === e.target.value) {
            ingre.chosen = e.target.checked
        }
    })
    renderList()
})

document.querySelector('#foodType').addEventListener('change', (e) => {
    const filterType = getFilterType()
    filterType.type = e.target.value
    renderList()
})


