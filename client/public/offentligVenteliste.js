let nameInput = document.getElementById("nameInput")
let venteliste = document.getElementById("offentligVenteliste")

fetchKolonister()

function appendKolonistToList(kolonistJson) {
    let el = document.createElement("LI")
    let index = document.createElement("SPAN")
    let nameEl = document.createElement("SPAN")

    index.style.float = "left";

    index.innerHTML = venteliste.childNodes.length;
    nameEl.innerHTML = kolonistJson.name.trim().split(" ")[0] + " " + kolonistJson.name.trim().split(" ")[1].charAt(0) + ".";


    el.dataset.id = kolonistJson.id;
    index.classList.add("index-span");
    el.appendChild(index)
    el.appendChild(nameEl);
    venteliste.appendChild(el)
}


async function fetchKolonister() {
    try {
        let kolonister = await getKolonisterFromServer()
        kolonister.forEach(name => { appendKolonistToList(name) })
    } catch (err) {
        console.log(err)
    }
}


async function getKolonisterFromServer() {
    const response = await fetch('/venteliste', {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        })
        //We add this additional fail condition to capture connection issues
    if (!response.ok) {
        throw new Error(`Connection failed with status code ${response.status}`)
    }
    return await response.json()
}