const send = document.querySelector('.send')
const userQuestion = document.querySelector('.userQuestion')
const answer = document.querySelector('.answer')
let userQuestionValue

createAnswer(`Рад приветствовать Тебя пользователь! Какой у Тебя вопрос?`)

userQuestion.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        createRequest();
    }
})
send.addEventListener('click', () => {
    createRequest();
})

function createAnswer(answerText) {
    let pre = document.createElement('pre')
    pre.className = 'answerData'
    pre.innerText = answerText
    answer.appendChild(pre)
}

function createQuestion(questionText) {
    let pre = document.createElement('pre')
    pre.className = 'questionData'
    pre.innerText = questionText
    answer.appendChild(pre)
}

function createRequest() {
    try {
        if (userQuestion.value !== '') {
            userQuestionValue = userQuestion.value
            sendRequest(userQuestionValue)
            createQuestion(userQuestionValue)
            userQuestion.value = ''
            scrollDown()
        } else {
            createAnswer(`Ты ничего не написал... Задай свой вопрос.`)
            scrollDown()
        }
    } catch (error) {
        console.log(error);
        createAnswer(`Ошибка! Что-то пошло не так, попробуй еще раз...`)
    }
}

function scrollDown() {
    answer.lastChild.scrollIntoView({ block: "center", behavior: "smooth" });
}

async function sendRequest(sendingValue) {
    try {
        let request = await fetch('https://chat-gpt-example.vercel.app/makeRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                question: sendingValue
            })
        })
        let response = await request.json()
        createAnswer(response.answer)
        scrollDown()
    } catch (error) {
        console.log(error);
        createAnswer(`Ошибка! Что-то пошло не так, попробуйте еще раз...`)
        scrollDown()
    }


}