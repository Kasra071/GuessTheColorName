
ChangeLanguage('en',document.getElementById('en-lang-btn'))
function ChangeLanguage(lang,clickedElement){
    var englishTexts = document.getElementById('EN')
    var persianTexts = document.getElementById('FA')
    document.querySelectorAll('.LanguageSelect div').forEach(element => {
        element.classList.remove('activeLang')
    })

    switch(lang){
        case 'en':
            englishTexts.style.display = 'block'
            persianTexts.style.display = 'none'
            clickedElement.classList.add('activeLang')
            break;
        case 'fa':
            englishTexts.style.display = 'none'
            persianTexts.style.display = 'block'
            clickedElement.classList.add('activeLang')
            break;
    }
}