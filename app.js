const form = document.querySelector("#form")
const loginForm = document.querySelector("#login_form")
const button = document.querySelector("#submit")
import AX from "axios"
const token = localStorage.getItem("todo-token")


if(token) {
    AX
        .get("https://todoo.5xcamp.us/todos", {
            headers: {
                authorization: token,
            }
        })
        .then(({data}) => {
            const todolist = document.querySelector("#todolist")
            data.todos.forEach((e) => {
                todolist.insertAdjacentHTML("beforeend", `<li data-id="${e.id}"><button>X</button>${e.content}</li>`)
            })
        })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
        const email = document.querySelector("#email")
        const password = document.querySelector("#password")
        const nickname = document.querySelector("#nickname")
    const userData = {
        user: {
            email: email.value,
            password: password.value,
            nickname: nickname.value,
        }
    }
    AX.post("https://todoo.5xcamp.us/users/", userData).then(( data ) => {
            console.log(data)
        })
})

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
            const email = document.querySelector("#login_email")
            const password = document.querySelector("#login_password")
        const userData = {
            user: {
                email: email.value,
                password: password.value,
            }
        }
        AX.post("https://todoo.5xcamp.us/users/sign_in", userData).then((data) => {
            const Showtoken = document.querySelector(".token")
            Showtoken.insertAdjacentHTML("beforeend", `<p>${data.headers.authorization}</p>`)
            const token = data.headers.authorization
            localStorage.setItem("todo-token", token)
            })
        
    })
    const checkButton = document.querySelector("#check")
    checkButton.addEventListener("click", (e) => {
        const token = localStorage.getItem("todo-token")
        AX
            .get("https://todoo.5xcamp.us/check", {
            headers: { authorization: token }
            })
            .then(({data}) => {
            console.log(token)
            const status = document.querySelector("#status")
            status.textContent = data.message
        })
    })

    document.querySelector("#logout_form").addEventListener("submit", (e) => {
        e.preventDefault()

        const token = localStorage.getItem("todo-token")
        AX
            .delete("https://todoo.5xcamp.us/users/sign_out", {
                headers: { authorization: token }
            })
            .then(({data}) => {
                const logOutStatus = document.querySelector("#logOutStatus")
                logOutStatus.textContent = data.message
            })
    }
    )

    const addForm = document.querySelector("#addForm")
    addForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const token = localStorage.getItem("todo-token")
        const todoInput = document.querySelector("#todoContent")
        const todoData = {
            todo: {
                content: todoInput.value.trim()
            }
        }
        AX
        .post("https://todoo.5xcamp.us/todos", todoData, {
            headers: {
                authorization: token,
            }
        })
        .then(({data}) => {
            // console.log(data)
            const todolist = document.querySelector("#todolist")
            todolist.insertAdjacentHTML("afterbegin", `<li data-id="${data.id}"><button>X</button>${data.content}</li>`)
        })
    
        })

    //Delete

    const todolist = document.querySelector("#todolist")
    todolist.addEventListener("click", (e) => {
        const token = localStorage.getItem("todo-token")
        const id = e.target.closest("li").dataset.id
        if (e.target.nodeName == "BUTTON"){
            e.target.closest("li").remove()
            AX
            .delete(`https://todoo.5xcamp.us/todos/${id}`, {
                headers: {
                    authorization: token,
                }
            })
            .then(({data}) => {
                console.log(data);
            })
        }
    })

    // fetch("https://todoo.5xcamp.us/users", {
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //     headers: new Headers({
    //     "Content-Type": "application/json",
    //     }),
    // })
    //     .then((resp) => {
    //     return resp.json()
    //     })
    //     .then((data) => {
    //     console.log(data)
    //     })
    //     .catch((err) => {
    //     console.log(err)
    //     })
