document.addEventListener("DOMContentLoaded", function () {
    let lang = localStorage.getItem("lng") || "uk";

    let menus = {
        uk: document.getElementById("menu-uk"),
        en: document.getElementById("menu-en"),
        ru: document.getElementById("menu-ru")
    };

    Object.values(menus).forEach(menu => menu.style.display = "none");

    if (menus[lang]) {
        menus[lang].style.display = "block";
    }
});
