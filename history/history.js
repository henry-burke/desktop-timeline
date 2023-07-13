const reveal = () => {
    let revealImg = document.querySelectorAll(".reveal");

    for (let i = 0; i < revealImg.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = revealImg[i].getBoundingClientRect().top;
        let elementVisible = 175;

        if (elementTop < (windowHeight - elementVisible)) {
            revealImg[i].classList.add("active");
        } else {
            revealImg[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);