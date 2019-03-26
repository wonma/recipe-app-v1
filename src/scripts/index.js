const modal = document.querySelector('#modal')
document.getElementById('open-modal').addEventListener('click', () => {
    modal.classList.add('modal--is-visible')
})

document.getElementById('modal-close').addEventListener('click', () => {
    modal.classList.remove('modal--is-visible')
})


document.querySelector('#register-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const [userName, email, password, passwordConfirm] = e.target.elements
    if (password.value !== passwordConfirm.value) {
        console.log('password different')
        return 
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
        console.log(loginInfo)
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
        .catch(err => { console.log('unable to login') })
})

