import { renderList } from './mainRender'
import { renderItemFilter, chosenType, editState, pickType } from './filters'


const token = localStorage.getItem('x-auth')

if(!token) {
    location.assign('index.html')
}

const username = localStorage.getItem('user')
document.querySelector('#username').textContent = username


renderItemFilter(editState.ingre, 'ingre')
renderItemFilter(editState.type, 'type')

let getRecipes = []

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
        getRecipes = res.recipes
        return res.recipes
    })
    .then((recipes) => {

        // Re-render with ingredients to filter checked
        document.querySelector('#ingredients').addEventListener('change', (e)=> {
            const filterIngre = JSON.parse(localStorage.getItem('filterIngre'))
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
            console.log('hahaha',e)
            pickType(e.target.value)
            renderItemFilter(editState.ingre, 'type')
            renderList(recipes)
        })
    })
    .catch(err => console.log('Failed to fetch')) 

// Ingredient filter button
document.querySelector('#add-ingre').addEventListener('click', (e) => {
    const editFilterBtn = document.querySelector('#add-ingre')

    if (editState.ingre === 'off') {
        editState.ingre = 'on'
        editFilterBtn.textContent = 'Done'
        renderItemFilter(editState.ingre, 'ingre')
    } else if (editState.ingre === 'on') {
        editState.ingre = 'off'
        editFilterBtn.textContent = 'Edit'

        fetch('http://localhost:3000/users/me/ingres', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            },
            body: JSON.stringify({ filterIngre: JSON.parse(localStorage.getItem('filterIngre'))})
        })
            .then(response => response.json())
            .then((filterIngre) => {
                renderItemFilter(editState.ingre, 'ingre')

                // reset rendered list
                const currentIngre = JSON.parse(localStorage.getItem('filterIngre'))
                const updatedIngre = currentIngre.map(ingre => {
                    return {name: ingre.name, chosen: false}
                })
                localStorage.setItem('filterIngre', JSON.stringify(updatedIngre))
                renderList(getRecipes)

            })
            .catch((e) => {
                console.log('Error from front')
            })
    }
})

// Type filter button
document.querySelector('#add-type').addEventListener('click', (e) => {
    const editTypeBtn = document.querySelector('#add-type')

    if (editState.type === 'off') {
        editState.type = 'on'
        editTypeBtn.textContent = 'Done'
        renderItemFilter(editState.type, 'type')
    } else if (editState.type === 'on') {
        editState.type = 'off'
        editTypeBtn.textContent = 'Edit'

        const currentType = JSON.parse(localStorage.getItem('filterTypes'))
        const updatedTypes = currentType.map(type => {
            if (type.name === "any") {
                return { name: type.name, chosen: true }
            } else {
                return { name: type.name, chosen: false }
            }
        })

        fetch('http://localhost:3000/users/me/types', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            },
            body: JSON.stringify({ filterTypes: updatedTypes })
        })
            .then(response => response.json())
            .then((filterTypes) => {
                // reset rendered list
                localStorage.setItem('filterTypes', JSON.stringify(updatedTypes))

                // 문제는 여기에 있었다. type filter 렌더링을 좌지우지하는건 localStorage가 아니라
                // chosenType이었다.
                chosenType.type ='any'
                renderItemFilter(editState.type, 'type')
                renderList(getRecipes)
            })
            .catch((e) => {
                console.log('Error from front')
            })
    }
})

// Log out 
document.querySelector('#logout').addEventListener('click', (e) => {
    fetch('http://localhost:3000/users/me/token', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        }
    })
        .then(response => {
            localStorage.clear()
            location.assign(`/index.html`)
            
        })
})


// Creating new recipe button
document.querySelector('#add-new').addEventListener('click', (e) => {
    location.assign(`/edit.html`)
})
