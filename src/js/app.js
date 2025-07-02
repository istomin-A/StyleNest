// import '../index.html' // слежка за html файлом
// import '../catalog.html' // слежка за html файлом
// import '../product.html' // слежка за html файлом
// import '../contact.html' // слежка за html файлом
import '../scss/style.scss' // слежка за scss файлом

// ===================================================================

import isWebp from "./modules/isWebp.js"
import Search from "./modules/Search.js"
import Header from "./modules/Header.js"
import SpollerCollection from "./modules/Spoller.js"
import RenderIntroSlider from "./modules/RenderIntroSlider.js"
import RenderReviews from "./modules/RenderReviews.js"
import RenderProductSlider from "./modules/RenderProductSlider.js"
import RenderProductPageSlider from "./modules/RenderProductPageSlider.js"
import RenderProductPageInfo from "./modules/RenderProductPageInfo.js"
import RenderCatalog from "./modules/RenderCatalog.js"
import RangeSlider from "./modules/RangeSlider.js"
import Quantity from "./modules/Quantity.js"
// import SliderCollection from "./modules/Slider.js"
// import TabsCollection from "./modules/Tabs.js"
// import MaskPhoneCollection from "./modules/MaskPhone.js"

isWebp()
new Search()
new Header()
new SpollerCollection()
new RenderIntroSlider()
new RenderProductSlider()
new RenderReviews()
new RenderProductPageSlider()
new RenderProductPageInfo()
new RenderCatalog()
new RangeSlider()
new Quantity()
// new SliderCollection()
// new TabsCollection()
// new MaskPhoneCollection()

// =======================================================================================================
// * Modal
/*const modal = document.querySelectorAll('.modal');
const modalOpen = document.querySelectorAll('._modal-open');
const modalClose = document.querySelectorAll('._modal-close');

modalOpen.forEach(item => item.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-modal-path');
    document.querySelector(`[data-modal-target="${path}"]`).classList.add('_active');

    modal.forEach(item => {
        if (item.classList.contains('_active')) {
            item.showModal();
            document.body.classList.add('_lock');
        }
    });
}));

modalClose.forEach(item => item.addEventListener('click', (e) => {
    if (e.target == item) {
        modal.forEach(item => {
            item.close();
            item.classList.remove('_active');
        });
        document.body.classList.remove('_lock');
    }
}));

modal.forEach(item => item.addEventListener('click', ({ currentTarget, target }) => {
    const dialog = currentTarget;
    const isOnOverlayClick = target === dialog;
    if (isOnOverlayClick) {
        modal.forEach(item => {
            item.close();
            item.classList.remove('_active');
        });
        document.body.classList.remove('_lock');
    }
}));

modal.forEach(item => item.addEventListener('cancel', () => {
    if (item.classList.contains('_active')) {
        item.close();
        item.classList.remove('_active');
        document.body.classList.remove('_lock');
    }
}));*/

// =======================================================================================================
// * Custom select
/*const select = document.querySelectorAll('.select');

if (select) {
    select.forEach((selectWrapper) => {
        const selectButton = selectWrapper.querySelector('.select__button');
        const selectIcon = selectWrapper.querySelector('.select__icon');
        const selectList = selectWrapper.querySelector('.select__list');
        const selectItem = selectList.querySelectorAll('.select__item');
        const selectInput = selectWrapper.querySelector('.select__input');

        // Назначение по умолчанию атрибута aria-label кнопке
        selectButton.setAttribute('aria-label', 'Комбинированный список ' + selectButton.innerText);

        // Значение по умолчанию у input атрибута value
        selectInput.setAttribute('value', selectList.children[0].getAttribute('data-value'));

        // Счетчик для переключателя select`а клавишами ArrowDown и ArrowUp
        let count = 0;

        // Клик по кнопке. Открыть/Закрыть select
        selectButton.addEventListener('click', (e) => {
            selectIcon.classList.toggle('_active');
            selectList.classList.toggle('_active');
            selectButton.classList.add('_active');
            selectButton.setAttribute('aria-expanded', 'false');
            selectList.setAttribute('aria-hidden', 'true');
            selectItem.forEach(item => {
                item.classList.toggle('_active');
            });

            if (selectList.classList.contains('_active')) {
                selectButton.setAttribute('aria-expanded', 'true');
                selectList.setAttribute('aria-hidden', 'false');
            }
        });

        // Переключатель select`а клавишами ArrowDown и ArrowUp
        selectButton.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (count < selectList.children.length - 1) {
                    count += 1;
                    selectItem.forEach(item => item.classList.remove('_focus-visible'));
                    selectList.children[count].classList.add('_focus-visible');
                    selectButton.innerText = selectList.children[count].innerText;
                    selectInput.setAttribute('value', selectList.children[count].dataset.value);
                }
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (count > 0) {
                    count = count - 1;
                    selectItem.forEach(item => item.classList.remove('_focus-visible'));
                    selectList.children[count].classList.add('_focus-visible');
                    selectButton.innerText = selectList.children[count].innerText;
                    selectInput.setAttribute('value', selectList.children[count].dataset.value);
                }
            }
        });

        // Выбор элемента списка. Запомнить выбор. Закрыть дропдаун
        selectItem.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectButton.innerText = e.target.innerText;
                selectInput.setAttribute('value', e.target.dataset.value);
                selectList.classList.remove('_active');
                selectButton.setAttribute('aria-expanded', 'false');
                selectList.setAttribute('aria-hidden', 'true');
                selectIcon.classList.remove('_active');
                selectItem.forEach(item => {
                    item.classList.remove('_focus-visible');
                    item.classList.remove('_active');
                });
                e.target.classList.add('_focus-visible');
            });
        });

        // Клик за пределами select`а - закрыть
        document.addEventListener('click', (e) => {
            if (e.target !== selectButton) {
                selectList.classList.remove('_active');
                selectIcon.classList.remove('_active');
                selectButton.classList.remove('_active');
                selectButton.setAttribute('aria-expanded', 'false');
                selectList.setAttribute('aria-hidden', 'true');
                selectItem.forEach(item => {
                    item.classList.remove('_active');
                });
            }
        });

        // Нажатие по esc и tab - закрыть дропдаун
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' || e.key === 'Escape') {
                selectList.classList.remove('_active');
                selectIcon.classList.remove('_active');
                selectButton.classList.remove('_active');
                selectButton.setAttribute('aria-expanded', 'false');
                selectList.setAttribute('aria-hidden', 'true');
                selectItem.forEach(item => {
                    item.classList.remove('_active');
                });
            }
        });
    });
}*/