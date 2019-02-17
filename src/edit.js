import { getData, saveData } from './recipe'
import uuidv4 from 'uuid/v4'

const recipes = getData()
const recipeID = location.hash.substring(1)
const theRecipe = recipes.find((recipe) => recipe.id === recipeID)


document.querySelector('#edit-form').addEventListener('submit', (e) => {
    e.preventDefault()

    theRecipe.title = e.target.elements.editTitle.value
    theRecipe.type = e.target.elements.editType.value
    theRecipe.serving = e.target.elements.editServing.value
    theRecipe.recipe = e.target.elements.editBody.value
    saveData()

    location.assign(`/index.html`)
})

        // <button type="button" id="edit-delete">Delete</button>
document.querySelector('#edit-delete').addEventListener('click', (e) => {
    const theIndex = recipes.findIndex((recipe) => recipe.id === recipeID)
    recipes.splice(theIndex, 1)
    saveData()
    
    location.assign(`/index.html`)
})

// Initiating 'Title'
const editTitle = document.querySelector('#editTitle')
editTitle.value = theRecipe.title

// Initiating 'Type'
const editType = document.querySelectorAll('.foodType')
Object.values(editType).forEach((each) => {
    if (each.value === theRecipe.type) {
        document.querySelector(`#${each.id}`).setAttribute('checked', 'checked')
    }
})

// Initiating 'Serving'
const editServing = document.querySelectorAll('.foodServing')
Object.values(editServing).forEach((value) => {
    if (value.value === theRecipe.serving) {
        document.querySelector(`#${value.id}`).setAttribute('selected', 'selected')
    }
})

// Initiating 'Recipe Body'
const editBody = document.querySelector('#editBody')
editBody.value = theRecipe.recipe

// Initiating 'Main Ingre' (DOM)
const generateIngreDOM = (ingre, type) => {
    const ingreEl = document.createElement('div')
    const nameEl = document.createElement('input')
    const amountEl = document.createElement('input')
    const removeEl = document.createElement('button')
    
    nameEl.value = ingre.name.toLowerCase()
    amountEl.value = ingre.amount
    removeEl.textContent = 'x'

    nameEl.setAttribute('placeholder', 'name')
    amountEl.setAttribute('placeholder', 'amount')

    // Input Event Handler
    nameEl.addEventListener('input', (e) => {
        ingre.name = e.target.value
        saveData()
    })
    amountEl.addEventListener('input', (e) => {
        ingre.amount = e.target.value
        saveData()
    })


    // Remove functionality
    if (type === 'main') {
        removeEl.addEventListener('click', () => {
            const ingreIndex = theRecipe.mainIngre.findIndex((each) => each.id === ingre.id)
            theRecipe.mainIngre.splice(ingreIndex, 1)

            saveData()
            renderIngre('main')
        })
    } else if (type === 'sub') {
        removeEl.addEventListener('click', () => {
            const ingreIndex = theRecipe.subIngre.findIndex((each) => each.id === ingre.id)
            theRecipe.subIngre.splice(ingreIndex, 1)

            saveData()
            renderIngre('sub')
        })
    }


    ingreEl.appendChild(nameEl)
    ingreEl.appendChild(amountEl)
    ingreEl.appendChild(removeEl)

    return ingreEl
}

// Initiating 'Main Ingre' (Render)
const renderIngre = (type) => {

    const ingreArea = document.querySelector(`#${type}IngreArea`)
    ingreArea.innerHTML = ''
    
    if (type === 'main') {
        theRecipe.mainIngre.forEach((ingre) => {
            ingreArea.appendChild(generateIngreDOM(ingre, type))
        })
    } else if (type === 'sub') {
        theRecipe.subIngre.forEach((ingre) => {
            ingreArea.appendChild(generateIngreDOM(ingre, type))
        })    
    }

    saveData()
}

renderIngre('main')
renderIngre('sub')



// Main Ingredient 'Add' Button
document.querySelector('#addMainIngre').addEventListener('click', () => {
    const ingreId = uuidv4()
    theRecipe.mainIngre.push({
        id: ingreId,
        name: '',
        amount: '',
        ingreType: 'main'
    })
    renderIngre('main')
})

// Sub Ingredient 'Add' Button
document.querySelector('#addSubIngre').addEventListener('click', () => {
    const ingreId = uuidv4()
    theRecipe.subIngre.push({
        id: ingreId,
        name: '',
        amount: '',
        ingreType: 'sub'
    })
    renderIngre('sub')
})





