

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
        .then(tokenObj => {
            localStorage.removeItem('x-auth')
            localStorage.setItem('x-auth', tokenObj.token)
            localStorage.setItem('user', tokenObj.user.name)
            const filterIngre = tokenObj.user.filterIngre.map((ingre) => {
                return {'name': ingre, 'chosen': false}
            })
            localStorage.setItem('filterIngre', JSON.stringify(filterIngre))
            location.assign(`/main.html`)
        })
        .catch(err => { console.log('unable to login') })
})

export default getUser