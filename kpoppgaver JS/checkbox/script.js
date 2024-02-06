function check() {
    const duck1 = document.getElementById('duck1')
    const duck2 = document.getElementById('duck2')

    if (!duck1.checked || !duck2.checked){
        console.log('It is not a duck!')
    } else {
        console.log('It is a duck!')
    }
}