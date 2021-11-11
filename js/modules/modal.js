 

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = ''; // leaving an empty rule sets its value according to a computed style
}

function modal (triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        // in order not to immediately invoke function with argument, we
        // wrap into another function
        btn.addEventListener('click', () => openModal(modalSelector));  
    });

    // in order to use classList.toggle we use the same listeners but toggle only one class

    modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {  // here we removed eventlistener from x sign
        closeModal(modalSelector);
    }
    });

    document.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && modal.classList.contains('show')) { //e.code is a button pressed
        closeModal(modalSelector);
    }
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {   
            // this condition means whether a user has scrolled to the bottom of the page
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll); // consider that for some events here lays " }, {once: true}); " in order to set event firing only once
}

export default modal;
export {openModal};
export {closeModal};