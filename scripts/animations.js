document.addEventListener('DOMContentLoaded', (event) => {
    gsap.registerPlugin(ScrollTrigger)

    var tl = gsap.timeline()
    tl.from('.navbar',{
        duration:1.5,
        y: -50,
        opacity: 0,
    })
    .from('.linksContent a', {
        duration: 1,
        opacity: 0,
        stagger: 0.1,
        ease: 'sine.out'
    }, '-=0.8')
    .from('.sectionTitle span', {
        duration: 0.5,
        y: 10,
        opacity: 0,
        stagger: 0.1,
        ease: 'sine.out'
    }, '-=1')
    .from('.location, .skillTags .tag, .aboutMeText, .viewProjectsCTA', {
        duration: 0.3,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'sine.out'
    }, '-=0.9')
    .from('.langCard', {
        duration: 0.3,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'sine.out'
    }, '-=0.5')
    .from('.myStackTitle p, .myStackTitle svg', {
        duration: 0.3,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'sine.out'
    })
    .from('.text', {
        duration: 0.3,
        opacity: 0,
        stagger: 0.1,
        ease: 'sine.out'
    })

    // scroll triggers for sections
    gsap.from('#experienceSection .leftSection', {
        scrollTrigger:{
            trigger:'#experienceSection',
            start: 'top bottom'
        },
        opacity: 0,
        x: -20,
        duration: 2
    })
    gsap.from('#experienceSection .rightSection, #experienceSection .expBlock', {
        scrollTrigger:{
            trigger:'#experienceSection',
            start: 'top bottom'
        },
        opacity: 0,
        x: 20,
        duration: 2,
        stagger: 0.1
    }, '-=0.1')
})
