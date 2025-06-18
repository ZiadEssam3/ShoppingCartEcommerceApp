let getLang = localStorage.getItem('langDir');
if (getLang) {
    if (getLang == 'rtl') {
        changeDirection('rtl');
    } else {
        changeDirection('ltr');
    }
}
// Language Dir
let en = document.getElementById('en_lang');
let ar = document.getElementById('ar_lang');

en.addEventListener('click', () => changeDirection('ltr'));
ar.addEventListener('click', () => changeDirection('rtl'));
function changeDirection(dir) {
    document.documentElement.setAttribute("dir", dir);
    // save last change 
    localStorage.setItem('langDir', dir);
}