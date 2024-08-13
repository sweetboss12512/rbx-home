"use strict"

/** @type NodeListOf<Element> */
let recommendeds

const main = function() {
    const friendsList = document.querySelector(".friend-carousel-container")
    let continueCarousel
    let favoritesCarousel

    const gameCarousels = document.querySelectorAll(".game-sort-carousel-wrapper")

    for (let i = 0; i < gameCarousels.length; i++) {
        const element = gameCarousels[i]
        const sortText = element.querySelector(".sort-header")

        if (sortText.innerHTML.includes("Continue")) {
            continueCarousel = element
        } else if (sortText.innerHTML.includes("Favorites")) {
            favoritesCarousel = element
        }
    }

    friendsList.after(continueCarousel)
    continueCarousel.after(favoritesCarousel)

    // Remove extra 'Recommended' labels
    for (let i = 1; i < recommendeds.length; i++) {
        recommendeds[i].querySelector(".container-header").remove()
    }
}

// This is stupid. Too bad!
const interval = setInterval(() => {
    recommendeds = document.querySelectorAll('[data-testid="home-page-game-grid"]')

    if (recommendeds.length > 1) {
        clearInterval(interval)
        main()
    }

}, 100)
