// ==================== МОДАЛЬНОЕ ОКНО ====================
// Создаем модальное окно
const modalHTML = `
<div id="modal" class="modal">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Contact Us</h2>
        <form id="contact-form">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Send Message</button>
        </form>
    </div>
</div>
`;

// Добавляем модальное окно в DOM
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Функции для работы с модальным окном
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');

// Открыть модальное окно при клике на любую кнопку
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buy-button, .secondary-button, .form-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
});

// Закрыть модальное окно
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Закрыть при клике вне окна
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Обработка отправки формы
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // В реальном приложении здесь будет отправка на сервер
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    
    // Показываем сообщение об успехе
    alert('Thank you for your message! We will contact you soon.');
    
    // Закрываем модальное окно
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Очищаем форму
    contactForm.reset();
});

// ==================== СЛАЙДЕР ДЛЯ ГАЛЛЕРЕИ ====================
// Заменяем placeholder на слайдер
document.addEventListener('DOMContentLoaded', function() {
    const sliderPlaceholder = document.querySelector('.slider-placeholder');
    
    if (sliderPlaceholder) {
        sliderPlaceholder.innerHTML = `
            <div class="slider">
                <div class="slides">
                    <div class="slide active">
                        <img src="images/gal1.jpg" alt="Game Screenshot 1">
                    </div>
                    <div class="slide">
                        <img src="images/gal2.jpg" alt="Game Screenshot 2">
                    </div>
                    <div class="slide">
                        <img src="images/gal3.jpg" alt="Game Screenshot 3">
                    </div>
                    <div class="slide">
                        <img src="images/gal4.jpg" alt="Game Screenshot 4">
                    </div>
                </div>
                <div class="slider-controls">
                    <button class="prev-slide">‹</button>
                    <div class="slide-dots"></div>
                    <button class="next-slide">›</button>
                </div>
            </div>
        `;
        
        // Инициализация слайдера
        initSlider();
    }
});

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slide-dots');
    
    let currentSlide = 0;
    
    // Создаем точки для навигации
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateSlider() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    // Автопрокрутка
    let slideInterval = setInterval(nextSlide, 5000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Обработчики событий
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Функция зума изображения
    const images = document.querySelectorAll('.slide img');
    
    // Создаем модальное окно для зума
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal';
    zoomModal.innerHTML = `
        <span class="close-zoom">&times;</span>
        <img class="zoom-content">
    `;
    document.body.appendChild(zoomModal);
    
    const zoomImg = zoomModal.querySelector('.zoom-content');
    const closeZoom = zoomModal.querySelector('.close-zoom');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            zoomImg.src = img.src;
            zoomImg.alt = img.alt;
            zoomModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeZoom.addEventListener('click', () => {
        zoomModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    zoomModal.addEventListener('click', (e) => {
        if (e.target === zoomModal) {
            zoomModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ==================== ПЛАВНАЯ ПРОКРУТКА ====================
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигационных ссылок
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Плавная прокрутка для кнопки "The story"
    const storyLink = document.querySelector('.scroll-down');
    if (storyLink) {
        storyLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});