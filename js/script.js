import { Swiper } from "./swiper.js";

const swiperList = document.querySelector('.participants__list');
const btnPrev = document.querySelector('.swiper__button--prev');
const btnNext = document.querySelector('.swiper__button--next');
const swiperCounter = document.querySelector('.swiper__counter');
let participantsList = await getParticipantsList()
let currentSlideIndex = 3;
let currentListTransform = 0;


// получаем данные карточек из JSON
async function getParticipantsList() {
    return fetch('../participantList.json')
        .then((res) => res.json())
        .then((res) => res.listDb)
};

// генерируем карточки и кладем в список
function createListCard() {
    participantsList.forEach((item, index) => {
        const card = createCard(item);
        card.setAttribute('data-index', index + 1);
        swiperList.append(card);
    });

    let firstCard = createCard(participantsList[0]);
    let lastCard = createCard(participantsList[participantsList.length - 1]);

    firstCard.setAttribute('data-index', 1);
    lastCard.setAttribute('data-index', participantsList.length);

    swiperList.append(firstCard)
    swiperList.prepend(lastCard)
}

createListCard()

//генератор карточек
function createCard(item) {
    const cardWrapper = document.createElement('li');
    const avatar = document.createElement('img');
    const name = document.createElement('h3');
    const status = document.createElement('p');
    const button = document.createElement('button');

    cardWrapper.classList.add('participants__item');
    avatar.classList.add('participants__avatar');
    name.classList.add('participants__name', 'title');
    status.classList.add('participants__status', 'descr');
    button.classList.add('participants__button', 'btn');

    avatar.src = item.avatarUrl;
    avatar.alt = item.name;
    name.textContent = item.name;
    status.textContent = item.status;
    button.textContent = 'Подробнее';
    cardWrapper.append(avatar, name, status, button);


    return cardWrapper;;
};

//////////////////////////////////////////////////////////////////////////
//устанавлиаем дефолтное значение каунтера
function setSwiperCounter() {
    swiperCounter.innerHTML = `
    <span class="swiper__counter--current">${currentSlideIndex}</span>
    <span class="swiper__counter--length">/${participantsList.length}</span>
    `
}
setSwiperCounter();


//вычисляем ширину карточки + правый/левый отступ
const offsetWidth = document.querySelector('.participants__item ').offsetWidth + 20;

// перемещаем карточки на нужно положение
currentListTransform = -(currentListTransform + offsetWidth);
swiperList.style.transform = `translateX(${currentListTransform}px)`;


function checkCurrentSlideIndex() {
    if (currentSlideIndex == 6) {
        replaceCard();
    } else if (currentSlideIndex == 3) {
        console.log('start');
    }
};

checkCurrentSlideIndex();

//обработка клика по кнопке next
btnNext.addEventListener('click', () => {
    swiperList.style.transitionDuration =  '1800ms';
    setTimeout(() => {
        swiperList.style.transitionDuration =  '0ms';
    }, 1800);

    currentListTransform = currentListTransform - offsetWidth;
    swiperList.style.transform = `translateX(${currentListTransform}px)`;
    
    if (currentSlideIndex == participantsList.length) {
        currentSlideIndex = 1;
    } else {
        ++currentSlideIndex;
    }
    checkCurrentSlideIndex();
    setSwiperCounter();

});

//обработка клика по кнопке prev
btnPrev.addEventListener('click', () => {
    swiperList.style.transitionDuration =  '1800ms';
    setTimeout(() => {
        swiperList.style.transitionDuration =  '0ms';
    }, 1800);

    currentListTransform = currentListTransform + offsetWidth;
    swiperList.style.transform = `translateX(${currentListTransform}px)`;

    if (currentSlideIndex == 1) {
        currentSlideIndex = participantsList.length;
    } else {
        --currentSlideIndex;
    }
    checkCurrentSlideIndex();
    setSwiperCounter();
});

//перемещение карточки в конец и ее клонирование
function replaceCard() {
        const card = swiperList.querySelector('.participants__item');
        const clone = card.cloneNode(true);

}

let participantsSwiper = new Swiper('.participants__list');
participantsSwiper.sayWrapper();