let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slider img');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slider img');
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slider img');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}
let accounts = JSON.parse(localStorage.getItem('accounts')) || {};

window.onload = function () {
    const fullImageModal = document.getElementById('full-image-modal');
    const fullImage = document.getElementById('full-image');
    const closeFullImageModal = document.querySelector('.close-full-image-modal');

    // Обработчик кликов на изображения в галерее
    document.querySelectorAll('.gallery-img').forEach((img) => {
        img.onclick = () => {
            fullImage.src = img.src;
            fullImageModal.style.display = 'flex';
        };
    });

    // Закрытие модального окна увеличенного изображения
    if (closeFullImageModal) {
        closeFullImageModal.onclick = () => {
            fullImageModal.style.display = 'none';
        };
    }

    // Закрытие модального окна при клике вне изображения
    window.onclick = (event) => {
        if (event.target === fullImageModal) {
            fullImageModal.style.display = 'none';
        }
    };

    const galleryModal = document.getElementById('gallery-modal');
    const galleryButton = document.querySelector('.menu button:nth-child(3)'); // Кнопка "Галерея"
    const closeGalleryModal = document.querySelector('.close-gallery-modal');

    if (galleryButton) {
        galleryButton.onclick = () => {
            galleryModal.style.display = 'flex';
        };
    }

    if (closeGalleryModal) {
        closeGalleryModal.onclick = () => {
            galleryModal.style.display = 'none';
        };
    }

    // Закрытие модального окна при клике вне его
    window.onclick = (event) => {
        if (event.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
    };
    const aboutModal = document.getElementById('about-modal');
    const aboutButton = document.querySelector('.menu button:nth-child(2)'); // Кнопка "О салоне"
    const closeAboutModal = document.querySelector('.close-about-modal');

    if (aboutButton) {
        aboutButton.onclick = () => {
            aboutModal.style.display = 'flex';
        };
    }

    if (closeAboutModal) {
        closeAboutModal.onclick = () => {
            aboutModal.style.display = 'none';
        };
    }

    // Закрытие модального окна при клике вне его
    window.onclick = (event) => {
        if (event.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    };            
    // Код слайдера
    showSlide(currentSlide);
    setInterval(nextSlide, 3000);

    const nextButton = document.querySelector('.slider .next');
    const prevButton = document.querySelector('.slider .prev');
    if (nextButton) nextButton.onclick = nextSlide;
    if (prevButton) prevButton.onclick = prevSlide;

    // Код модальных окон
    const loginModal = document.getElementById('login-modal');
    const loginButton = document.querySelector('.login-button');
    const closeLoginModal = document.querySelector('.close-login-modal');
    const loginForm = document.getElementById('login-form');

    if (loginButton) {
        loginButton.onclick = () => {
            loginModal.style.display = 'flex';
        };
    }

    if (closeLoginModal) {
        closeLoginModal.onclick = () => {
            loginModal.style.display = 'none';
        };
    }

    // Авторизация
    loginForm.onsubmit = (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (accounts[email] && accounts[email] === password) {
            alert('Вход выполнен успешно!');
            loginModal.style.display = 'none';
        } else {
            alert('Неверный E-mail или пароль!');
        }
    };

    // Регистрация
    const registerModal = document.getElementById('register-modal');
    const registerButton = document.querySelector('.open-register-modal');
    const closeRegisterModal = document.querySelector('.close-register-modal');
    const registerForm = document.getElementById('register-form');

    registerButton.onclick = () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    };

    closeRegisterModal.onclick = () => {
        registerModal.style.display = 'none';
    };

    registerForm.onsubmit = (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        if (accounts[email]) {
            alert('Этот E-mail уже зарегистрирован!');
        } else {
            accounts[email] = password;
            localStorage.setItem('accounts', JSON.stringify(accounts));
            alert('Регистрация успешна!');
            registerModal.style.display = 'none';
        }
    };

    // Восстановление пароля
    const resetPasswordModal = document.getElementById('reset-password-modal');
    const forgotPasswordButton = document.querySelector('.forgot-password-button');
    const closeResetPasswordModal = document.querySelector('.close-reset-password-modal');
    const resetPasswordForm = document.getElementById('reset-password-form');

    forgotPasswordButton.onclick = () => {
        loginModal.style.display = 'none';
        resetPasswordModal.style.display = 'flex';
    };

    closeResetPasswordModal.onclick = () => {
        resetPasswordModal.style.display = 'none';
    };

    resetPasswordForm.onsubmit = (event) => {
        event.preventDefault();
        const email = document.getElementById('reset-email').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;

        if (newPassword !== confirmNewPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        if (accounts[email]) {
            accounts[email] = newPassword;
            localStorage.setItem('accounts', JSON.stringify(accounts));
            alert('Пароль успешно изменён!');
            resetPasswordModal.style.display = 'none';
        } else {
            alert('Аккаунт с этим E-mail не найден!');
        }
    };

    // Закрытие модальных окон при клике вне окна
    window.onclick = (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
        if (event.target === resetPasswordModal) {
            resetPasswordModal.style.display = 'none';
        }
    };
};