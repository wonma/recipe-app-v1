import { renderList } from './view'
import { getFilterIngre, getFilterType, renderIngreFilter, editFilter } from './filters'
import { createRecipe } from './recipe'
// import { getUser } from './index'

// const fetchedUser = getUser()
// console.log(fetchedUser)

fetch('http://localhost:3000/recipes', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
    // how x-auth is passed over to a new route(GET /recipes) after a request to the login route succeeded resulting in response header of x-auth set?
})
.then(response => response.json())
.then((recipes) => {
        console.log(recipes)
    })
.catch(err => console.log('Failed to fetch')) 

// ingre filter 존재하면 renderIngre하고 아니면 'No Ingredient to filter' 메세지 띄우기


////////// 이것들 잠깐 묵혀둠
// renderIngreFilter(editFilter.state)
// renderList()

// // Ingredient filter button
// document.querySelector('#add-ingre').addEventListener('click', (e) => {
//     const editFilterBtn = document.querySelector('#add-ingre')

//     if (editFilter.state === 'off') {
//         editFilter.state = 'on'
//         editFilterBtn.textContent = 'Editing Done'
//     } else if (editFilter.state === 'on') {
//         editFilter.state = 'off'
//         editFilterBtn.textContent = 'Edit Filter'
//     }

//     renderIngreFilter(editFilter.state)
// })

// // Creating new recipe button
// document.querySelector('#add-new').addEventListener('click', (e) => {
//     const id = createRecipe()
//     location.assign(`/edit.html#${id}`)
// })

// // Re-render with ingredients to filter checked
// document.querySelector('#ingredients').addEventListener('change', (e)=> {
//     const filterIngre = getFilterIngre()
//     filterIngre.forEach((ingre) => {
//         if (ingre.name === e.target.value) {
//             ingre.chosen = e.target.checked 
//         }
//     })
//     renderList()
// })

// // Re-render with food type filter checked
// document.querySelector('#foodType').addEventListener('change', (e) => {
//     const filterType = getFilterType()
//     filterType.type = e.target.value
//     renderList()
// })