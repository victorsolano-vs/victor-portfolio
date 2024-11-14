import { myStack, experience, projects } from "./objects.js"

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


// event listeners when mouse enters/leaves individual cards
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


// render experience array
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


// animation for projects filter
const dropdownBtn = document.querySelector('.dropdownListBtn')
const dropdownText = document.querySelector('.dropdownBtnText')
const dropdownSvg = document.querySelector('.dropdownListBtn svg')
const categoryList = document.querySelector('.categoryList')

dropdownBtn.addEventListener('click', () => {
    dropdownSvg.classList.toggle('transformArrow')
    categoryList.classList.toggle('showCategoryList')
})

// make the selected text change the text on the main btn
const categoryItems = document.querySelectorAll('.categoryList button')

// default button
const defaultCategory = document.querySelector('[data-category="all"]');
defaultCategory.classList.add('activeCategory')


categoryItems.forEach((item) => {
    item.addEventListener('click', () => {

        categoryItems.forEach((btn) => {btn.classList.remove('activeCategory')})
        item.classList.add('activeCategory')
        dropdownSvg.classList.toggle('transformArrow')
        
        dropdownText.innerHTML = item.innerHTML
        categoryList.classList.remove('showCategoryList')

        filterItems(item.innerHTML)
    })
})


// code to render initial projects
renderProjects(projects)



// filter project items on selection
function filterItems(category){
    if(category === 'All'){
        renderProjects(projects)
    } else {
        let filteredProjects = projects.filter((project, index) => {
            return project.projectType === category 
        })
        renderProjects(filteredProjects)
    }

}

function renderProjects(toRenderProj){
    let projectsContainer = document.querySelector('.projectsSection')
    let portfolioHTML = ''

    if(toRenderProj.length === 0){
        portfolioHTML = `
            <p class = 'noProjectsMsg'>No projects yet! Currently creating!</p>
        `
    } else {
        toRenderProj.forEach((project) => {

            portfolioHTML += `
                <div class="projectCard">
                    <div class="projectIMGContainer">
                        <img src="${project.projectImages.thumbnailView}" alt="" loading = 'lazy'>
                    </div>
    
                    <h3 class="projectTitle">
                        ${project.projectName}
                    </h3>
    
                    <h3 class="projectType">
                        ${project.projectType}
                    </h3>
    
                    <div class="projectLinks">
                        <a href="${project.projectLiveLink}">${project.projectType === 'UX/UI Design' ? 'View Design' : 'Live Demo' }</a>
                        <button class = 'projectLearnMore'>Learn More</button>
                    </div>
                </div>
            `
        })
    }
    
    projectsContainer.innerHTML = portfolioHTML

    // add animation
    document.querySelectorAll('.projectCard').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('projectCardShow')
        }, index * 100)
    })

    setModalTriggers(toRenderProj)
}


// adding bounce animation to font awesome icons
function addBounceAnimation(selector, iconClass) {
    const element = document.querySelector(selector)
    const icon = document.querySelector(iconClass)

    element.addEventListener('mouseenter', () => {
        icon.classList.add('fa-bounce')
    })

    element.addEventListener('mouseleave', () => {
        icon.classList.remove('fa-bounce')
    })
}

// Call the function for each icon
addBounceAnimation('.phoneNumber', '.fa-phone')
addBounceAnimation('.github', '.fa-github')
addBounceAnimation('.email', '.fa-envelope')
addBounceAnimation('.linkedin', '.fa-linkedin')

// modal JS
const modalContainer = document.querySelector('.modal')
const exitBtn = document.querySelector('#modalExitBtn')
const modalOverlay = document.querySelector('#overlay')


function setModalTriggers(toRenderProj){
    const modalTriggers = document.querySelectorAll('.projectLearnMore')
    modalTriggers.forEach((trigger, idx) => {
        trigger.addEventListener('click', () => {
            modalOverlay.style.opacity = '0.8'
            modalOverlay.style.pointerEvents = 'all'
            modalContainer.classList.add('modalShow')
    
            renderModal(toRenderProj, idx)
            
        })
    })
}



exitBtn.addEventListener('click', () => {
    modalOverlay.style.opacity = '0'
    modalOverlay.style.pointerEvents = 'none'
    modalContainer.classList.remove('modalShow')
})

function renderModal(toRenderProj, idx){
    console.log('selected project index: ', idx)
    console.log(toRenderProj)

    document.querySelector('.modalContent').innerHTML = `
        <p>${toRenderProj[idx].projectName}</p>
        <p>${toRenderProj[idx].projectType}</p>
    `


}