




const form = document.querySelector('form')
const input = document.querySelector('input')
const heading = document.getElementById('h1')
const paragraph = document.getElementById('p')



form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = input.value;
    console.log(location);
    fetch('http://localhost:3000/weather?location=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                heading.innerHTML = data.error
                paragraph.innerHTML = ""
            } else {
                heading.innerHTML = data.location
                paragraph.innerHTML = "temperature : " + data.temperature
            }
        })
    })

})