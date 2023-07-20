const tlWrapper = document.querySelector('.tl-wrapper');

tlWrapper.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    let buttonList = document.querySelectorAll('.button-year-select');
    let lineList = document.querySelectorAll('.time-line');

    let currElement = e.target;
    let prevElement = document.querySelector('.button-year-select.active');

    // remove .active from previous header, line, and button
    let prevWrapper = document.querySelectorAll('.active');
    prevWrapper.forEach((element) => {
        element.classList.remove('active');
    });

    // add .active to newly selected year
    let currWrapper = currElement.parentElement.children;
    Array.from(currWrapper).forEach((element) => {
        if (!(element.classList.contains('after'))) {
            element.classList.add('active');
        }
    });

    animateLine(prevElement, currElement, lineList, buttonList);

    changeColor(buttonList,
        'goldenrod',
        'maroon',
        'active');

    changeColor(lineList,
        'goldenrod',
        'maroon',
        'active');

    showInfo(parseInt(Array.prototype.indexOf.call(buttonList, currElement)));

    let prevIndex = parseInt(Array.prototype.indexOf.call(buttonList, prevElement));
    let currIndex = parseInt(Array.prototype.indexOf.call(buttonList, currElement));
    let delay = Math.abs(currIndex - prevIndex) * 1000 * (0.5 / Math.E);
    if (Math.abs(currIndex - prevIndex) < 5) {
        delay += 350;
    }
    console.log(delay);
    setTimeout(function () { autoScroll(currElement, e); }, delay);
});

const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', (e) => {
    autoScroll(e.target, e, 0);
});


const changeColor = (elementList, pastColor, futureColor, classBreak) => {
    let changeColor = true;
    elementList.forEach((element) => {
        if (changeColor) {
            element.style.backgroundColor = pastColor;
        } else {
            element.style.backgroundColor = futureColor;
        } if (element.classList.contains(classBreak)) {
            changeColor = false;
        }
    });
}

const animateLine = (prevElement, currElement, lineList, buttonList) => {
    let duration = 0.15;
    let delay = 0.2;
    let prevIndex = parseInt(Array.prototype.indexOf.call(buttonList, prevElement));
    let currIndex = parseInt(Array.prototype.indexOf.call(buttonList, currElement));
    let prevHeader = prevElement.parentElement.children[0];
    let currHeader = currElement.parentElement.children[0];

    // previous element is BEFORE the new selection
    if (prevIndex < currIndex) {
        for (let i = prevIndex; i < currIndex + 1; i++) {
            duration += 0.02;
            delay += 0.02;
            lineList[2 * i].style.transition = `background-color ${duration}s ease ${delay}s`;
            duration += 0.02;
            delay += 0.02;
            buttonList[i].style.transition = `background-color ${duration}s ease ${delay}s`;
            duration += 0.02;
            delay += 0.02;
            lineList[2 * i + 1].style.transition = `background-color ${duration}s ease ${delay}s`;
        }
        buttonList[currIndex].style.transition = `background-color ${duration}s ease ${delay}s, scale ${duration}s linear ${delay}s`;
        currHeader.style.transition = `color ${duration}s ease ${delay}s, scale ${duration}s linear ${delay}s, border 0.5s ease`;

        // previous element is AFTER the new selection
    } else {
        for (let i = prevIndex; i > currIndex - 1; i--) {
            duration += 0.02;
            delay += 0.02;
            lineList[2 * i + 1].style.transition = `background-color ${duration}s ease ${delay}s`;
            duration += 0.02;
            delay += 0.02;
            buttonList[i].style.transition = `background-color ${duration}s ease ${delay}s`;
            duration += 0.02;
            delay += 0.02;
            lineList[2 * i].style.transition = `background-color ${duration}s ease ${delay}s`;
        }
        buttonList[currIndex].style.transition = `background-color ${duration}s ease ${delay}s, scale ${duration}s linear ${delay}s`;
        currHeader.style.transition = `color ${duration}s ease ${delay}s, scale ${duration}s linear ${delay}s, border 0.5s ease`;
    }
    buttonList[prevIndex].style.transition = '';
    prevHeader.style.transition = '';
}

const showInfo = (index) => {
    let infoPages = document.querySelectorAll('.year-info');
    infoPages.forEach((p) => {
        if (p.classList.contains('active')) {
            p.classList.remove('active');
        }
    });
    infoPages[index].classList.add('active');
}

const autoScroll = (element, e, top) => {
    e.preventDefault();
    let offsetTop = 0;
    if (top != 0) {
        let href = element.getAttribute("href");
        offsetTop = document.querySelector(href).offsetTop;
    }

    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}