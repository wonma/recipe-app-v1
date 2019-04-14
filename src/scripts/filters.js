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
const getIngreDOM = (ingreName, editState) => {
    const ingreForm = document.createElement('form')
    const ingreNameID = ingreName.toLowerCase().trim().replace(/ +/g, ' ').split(' ').join('-')
    if(editState === 'off') {
        ingreForm.classList.add('filter__item')
        // submit후 리스트 올라갈 '체크박스' 만들기
        const createdIngre = document.createElement('input')
        createdIngre.setAttribute('type', 'checkbox')
        createdIngre.setAttribute('id', ingreNameID)
        createdIngre.setAttribute('value', ingreNameID)
        createdIngre.classList.add('filter__checkbox')

        // 체크박스와 연결된 label만들기
        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', ingreNameID)
        newLabel.textContent = ingreNameID.charAt(0).toUpperCase() + ingreNameID.split('-').join(' ').slice(1);
        newLabel.classList.add('filter__name')
        newLabel.addEventListener('click', (e) => {
            const checked = e.target.previousSibling.checked
            if(checked) {
                newLabel.classList.remove('filter__name--checked')
            } else {
                newLabel.classList.add('filter__name--checked')
            }
        })

        // 두 요소 합쳐서 return
        ingreForm.appendChild(createdIngre)
        ingreForm.appendChild(newLabel)

    } else if (editState === 'on') {
        ingreForm.classList.add('filter__item')
        ingreForm.classList.add('filter__item--edit') // padding 조절되는 css추가됨
        // 체크박스와 연결된 label만들기
        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', ingreNameID)
        newLabel.textContent = ingreNameID.charAt(0).toUpperCase() + ingreNameID.split('-').join(' ').slice(1);
        newLabel.classList.add('filter__name')

        // delete 버튼
        const deleteIngreBtn = document.createElement('button')
        deleteIngreBtn.setAttribute('name', ingreNameID)
        deleteIngreBtn.textContent = '-'
        deleteIngreBtn.classList.add('filter__delete')
        deleteIngreBtn.addEventListener('click', (e) => {
            e.preventDefault()
            const ingreIndex = filterIngre.findIndex((ingre) => {
                return ingre.name === e.target.name
            })
            filterIngre.splice(ingreIndex, 1)
            localStorage.setItem('filterIngre', JSON.stringify(filterIngre))
            renderIngreFilter(editFilter.state)
        })     

        ingreForm.appendChild(newLabel)
        ingreForm.appendChild(deleteIngreBtn)
    }
    
    return ingreForm
}


// Generate Type DOM
const getTypeDOM = (typeName, editState) => {
    const typeForm = document.createElement('form')
    typeForm.classList.add('filter__item')
    // 띄어쓰기 부분은 '-'로 바꾸기
    const typeNameID = typeName.toLowerCase().trim().replace(/ +/g, ' ').split(' ').join('-')
    
    if (editState === 'off') {
        
        // submit후 리스트 올라갈 '라디오박스' 만들기
        const createdType = document.createElement('input')
        createdType.setAttribute('type', 'radio')
        createdType.setAttribute('id', typeNameID)
        createdType.setAttribute('name', 'foodType')
        createdType.setAttribute('value', typeNameID)
        createdType.classList.add('filter__radio')

        if (chosenType.type === typeNameID) {
            createdType.setAttribute('checked', 'checked')
        }


        // 체크박스와 연결된 label만들기
        const psuedoRadio = document.createElement('span')
        const labelText = document.createElement('span')
        labelText.classList.add('filter__radio-label-text')

        // '-'로 처리된 부분 띄어쓰기로 바꾸기
        labelText.textContent = typeNameID.charAt(0).toUpperCase() + typeNameID.slice(1).split('-').join(' ')
        psuedoRadio.classList.add('psuedo-radio')

        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', typeNameID)
        newLabel.classList.add('filter__radio-label')

        // 두 요소 합쳐서 return
        newLabel.appendChild(labelText)
        newLabel.appendChild(psuedoRadio)
        typeForm.appendChild(createdType)
        typeForm.appendChild(newLabel)

    } else if (editState === 'on') {

        // 체크박스와 연결된 label만들기
        typeForm.classList.add('filter__item--edit') // padding 조절되는 css추가됨
        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', typeNameID)
        newLabel.textContent = typeNameID.charAt(0).toUpperCase() + typeNameID.slice(1).split('-').join(' ')
        newLabel.classList.add('filter__name') // filterIngre와 스타일이 같아짐
        
        // delete 버튼
        const deleteTypeBtn = document.createElement('button')
        deleteTypeBtn.setAttribute('name', typeNameID)
        deleteTypeBtn.textContent = '-'
        deleteTypeBtn.classList.add('filter__delete')

        deleteTypeBtn.addEventListener('click', (e) => {
            e.preventDefault()
            const typeIndex = filterTypes.findIndex((type) => {
                return type.name === e.target.name
            })
            filterTypes.splice(typeIndex, 1)
            localStorage.setItem('filterTypes', JSON.stringify(filterTypes))
            renderTypeFilter(editType.state)
        })
        typeForm.appendChild(newLabel)
        typeForm.appendChild(deleteTypeBtn)
    }

    return typeForm
}





// [1] Render Ingre Filter
const renderIngreFilter = (editState) => {
    filterIngre = getFilterIngre()

    const ingreArea = document.querySelector('#ingreArea')
    ingreArea.innerHTML = ''

    filterIngre.forEach((ingre) => {
        return ingreArea.appendChild(getIngreDOM(ingre.name, editState))
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
        return typeArea.appendChild(getTypeDOM(type.name, editState))
    })

    const newTypeForm = document.querySelector('#newTypeForm')

    if (editState === 'on') {
        newTypeForm.classList.add('isEditOn')
    } else if (editState === 'off') {
        newTypeForm.classList.remove('isEditOn')
    }
}


// submit 누르면 fitlerIngre 데이터박스에 push됨
// default로는 hidden상태임
const newFilterIngre = document.querySelector('#newIngreForm')
const newIngreInput = document.querySelector('#newIngreInput')
newFilterIngre.addEventListener('submit', (e) => {
    e.preventDefault()
    // trim하고 연속띄어쓰기를 single로바꾸고 띄어쓰기를 '-'로 전환하기
    const inputText = e.target.elements.newIngre.value.toLowerCase().trim().replace(/ +/g, ' ').split(' ').join('-')

    if(inputText.length > 0) {
        filterIngre.push({
            name: inputText,
            chosen: false
        })
        localStorage.setItem('filterIngre', JSON.stringify(filterIngre))

        newIngreInput.value = ''
        renderIngreFilter(editFilter.state)
    }
})

// Adding New Filter Type 
const newTypeForm = document.querySelector('#newTypeForm')
const newTypeInput = document.querySelector('#newTypeInput')
newTypeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newTypeName = e.target.elements.newType.value.toLowerCase().trim().replace(/ +/g, ' ').split(' ').join('-')
    if (newTypeName.length > 0) {
        filterTypes.push({
            name: newTypeName,
            chosen: false
        })
        localStorage.setItem('filterTypes', JSON.stringify(filterTypes))
        newTypeInput.value = ''
        renderTypeFilter(editType.state)
    } else {
        // 경고문 띄우는거 해야함
    }



})


export {renderIngreFilter, editFilter, getFilterIngre, getFilterType, 
        renderTypeFilter, filterTypes, editType, pickType, chosenType }