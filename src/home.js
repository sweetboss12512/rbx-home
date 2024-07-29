"use strict"

/** @type NodeListOf<Element> */
let recommendeds

const main = function() {
    // Moving the first annoying Reccomended to the bottom...
    const toMove = recommendeds[0]
    toMove.querySelector(".container-header").remove() // Remove the extra 'Reccomended for you'
    recommendeds[recommendeds.length - 1].appendChild(toMove)

    const gameLists = document.querySelectorAll(".game-sort-carousel-wrapper")

    /** @type Element */
    let picks

    for (let i = 0; i < gameLists.length; i++) {
        const element = gameLists[i]
        const header = element.querySelector(".sort-header") 

        if (header.innerHTML.includes("Picks")) {
            picks = element
            break
        }
    }

    gameLists[gameLists.length - 1].after(picks)
}

// This is stupid. Too bad!
const interval = setInterval(() => {
    recommendeds = document.querySelectorAll('[data-testid="home-page-game-grid"]')

    if (recommendeds.length != 0) {
        clearInterval(interval)
        main()
    }

}, 100)
