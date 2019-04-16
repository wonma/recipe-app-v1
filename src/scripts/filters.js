let filterIngre = []
let filterTypes = []

const editFilter = {
    state: 'off'
}

const editType = {
    state: 'off'
}

// [Export to mainRender.js]
const chosenType = {
    type: 'any'
}

const getFilterIngre = () => {
    return JSON.parse(localStorage.getItem('filterIngre'))
}
const getFilterType = () => {
    return JSON.parse(localStorage.getItem('filterTypes'))
}

// 선택된 type이름을 받아 chosenType에 넘기고, filterTypes어레이 정보도 업뎃함
// [Export to main.js] 
const pickType = (chosenName) => {
    filterTypes.forEach((type) => {
        if (type.name === chosenName) {
            chosenType.type = chosenName
            type.chosen = true
        } else {
            type.chosen = false
        }
    })
}

// [2] Generate DOM
const getItemDOM = (itemName, editState, type) => {
    const itemForm = document.createElement('form')
    itemForm.classList.add('filter__item')
    const itemNameID = itemName.toLowerCase().trim().replace(/ +/g, ' ').split(' ').join('-')
    
    if(editState === 'off') {
        let inputType;

        if (type ==='ingre') {
            inputType = 'checkbox'
        } else {
            inputType = 'radio'
        }
        // '체크박스' 또는 '라디오박스' 만들기
        const createdItem = document.createElement('input')
        createdItem.setAttribute('type', inputType)
        createdItem.setAttribute('id', itemNameID)
        createdItem.setAttribute('value', itemNameID)
        createdItem.classList.add(`filter__${inputType}`)
        if (type === 'type') {
            createdItem.setAttribute('name', 'foodType')
            if (chosenType.type === itemNameID) {
                createdItem.setAttribute('checked', 'checked')
            }
        }

        // 'label'만들기
        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', itemNameID)
        const revisedLabel = itemNameID.charAt(0).toUpperCase() + itemNameID.split('-').join(' ').slice(1)
        
        if(type === 'ingre') {
            newLabel.textContent = revisedLabel
            newLabel.classList.add('filter__name')
            newLabel.addEventListener('click', (e) => {
                const checked = e.target.previousSibling.checked
                if (checked) {
                    newLabel.classList.remove('filter__name--checked')
                } else {
                    newLabel.classList.add('filter__name--checked')
                }
            })
        } else if(type === 'type') {
            newLabel.classList.add('filter__radio-label')

            const psuedoRadio = document.createElement('span')
            const labelText = document.createElement('span')
            labelText.textContent = revisedLabel
            labelText.classList.add('filter__radio-label-text')
            psuedoRadio.classList.add('psuedo-radio')

            newLabel.appendChild(labelText)
            newLabel.appendChild(psuedoRadio)
        }

        itemForm.appendChild(createdItem)
        itemForm.appendChild(newLabel)

    } else if (editState === 'on') {

        // padding 조절되는 css추가됨
        itemForm.classList.add('filter__item--edit') 
        
        // 체크박스와 연결된 label만들기
        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', itemNameID)
        newLabel.textContent = itemNameID.charAt(0).toUpperCase() + itemNameID.split('-').join(' ').slice(1);
        newLabel.classList.add('filter__name')

        // delete 버튼
        const deleteItemBtn = document.createElement('button')
        deleteItemBtn.setAttribute('name', itemNameID)
        deleteItemBtn.textContent = '-'
        deleteItemBtn.classList.add('filter__delete')

        deleteItemBtn.addEventListener('click', (e) => {
            e.preventDefault()

            if(type === 'ingre') {
                const itemIndex = filterIngre.findIndex((ingre) => {
                    return ingre.name === e.target.name
                })
                filterIngre.splice(itemIndex, 1)
                localStorage.setItem('filterIngre', JSON.stringify(filterIngre))
                renderIngreFilter(editFilter.state)
            } else if(type === 'type') {
                const itemIndex = filterTypes.findIndex((type) => {
                    return type.name === e.target.name
                })
                filterTypes.splice(itemIndex, 1)
                localStorage.setItem('filterTypes', JSON.stringify(filterTypes))
                renderTypeFilter(editType.state)            
            }
        })     

        itemForm.appendChild(newLabel)
        itemForm.appendChild(deleteItemBtn)
    }
    
    return itemForm
}




// [1] Render Ingre Filter
const renderIngreFilter = (editState) => {
    filterIngre = getFilterIngre()

    const ingreArea = document.querySelector('#ingreArea')
    ingreArea.innerHTML = ''

    filterIngre.forEach((ingre) => {
        return ingreArea.appendChild(getItemDOM(ingre.name, editState, 'ingre'))
    })

    const newIngreForm = document.querySelector('#newIngreForm')
    const ingredients = document.querySelector('#ingredients')

    if (editState === 'on') {
        ingredients.classList.add('isEditOn')
        newIngreForm.classList.add('isEditOn')
    } else if (editState === 'off') {
        ingredients.classList.remove('isEditOn')
        newIngreForm.classList.remove('isEditOn')
    }
}

// Render Type Filter
const renderTypeFilter = (editState) => {
    filterTypes = getFilterType()

    const typeArea = document.querySelector('#typeArea')
    typeArea.innerHTML = ''

    filterTypes.forEach((type) => {
        return typeArea.appendChild(getItemDOM(type.name, editState, 'type'))
    })

    const newTypeForm = document.querySelector('#newTypeForm')

    if (editState === 'on') {
        newTypeForm.classList.add('isEditOn')
    } else if (editState === 'off') {
        newTypeForm.classList.remove('isEditOn')
    }
}



const addFilterItem = (filter) => {
    let Item;
    filter === 'ingre' ? Item = 'Ingre' : Item = 'Type'

    document.querySelector(`#new${Item}Form`).addEventListener('submit', (e) => {
        e.preventDefault()

        const inputText = filter === 'ingre' ? e.target.elements.newIngre.value : e.target.elements.newType.value
        const revisedInput = inputText.toLowerCase().trim().replace(/ +/g, ' ').split(' ').join('-')
        
        if (revisedInput == 0) {return false}
        const newItem = {
            name: revisedInput,
            chosen: false
        }

        if(filter === 'ingre') {
            filterIngre.push(newItem)  
            localStorage.setItem('filterIngre', JSON.stringify(filterIngre))
            renderIngreFilter(editFilter.state)
        } else {
            filterTypes.push(newItem)  
            localStorage.setItem('filterTypes', JSON.stringify(filterTypes))
            renderTypeFilter(editType.state)
        }
        document.querySelector(`#new${Item}Input`).value = ''
    })
}

addFilterItem('ingre')
addFilterItem('type')








export {renderIngreFilter, editFilter, getFilterIngre, getFilterType, 
        renderTypeFilter, filterTypes, editType, pickType, chosenType }