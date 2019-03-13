let filterIngre = []

// Type 정보 state 따라가는 오브젝트
const filterType = {
    type: 'any'
}

const editFilter = {
    state: 'off'
}

const getIngreDOM = (ingreName, editState) => {
    const ingreForm = document.createElement('form')

    if(editState === 'off') {
        // submit후 리스트 올라갈 '체크박스' 만들기
        const createdIngre = document.createElement('input')
        createdIngre.setAttribute('type', 'checkbox')
        createdIngre.setAttribute('id', ingreName)
        createdIngre.setAttribute('name', 'foodType')
        createdIngre.setAttribute('value', ingreName)

        // 체크박스와 연결된 label만들기
        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', ingreName)
        newLabel.textContent = ingreName.charAt(0).toUpperCase() + ingreName.slice(1);

        // 두 요소 합쳐서 return
        ingreForm.appendChild(createdIngre)
        ingreForm.appendChild(newLabel)

    } else if (editState === 'on') {
        // 체크박스와 연결된 label만들기
        const newLabel = document.createElement('label')
        newLabel.setAttribute('for', ingreName)
        newLabel.textContent = ingreName.charAt(0).toUpperCase() + ingreName.slice(1)

        // delete 버튼
        const deleteIngreBtn = document.createElement('button')
        deleteIngreBtn.setAttribute('name', ingreName)
        deleteIngreBtn.textContent = '-'
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

// Render Ingre Filter
const renderIngreFilter = (editState) => {
    filterIngre = getFilterIngre()

    const ingreArea = document.querySelector('#ingreArea')
    ingreArea.innerHTML = ''

    filterIngre.forEach((ingre) => {
        return ingreArea.appendChild(getIngreDOM(ingre.name, editState))
    })

    const newIngreForm = document.querySelector('#newIngreForm')

    if (editState === 'on') {
        newIngreForm.classList.remove('isEditOff')
    } else if (editState === 'off') {
        newIngreForm.classList.add('isEditOff')
    }
}


// submit 누르면 fitlerIngre 데이터박스에 push됨
const newFilterIngre = document.querySelector('#newIngreForm')
const newIngreInput = document.querySelector('#newIngreInput')
newFilterIngre.addEventListener('submit', (e) => {
    e.preventDefault()
    const newIngreName = e.target.elements.newIngre.value.toLowerCase()
    filterIngre.push({
        name: newIngreName,
        chosen: false
    })
    localStorage.setItem('filterIngre', JSON.stringify(filterIngre))

    newIngreInput.value = ''
    renderIngreFilter(editFilter.state)
})


// const getFilterIngre = () => filterIngre
const getFilterIngre = () => {
    return JSON.parse(localStorage.getItem('filterIngre'))
}
const getFilterType = () => filterType

export { getFilterIngre, getFilterType, renderIngreFilter, editFilter }