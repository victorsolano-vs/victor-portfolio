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
const cardsLangContainer = document.querySelector('.rightSectionContent')

let mouseX = 0, mouseY = 0
let cursorX = 0, cursorY = 0



document.addEventListener('mousemove', (event) => {
    mouseX = event.pageX
    mouseY = event.pageY
})

function animateCursor(){
    cursorX += (mouseX - cursorX) * 0.1
    cursorY += (mouseY - cursorY) * 0.1

    textCursor.style.left = `${cursorX}px`
    textCursor.style.top = `${cursorY}px`

    requestAnimationFrame(animateCursor)
}

animateCursor()



cardsLangContainer.addEventListener('mouseenter', () => {
    textCursor.classList.add('show')
    textCursor.classList.remove('hide')
})
cardsLangContainer.addEventListener('mouseleave', () => {
    textCursor.classList.remove('show')
    textCursor.classList.add('hide')
})

cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        document.querySelector('#langText').innerHTML = card.getAttribute('data-name')
    })
})



// move watermark on mouse move
const watermark = document.querySelector('.watermark')

document.addEventListener('mousemove', (event) => {
    const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate how far the mouse is from the center
      const deltaX = (event.clientX - centerX) / 20;
      const deltaY = (event.clientY - centerY) / 20;

      // Apply transform to move text based on mouse position
      watermark.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
})