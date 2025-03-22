document.addEventListener("DOMContentLoaded", function () {
    const langsDiv = document.querySelector(".langs");
    if (langsDiv.hasChildNodes()) return; // Запобігає дублюванню кнопок

    // Масив слів, які не повинні змінювати мову (якщо URL містить ці слова)
    const excludedPages = ["admin", "dashboard", "profile", "settings"];

    // Перевіряємо, чи URL містить слово з масиву виключень
    let isExcluded = excludedPages.some(word => window.location.href.includes(word));
    if (isExcluded) return; // Вихід, якщо сторінка в списку виключень

    // Масив мов
    const languages = [
        { code: "uk", label: "UK" },
        { code: "en", label: "EN" },
        { code: "ru", label: "RU" }
    ];

    // Додавання кнопок мов
    languages.forEach(lang => {
        let btn = document.createElement("button");
        btn.id = `lang-${lang.code}`;
        btn.textContent = lang.label;
        btn.onclick = () => switchLanguage(lang.code);
        langsDiv.appendChild(btn);
    });

    highlightActiveLanguage();
});

// Функція перемикання мови
function switchLanguage(lang) {
    localStorage.setItem("lng", lang); // Збереження мови в localStorage
    let path = window.location.pathname;

    if (lang === "uk") {
        let newPath = path.replace(/^\/p\/(en-|ru-)?(.*)\.html$/, "/p/$2.html");
        window.location.href = `${window.location.origin}${newPath}`;
        return;
    }

    let newPath = path.replace(/^\/p\/(en-|ru-)?(.*)\.html$/, `/p/${lang}-$2.html`);
    window.location.href = `${window.location.origin}${newPath}`;
}

// Функція підсвічування активної мови
function highlightActiveLanguage() {
    let lang = localStorage.getItem("lng") || "uk"; // Отримуємо мову з localStorage або "uk" за замовчуванням
    let activeButton = document.getElementById(`lang-${lang}`);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}