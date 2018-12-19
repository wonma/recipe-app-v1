import { getData } from './recipe'
import { getFilterIngre, getFilterType } from './filters'

const recipes = getData()

const getRecipeDOM = (recipe) => {
    const recipeLi = document.createElement('li')
    const recipeA = document.createElement('a')
    recipeA.classList.add('recipe-link')
    recipeA.setAttribute('href', `/recipe.html#${recipe.id}`)
    recipeLi.appendChild(recipeA)

    // Title
    const titleEl = document.createElement('h3')
    titleEl.classList.add('recipe-title')
    titleEl.textContent = recipe.title
    recipeA.appendChild(titleEl)

    // Go-to-edit button
    const editEl = document.createElement('a')
    editEl.textContent = 'edit'
    editEl.classList.add('recipe-edit')
    editEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeA.appendChild(editEl)


    // Food Type
    const foodTypeEl = document.createElement('span')
    foodTypeEl.textContent = recipe.type
    recipeA.appendChild(foodTypeEl)

    // Match Score
    const matchScoreEl = document.createElement('span')
    if(recipe.matchRate !== 0) {
        if (recipe.matchRate >= 80) {
            matchScoreEl.textContent = 'Perfect Match!'
        } else if (recipe.matchRate >= 40) {
            matchScoreEl.textContent = 'Nice Match!'
        } else if (recipe.matchRate >= 20) {
            matchScoreEl.textContent = 'Not a bad Match!'
        } else {
            matchScoreEl.textContent = 'Need to go for a grocery shopping!'
        }
    }
    recipeA.appendChild(matchScoreEl)

    
    // Main Ingredient
    const mainIngreArea = document.createElement('div')
    recipe.mainIngre.forEach((eachIngre) => {
        const mainIngreEl = document.createElement('span')
        mainIngreEl.textContent = eachIngre.name  
        mainIngreArea.appendChild(mainIngreEl)     
    })
    recipeA.appendChild(mainIngreArea)


    // Sub Ingredient
    const subIngreArea = document.createElement('div')
    recipe.subIngre.forEach((eachIngre) => {
        const subIngreEl = document.createElement('span')
        subIngreEl.textContent = eachIngre.name
        subIngreArea.appendChild(subIngreEl)
    })
    recipeA.appendChild(subIngreArea)

    return recipeLi
}

const filterRecipe = () => {
    const filterIngre = getFilterIngre()
    const filterType = getFilterType()

    const chosenIngres = [] //eg. ['beef', 'pork']
    filterIngre.forEach((ingre) => {
        if (ingre.chosen === true) {
            chosenIngres.push(ingre.name)
        }
    })

    const filteredRecipes = recipes.filter((oneRecipe) => {

        // Main Ingredients Array
        let mainIngresInOne = [] //eg. ['beef', 'pork loin']
        oneRecipe.mainIngre.forEach((each) => {
            mainIngresInOne.push(each.name)
        })

        // Sub Ingredients Array
        let subIngresInOne = []
        oneRecipe.subIngre.forEach((each) => {
            subIngresInOne.push(each.name)
        })

        // Main Ingredient (matching each to chosen ingredients)
        let matchedList = [] //eg. [true, false]
        chosenIngres.forEach((ingre) => {
            mainIngresInOne.forEach((each) => {
                each.includes(ingre) ? matchedList.push(true) : matchedList.push(false)
            })
        })

        // Sub Ingredient (matching each to chosen ingredients)
        let subMatchedList = []
        chosenIngres.forEach((ingre) => {
            subIngresInOne.forEach((each) => {
                each.includes(ingre) ? subMatchedList.push(true) : subMatchedList.push(false)
            })
        })

        // MatchRate
        let mainMatchedRate = 0
        let subMatchedRate = 0
        if (matchedList.length > 0) {
            mainMatchedRate = (matchedList.filter(each => each).length / oneRecipe.mainIngre.length) * .8
        }
        if (subMatchedList.length > 0) {
            subMatchedRate = (subMatchedList.filter(each => each).length / oneRecipe.subIngre.length) * .2
        }
        
        oneRecipe.matchRate = (mainMatchedRate + subMatchedRate) * 100

        // type 판단
        let isTypeMatch = filterType.type === 'any' || filterType.type === oneRecipe.type


        // ingre선택 없으면 모두 출력하도록 설정
        if (chosenIngres.length <= 0) {
            return isTypeMatch
        } else {
            const match01 = matchedList.includes(true) && isTypeMatch
            const match02 = subMatchedList.includes(true) && isTypeMatch
            return match01 || match02
        }

    })

    // Sorting criteria
    if (chosenIngres.length <= 0) {
        filteredRecipes.sort((a, b) => { 
            if (a.id > b.id) {
                return 1
            } else if (b.id > a.id) {
                return -1
            } else {
                return 0
            }
        })
    } else {
        filteredRecipes.sort((a, b) => { 
            if (a.matchRate < b.matchRate) {
                return 1
            } else if (b.matchRate < a.matchRate) {
                return -1
            } else {
                return 0
            }
        })
    }


    return filteredRecipes
}

const renderList = () => {

    const recipesArea = document.querySelector('#recipesArea')
    recipesArea.innerHTML = ''
    // recipes가 비었는지 확인한다
    if (recipes.length <= 0) {
        const noResultEl = document.createElement('p')
        noResultEl.textContent = 'No result'
        recipesArea.appendChild(noResultEl)    
        return  
    }

    // recipes를 필터링해온다
    const filteredRecipes = filterRecipe()

    // recipes를 DOM으로 출력한다.
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            return recipesArea.appendChild(getRecipeDOM(recipe))
        })
    } else {
        const noResultText = document.createElement('p')
        noResultText.textContent = 'No recipe found'
        recipesArea.appendChild(noResultText)
    }

}

export { renderList }