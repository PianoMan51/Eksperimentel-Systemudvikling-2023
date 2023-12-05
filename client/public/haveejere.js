let nameInput = document.getElementById("nameInput")
let phoneInput = document.getElementById("phoneInput")
let mailInput = document.getElementById("mailInput")
let houseNrInput = document.getElementById("houseNrInput")
let yearsInput = document.getElementById("yearsInput")
let monthsInput = document.getElementById("monthsInput")
let priceInput = document.getElementById("priceInput")
let list = document.getElementById("venteliste")
let addButton = document.getElementById("addButton")
let showInputsBtn = document.getElementById("showInputsBtn")
let inputs = document.getElementById("inputs")
let showSearchBtn = document.getElementById("showSearchBtn")
let søgDiv = document.getElementById("søgDiv")
let tilfojKolonist = document.getElementById("tilfojKolonist")
let readyToEdit = false;
let readyToDelete = false;
let addHaveejerBox = false;
let bottomBtn = document.querySelectorAll(".bottomBtn");

let bottomCheck = document.getElementById("check")
let bottomEdit = document.getElementById("bottomEdit")
let bottomDelete = document.getElementById("bottomDelete")
let doneEdit = document.getElementById("doneEdit")
let doneDelete = document.getElementById("doneDelete")
let elementsToDelete = [];
fetchHaveejer()
addButton.onclick = addNewHaveejer;

function updateIndexLi() {
    let liElements = document.querySelectorAll("#venteliste li");

    for (let i = 0; i < liElements.length; i++) {
        let indexSpan = liElements[i].childNodes[0];
        if (indexSpan.tagName === "SPAN") {
            indexSpan.innerHTML = i + 1;
        }
    }
}



bottomEdit.addEventListener('click', function() {
    readyToEdit = !readyToEdit;
    if (readyToEdit) {
        venteliste.style.border = "2px var(--yellow) solid";
        bottomEdit.style.backgroundColor = "var(--yellow)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "pointer";
        }
        bottomDelete.style.display = "none";
    } else {
        venteliste.style.border = "2px var(--lightgray) solid";
        bottomEdit.style.backgroundColor = "var(--background)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "default";
        }
        bottomDelete.style.display = "block";
    }
});

bottomBtn.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        let span = btn.querySelector('.span');
        span.style.display = 'flex';
    });

    btn.addEventListener('mouseout', () => {
        let span = btn.querySelector('.span');
        span.style.display = 'none';
    });

});

addButton.style.backgroundColor = "var(--red)";
addButton.style.transform = "rotate(-45deg)";

document.body.addEventListener('click', function(event) {
    if (inputs.contains(event.target) || !addHaveejerBox) {
        if (inputs.style.display == "flex") {
            addHaveejerBox = true;
        }
    } else {
        addHaveejerBox = false;
        inputs.style.display = "none";
        tilfojKolonist.style.display = "block";
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)";
        showInputsBtn.style.backgroundColor = "var(--green)";
        showInputsBtn.style.transform = "rotate(0deg)";
        list.style.opacity = "1"

        nameInput.value = "";
        phoneInput.value = "";
        mailInput.value = "";
        houseNrInput.value = "";
        monthsInput.value = "";
        yearsInput.value = "";
        priceInput.value = "";
    }
});

showInputsBtn.addEventListener("click", function() {
    if (inputs.style.display !== "flex") {
        inputs.style.display = "flex";
        list.style.opacity = "0.3"
        tilfojKolonist.style.display = "none";
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)";
        showInputsBtn.style.backgroundColor = "var(--red)";
        showInputsBtn.style.transform = "rotate(-45deg)";
        showInputsBtn.addEventListener("mouseover", function() {
            if (inputs.style.display !== "flex") {
                showInputsBtn.style.backgroundColor = "var(--darkgreen)";
            }
        })

        showInputsBtn.addEventListener("mouseout", function() {
            if (inputs.style.display !== "flex") {
                showInputsBtn.style.backgroundColor = "var(--green)";
            }
        })


    } else {
        inputs.style.display = "none";
        list.style.opacity = "1"
        tilfojKolonist.style.display = "block";
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)";
        showInputsBtn.style.backgroundColor = "var(--red)";
        showInputsBtn.style.transform = "rotate(-45deg)";

        showInputsBtn.addEventListener("mouseover", function() {
            if (inputs.style.display == "flex") {
                showInputsBtn.style.backgroundColor = "var(--red)";
            }
        })

        showInputsBtn.addEventListener("mouseout", function() {
            if (inputs.style.display == "flex") {
                showInputsBtn.style.backgroundColor = "var(--red)";
            }
        })
    }
})

