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

function setModalTriggers(toRenderProj){
    const modalTriggers = document.querySelectorAll('.projectLearnMore')

    modalTriggers.forEach((trigger, idx) => {
        trigger.addEventListener('click', () => {

            showModal()
            renderModal(toRenderProj, idx)
            
        })
    })
}

exitBtn.addEventListener('click', () => {
    hideModal()
})

modalOverlay.addEventListener('click', () => {
    hideModal()

})

function showModal(){
    modalOverlay.style.opacity = '0.8'
    modalOverlay.style.pointerEvents = 'all'
    modalContainer.classList.add('modalShow')
    document.body.style.overflowY = 'hidden'
}

function hideModal(){
    modalOverlay.style.opacity = '0'
    modalOverlay.style.pointerEvents = 'none'
    modalContainer.classList.remove('modalShow')
    document.body.style.overflowY = 'scroll'
}

function renderModal(toRenderProj, idx){
    const proj = toRenderProj[idx]

    document.querySelector('.modalContent').innerHTML = `
    <div class = 'projectMainInfo'>
        <h1 class = 'modalTitle'>
            ${proj.projectName}
        </h1>
        <div class = 'tagsBtnsSection'>
            <div>
                <p>${proj.projectType}</p>
                <ul>
                    ${proj.projectTechStack.map((p) => `
                        <li>${p}</li>
                        `).join('')}
                </ul>
            </div>
            <div class = 'projLinks'>
                <a href = ''>${proj.projectType === 'UX/UI Design' ? 'View Design' : 'View Project'}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4302 5.93005L20.5002 12.0001L14.4302 18.0701" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.5 12H20.33" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </a>
                <a href =''>
                ${proj.projectType === 'UX/UI Design' ? 'Case Study' : 'Source Code'}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4302 5.93005L20.5002 12.0001L14.4302 18.0701" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.5 12H20.33" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </a>
            </div>
        </div>

        <div class = 'projectDescription'>
            ${proj.projectDescription}
        </div>

        <div class = 'imgContainer'>
            <img src ='${proj.projectImages.thumbnailView}' loading = 'lazy' alt =''test>
            <img src ='${proj.projectImages.thumbnailView}' loading = 'lazy' alt =''test>
            <img src ='${proj.projectImages.thumbnailView}' loading = 'lazy' alt =''test>
        </div>
    </div> 
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

// when clicking outside the list, close the list
document.addEventListener('click', (event) => {
    if(!categoryList.contains(event.target) && !dropdownBtn.contains(event.target)){
        dropdownSvg.classList.toggle('transformArrow')
        categoryList.classList.remove('showCategoryList')
    }
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