window.onload = () => {
    const playerSaveButton = document.querySelector('#save-button')
    const easyButton = document.querySelector('#easy-button')
    const hardButton = document.querySelector('#hard-button')
    const menu = document.querySelector('#start-screen')
    const canvas = document.querySelector('#canvas')

    let playerName

    playerSaveButton.onclick = function () {
        const name = document.querySelector('.input-text')
        playerName = name.value
    }

    easyButton.addEventListener('click', () => {
        menu.classList.toggle('display-none')
        canvas.classList.toggle('display-none')
        IronJump.init(playerName, 'easy')
    })

    hardButton.addEventListener('click', () => {
        menu.classList.toggle('display-none')
        canvas.classList.toggle('display-none')
        IronJump.init(playerName, 'hard')
    })
}