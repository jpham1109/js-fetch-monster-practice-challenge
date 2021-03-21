/* Global variables */
const createDiv = document.querySelector('div#create-monster')
const monsterDiv = document.querySelector('div#monster-container')
const form = document.querySelector('form#monster-form')
const nextBtn = document.querySelector('button#forward')
// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

const renderOneMonster = (monsterObj) => {

    const innerDiv = document.createElement('div')
    innerDiv.classList.add('monster')
    innerDiv.dataset.id = monsterObj.id

    innerDiv.innerHTML = `
        <h2>${monsterObj.name}</h2>
        <h4>${monsterObj.age}</h4>
        <p>Bio: ${monsterObj.description}</p>
    `
    monsterDiv.append(innerDiv)
}

const renderAllMonsters = () => {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=21')
        .then(resp => resp.json())
        .then(monsterObjs => {
            monsterObjs.forEach(monsterObj => {
                renderOneMonster(monsterObj)
            })
        })
}

//Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = event.target[0].value
    const age = event.target[1].value
    const desc = event.target[2].value

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify( {
            name: name,
            age: age,
            description: desc
        })
    })
    .then(resp => resp.json())
    .then(newMonsterObj => { renderOneMonster(newMonsterObj) })

    form.reset()
})

//At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.
nextBtn.addEventListener('click', (event) => {
    event.preventDefault()


})
/* APPINIT */
renderAllMonsters()