import { projects } from "./objects.js"

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

export function renderProjects(toRenderProj){
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



// modal JS
const modalContainer = document.querySelector('.modal')
const exitBtn = document.querySelector('#modalExitBtn')
const modalOverlay = document.querySelector('#overlay')
const modalTriggers = document.querySelectorAll('.projectLearnMore')

function setModalTriggers(toRenderProj){

    modalTriggers.forEach((trigger, idx) => {
        trigger.addEventListener('click', () => {

            modalOverlay.style.opacity = '0.8'
            modalOverlay.style.pointerEvents = 'all'
            modalContainer.classList.add('modalShow')
            document.body.style.overflowY = 'hidden'
    
            renderModal(toRenderProj, idx)
            
        })
    })
}



exitBtn.addEventListener('click', () => {
    modalOverlay.style.opacity = '0'
    modalOverlay.style.pointerEvents = 'none'
    modalContainer.classList.remove('modalShow')
    document.body.style.overflowY = 'scroll'

})

function renderModal(toRenderProj, idx){
    console.log('selected project index: ', idx)
    console.log(toRenderProj)

    document.querySelector('.modalContent').innerHTML = `
        <p>${toRenderProj[idx].projectName}</p>
        <p>${toRenderProj[idx].projectType}</p>
    `


}


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