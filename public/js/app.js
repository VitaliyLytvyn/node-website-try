console.log('Client side js file is loaded')

const weatherform = document.querySelector('form')
const searchform = document.querySelector('input')
const messOne = document.querySelector('#id1')
const messTwo = document.querySelector('#id2')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchform.value

    fetch('/weather?address=' + location).then((res) => {
        res.json()
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                    messOne.textContent = data.error
                    messTwo.textContent = ''
                } else {

                    messOne.textContent = data.location
                    messTwo.textContent = data.forecast
                    console.log(data.location)
                    console.log(data.forecast)
                }

            })
    })
})