import {getResource} from '../services/services';

function cards() {
    class MenuCard {
        constructor(src, alt, subtitle, descr, total, parentSelector, ...classes) {
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.src = src;
            this.alt = alt;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
            this.classes = classes;
        }

        changeToUAH() {
            this.total *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            
            if(this.classes.length == 0) {
                this.element = 'menu__item'; 
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr} </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // axios library usage 
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });


    // A WAY OF RENDERING WITHOUT CLASSES
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data))

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('.menu__item');

    //         element.innerHTML = `
    //             <div class="menu__item">
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr} </div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
    //                 </div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;