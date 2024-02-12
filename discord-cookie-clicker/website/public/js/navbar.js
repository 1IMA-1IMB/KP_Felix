


function usermenu(){
    const menu2 = document.getElementById('usermenu')

    if (menu2.classList.contains('hidden2')){
        menu2.classList.remove('hidden2')
    } else {
        menu2.classList.add('hidden2')
    }

}

function myFunction(x) {
    x.classList.toggle("change");

    if(x.classList.contains("change")){
        const menu = document.getElementById('navlinksmenu')
        menu.classList.remove('hidden')
    } else {
        const menu = document.getElementById('navlinksmenu')
        menu.classList.add('hidden')
    }
}