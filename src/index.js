import uuidv4 from 'uuid/v4'
import { renderList } from './view'
import { getFilterIngre, getFilterType } from './filters'


renderList()

document.querySelector('#add-new').addEventListener('click', (e) => {
    const id = uuidv4()
    // console.log(e.target)
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


