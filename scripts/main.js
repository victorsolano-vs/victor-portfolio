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
    <div data-name = '${stack.languageName}' class = 'langCard ${stack.languageName}Card'>
        <img src='${stack.languageLogo}'>
    </div>
    `
    stackContainer.innerHTML = stackHTML
})

// add lang name to cursor
const textCursor = document.getElementById('textCursor')
const cards = document.querySelectorAll('.langCard')

document.addEventListener('mousemove', (event) => {
    textCursor.style.left = `${event.pageX}px`
    textCursor.style.top = `${event.pageY}px`
})

cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        textCursor.textContent = card.getAttribute('data-name')
        textCursor.style.display = 'block'
    })

    card.addEventListener('mouseleave', () => {
        textCursor.style.display = 'none'
    })

})