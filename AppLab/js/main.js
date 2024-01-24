// BURGER MENU
const burger = document.querySelector(".menu__burger");
const menu = document.querySelector(".menu__list");

burger.addEventListener("click", () => {
    menu.classList.toggle("menu__list--active");
});

// SCROLL TO PRICING SECTION
const tryBtns = document.querySelectorAll(".try-free");
const pricingSection = document.querySelector(".pricing");
tryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        window.scroll({
            top: pricingSection.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    });
});

// SCROLL TO FEATURES
const learnMoreBtn = document.querySelector(".designed .btn");
const ultimateSection = document.querySelector(".ultimate");
learnMoreBtn.addEventListener("click", () => {
    window.scroll({
        top: ultimateSection.offsetTop - 50,
        left: 0,
        behavior: "smooth",
    });
});

// HIDE MENU FOR WIDE SCALE
const whyUsSection = document.querySelector(".items-awards");
const whyUsItem = document.querySelector(".items-awards__item");
const moreBtn = document.querySelector(".more-items .btn");

window.addEventListener("resize", () => {
    if (window.innerWidth > 854) {
        menu.style.opacity = 1;
        menu.classList.remove("active");
    } // else setWidthOfPeople()
});
// BUTTON RESIZE HEIGHT WHYUSSECTION
const mediaQuery = window.matchMedia("(max-width: 768px)");
if (mediaQuery.matches) {
    whyUsSection.style.height = `${whyUsItem.clientHeight}px`;
    moreBtn.style.display = "block";
} else {
    moreBtn.style.display = "none";
    whyUsSection.style.height = "auto";
}

moreBtn.addEventListener("click", () => {
    if (whyUsSection.style.height === `${whyUsItem.clientHeight}px`) {
        whyUsSection.style.height = `${whyUsItem.clientHeight * 6}px`;
    } else {
        whyUsSection.style.height = `${whyUsItem.clientHeight}px`;
        window.scroll({
            top: document.querySelector(".why-us").offsetTop - 50,
            left: 0,
            behavior: "smooth",
        });
    }
});

// SWITCH PRICING
const switchPricing = document.querySelector(".pricing__switch-button input");
const priceParagraph = document.querySelector(
    ".pricing__cards__card--pro .price"
);
const priceMonth = document.querySelector(
    ".pricing__cards__card--pro .price__month"
);

switchPricing.addEventListener("change", () => {
    if (switchPricing.checked) {
        priceParagraph.textContent = "$899";
        priceMonth.textContent = "/year";
    } else {
        priceParagraph.textContent = "$99";
        priceMonth.textContent = "/month";
    }
});

// MAP
const peopleImgs = [
    ...document.querySelectorAll(".testimonial__map__person img"),
];
const leftArrow = document.querySelector(".slider__arrow--left");
const rightArrow = document.querySelector(".slider__arrow--right");
const sliderImg = document.querySelector(".slider__img img");
const sliderPersonalName = document.querySelector(".slider__personal__name");
const sliderPersonalCity = document.querySelector(".slider__personal__city");
const slides = [...document.querySelectorAll(".opinion")];

const fetchRandomUsers = async (url = "") => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.results;
    } catch (err) {
        console.error(err);
    }
};

const setRandomUsers = async () => {
    const API = "https://randomuser.me/api/?results=7";
    const users = await fetchRandomUsers(API);

    const imgs = users.map((user) => user.picture.medium);
    const name = users[0].name;

    peopleImgs.forEach((item, index) => {
        const name = users[index].name;
        const city = users[index].location.city;

        item.src = imgs[index];
        item.dataset.id = index;
        item.dataset.city = city;
        item.alt = `${name.title} ${name.first} ${name.last}`;
    });
    sliderImg.src = imgs[0];
    sliderPersonalName.textContent = peopleImgs[0].alt;
    sliderPersonalCity.textContent = peopleImgs[0].dataset.city;

    slides[0].style.transform = "translateX(0px)";
};
setRandomUsers();

// HANDLE MAP IMGS NOT FINISHED
handleMapImgs = () => {
    peopleImgs.forEach((person) => {
        person.addEventListener("click", function() {
            const activePerson = document.querySelector(
                ".testimonial__map__person .active"
            );

            // SYNCHRO ACTIVE PERSON AND OPINION
            // activePerson.classList.remove('active');
            // activeSlide.classList.remove('active');
            // this.classList.add('active');
            // slides[this.dataset.id].classList.add('active');

            // // SET CORRETC OPINION
            // const [nextSlide,prevSlide] = getPrevAndNext()
            // // debugger
            // if (prevSlide != undefined){
            //     prevSlide.style.transform = 'translateX(-130%)'
            // }
            // activeSlide.style.transform = 'translateX(0)';
            // if (nextSlide !=undefined) {
            //     nextSlide.style.transform = 'translateX(130%)';
            // }
            const activeSlide = document.querySelector(".opinion.active");
            const activeIndex = slides.indexOf(activeSlide);
            const [nextSlide, prevSlide] = getPrevAndNext();

            if (activeIndex === slides.length - 2) {
                rightArrow.classList.add("disabled");
            } else if (activeIndex === slides.length - 1) {
                return;
            } else {
                leftArrow.classList.remove("disabled");
            }

            activeSlide.classList.remove("active");
            activeSlide.style.transform = "translateX(-130%)";
            if (prevSlide != undefined) {
                prevSlide.style.transform = "translateX(-130%)";
            }
            nextSlide.classList.add("active");
            nextSlide.style.transform = "translateX(0)";

            // SET DATA IN SLIDER
            sliderImg.src = this.src;
            sliderPersonalName.textContent = this.getAttribute("alt");
            sliderPersonalCity.textContent = this.dataset.city;
        });
    });
};

