const tabNavList = document.querySelectorAll('.nav-container div')
const contentList = document.querySelectorAll('.content')

tabNavList.forEach((tabNav) => {
    tabNav.addEventListener('click', (event) => {
        for (let i=0; i<tabNavList.length; i++) {
            tabNavList[i].classList.remove('active')
            contentList[i].style.display = 'none'
        }
        tabNav.classList.add('active')
        const activeContentElm = document.getElementById(tabNav.dataset.tab)
        activeContentElm.style.display = 'flex'
    })
})

