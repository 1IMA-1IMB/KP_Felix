function menubtnclick() {
    const menu = document.getElementById('droppdown')

    if(menu.classList.contains('dropdowndivs')) {
        menu.classList.remove('dropdowndivs')
    } else {
        menu.classList.add('dropdowndivs')
    }
}
