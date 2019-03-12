

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
    }).then(response => response.json())
        .then(user => {
            if (user._id) {
                location.assign(`/main.html`)
            }
        })
        .catch(err => { console.log('unable to login') })
})

export default getUser