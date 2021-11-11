import {openModal, closeModal} from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: "img/form/spinner.svg",
        success: "Thanks! We will soon call you",
        failure: "Whoops! Something wrong here...",
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {     //e is needed to prevent constant reload
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // cash reload shift+f5

            // request.setRequestHeader('Content-type', 'application/json');   
            // highly important: whenever we use xmlhttprequest + formData we should not set header, headers are set automatically
            const formData = new FormData(form);   // forms a data from user's input    

            // const object = {};   // in case we need to send on server in json format, for example for nodejs
            // formData.forEach(function(value, key) {
            //     object[key] = value;                         // this is the older method
            // });

            //newer method with application of new technologies
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            //promise fired with fetch won't switch to rejected 
            //because of http protocol request error like 404 501 etc,
            //reject will only fire in case of network connection issues or somewhat
            .catch(() => {
                showThanksModal(message.failure);               
                                                                
            })
            .finally(() => {
                form.reset()
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 5000)
    }


    // fetch api
    // url for test requests: jsonplaceholder
    //fetch uses promises

    // fetch('https://jsonplaceholder.typicode.com/posts', {           //creating new post
    //     method: "POST",
    //     body: JSON.stringify({name: "Alex"}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json))

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}


export default forms;
