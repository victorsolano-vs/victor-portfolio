document.addEventListener('DOMContentLoaded', (event) => {
    // gsap.to('.sectionTitle',{
    //     rotation: 360,
    //     duration: 2
    // })

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
})
// test code