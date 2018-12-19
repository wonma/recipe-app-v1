import uuidv4 from 'uuid/v4'

let recipes = []

const loadData = () => {
    const recipesFromJSON = localStorage.getItem('recipes')
    
    try {
        return recipesFromJSON ? JSON.parse(recipesFromJSON) : []
    } catch (e) {
        return []
    }
}

recipes = loadData()

const getData = () => recipes

const saveData = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const createRecipe = () => {
    const id = uuidv4()
    recipes.push({
        id: id,
        title: '',
        recipe: '',
        type: 'any',
        serving: '1',
        mainIngre: [{
            id: id,
            name: '',
            amount: ''
        }],
        subIngre: [{
            id: id,
            name: '',
            amount: ''
        }],
        others: '',
        matchRate: 0
    })
    
    saveData()
    return id
}



export { getData, createRecipe, saveData } 