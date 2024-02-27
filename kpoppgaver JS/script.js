    function calculatec() {
    const number1 = document.getElementById('number2').value

    let converted = number1 - 32

    converted /= 1.8


    document.getElementById('status').innerText = `${number1} fahrenheit is ${converted} celcius`
}

function calculatef() {
    const number1 = document.getElementById('number2').value

    let converted = number1 * 1.8

    converted += 32


    document.getElementById('status').innerText = `${number1} celcius is ${converted} fahrenheit`
}