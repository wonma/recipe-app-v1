import { renderList } from './view'
import { getFilterIngre, getFilterType, addIngre } from './filters'
import { createRecipe } from './recipe'


renderList()

document.querySelector('#add-ingre').addEventListener('click', (e) => {
    addIngre()
})

document.querySelector('#add-new').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#ingredients').addEventListener('change', (e)=> {
    const filterIngre = getFilterIngre()
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
