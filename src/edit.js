// import { saveData } from './recipe'
// import { getFilterType } from './filters'
import uuidv4 from 'uuid/v4'

// const recipes = getData()
const recipeID = location.hash.substring(1)
// const theIngres = recipes.find((recipe) => recipe.id === recipeID)

let theIngres;
let theRecipe;

const token = localStorage.getItem('x-auth')

let pageMode = 'createMode'

if (recipeID.length > 0) {
    pageMode = 'editMode'
}

const getTypeDOM = (typeName) => {
    const typeDiv = document.createElement('div')
    // const typeNameID = typeName.toLowerCase().trim().replace(/ +/g, ' ').split(' ').join('-')

    // '라디오박스' 만들기
    const createdType = document.createElement('input')
    createdType.setAttribute('type', 'radio')
    createdType.setAttribute('id', typeName)
    createdType.setAttribute('name', 'foodType')
    createdType.setAttribute('value', typeName)
    createdType.classList.add('foodType')

    // 체크박스와 연결된 label만들기
    const newLabel = document.createElement('label')
    newLabel.setAttribute('for', typeName)
    newLabel.textContent = typeName.charAt(0).toUpperCase() + typeName.slice(1).split('-').join(' ')

    // 두 요소 합쳐서 return
    typeDiv.appendChild(createdType)
    typeDiv.appendChild(newLabel)
    return typeDiv
}

const renderTypeFilter = () => {
    const filterTypes = JSON.parse(localStorage.getItem('filterTypes'))

    const editType = document.querySelector('#editType')
    editType.innerHTML = ''

    filterTypes.forEach((type) => {
        return editType.appendChild(getTypeDOM(type.name))
    })
}


// Initiating 'Main Ingre' (DOM)
const generateIngreDOM = (ingre, type) => {

    const ingreDiv = document.createElement('div')
    const nameEl = document.createElement('input')
    const amountEl = document.createElement('input')
    const removeEl = document.createElement('button')

    nameEl.value = ingre.name.toLowerCase()
    amountEl.value = ingre.amount
    removeEl.textContent = 'x'
    nameEl.setAttribute('placeholder', 'name')
    // nameEl.setAttribute('id', `${type}Ingre-`)
    amountEl.setAttribute('placeholder', 'amount')

    nameEl.addEventListener('change', (e) => {
        console.log(e)
    })
    

    // Input Event Handler
    nameEl.addEventListener('input', (e) => {
        type === 'main' ? theIngres.mainIngre = [] : theIngres.subIngre = []
        Array.from(document.querySelector(`#${type}IngreArea`).children).forEach((each) => {
            const name = each.children[0].value
            const amount = each.children[1].value
            type === 'main' ? theIngres.mainIngre.push({name, amount})
                : theIngres.subIngre.push({ name, amount })
        })
        localStorage.setItem(`${type}Ingre`, JSON.stringify(theIngres[`${type}Ingre`]))
    })
    amountEl.addEventListener('input', (e) => {
        type === 'main' ? theIngres.mainIngre = [] : theIngres.subIngre = []
        Array.from(document.querySelector(`#${type}IngreArea`).children).forEach((each) => {
            const name = each.children[0].value
            const amount = each.children[1].value
            type === 'main' ? theIngres.mainIngre.push({ name, amount })
                : theIngres.subIngre.push({ name, amount })
        })
        localStorage.setItem(`${type}Ingre`, JSON.stringify(theIngres[`${type}Ingre`]))
    })

    // Remove functionality
    if (type === 'main') {
        removeEl.addEventListener('click', () => {
            const ingreIndex = theIngres.mainIngre.findIndex((each) => each.id === ingre.id)
            theIngres.mainIngre.splice(ingreIndex, 1)

            renderIngre('main')
        })
    } else if (type === 'sub') {
        removeEl.addEventListener('click', () => {
            const ingreIndex = theIngres.subIngre.findIndex((each) => each.id === ingre.id)
            theIngres.subIngre.splice(ingreIndex, 1)

            renderIngre('sub')
        })
    }

    ingreDiv.appendChild(nameEl)
    ingreDiv.appendChild(amountEl)
    ingreDiv.appendChild(removeEl)
    return ingreDiv
}

// Initiating 'Main Ingre' (Render)
const renderIngre = (type) => {

    const ingreArea = document.querySelector(`#${type}IngreArea`)
    ingreArea.innerHTML = ''
    // theIngres.mainIngre : theIngres.subIngre
    let ingreArray = type === 'main' ? theIngres.mainIngre : theIngres.subIngre

    ingreArray.forEach((obj) => {
        ingreArea.appendChild(generateIngreDOM(obj, type))
    })

    type === 'main' ? localStorage.setItem(`${type}Ingre`, JSON.stringify(theIngres.mainIngre))
        : localStorage.setItem(`${type}Ingre`, JSON.stringify(theIngres.subIngre))
}

