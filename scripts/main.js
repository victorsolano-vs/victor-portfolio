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
    console.log('hi')
    const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light'

    body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
})







// let testHTML = ''

// myStack.forEach((stack) => {
//     testHTML += `
//     <p>${stack.languageName}</p>
//     `
// })

// document.querySelector('#mainSection').innerHTML = testHTML


// MARGIN TOP FOR MAIN SECTION


// define media query
const mediaQuery = window.matchMedia('(min-width: 768px)')

function adjustMargin(){
    if(mediaQuery.matches){
        // set margin top for main section
        const navbar = document.querySelector('.navbar')
        const mainSection = document.querySelector('#mainSection')

        const navbarHeight = navbar.offsetHeight
        mainSection.style.marginTop = `${navbarHeight + 2}px`
    } else {
        mainSection.style.marginTop = `0`
    }
}

adjustMargin()

window.addEventListener('resize', () => {
    adjustMargin()
})