showSearchBtn.addEventListener("click", function() {
    if (søgDiv.style.display !== "flex") {
        searchPopUpText.style.display = "none";
        søgDiv.style.display = "flex";
    } else {
        searchPopUpText.style.display = "block";
        søgDiv.style.display = "none";
    }
})

function makeDots(string) {
    let inputString = string;
    let n = 3; // specify after how many characters does the specified character have to be inserted
    let insertChar = ".";
    let rest = inputString.length % 3;
    let outputString = "";
    if (rest != 0) {
        outputString = inputString.slice(0, rest) + insertChar;
    }
    for (let i = rest; i < inputString.length; i += n) {
        let slice = inputString.slice(i, i + n);
        if (slice.length == n) {
            outputString += slice + insertChar;
        } else {
            outputString += slice;
        }
    }
    return outputString.slice(0, -1);
}

async function checkIfAllInfoAdded() {
    var regex = /^[0-9]+$/;
    if (nameInput.value !== "" && phoneInput.value !== "" && mailInput.value !== "" &&
        monthsInput.value !== "" && yearsInput.value !== "" && priceInput.value !== "" &&
        houseNrInput.value !== "" && phoneInput.value.match(regex) !== null &&
        (phoneInput.value.length == 8 || phoneInput.value.length == 10) &&
        monthsInput.value.match(regex) !== null && yearsInput.value.match(regex) !== null &&
        priceInput.value.match(regex) !== null && houseNrInput.value.match(regex) !== null) {
        addButton.style.backgroundColor = "var(--green)";
        addButton.style.transform = "rotate(0deg)"
    } else {
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)"
    }
};

addButton.addEventListener("mouseover", function() {
    if (addButton.style.backgroundColor === "var(--red)") {
        addButton.style.transform = "rotate(-45deg) scale(1.3)";
    }
    if (addButton.style.backgroundColor === "var(--green)") {
        addButton.style.transform = "rotate(0deg) scale(1.3)";
        addButton.style.backgroundColor = "var(--darkgreen)"
    }
})

addButton.addEventListener("mouseout", function() {
    if (addButton.style.backgroundColor === "var(--red)") {
        addButton.style.transform = "rotate(-45deg) scale(1)";
        addButton.style.backgroundColor = "var(--red)"
    }
    if (addButton.style.backgroundColor === "var(--darkgreen)") {
        addButton.style.transform = "rotate(0deg) scale(1)";
        addButton.style.backgroundColor = "var(--green)"
    }
})

bottomDelete.addEventListener("click", function() {
    readyToDelete = !readyToDelete;
    if (readyToDelete) {
        bottomDelete.style.backgroundColor = "var(--red)"
        list.style.border = "2px solid var(--red)";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "pointer"
        }
        bottomEdit.style.display = "none"
        bottomDelete.style.display = "none"
        doneDelete.style.display = "block"
    }
})

async function deleteHaveejer(el) {
    if (readyToDelete) {
        let dataId = el.closest("li").getAttribute("data-id");
        elementsToDelete.innerHTML = ""
        fetch('/listeHaveejere')
            .then(response => response.json())
            .then(data => {
                let counter = 0;

                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {
                        if (el.style.backgroundColor != "var(--red)") {
                            el.style.backgroundColor = "var(--red)";
                            list.children[i].style.textDecoration = "line-through";
                            elementsToDelete.push(el);
                            counter++;
                        } else {
                            el.style.backgroundColor = "var(--blue)";
                            list.children[i].style.textDecoration = "none";
                            elementsToDelete = elementsToDelete.filter(element => element !== el);
                        }
                    }
                }
            });

        doneDelete.onclick = async function() {
            try {
                for (let i = 0; i < elementsToDelete.length; i++) {
                    let markedElement = elementsToDelete[i];
                    let id = markedElement.closest("li").getAttribute("data-id");
                    await deleteHaveejerServer(id);
                    list.removeChild(markedElement);
                }
                updateIndexLi();
            } catch (err) {
                console.log(err);
            }
            readyToDelete = false;
            bottomDelete.style.backgroundColor = "var(--background)";
            list.style.border = "2px solid var(--lightgray)";
            for (let i = 0; i < list.children.length; i++) {
                list.children[i].style.cursor = "default";
            }
            bottomEdit.style.display = "block";
            bottomDelete.style.display = "block";
            doneDelete.style.display = "none"
        }
    }
}

