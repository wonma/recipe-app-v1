import { renderList } from "./view";

const filterIngre = [
    {
        name: 'beef',
        chosen: false
    },    {
        name: 'pork',
        chosen: false
    },    {
        name: 'chicken',
        chosen: false
    },    {
        name: 'tomato',
        chosen: false
    },    {
        name: 'egg',
        chosen: false
    },    {
        name: 'potato',
        chosen: false
    }
]

const addIngre = () => {
    const newFilterIngre = document.createElement('form')
    newFilterIngre.setAttribute('id', 'newIngreForm')
    const newIngreInput = document.createElement('input')
    newIngreInput.setAttribute('name', 'newIngre')


    const filterIngreArea = document.querySelector('#ingredients')
    const newIngreBtn = document.createElement('button')
    newIngreBtn.textContent = '+'
    newFilterIngre.addEventListener('submit', (e) => {
        e.preventDefault()
        filterIngre.push({
            name: e.target.elements.newIngre.value,
            chosen: true
        })

        const createdIngre = document.createElement('input')
        createdIngre.setAttribute('type', 'checkbox')
        createdIngre.setAttribute('checked', 'checked')
        createdIngre.setAttribute('id', e.target.elements.newIngre.value)
        createdIngre.setAttribute('name', 'foodType')
        createdIngre.setAttribute('value', e.target.elements.newIngre.value)

        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', 'potato')
        newLabel.textContent = e.target.elements.newIngre.value

        filterIngreArea.appendChild(createdIngre)
        filterIngreArea.appendChild(newLabel)

        newIngreForm.remove()
        renderList()
    })

    newFilterIngre.appendChild(newIngreInput)
    newFilterIngre.appendChild(newIngreBtn)
    filterIngreArea.appendChild(newFilterIngre)
}

const filterType = {
    type: 'any'
}

const getFilterIngre = () => filterIngre
const getFilterType = () => filterType

export { getFilterIngre, getFilterType, addIngre }