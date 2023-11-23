const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add('show')
        } else {

        entry.target.classList.remove('show')
    }
    })
})

const hiddenellements = document.querySelectorAll('.hidden')

hiddenellements.forEach((el) => observer.observe(el))

function menu(){
    const menu = document.getElementById('menu2')

    if(menu.classList.contains('hiddenmenu')){
        menu.classList.remove('hiddenmenu')
        menu.classList.add('showmenu')
        document.getElementById('menuimg').src = "./images/close.svg"
    } else {
        menu.classList.remove('showmenu')
        menu.classList.add('hiddenmenu')
        document.getElementById('menuimg').src = "./images/menu (1).svg"
    }
}