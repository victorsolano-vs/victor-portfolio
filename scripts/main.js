import { myStack, experience, projects } from "./objects.js"
import { renderProjects } from "./projects.js"

// ============ light/dark theme ============
function initializeTheme(){
    const themeToggleBtn = document.getElementById('themeToggle')
    const body = document.body
    
                //initialize 
    const savedTheme = localStorage.getItem('theme') || 'dark'
    body.setAttribute('data-theme', savedTheme)
    
                // toggle theme and save to local storage
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
        body.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    })
}


initializeTheme()

// ============ render my stack languages ============
function renderStackLang(){
    const stackContainer = document.querySelector('.rightSectionContent')

    stackContainer.innerHTML = myStack.map((stack) => 
    `
        <div data-name = '${stack.languageName}' class = 'langCard ${stack.languageName}Card'>
            <img src='${stack.languageLogo}' alt = '${stack.languageName}'>
        </div>
        `
    ).join('')
}

renderStackLang()


// ============ cursor hover effect on language cards ============
const textCursor = document.getElementById('textCursor')
const cards = document.querySelectorAll('.langCard')
const cardsLangContainer = document.querySelector('.rightSectionContent')

let mouseX = 0, mouseY = 0
let cursorX = 0, cursorY = 0


        //get location of mouse on page
document.addEventListener('mousemove', (event) => {
    mouseX = event.pageX
    mouseY = event.pageY
})

        // add location to div and animate
function animateCursor(){
    cursorX += (mouseX - cursorX) * 0.1
    cursorY += (mouseY - cursorY) * 0.1

    textCursor.style.left = `${cursorX}px`
    textCursor.style.top = `${cursorY}px`

    requestAnimationFrame(animateCursor)
}

animateCursor()


        //mouse enters/leaves individual cards
cardsLangContainer.addEventListener('mouseenter', () => {
    textCursor.classList.add('show')
    textCursor.classList.remove('hide')
})
cardsLangContainer.addEventListener('mouseleave', () => {
    textCursor.classList.remove('show')
    textCursor.classList.add('hide')
})

        //put name in floating div
cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        document.querySelector('#langText').innerHTML = card.getAttribute('data-name')
    })
})


// ============ render experience section ============
function renderExperience(){
    const experienceContainer = document.querySelector('.experienceContainer')

    let experienceHTML = ''
    
    experience.forEach((exp) => {
        experienceHTML += `
             <div class="expBlock">
            <div class = 'tagsContainer'>
                <span class = 'expTag expDuration'>${exp.duration}</span>
                <span class = 'expTag expType'>${exp.type}</span>
            </div>
            <div class="expInfo">
                <h1 class="expTitle">
                    ${exp.title}
                </h1>
                <ul class="expTasks">
                    ${exp.description.map((desc) => 
                        `
                            <li>${desc}</li>
                        `
                    ).join('')}
                </ul>
            </div>
         </div>
        `
    })
    
    experienceContainer.innerHTML = experienceHTML
}
renderExperience()


// ============ render projects section ============
renderProjects(projects)



//============ adding bounce animation to font awesome icons ============

// linkedin hover
document.querySelector('.linkedin').addEventListener('mouseenter', () => {
    document.querySelector('.linkedinLogo').classList.add('fa-bounce')
})
document.querySelector('.linkedin').addEventListener('mouseleave', () => {
    document.querySelector('.linkedinLogo').classList.remove('fa-bounce')
})

//  phone hover
document.querySelector('.phoneNumber').addEventListener('mouseenter', () => {
    document.querySelector('.fa-phone').classList.add('fa-bounce')
})
document.querySelector('.phoneNumber').addEventListener('mouseleave', () => {
    document.querySelector('.fa-phone').classList.remove('fa-bounce')
})


// github hover
document.querySelector('.github').addEventListener('mouseenter', () => {
    document.querySelector('.fa-github').classList.add('fa-bounce')
})
document.querySelector('.github').addEventListener('mouseleave', () => {
    document.querySelector('.fa-github').classList.remove('fa-bounce')
})

// email hover
document.querySelector('.email').addEventListener('mouseenter', () => {
    document.querySelector('.fa-envelope').classList.add('fa-bounce')
})
document.querySelector('.email').addEventListener('mouseleave', () => {
    document.querySelector('.fa-envelope').classList.remove('fa-bounce')
})