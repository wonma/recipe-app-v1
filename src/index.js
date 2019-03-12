

let theUser;

const getUser = () => {
    return theUser
}

// 데이터베이스 login, user에 등록까지는 했는데,
// main.html로 넘어갈 때 res로 받은 해당 유저의 user 정보를
// 가지고 넘어가는 방법을 모르겠음!!!!!!!!!! 

document.querySelector('#my-form').addEventListener('submit', (e) => {
    e.preventDefault()
    // const id = createRecipe()

    const [userName, email, password] = e.target.elements

    fetch('http://localhost:3000/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: userName.value,
            email: email.value,
            password: password.value
        })
    }).then(response => response.json())
        .then(user => {
            if (user.id) {
                // theUser = user
                // location.assign(`/main.html`)
                fetch('http://localhost:3000/main', {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: user.email
                    })
                }).then(response => response.json())
                    .catch(err => console.log('Failed to fetch')) 
            }
        })
        .catch(err => { console.log('unable to register') })
})

export default getUser