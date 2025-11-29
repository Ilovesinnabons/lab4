// stars.js
document.addEventListener('DOMContentLoaded', function() {
    const allProjectsButton = document.querySelector('.header__nav .header__project-type:first-child');
    const otherButtons = document.querySelectorAll('.header__nav .header__project-type:not(:first-child)');
    const cardsContainer = document.querySelector('.cards');
    let starsActive = false;
    let colorChangeInterval;
    let currentEffect = null;
    
    // Обработчик для "Все проекты"
    allProjectsButton.addEventListener('click', function() {
        if (starsActive && currentEffect === 'stars') {
            // Выключаем звездочки
            removeEffects();
            stopColorChanging();
            removeActiveClass();
            starsActive = false;
            currentEffect = null;
        } else {
            // Включаем звездочки
            removeEffects();
            createSparklingStars();
            startColorChanging();
            removeActiveClass();
            allProjectsButton.classList.add('stars-active');
            starsActive = true;
            currentEffect = 'stars';
        }
    });
    
    // Обработчики для других кнопок
    otherButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            removeEffects();
            stopColorChanging();
            removeActiveClass();
            starsActive = false;
            currentEffect = null;
        });
    });
    
    function removeActiveClass() {
        const buttons = document.querySelectorAll('.header__project-type');
        buttons.forEach(btn => {
            btn.classList.remove('stars-active', 'blue-active', 'green-active', 'red-active', 'pink-active');
        });
    }
    
    function removeEffects() {
        const effects = document.querySelectorAll('.sparkle-star');
        effects.forEach(effect => effect.remove());
    }
    
    function stopColorChanging() {
        if (colorChangeInterval) {
            clearInterval(colorChangeInterval);
            colorChangeInterval = null;
        }
    }
    
    function startColorChanging() {
        colorChangeInterval = setInterval(() => {
            const stars = document.querySelectorAll('.sparkle-star');
            stars.forEach(star => {
                star.style.color = getRandomColor();
            });
        }, 1000);
    }
    
    function createSparklingStars() {
        const cards = document.querySelectorAll('.order-card');
        
        cards.forEach((card, cardIndex) => {
            const cardRect = card.getBoundingClientRect();
            const containerRect = cardsContainer.getBoundingClientRect();
            
            const cardLeft = cardRect.left - containerRect.left;
            const cardTop = cardRect.top - containerRect.top;
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            for (let i = 0; i < 12; i++) {
                const star = document.createElement('div');
                star.className = 'sparkle-star';
                star.innerHTML = '✦';
                
                let left, top;
                switch(i % 4) {
                    case 0:
                        left = cardLeft - 20;
                        top = cardTop + (cardHeight * (i/12));
                        break;
                    case 1:
                        left = cardLeft + cardWidth + 5;
                        top = cardTop + (cardHeight * (i/12));
                        break;
                    case 2:
                        left = cardLeft + (cardWidth * (i/12));
                        top = cardTop - 20;
                        break;
                    case 3:
                        left = cardLeft + (cardWidth * (i/12));
                        top = cardTop + cardHeight + 5;
                        break;
                }
                
                Object.assign(star.style, {
                    position: 'absolute',
                    left: left + 'px',
                    top: top + 'px',
                    fontSize: Math.random() * 10 + 14 + 'px',
                    color: getRandomColor(),
                    zIndex: '1000',
                    pointerEvents: 'none',
                    animation: `sparkle ${Math.random() * 2 + 1.5}s infinite ease-in-out`,
                    animationDelay: Math.random() * 2 + 's',
                    filter: `blur(${Math.random() * 2}px)`,
                    opacity: '0.8',
                    transition: 'color 0.5s ease'
                });
                
                cardsContainer.style.position = 'relative';
                cardsContainer.appendChild(star);
            }
        });
    }
    
    function getRandomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
            '#feca57', '#ff9ff3', '#54a0ff', '#ff7979', 
            '#badc58', '#7ed6df', '#e056fd', '#f368e0',
            '#ff9ff3', '#00d2d3', '#805ccaff', '#ff9f43'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});