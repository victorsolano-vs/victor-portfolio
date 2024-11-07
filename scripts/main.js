import { myStack } from "./objects.js"

// LIGHT/DARK THEME JS
// code to toggle light/dark theme
const themeToggleBtn = document.getElementById('themeToggle')
const body = document.body

// check for saved theme or else set to default 
const savedTheme = localStorage.getItem('theme') || 'dark'
body.setAttribute('data-theme', savedTheme)

// toggle theme and save to local storage
themeToggleBtn.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light'

    body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
})



// js code to render my languages
const stackContainer = document.querySelector('.rightSectionContent')

let stackHTML = ''

myStack.forEach((stack) => {
    stackHTML += `
    <div class = 'langCard ${stack.languageName}Card'>
        <img src='${stack.languageLogo}'>
    </div>
    `
    stackContainer.innerHTML = stackHTML
})



// let testHTML = ''

// myStack.forEach((stack) => {
//     testHTML += `
//     <p>${stack.languageName}</p>
//     `
// })

// document.querySelector('#mainSection').innerHTML = testHTML


// MAKE THE MIN 340 SO ADJUST SIZES