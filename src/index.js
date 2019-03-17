

let theUser;

const getUser = () => {
    return theUser
}

document.querySelector('#my-form').addEventListener('submit', (e) => {
    e.preventDefault()
    // const id = createRecipe()

    const [email, password] = e.target.elements
    console.log(email.value, password.value)
    fetch('http://localhost:3000/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    }).then(response => {
        return response.json()
    })
        .then(loginInfo => {
            localStorage.removeItem('x-auth')
            localStorage.setItem('x-auth', loginInfo.token)
            localStorage.setItem('user', loginInfo.user.name)

            // Populate localStroage key 'filterIngre'
            const filterIngre = loginInfo.user.filterIngre.map((ingre) => {
                return {'name': ingre, 'chosen': false}
            })
            localStorage.setItem('filterIngre', JSON.stringify(filterIngre))

            // Populate localStroage key 'filterType'
            const filterType = loginInfo.user.filterType.map((type) => {
                return type === 'any' ? {'name': type, 'chosen': true} : { 'name': type, 'chosen': false}
            })
            localStorage.setItem('filterTypes', JSON.stringify(filterType))

            location.assign(`/main.html`)
        })
        .catch(err => { console.log('unable to login') })
})

export default getUser