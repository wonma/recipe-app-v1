import { renderList } from './view'
import { getFilterIngre, getFilterType, renderIngreFilter, editFilter } from './filters'
import { createRecipe } from './recipe'

renderIngreFilter(editFilter.state)
renderList()

fetch('http://localhost:3000/', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'This is email',
        password: '1111'
    })
}).then(response => response.json())
    .then(user => {
        if (user.id) {                          // 성공한 후 반응 두 가지
            this.props.onRouteChange('home')    // (1) home 화면 render
            this.props.loadUser(user)           // (2) user정보 넘겨서 state 업뎃하기
        } else if (user === 'blank') {
            this.onWrongUser()
            this.setState({ failFrom: 'blank' })
        } else if (user === 'wronginfo') {
            this.onWrongUser()
            this.setState({ failFrom: 'wrongInfo' })
        }
    })
    .catch(err => console.log('Failed to fetch')) 

// ingre filter 존재하면 renderIngre하고 아니면 'No Ingredient to filter' 메세지 띄우기


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

// Creating new recipe button
document.querySelector('#add-new').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

// Re-render with ingredients to filter checked
document.querySelector('#ingredients').addEventListener('change', (e)=> {
    const filterIngre = getFilterIngre()
    filterIngre.forEach((ingre) => {
        if (ingre.name === e.target.value) {
            ingre.chosen = e.target.checked 
        }
    })
    renderList()
})

// Re-render with food type filter checked
document.querySelector('#foodType').addEventListener('change', (e) => {
    const filterType = getFilterType()
    filterType.type = e.target.value
    renderList()
})
