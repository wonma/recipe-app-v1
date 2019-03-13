import { renderList } from './view'
import { getFilterIngre, getFilterType, renderIngreFilter, editFilter } from './filters'
import { createRecipe } from './recipe'


const username = localStorage.getItem('user')
document.querySelector('#username').textContent = username


// ingre filter 존재하면 renderIngre하고 아니면 'No Ingredient to filter' 메세지 띄우기


renderIngreFilter(editFilter.state)

const token = localStorage.getItem('x-auth')

fetch('http://localhost:3000/recipes', {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'x-auth': token
    }
})
    .then(response => response.json())
    .then((res) => {
        renderList(res.recipes)
        return res.recipes
    })
    .then((recipes) => {

        // Re-render with ingredients to filter checked
        document.querySelector('#ingredients').addEventListener('change', (e)=> {
            const filterIngre = getFilterIngre()
            filterIngre.forEach((ingre) => {
                if (ingre.name === e.target.value) {
                    ingre.chosen = e.target.checked  // filter ingre선택여부 true로 바뀌게 됨
                }
            })
            localStorage.setItem('filterIngre', JSON.stringify(filterIngre))
            renderList(recipes) // filter할 아템은 계속 filterIngre 어레이오브젝트 참고하게됨
        })

        // Re-render with food type filter checked
        document.querySelector('#foodType').addEventListener('change', (e) => {
            const filterType = getFilterType()
            filterType.type = e.target.value
            renderList(recipes)
        })

    })
    .catch(err => console.log('Failed to fetch')) 

// Ingredient filter button
document.querySelector('#add-ingre').addEventListener('click', (e) => {
    const editFilterBtn = document.querySelector('#add-ingre')

    if (editFilter.state === 'off') {
        editFilter.state = 'on'
        editFilterBtn.textContent = 'Editing Done'
    } else if (editFilter.state === 'on') {
        editFilter.state = 'off'
        editFilterBtn.textContent = 'Edit Filter'
    }

    renderIngreFilter(editFilter.state)
})




// // Creating new recipe button
// document.querySelector('#add-new').addEventListener('click', (e) => {
//     const id = createRecipe()
//     location.assign(`/edit.html#${id}`)
// })
