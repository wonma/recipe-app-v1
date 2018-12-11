import { getFilterIngre, getFilterType } from './filters'

const recipes = [
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
    },

    {
        id: 'b123',
        title: 'Beef pork noodle',
        recipe: 'Step 1 blablabla Step 2 blablabla',
        type: 'noodles',
        serving: 1,
        mainIngre: [{
            name: 'beef',
            amount: '100g'
        }, {
            name: 'pork',
            amount: '160g'
        }],
        subIngre: [{
            name: 'onion',
            amount: 'one'
        }, {
            name: 'broth',
            amount: '2 cups'
        }],
        others: ['green onions, peppers'],
        matchRate: 0
    },

    {
        id: 'c123',
        title: 'Delicious Grilled Kimchi',
        recipe: 'Step 1 blablabla Step 2 blablabla',
        type: 'grilled',
        serving: 1,
        mainIngre: [{
            name: 'kimchi',
            amount: '100g'
        }, {
            name: 'tofu',
            amount: '160g'
        }],
        subIngre: [{
            name: 'potato',
            amount: 'one'
        }, {
            name: 'pork',
            amount: '2 cups'
        }],
        others: ['green onions, peppers'],
        matchRate: 0
    }
]

const getRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('div')

    // Title
    const titleEl = document.createElement('h3')
    titleEl.textContent = recipe.title

    // Food Type
    const foodTypeEl = document.createElement('span')
    foodTypeEl.textContent = recipe.type

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
    
    // Main Ingredient
    const mainIngreArea = document.createElement('div')
    recipe.mainIngre.forEach((eachIngre) => {
        const mainIngreEl = document.createElement('span')
        mainIngreEl.textContent = eachIngre.name  
        mainIngreArea.appendChild(mainIngreEl)     
    })

    // Sub Ingredient
    const subIngreArea = document.createElement('div')
    recipe.subIngre.forEach((eachIngre) => {
        const subIngreEl = document.createElement('span')
        subIngreEl.textContent = eachIngre.name
        subIngreArea.appendChild(subIngreEl)
    })



    recipeEl.appendChild(titleEl)
    recipeEl.appendChild(foodTypeEl)
    recipeEl.appendChild(matchScoreEl)
    recipeEl.appendChild(mainIngreArea)
    recipeEl.appendChild(subIngreArea)



    return recipeEl
}

const filterRecipe = () => {
    return recipes.filter((oneRecipe) => {
        const filterIngre = getFilterIngre()
        const filterType = getFilterType()

        const chosenIngres = []
        filterIngre.forEach((ingre) => {
            if (ingre.chosen === true) {
                chosenIngres.push(ingre.name)
            }
        })

        // Main Ingredients Array
        let mainIngresInOne = []
        oneRecipe.mainIngre.forEach((each) => {
            mainIngresInOne.push(each.name)
        })

        // Sub Ingredients Array
        let subIngresInOne = []
        oneRecipe.subIngre.forEach((each) => {
            subIngresInOne.push(each.name)
        })

        // Main Ingredient (matching each to chosen ingredients)
        let matchedList = []
        mainIngresInOne.forEach((ingre) => {
            matchedList.push(chosenIngres.includes(ingre))
        })
        console.log(matchedList)

        // Sub Ingredient (matching each to chosen ingredients)
        let subMatchedList = []
        subIngresInOne.forEach((ingre) => {
            subMatchedList.push(chosenIngres.includes(ingre))
        })
        console.log(subMatchedList)

        // MatchRate
        const mainMatchedRate = (matchedList.filter(each => each).length / matchedList.length) * .8
        const subMatchedRate = (subMatchedList.filter(each => each).length / subMatchedList.length) * .2
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
}

const renderList = () => {

    const filteredRecipes = filterRecipe()

    const recipesArea = document.querySelector('#recipesArea')
    recipesArea.innerHTML = ''
    filteredRecipes.forEach((recipe) => {
        return recipesArea.appendChild(getRecipeDOM(recipe))
    })


}

export { renderList }