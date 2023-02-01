window.onload = () => {
    const easyButton = document.querySelector('#easy-button')
    const hardButton = document.querySelector('#hard-button')

    const menu = document.querySelector('#start-screen')

    const canvas = document.querySelector('#canvas')

    easyButton.addEventListener('click', () => {
        menu.classList.toggle('display-none')
        canvas.classList.toggle('display-none')
        IronJump.init()
    })

    hardButton.addEventListener('click', () => {
        menu.classList.toggle('display-none')
        canvas.classList.toggle('display-none')
        IronJump.init()
    })
}