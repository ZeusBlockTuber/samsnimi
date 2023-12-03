        // Функция для переключения темы
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
    
            applyThemeStyles();
        }
    
        // Проверка темы при загрузке страницы
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
    
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            }
    
            applyThemeStyles();
        });
    
        // Применение стилей для текущей темы
        function applyThemeStyles() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            document.body.classList.remove('light-theme', 'dark-theme');
            document.body.classList.add(currentTheme + '-theme');
    
            // Добавление стилей к ::before после смены темы
            const exElement = document.querySelector('.ex');
            const previousBackground = exElement.getAttribute('data-previous-background');
            exElement.style.backgroundImage = previousBackground || getComputedStyle(exElement, '::before').backgroundImage;
    
            // Сохранение текущих стилей ::before
            const currentBackground = getComputedStyle(exElement, '::before').backgroundImage;
            exElement.setAttribute('data-previous-background', currentBackground);
        }