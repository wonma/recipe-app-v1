
const newRecipe = 
    {
        id: 'a123',
        title: 'Beef rice',
        recipe: 'Step 1 blablabla Step 2 blablabla',
        type: 'toppedRice',
        serving: 3,
        mainIngre: [{
            name: 'beef',
            amount: '600g'
        }, {
            name: 'rice',
            amount: '3 bowls'
        }],
        subIngre: [{
            name: 'onion',
            amount: 'one'
        }, {
            name: 'soy sauce',
            amount: '3 Tbs'
        }],
        others: ['sesame oil, salt, kimchi'],
        matchRate: 0
    }


document.querySelector('#mainIngreAdd').addEventListener('submit', (e) => {
    e.preventDefault()
    // const filterIngre = getFilterIngre()
    // filterIngre.forEach((ingre) => {
    //     if (ingre.name === e.target.value) {
    //         ingre.chosen = e.target.checked
    //     }
    // })

    newRecipe.mainIngre.push({
        name: e.target.elements.name.value,
        amount: e.target.elements.amount.value
    })

    renderMainIngre()
})

const getIngreDOM = (ingre) => {
    const ingreEl = document.createElement('div')
    const nameEl = document.createElement('span')
    const amountEl = document.createElement('span')
    const removeEl = document.createElement('button')
    
    nameEl.textContent = ingre.name
    ingreEl.appendChild(nameEl)

    amountEl.textContent = ingre.amount
    ingreEl.appendChild(amountEl)

    removeEl.textContent = 'x'
    // Remove functionality
    removeEl.addEventListener('click', (e) => {
        console.log(e)
    })
    ingreEl.appendChild(removeEl)
    

    return ingreEl
} 

const renderMainIngre = () => {
    const mainIngreArea = document.querySelector('#mainIngreArea')
    mainIngreArea.innerHTML = ''

    newRecipe.mainIngre.forEach((mainIngreEach) => {
        return mainIngreArea.appendChild(getIngreDOM(mainIngreEach))
    })
}