// handleMapImgs()

getPrevAndNext = () => {
    const activeSlide = document.querySelector(".opinion.active");
    const activeSlideIndex = slides.indexOf(activeSlide);
    const activePerson = document.querySelector(
        ".testimonial__map__person .active"
    );
    const activePersonIndex = peopleImgs.indexOf(activePerson);

    const nextSlide = slides[activeSlideIndex + 1];
    const prevSlide = slides[activeSlideIndex - 1];
    const nextPerson = peopleImgs[activePersonIndex + 1];
    const prevPerson = peopleImgs[activePersonIndex - 1];
    return [nextSlide, prevSlide, nextPerson, prevPerson];
};

getNextSlide = () => {
    const activeSlide = document.querySelector(".opinion.active");
    const activeIndex = slides.indexOf(activeSlide);
    const [nextSlide] = getPrevAndNext();

    if (activeIndex === slides.length - 2) {
        rightArrow.classList.add("disabled");
    } else if (activeIndex === slides.length - 1) {
        return;
    } else {
        leftArrow.classList.remove("disabled");
    }

    activeSlide.classList.remove("active");
    activeSlide.style.transform = "translateX(-130%)";
    nextSlide.classList.add("active");
    nextSlide.style.transform = "translateX(0)";
};

getPrevSlide = () => {
    const activeSlide = document.querySelector(".opinion.active");
    const activeIndex = slides.indexOf(activeSlide);
    const [, prevSlide] = getPrevAndNext();

    if (activeIndex === 1) {
        leftArrow.classList.add("disabled");
    } else if (activeIndex === 0) {
        return;
    } else {
        leftArrow.classList.remove("disabled");
        rightArrow.classList.remove("disabled");
    }
    activeSlide.classList.remove("active");
    activeSlide.style.transform = "translateX(130%)";
    prevSlide.classList.add("active");
    prevSlide.style.transform = "translateX(0)";
};

getPrevOrNextPerson = (nextOrPrev) => {
    const activePerson = document.querySelector(
        ".testimonial__map__person .active"
    );
    const activePersonIndex = peopleImgs.indexOf(activePerson);

    const [, , nextPerson, prevPerson] = getPrevAndNext();
    if (nextOrPrev === "next") {
        if (activePersonIndex === peopleImgs.length - 1) return;
        activePerson.classList.remove("active");
        nextPerson.classList.add("active");
    } else if (nextOrPrev === "prev") {
        if (activePersonIndex === 0) return;
        activePerson.classList.remove("active");
        prevPerson.classList.add("active");
    } else {
        throw Error("Invalid property nextOrPrev");
    }
};

setPrevOrNextPerson = () => {
    const activePerson = document.querySelector(
        ".testimonial__map__person .active"
    );
    sliderImg.src = activePerson.src;
    sliderPersonalName.textContent = activePerson.alt;
    sliderPersonalCity.textContent = activePerson.dataset.city;
};

handleLeftArrow = () => {
    getPrevSlide();
    getPrevOrNextPerson("prev");
    setPrevOrNextPerson();
};

handleRightArrow = () => {
    getNextSlide();
    getPrevOrNextPerson("next");
    setPrevOrNextPerson();
};

leftArrow.addEventListener("click", handleLeftArrow);
rightArrow.addEventListener("click", handleRightArrow);

const people = [...document.querySelectorAll(".testimonial__map__person")];
setWidthOfPeople = (array, percentOfWidth) => {
    array.forEach((item) => {
        item.style.width = `${window.innerWidth * percentOfWidth}px`;
        item.style.height = `${window.innerWidth * percentOfWidth}px`;
    });
};

if (window.matchMedia("(max-width: 875px)").matches) {
    setWidthOfPeople(people, 0.12);
} else if (window.matchMedia("(max-width: 360px)").matches) {
    setWidthOfPeople(people, 0.08);
}

// FAQ
const questions = [...document.querySelectorAll(".faq .question")];

questions.forEach((question) => {
    question.addEventListener("click", function() {
        this.classList.toggle("question--active");
    });
});