// fetch GET해서 type 정보 받아오기
renderTypeFilter()

// Initial query from data
if (recipeID.length > 0) { // hash 있음 (기존 Recipe 편집)

    fetch(`http://localhost:3000/recipes/${recipeID}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        }
    })
        .then(response => response.json())
        .then((res) => {
            localStorage.setItem('mainIngre', JSON.stringify(res.recipe.mainIngre))
            localStorage.setItem('subIngre', JSON.stringify(res.recipe.subIngre))

            theIngres = {
                mainIngre: res.recipe.mainIngre,
                subIngre: res.recipe.subIngre
            }

            renderIngre('main')
            renderIngre('sub')

            // Initiating title, type, serving, text body
            theRecipe = res.recipe 

            // title
            const editTitle = document.querySelector('#editTitle')
            editTitle.value = theRecipe.title

            // type
            const editType = document.querySelectorAll('.foodType')
            Object.values(editType).forEach((each) => {
                if (each.value === theRecipe.type) {
                    document.querySelector(`#${each.id}`).setAttribute('checked', 'checked')
                }
            })

            // serving
            const editServing = document.querySelectorAll('.foodServing')
            Object.values(editServing).forEach((value) => {
                if (value.value == theRecipe.serving) {
                    document.querySelector(`#${value.id}`).setAttribute('selected', 'selected')
                }
            })

            // text body
            const editBody = document.querySelector('#editBody')
            editBody.value = theRecipe.text

        })

} else {    // hash 없음 (새 Recipe 작성)
    theIngres = {
        mainIngre: [{
            name: '',
            amount: ''
        }],
        subIngre: [{
            name: '',
            amount: ''
        }]
    }
    renderIngre('main')
    renderIngre('sub')
}


// Main Ingredient 'Add' Button
document.querySelector('#addMainIngre').addEventListener('click', () => {
    const ingreId = uuidv4()
    theIngres.mainIngre.push({
        id: ingreId,
        name: '',
        amount: ''
    })
    renderIngre('main')
    localStorage.setItem(`mainIngre`, JSON.stringify(theIngres.mainIngre))

})

// Sub Ingredient 'Add' Button
document.querySelector('#addSubIngre').addEventListener('click', () => {
    const ingreId = uuidv4()
    theIngres.subIngre.push({
        id: ingreId,
        name: '',
        amount: ''
    })
    renderIngre('sub')
    localStorage.setItem(`subIngre`, JSON.stringify(theIngres.subIngre))
})



///////////////// Button - Save (Create New)
document.querySelector('#edit-form').addEventListener('submit', (e) => {
    e.preventDefault()

    console.log(e)

    const body = {
        title: e.target.elements.editTitle.value,
        type: e.target.elements.foodType.value,
        serving: e.target.elements.editServing.value,
        text: e.target.elements.editBody.value,
        mainIngre: [],
        subIngre: []
    }


    try {
        // 이렇게 셀렉 가능하긴 함: document.querySelector('#subIngreArea').children
        Array.from(e.target.children.mainIngres.children.mainIngreArea.children).forEach((each) => {
            const name = each.children[0].value
            const amount = each.children[1].value
            if (name.length === 0 || amount.length === 0) {
                throw new Error('The ingre should be full')
            }
            body.mainIngre.push({
                name,
                amount
            })
        })

        Array.from(e.target.children.subIngres.children.subIngreArea.children).forEach((each) => {
            const name = each.children[0].value
            const amount = each.children[1].value
            if (name.length === 0 || amount.length === 0) {
                throw new Error('The ingre should be full')
            }
            body.subIngre.push({
                name,
                amount
            })
        })


        if (pageMode === 'createMode') {
            fetch(`http://localhost:3000/recipes/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': token
                },
                body: JSON.stringify(body)
            })
                // .then(response => response.json())
                .then((res) => {
                    console.log(res)
                    location.assign(`/main.html`)

                }).catch((e) => {
                    console.log('Hmm fetch failed')
                })

        } else {
            fetch(`http://localhost:3000/recipes/${recipeID}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': token
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then((res) => {
                    console.log(res)
                    location.assign(`/main.html`)

                }).catch((e) => {
                    console.log('Hmm fetch failed')
                })
        }


    } catch (e) {
        console.log(e)
    }
})


// 'Delete' Button
document.querySelector('#edit-delete').addEventListener('click', (e) => {
    const deleteConfirm = confirm("Want to delete?");
    if (deleteConfirm) {
        fetch(`http://localhost:3000/recipes/${recipeID}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            }
        }).then((res) => {
            location.assign(`/main.html`)
        })
        .catch((e) => {
            console.log('Deleting request failed')
        })
    }
})


// 'Cancel' button
document.querySelector('#edit-cancel').addEventListener('click', () => {
    location.assign(`/main.html`)
})