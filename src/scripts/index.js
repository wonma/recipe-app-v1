const modal = document.querySelector('#modal')
document.getElementById('open-modal').addEventListener('click', () => {
    modal.classList.add('modal--is-visible')
})

document.getElementById('modal-close').addEventListener('click', () => {
    modal.classList.remove('modal--is-visible')
})

const showError = function (area, message) {
    document.querySelector('#errorMessage').innerHTML = ''
    const errorArea = document.querySelector(area) // div
    const errorMessage = document.createElement('p')
    errorMessage.textContent = message
    errorArea.append(errorMessage)
}

document.querySelector('#register-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const [userName, email, password, passwordConfirm] = e.target.elements

    const validChars = /^([a-zA-Z0-9_\-]*)$/  // No special character, no space allowed

    // When nothing has been typed
    if (!userName.value.length || 
        !email.value.length || 
        !password.value.length || 
        !passwordConfirm.value.length) { 
        showError('#errorMessage', 'Please fill all the fields.')
        return false
    }

    // When something has been typed
    if (!validChars.test(userName.value)) {
        showError('#errorMessage', 'Username error: No special character, no space')
        return false
    } else if (password.value.length < 6) {
        showError('#errorMessage', 'Password should be at least 6 characters.')
        return false
    }
      else if (password.value !== passwordConfirm.value) {
        showError('#errorMessage', 'Please type your password again.')
        return false
    } 

    fetch('http://localhost:3000/users/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: userName.value,
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        })
    })
    .then(response => response.json())
    .then(loginInfo => {
        // db에서 오류라고 판단하면 loginInfo는 error 오브젝트가 됨.
        // if the inputs are invalid, loginInfo is 'errors' object.
        document.querySelector('#errorMessage').innerHTML =''

        if(loginInfo.code === 11000) {
            showError('#errorMessage', 'The email is already registered.')
        }
        if(loginInfo.email) {
            showError('#errorMessage', 'Woops! Email is invalid.')
        } else if(loginInfo.password) {
            showError('#errorMessage', 'Woops! Password is invalid.')
        }

        if (typeof loginInfo.token === 'string') {
            localStorage.setItem('x-auth', loginInfo.token)
        } else {
            return
        }
        localStorage.setItem('user', loginInfo.user.name)

        // Populate localStroage key 'filterIngre'
        const filterIngre = loginInfo.user.filterIngre.map((ingre) => {
            return { 'name': ingre, 'chosen': false }
        })
        localStorage.setItem('filterIngre', JSON.stringify(filterIngre))

        // Populate localStroage key 'filterType'
        const filterType = loginInfo.user.filterType.map((type) => {
            return type === 'any' ? { 'name': type, 'chosen': true } : { 'name': type, 'chosen': false }
        })
        localStorage.setItem('filterTypes', JSON.stringify(filterType))

        location.assign(`/main.html`)
    })
    .catch(err => console.log(err))
})


document.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('#loginError').innerHTML = ''

    const [email, password] = e.target.elements
    
    fetch('http://localhost:3000/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        })
    }).then(response => response.json())
        .then(loginInfo => {
            if (loginInfo.message ==='No existing user') {
                showError('#loginError', `The email is not registered.`)
                return false
            } else if (loginInfo.message === 'Wrong password') {
                showError('#loginError', `Check the password please.`)
                return false
            }
            
            localStorage.setItem('x-auth', loginInfo.token)
            localStorage.setItem('user', loginInfo.user.name)

            // Populate localStroage key 'filterIngre'
            const filterIngre = loginInfo.user.filterIngre.map((ingre) => {
                return { 'name': ingre, 'chosen': false }
            })
            localStorage.setItem('filterIngre', JSON.stringify(filterIngre))

            // Populate localStroage key 'filterType'
            const filterType = loginInfo.user.filterType.map((type) => {
                return type === 'any' ? { 'name': type, 'chosen': true } : { 'name': type, 'chosen': false }
            })
            localStorage.setItem('filterTypes', JSON.stringify(filterType))

            location.assign(`/main.html`)
        })
        .catch(err => {console.log(err)})
})

