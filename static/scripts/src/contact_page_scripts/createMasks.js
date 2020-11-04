
export function createMasks(){
    const phoneNumber = document.getElementById("phone");
    var im = new Inputmask("999-999-9999");
    im.mask(phoneNumber);
    
    const emailAddress = document.getElementById("email")
    var em = new Inputmask({alias: "email"})
    em.mask(emailAddress)
}


