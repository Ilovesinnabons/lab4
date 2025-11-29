document.addEventListener('DOMContentLoaded', function() {
    const allProjectsButton = document.querySelector('.header__nav .header__project-type:first-child');
    const otherButtons = document.querySelectorAll('.header__nav .header__project-type:not(:first-child)');
    const cardsContainer = document.querySelector('.cards');
    let colorChangeInterval;
    let starsUpdateInterval;
    let stars = [];
    

    allProjectsButton.addEventListener('click', function() {
        if (allProjectsButton.classList.contains('stars-active')) {
            removeStarsEffect();
            stopColorChanging();
            stopStarsUpdate();
            allProjectsButton.classList.remove('stars-active');
        } else {
            createSparklingStars();
            startColorChanging();
            startStarsUpdate();
            allProjectsButton.classList.add('stars-active');
        }
    });
    
    otherButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if (button.classList.contains(getActiveClass(index))) {
                removeProjectEffect(index);
                button.classList.remove(getActiveClass(index));
            } else {
                createProjectEffect(index);
                button.classList.add(getActiveClass(index));
            }
            
            if (allProjectsButton.classList.contains('stars-active')) {
                updateStarsPositions();
            }
        });
    });
    
    function getActiveClass(index) {
        const classes = ['blue-active', 'green-active', 'red-active', 'pink-active'];
        return classes[index];
    }
    
    function removeStarsEffect() {
        stars.forEach(star => star.element.remove());
        stars = [];
        stopStarsUpdate();
    }
    
    function removeProjectEffect(index) {
        const cards = document.querySelectorAll('.order-card');
        
        switch(index) {
            case 0: 
                cards.forEach(card => {
                    if (card.classList.contains('order-card--blue')) {
                        card.style.background = '';
                    }
                });
                break;
            case 1: 
                cards.forEach(card => {
                    if (card.classList.contains('order-card--green')) {
                        card.style.animation = '';
                    }
                });
                break;
            case 2: 
                cards.forEach(card => {
                    if (card.classList.contains('order-card--red')) {
                        card.style.animation = '';
                        card.style.position = '';
                        card.style.top = '';
                    }
                });
                break;
            case 3:
                cards.forEach(card => {
                    if (card.classList.contains('order-card--pink')) {
                        card.style.animation = '';
                    }
                });
                break;
        }
    }
    
    function stopColorChanging() {
        if (colorChangeInterval) {
            clearInterval(colorChangeInterval);
            colorChangeInterval = null;
        }
    }
    
    function stopStarsUpdate() {
        if (starsUpdateInterval) {
            clearInterval(starsUpdateInterval);
            starsUpdateInterval = null;
        }
    }
    
    function startColorChanging() {
        colorChangeInterval = setInterval(() => {
            stars.forEach(star => {
                star.element.style.color = getRandomColor();
            });
        }, 1000);
    }
    
    function startStarsUpdate() {
        starsUpdateInterval = setInterval(() => {
            updateStarsPositions();
        }, 100); 
    }
    
    function updateStarsPositions() {
        const cards = document.querySelectorAll('.order-card');
        const containerRect = cardsContainer.getBoundingClientRect();
        
        cards.forEach((card, cardIndex) => {
            const cardStars = stars.filter(star => star.cardIndex === cardIndex);
            const cardRect = card.getBoundingClientRect();
            
            const cardLeft = cardRect.left - containerRect.left;
            const cardTop = cardRect.top - containerRect.top;
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            cardStars.forEach((star, starIndex) => {
                let left, top;
                const positionType = star.positionType;
                const positionIndex = star.positionIndex;
                
                switch(positionType) {
                    case 'left':
                        left = cardLeft - 20;
                        top = cardTop + (cardHeight * (positionIndex/12));
                        break;
                    case 'right':
                        left = cardLeft + cardWidth + 5;
                        top = cardTop + (cardHeight * (positionIndex/12));
                        break;
                    case 'top':
                        left = cardLeft + (cardWidth * (positionIndex/12));
                        top = cardTop - 20;
                        break;
                    case 'bottom':
                        left = cardLeft + (cardWidth * (positionIndex/12));
                        top = cardTop + cardHeight + 5;
                        break;
                }
                
                star.element.style.left = left + 'px';
                star.element.style.top = top + 'px';
            });
        });
    }
    
    function createSparklingStars() {
        const cards = document.querySelectorAll('.order-card');
        const containerRect = cardsContainer.getBoundingClientRect();
        
        cards.forEach((card, cardIndex) => {
            const cardRect = card.getBoundingClientRect();
            
            const cardLeft = cardRect.left - containerRect.left;
            const cardTop = cardRect.top - containerRect.top;
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            for (let i = 0; i < 12; i++) {
                const star = document.createElement('div');
                star.className = 'sparkle-star';
                star.innerHTML = '✦';
                
                let left, top;
                let positionType, positionIndex;
                
                switch(i % 4) {
                    case 0:
                        positionType = 'left';
                        positionIndex = i;
                        left = cardLeft - 20;
                        top = cardTop + (cardHeight * (i/12));
                        break;
                    case 1:
                        positionType = 'right';
                        positionIndex = i;
                        left = cardLeft + cardWidth + 5;
                        top = cardTop + (cardHeight * (i/12));
                        break;
                    case 2:
                        positionType = 'top';
                        positionIndex = i;
                        left = cardLeft + (cardWidth * (i/12));
                        top = cardTop - 20;
                        break;
                    case 3:
                        positionType = 'bottom';
                        positionIndex = i;
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
                    transition: 'color 0.5s ease, left 0.1s ease, top 0.1s ease'
                });
                
                cardsContainer.style.position = 'relative';
                cardsContainer.appendChild(star);
                
                stars.push({
                    element: star,
                    cardIndex: cardIndex,
                    positionType: positionType,
                    positionIndex: positionIndex
                });
            }
        });
    }
    
    function createProjectEffect(index) {
        const cards = document.querySelectorAll('.order-card');
        
        switch(index) {
            case 0: 
                cards.forEach(card => {
                    if (card.classList.contains('order-card--blue')) {
                        card.style.background = '#a5c6fa41';
                        card.style.transition = 'background 0.5s ease';
                    }
                });
                break;
            case 1: 
                cards.forEach(card => {
                    if (card.classList.contains('order-card--green')) {
                        card.style.animation = 'pulse 1s infinite ease-in-out';
                    }
                });
                break;
            case 2: 
                cards.forEach(card => {
                    if (card.classList.contains('order-card--red')) {
                        card.style.position = 'relative';
                        card.style.animation = `fallDown 2s forwards ease-in`;
                    }
                });
                break;
            case 3: 
                cards.forEach(card => {
                    if (card.classList.contains('order-card--pink')) {
                        card.style.animation = 'rotate 3s infinite linear';
                    }
                });
                break;
        }
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