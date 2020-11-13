export const animateHome = ()=> {

    // MAIN SVG ON TOP OF PAGE THE ROTATION OF THE CARDS
    var tl = gsap.timeline({repeat: -1, repeatDelay: 1});
    tl.to("#topRight",{y: 85, x: -7, duration: 1})
    tl.to("#topRight",{x: -81, duration: 1,})
    tl.to("#topLeft", {x: 72, duration: 1})
    tl.to("#topRight",{y: 0, x:-75, duration: 1})
    tl.to("#topLeft", {y: 85 , x: 65, duration: 1})
    tl.to("#topRight",{x: 0, y:0, duration: 1})
    tl.to("#topLeft", {x: -5, duration: 1})
    tl.to("#topLeft", {y:0 , x:0, duration: 1})
    // MOVE ELEVATOR PITCH UP 
    const learnMore = document.getElementById("learnMore");
    VisSense(learnMore).monitor({
        visible: function (){
            gsap.to("#learnMore",  {y: 0, opacity:1, duration: 1, delay: .5})
        },
    }).start()

    // SERVICES 
    const webAndMobileCard = document.getElementById("webAndMobileCard")
    VisSense(webAndMobileCard).monitor({
        visible: function (){
        gsap.to("#webAndMobileCard", {x:0, opacity: 1,  duration: 1, repeat: 0})
        },
    }).start()
    const webDesignCard = document.getElementById("webDesignCard")
    VisSense(webDesignCard).monitor({
        visible: function (){
        gsap.to("#webDesignCard", {x:0, opacity: 1,  duration: 1, repeat: 0})
        },
    }).start()
    const contentCreationCard = document.getElementById("contentCreationCard")
    VisSense(contentCreationCard).monitor({
        visible: function (){
        gsap.to("#contentCreationCard", {x:0, opacity: 1,  duration: 1,repeat: 0 })
        },
    }).start()
    const seoCard = document.getElementById("seoCard")
    VisSense(seoCard).monitor({
        visible: function (){
        gsap.to("#seoCard", {x:0,  opacity: 1, duration: 1, repeat: 0})
        },
    }).start()
}