import { renderList } from './view'
import { getFilterIngre, getFilterType, addIngre } from './filters'
import { createRecipe } from './recipe'


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


// Added ingredient filter button
document.querySelector('#add-ingre').addEventListener('click', (e) => {
    addIngre()
})

// Added creating new recipe button
document.querySelector('#add-new').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

// Re-render with filtered ingredients checked
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