let editEl = null;

async function editKolonist(el) {
    if (readyToEdit) {
        if (editEl != null && editEl != el) {
            makeElNonEditable(editEl);
        }
        if (editEl != el) {
            makeElEditable(el)
        }

        doneEdit.style.display = "block";
        bottomEdit.style.display = "none"
        editEl = el;
    }

    doneEdit.onclick = function() {
        makeElNonEditable(el)
        list.style.border = "2px #ecf0f1 solid";
        doneEdit.style.display = "none";
        bottomEdit.style.display = "block"
        readyToEdit = false;
        bottomEdit.style.backgroundColor = "var(--background)";
        bottomDelete.style.display = "block";
    }

    function makeElEditable(el) {
        console.log("make editble")
        el.contentEditable = true;
        el.style.backgroundColor = "var(--yellow)";
        el.style.padding = "30px 10px 30px 10px"
        el.style.fontStyle = "italic";
        el.style.fontSize = "20px"

        for (let i = 0; i < el.children.length; i++) {
            el.children[i].style.padding = "5px 10px";
            el.children[i].style.backgroundColor = "var(--darkyellow)";
        }
    }

    function makeElNonEditable(el) {
        console.log("make non editble")
        el.style.backgroundColor = "var(--blue)";
        el.contentEditable = false;
        el.style.padding = "10px"
        el.style.fontStyle = "normal";
        el.style.fontSize = "16px"

        for (let i = 0; i < el.children.length; i++) {
            el.children[i].style.padding = "0px";
            el.children[i].style.backgroundColor = "";
        }

        let newId = el.childNodes[0].innerText
        let newName = el.childNodes[1].innerText
        let newPhone = el.childNodes[2].innerText
        let newMail = el.childNodes[3].innerText
        let newMonths = el.childNodes[4].innerText.replace(/[^0-9]/g, '');
        let newPrice = el.childNodes[5].innerText.replace(/[^0-9]/g, '');
        let newHouseNr = el.childNodes[6].innerText.substring(7)

        let dataId = el.closest("li").getAttribute("data-id");

        fetch('/listeHaveejere')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {

                        fetch(`/listeHaveejere/${dataId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: newId, name: newName, phone: newPhone, mail: newMail, months: newMonths, houseNr: newHouseNr, price: newPrice })
                            })
                            .then(response => response.json())
                            .then(updatedData => {
                                console.log('Data updated on server:', updatedData);
                            })
                            .catch(error => {
                                console.error('Error updating data on server:', error);
                            });
                    }
                }

            })
    }
}













async function addNewHaveejer(evt) {
    let name = nameInput.value;
    let phone = phoneInput.value;
    let mail = mailInput.value;
    let houseNr = houseNrInput.value;
    let years = yearsInput.value;
    let months = monthsInput.value;
    let price = priceInput.value;

    var regex = /^[0-9]+$/;
    if (!phone.trim().match(regex) && phone.trim() != '') {
        alert("Telefonnr. skal bestå af tal");
    } else if (!(phone.trim() == '' || phone.trim().length == 8 || phone.trim().length == 10)) {
        alert("Telefonnr. skal bestå af 8 eller 10 tal");
    } else if (!houseNr.trim().match(regex) && houseNr.trim() != '') {
        alert("Husnummer skal bestå af tal");
    } else if (!years.trim().match(regex) && years.trim() != '') {
        alert("Antal år på ventelisten skal bestå af tal");
    } else if (!months.trim().match(regex) && months.trim() != '') {
        alert("Antal måneder på ventelisten skal bestå af tal");
    } else if (months > 11) {
        alert("Antal måneder må højest være 11");
    } else if (!price.trim().match(regex) && price.trim() != '') {
        alert("Prisen skal bestå af tal");
    } else if (name.trim() == '' || phone.trim() == '' || mail.trim() == '' || houseNr.trim() == '' || years.trim() == '' || months.trim() == '' || price.trim() == '') {
        let string = "Tilføj venlist følgende oplysninger: ";
        let list = [name.trim(), phone.trim(), mail.trim(), houseNr.trim(), years.trim(), months.trim(), price.trim()];
        let listNames = ["navn", "telefonnr.", "mail", "husnr.", "antal år på ventelisten", "antal måneder på ventelisten", "prisen på kolonihaven"]
        let listRes = [];

        for (let i = 0; i < list.length; i++) {

            if (list[i] == '') {
                let navn = listNames[i];
                listRes.push(navn);
            }
        }
        if (listRes.length == 1) {
            string += " " + listRes[0];
        } else if (listRes.length == 2) {
            string += " " + listRes[0] + " & " + listRes[1];
        } else if (listRes.length >= 3) {
            string += " " + listRes[0];
            for (let i = 1; i < listRes.length - 1; i++) {
                string += ", " + listRes[i];
            }
            string += " & " + listRes[listRes.length - 1];
        }

        alert(string);
    } else {
        let monthsResult = years * 12
        monthsResult += +months;
        try {
            let haveejerReturned = await postHaveejerToServer({ name: name, months: monthsResult, price: price, phone: phone, mail: mail, houseNr: houseNr })
            appendHaveejerToList(haveejerReturned);

            //console.log(id)
        } catch (err) {
            //console.log(err)
        }
    }
}

function appendHaveejerToList(kolonistJson) {
    let el = document.createElement("LI")
    let index = document.createElement("SPAN")
    let nameEl = document.createElement("SPAN")
    let monthsEl = document.createElement("SPAN")
    let priceEl = document.createElement("SPAN")
    let phoneEl = document.createElement("SPAN")
    let mailEl = document.createElement("SPAN")
    let houseNrEl = document.createElement("SPAN")

    index.setAttribute("id", "kolonistIndex")

    index.innerHTML = list.childNodes.length;
    nameEl.innerHTML = kolonistJson.name;
    phoneEl.innerHTML = kolonistJson.phone;
    mailEl.innerHTML = kolonistJson.mail;
    houseNrEl.innerHTML = "Husnr: " + kolonistJson.houseNr;
    let monthsFromJson = kolonistJson.months;
    monthsEl.innerHTML = monthsFromJson + " måneder";
    priceEl.innerHTML = makeDots(kolonistJson.price) + ",-";


    index.style.width = "1%"
    nameEl.style.width = "15%"
    monthsEl.style.width = "10%"
    priceEl.style.widows = "10%"
    phoneEl.style.width = "8%"
    mailEl.style.width = "20%"
    houseNrEl.style.width = "10%"

    el.dataset.id = kolonistJson.id
    index.classList.add("index-span");
    el.appendChild(index)
    el.appendChild(nameEl);
    el.appendChild(phoneEl);
    el.appendChild(mailEl);
    el.appendChild(monthsEl);
    el.appendChild(priceEl);
    el.appendChild(houseNrEl);
    list.appendChild(el)
    el.addEventListener("click", function() {
        if (readyToEdit) {
            editKolonist(el);
        } else if (readyToDelete) {
            deleteHaveejer(el)
        }
    })
    nameInput.value = '';
    phoneInput.value = '';
    mailInput.value = '';
    houseNrInput.value = '';
    priceInput.value = '';
    monthsInput.value = '';
    yearsInput.value = '';

}

async function fetchHaveejer() {
    try {
        let kolonister = await getHaveejerFromServer()
        kolonister.forEach(name => { appendHaveejerToList(name) })
    } catch (err) {
        console.log(err)
    }
}

async function getHaveejerFromServer() {
    const response = await fetch('/listeHaveejere', {
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

async function postHaveejerToServer(data = {}) {
    const response = await fetch('/listeHaveejere', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error(`Connection failed with status code ${response.status}`)
    }
    return await response.json()
}

async function deleteHaveejerServer(id) {
    const response = await fetch('/listeHaveejere/' + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    return
}

searchPerson();

function searchPerson() {
    let input = document.getElementById("søgNavn");
    let inputMedPunktum = document.getElementById("søgNavn");
    let filter = input.value.toUpperCase();
    let filterMedPunktum = inputMedPunktum.value.toUpperCase();
    let li = list.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        let searchedName = li[i].getElementsByTagName("SPAN")[1];
        let searchedPhone = li[i].getElementsByTagName("SPAN")[2];
        let searchedMail = li[i].getElementsByTagName("SPAN")[3];
        let searchedPrice = li[i].getElementsByTagName("SPAN")[5];
        let searchedhouseNr = li[i].getElementsByTagName("SPAN")[6];

        let txtValue = searchedName.textContent || searchedName.innerText;
        let txtValue2 = searchedMail.textContent || searchedMail.innerText;
        let txtValue3 = searchedPhone.textContent || searchedPhone.innerText;;
        let txtValue4 = searchedhouseNr.textContent || searchedhouseNr.innerText;;
        let txtValue5 = searchedPrice.textContent || searchedPrice.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1 || txtValue4.toUpperCase().indexOf(filter) > -1 || txtValue5.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}