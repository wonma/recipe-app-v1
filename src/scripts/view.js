const recipeID = location.hash.substring(1)
const token = localStorage.getItem('x-auth')

if (recipeID.length > 0) {
    fetch(`https://ingre-app.herokuapp.com/recipes/${recipeID}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        }
    })
        .then(response => response.json())
        .then((res) => {
            // Initiating title, type, serving, text body
            const theRecipe = res.recipe

            // title
            const viewTitle = document.querySelector('#viewTitle')
            viewTitle.textContent = theRecipe.title

            // type
            const viewType = document.querySelector('#viewType')
            viewType.textContent = theRecipe.type


            // serving
            const viewServing = document.querySelector('#viewServing')
            viewServing.textContent = theRecipe.serving.toString()

            const mainIngreArea = document.querySelector('#mainIngreArea')
            // Main Ingredient
            theRecipe.mainIngre.forEach((eachIngre) => {
                const mainIngre = document.createElement('li')
                mainIngre.classList.add('view__ingre')

                const mainIngreName = document.createElement('span')
                mainIngreName.textContent = eachIngre.name
                mainIngreName.classList.add('view__ingre-name')

                const mainIngreAmount = document.createElement('span')
                mainIngreAmount.textContent = eachIngre.amount
                mainIngreAmount.classList.add('view__ingre-amount')

                mainIngre.appendChild(mainIngreName)
                mainIngre.appendChild(mainIngreAmount)

                mainIngreArea.appendChild(mainIngre)
            })

            const subIngreArea = document.querySelector('#subIngreArea')
            // Sub Ingredient
            theRecipe.subIngre.forEach((eachIngre) => {
                const subIngre = document.createElement('li')
                subIngre.classList.add('view__ingre')

                const subIngreName = document.createElement('span')
                subIngreName.textContent = eachIngre.name
                subIngreName.classList.add('view__ingre-name')

                const subIngreAmount = document.createElement('span')
                subIngreAmount.textContent = eachIngre.amount
                subIngreAmount.classList.add('view__ingre-amount')

                subIngre.appendChild(subIngreName)
                subIngre.appendChild(subIngreAmount)

                subIngreArea.appendChild(subIngre)
            })


            // text body
            const viewBody = document.querySelector('#viewBody')
            viewBody.textContent = theRecipe.text

            // Edit btn
            const editBtn = document.querySelector('#view__btn-edit')
            editBtn.addEventListener('click', () => {
                location.assign(`/edit.html#${theRecipe._id}`)
            })
        })

}


