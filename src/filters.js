import { renderList } from "./view";

// Ingredient 오브젝트 state 모음 Array
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

// Type 정보 state 따라가는 오브젝트
const filterType = {
    type: 'any'
}

const editFilter = {
    state: 'off'
}

// Add Ingre Filter feature
const addIngre = () => {

    // 새로운 Form을 생성한다 (input field와 '+' button을 포함한)
    const newFilterIngre = document.createElement('form')
    newFilterIngre.setAttribute('id', 'newIngreForm')
    const newIngreInput = document.createElement('input')
    newIngreInput.setAttribute('name', 'newIngre')
    const filterIngreArea = document.querySelector('#ingredients')
    const newIngreBtn = document.createElement('button')
    newIngreBtn.textContent = '+'

    // submit 누르면 fitlerIngre 데이터박스에 push됨
    newFilterIngre.addEventListener('submit', (e) => {
        e.preventDefault()
        const newIngreName = e.target.elements.newIngre.value.toLowerCase()
        filterIngre.push({
            name: newIngreName,
            chosen: true
        })

        // submit후 리스트 올라갈 '체크박스 + 이름' 셋트 만들기
        const createdIngre = document.createElement('input')
        createdIngre.setAttribute('type', 'checkbox')
        createdIngre.setAttribute('checked', 'checked')
        createdIngre.setAttribute('id', newIngreName)
        createdIngre.setAttribute('name', 'foodType')
        createdIngre.setAttribute('value', newIngreName)

        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', newIngreName)
        newLabel.textContent = newIngreName.charAt(0).toUpperCase() + newIngreName.slice(1);

        filterIngreArea.appendChild(createdIngre)
        filterIngreArea.appendChild(newLabel)

        newIngreForm.remove()
        renderList()
    })

    newFilterIngre.appendChild(newIngreInput)
    newFilterIngre.appendChild(newIngreBtn)
    filterIngreArea.appendChild(newFilterIngre)
}



const getFilterIngre = () => filterIngre
const getFilterType = () => filterType

export { getFilterIngre, getFilterType, addIngre, editFilter }