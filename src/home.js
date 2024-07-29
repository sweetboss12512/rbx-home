"use strict"

/** @type NodeListOf<Element> */
let recommendeds

const main = function() {
    // Moving the first annoying Recommended to the bottom...
    const toMove = recommendeds[0]
    recommendeds[recommendeds.length - 1].appendChild(toMove)

    // Remove the extra 'Recommended for you'
    toMove.querySelector(".container-header").remove()
    for (let i = 2; i < recommendeds.length; i++) {
        recommendeds[i].querySelector(".container-header").remove()
    }

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
