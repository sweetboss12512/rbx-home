// Constants
const PLACE_ID = location.href.match("([0-9]+)")[1]
const GAME_URL = "https://www.roblox.com/games/"

// Elements
let parentContainer = document.querySelector("#rbx-friends-running-games")

async function fetchJson(url) {
    return (await fetch(url)).json()
}

async function getPlaces() {
    const universeId = (await fetchJson(`https://apis.roblox.com/universes/v1/places/${PLACE_ID}/universe`)).universeId
    const places = (await fetchJson(`https://develop.roblox.com/v1/universes/${universeId}/places`)).data

    const placeContainer = await fetch(chrome.runtime.getURL("/assets/places.html")).then(r => r.text()).then(html => {
        const placeContainer = new DOMParser().parseFromString(html, "text/html").querySelector("div") // This is stupid
        parentContainer.after(placeContainer)
        return placeContainer
    })

    const placeList = placeContainer.querySelector(".rbx-game-server-item")

    // I hate HTML, CSS, and JAVASCRIPT
    places.forEach((data) => {
        if (data.id == PLACE_ID) {
            return
        }

        const link = document.createElement("a")
        link.href = GAME_URL + data.id
        link.style.display = "block"
        link.text = `◉ ${data.name}`
        link.className = "text-name text-overflow"

        // const link = document.createElement("a")
        // const listItem = document.createElement("li")
        //
        // link.href = GAME_URL + data.id
        // link.style.display = "block"
        // link.text = `${data.name}`
        // link.className = "text-name text-overflow"
        //
        // listItem.appendChild(link)
        // placeList.appendChild(listItem)

        placeList.appendChild(link)
    })

    if (places.length > 1) {
        placeContainer.querySelector(".empty-game-instances-container").style.display = "none"
    } else {
        placeList.style.display = "none"
    }
}


// This is also stupid. Too bad!
// Probably should try finding a way to only run when on the game-instances page, but whatever.
const interval = setInterval(() => {
    parentContainer = document.querySelector("#rbx-friends-running-games")

    if (parentContainer !== null) {
        clearInterval(interval)
        getPlaces()
    }

}, 100)
