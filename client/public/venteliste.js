let main = document.getElementById("main")
let nameInput = document.getElementById("nameInput")
let phoneInput = document.getElementById("phoneInput")
let mailInput = document.getElementById("mailInput")
let dateInput = document.getElementById("dateInput")
let addButton = document.getElementById("addButton")
let showInputsBtn = document.getElementById("showInputsBtn")
let sendMailBtn = document.getElementById("sendMailButton")
let inputs = document.getElementById("inputs")
let showSearchBtn = document.getElementById("showSearchBtn")
let søgDiv = document.getElementById("søgDiv")
let list = document.getElementById("venteliste")
let checksAmounts = document.getElementById("checksAmounts")
let checkLabel = document.getElementById("checkLabel")
let editLabel = document.getElementById("editLabel")
let loader = document.getElementById('mailLoader');
let sendMailIcon = document.getElementById("sendMailIcon")
let moveKolonistContainer = document.getElementById("moveKolonist")
let moveNameInput = document.getElementById("moveNameInput")
let movePhoneInput = document.getElementById("movePhoneInput")
let moveMailInput = document.getElementById("moveMailInput")
let moveCurrentInput = document.getElementById("moveCurrentInput")
let movePriceInput = document.getElementById("movePriceInput")
let tilfojKolonist = document.getElementById("tilfojKolonist")
let readyToCheck = false;
let readyToEdit = false;
let readyToMove = false;
let emailAdresses = "";


let createMailContainer = document.getElementById("createMailContainer")
let typeOption = document.getElementById("mailOption")
let recieverCountSpan = document.getElementById("recieverCount")
fetchKolonister()
updateCounts();
addButton.onclick = addNewKolonist;

showSearchBtn.addEventListener("click", function() {
    if (søgDiv.style.display !== "flex") {
        searchPopUpText.style.display = "none";
        søgDiv.style.display = "flex";
    } else {
        søgDiv.style.display = "none";
        $
        searchPopUpText.style.display = "block";
    }
})

let addKolonistActive = false;
document.body.addEventListener('click', function(event) {
    if (inputs.contains(event.target) || !addKolonistActive) {
        if (inputs.style.display == "flex") {
            addKolonistActive = true;
        }
    } else {
        addKolonistActive = false;
        inputs.style.display = "none";
        tilfojKolonist.style.display = "block";
        addButton.style.transform = "rotate(-45deg)";
        addButton.style.backgroundColor = "var(--red)";
        showInputsBtn.style.backgroundColor = "var(--green)";
        showInputsBtn.style.transform = "rotate(0deg)";
        list.style.opacity = "1"

        nameInput.value = "";
        phoneInput.value = "";
        mailInput.value = "";
        dateInput.value = "";
    }
});


async function checkIfAllInfoAdded() {
    var regex = /^[0-9]+$/;
    if (nameInput.value !== "" && phoneInput.value !== "" && mailInput.value !== "" && phoneInput.value.match(regex) !== null && (phoneInput.value.length == 8 || phoneInput.value.length == 10)) {
        addButton.style.backgroundColor = "var(--green)";
        addButton.style.transform = "rotate(0deg)"
    } else {
        addButton.style.backgroundColor = "var(--red)";
        addButton.style.transform = "rotate(-45deg)"
    }
}

addButton.addEventListener("mouseover", function() {
    if (addButton.style.backgroundColor === "var(--red)") {
        addButton.style.transform = "rotate(-45deg) scale(1.3)";
        addButton.style.backgroundColor = "var(--red)";
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

showInputsBtn.addEventListener("click", function() {
    if (inputs.style.display !== "flex") {
        tilfojKolonist.style.display = "none";
        inputs.style.display = "flex";
        list.style.opacity = "0.3"
        addinputsVisible = true;
        addButton.style.transform = "rotate(-45deg)";
        addButton.style.backgroundColor = "var(--red)";
        showInputsBtn.style.backgroundColor = "var(--red)";
        showInputsBtn.style.transform = "rotate(-45deg)";

        showInputsBtn.addEventListener("mouseover", function() {
            if (inputs.style.display !== "flex") {
                showInputsBtn.style.backgroundColor = "var(--darkgreen)";
                showInputsBtn.style.transform = "rotate(-0deg)"
            }
        })

        showInputsBtn.addEventListener("mouseout", function() {
            showInputsBtn.style.backgroundColor = "var(--red)";
        })


    } else {
        addinputsVisible = false;
        tilfojKolonist.style.display = "block";
        addButton.style.transform = "rotate(-45deg)";
        addButton.style.backgroundColor = "var(--red)";
        showInputsBtn.style.backgroundColor = "var(--green)";
        showInputsBtn.style.transform = "rotate(-0deg)"

        showInputsBtn.addEventListener("mouseover", function() {
            showInputsBtn.style.backgroundColor = "var(--green)";
        })

        showInputsBtn.addEventListener("mouseout", function() {
            showInputsBtn.style.backgroundColor = "var(--green)";
        })
        inputs.style.display = "none";
        list.style.opacity = "1"

    }
})

function updateIndexLiAfterDelete() {
    let liElements = document.querySelectorAll("#venteliste li");
    for (let i = 0; i < liElements.length; i++) {
        let indexSpan = liElements[i].childNodes[0];
        if (indexSpan.tagName === "SPAN") {
            indexSpan.innerHTML = i + 1;
        }
    }
}

function updateIndexLi(el) {
    let deletedIndex = el.childNodes[0].innerHTML;
    let liElements = document.querySelectorAll("#venteliste li");
    for (let i = 0; i < liElements.length; i++) {
        let indexSpan = liElements[i].childNodes[0];
        if (indexSpan.tagName === "SPAN") {
            let currentLiIndex = parseInt(indexSpan.innerHTML);
            if (currentLiIndex > deletedIndex) {
                indexSpan.innerHTML = currentLiIndex - 1;
            }
        }
    }
}
async function moveKolonist(el) {
    if (readyToMove) {
        let dataId = el.closest("li").getAttribute("data-id");
        moveKolonistContainer.style.display = "flex";
        list.style.opacity = "0.3"
        fetch('/venteliste')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {
                        let id = dataId;
                        let kolonistTobeMoved = el.children;
                        moveNameInput.value = kolonistTobeMoved[1].innerHTML;
                        movePhoneInput.value = kolonistTobeMoved[2].innerHTML;
                        moveMailInput.value = kolonistTobeMoved[3].innerHTML;

                        moveButton.onclick = async function() {
                            await moveKolonistToHaveejer(el, id);
                            list.style.opacity = "1"
                        };


                    }
                }
            })
    } else {
        moveKolonistContainer.style.display = "none"
    }
}

async function moveKolonistToHaveejer(el, id) {
    if (movePriceInput.value !== "" && moveCurrentInput.value !== "" && moveNameInput.value !== "" &&
        movePhoneInput.value !== "" && moveMailInput.value !== "") {
        addNewHaveejer(el);
    }
    try {
        await deleteKolonisterServer(id);
        list.removeChild(el);
        updateIndexLi(el);
    } catch {
        // console(err)
    }
    venteliste.style.border = "2px #ecf0f1 solid";
    moveKolonistContainer.style.display = "none";
    readyToMove = false;
    bottomMove.style.backgroundColor = "var(--background)"
    bottomCheck.style.display = "block"
    bottomMail.style.display = "block"
    bottomEdit.style.display = "block"
}

function calculateYearAndMonths(date) {
    let addedYear = date.slice(0, 4);
    let thisYear = new Date().getFullYear();
    let year = thisYear - addedYear;

    let addedMonth = date.slice(5, 7);
    let thisMonth = new Date().getMonth() + 1;
    if (addedMonth.slice(0, 1) == 0) {
        addedMonth = Number(addedMonth.slice(1, 2));
    }

    let res = Number(year) * 12 - addedMonth + thisMonth;

    return res;

}

async function addNewHaveejer(el) {
    let kolonistTobeMoved = el.children;

    let months = calculateYearAndMonths(kolonistTobeMoved[4].innerHTML);
    let name = moveNameInput.value;
    let phone = movePhoneInput.value;
    let mail = moveMailInput.value;
    let current = moveCurrentInput.value;
    let price = movePriceInput.value;

    if (current.trim() != '' && price.trim() != '') {
        try {
            let haveejerReturned = await postHaveejerToServer({ name: name, phone: phone, mail: mail, houseNr: current, months: months, price: price })
            appendHaveejerToList(haveejerReturned);
        } catch (err) {

        }
    }
    venteliste.style.border = "2px #ecf0f1 solid";
    moveKolonistContainer.style.display = "none";
    moveCurrentInput.value = "";
    movePriceInput.value = "";
    moveNameInput.value = "";
    movePhoneInput.value = "";
    moveMailInput.value = "";
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

async function checkKolonist(el) {
    if (readyToCheck) {
        let dataId = el.closest("li").getAttribute("data-id");
        fetch('/venteliste')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {
                        if (data[i].check != 1) {
                            el.closest("li").classList.remove("notchecked");
                            el.closest("li").classList.add("checked");
                            let oldName = data[i].name;
                            let oldPhone = data[i].phone;
                            let oldMail = data[i].mail;
                            let oldDate = data[i].date;

                            fetch(`/venteliste/${dataId}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: oldName, phone: oldPhone, mail: oldMail, date: oldDate, check: "1" })
                                })
                                .then(response => response.json())
                                .then(updatedData => {
                                    console.log('Data updated on server:', updatedData);
                                })
                                .catch(error => {
                                    console.error('Error updating data on server:', error);
                                });
                            updateCounts();
                            updateRecieverCount()
                        } else {
                            el.closest("li").classList.add("notchecked");
                            el.closest("li").classList.remove("checked");
                            let oldName = data[i].name;
                            let oldPhone = data[i].phone;
                            let oldMail = data[i].mail;
                            let oldDate = data[i].date;

                            fetch(`/venteliste/${dataId}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: oldName, phone: oldPhone, mail: oldMail, date: oldDate, check: "0" })
                                })
                                .then(response => response.json())
                                .then(updatedData => {
                                    console.log('Data updated on server:', updatedData);
                                })
                                .catch(error => {
                                    console.error('Error updating data on server:', error);
                                });
                            updateCounts();
                            updateRecieverCount();
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

async function loadCheck() {
    if (readyToCheck) {
        fetch('/venteliste')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    let dataId = list.children[i].getAttribute("data-id");
                    if (data[i].id = dataId) {
                        if (data[i].check == 1) {
                            list.children[i].classList.remove("notchecked");
                            list.children[i].classList.add("checked");
                        } else {
                            list.children[i].classList.add("notchecked");
                            list.children[i].classList.remove("checked");
                        }
                    }
                }

            })
    } else {
        fetch('/venteliste')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    list.children[i].classList.add("notchecked");
                    list.children[i].classList.remove("checked");
                }
            })
    }
}

document.getElementById("checkAll").onclick = function() {
    readyToCheck = !readyToCheck;
    if (confirm("Er du sikker på du vil sætte alle til 'Har betalt?")) {
        checkAll();
        checksAmounts.style.display = "none";
        readyToCheck = false;
        bottomCheck.style.backgroundColor = 'var(--background)';
        bottomMail.style.display = "block";
        bottomEdit.style.display = "block";
        list.style.border = "2px solid var(--lightgray)"
    }
}

function checkAll() {
    fetch('/venteliste')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < list.children.length; i++) {
                let dataId = list.children[i].closest("li").getAttribute("data-id");
                if (data[i].id == dataId) {
                    if (data[i].check !== "1") {
                        let oldName = data[i].name;
                        let oldPhone = data[i].phone;
                        let oldMail = data[i].mail;
                        let oldDate = data[i].date;

                        fetch(`/venteliste/${dataId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name: oldName, phone: oldPhone, mail: oldMail, date: oldDate, check: "1" })
                            })
                            .then(response => response.json())
                            .then(updatedData => {

                                console.log('Data updated on server:', updatedData);
                            })
                            .catch(error => {
                                console.error('Error updating data on server:', error);
                            });
                        updateCounts();
                        updateRecieverCount()
                    }
                    updateCounts();
                    loadCheck();
                }
            }
        })
}

document.getElementById("nonCheckAll").onclick = function() {
    readyToCheck = !readyToCheck;
    if (confirm("Er du sikker på du vil sætte alle til 'Har ikke betalt'?")) {
        nonCheckAll();
        checksAmounts.style.display = "none";
        readyToCheck = false;
        bottomCheck.style.backgroundColor = 'var(--background)';
        bottomMail.style.display = "block";
        bottomEdit.style.display = "block";
        list.style.border = "2px solid var(--lightgray)"
    }

}

function nonCheckAll() {
    fetch('/venteliste')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < list.children.length; i++) {
                let dataId = list.children[i].closest("li").getAttribute("data-id");
                if (data[i].id == dataId) {
                    if (data[i].check !== "0") {
                        let oldName = data[i].name;
                        let oldPhone = data[i].phone;
                        let oldMail = data[i].mail;
                        let oldDate = data[i].date;

                        fetch(`/venteliste/${dataId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name: oldName, phone: oldPhone, mail: oldMail, date: oldDate, check: "0" })
                            })
                            .then(response => response.json())
                            .then(updatedData => {

                                console.log('Data updated on server:', updatedData);
                            })
                            .catch(error => {
                                console.error('Error updating data on server:', error);
                            });
                        updateCounts();

                    }
                    updateCounts();
                    loadCheck();
                }
            }
        })
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
        bottomMail.style.display = "block";
        bottomCheck.style.display = "block";
        bottomMove.style.display = "block"
    }

    function makeElEditable(el) {
        console.log("make editble")
        el.contentEditable = true;
        el.style.backgroundColor = "var(--yellow)";
        el.style.padding = "30px 10px 30px 10px"
        el.style.fontStyle = "italic";
        el.style.fontSize = "20px"

        for (let i = 0; i < el.children.length; i++) {
            el.children[i].style.width = "auto";
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
            el.children[i].style.width = "auto";
            el.children[i].style.padding = "0px";
            el.children[i].style.backgroundColor = "";
        }

        let newId = el.childNodes[0].innerText
        let newName = el.childNodes[1].innerText
        let newPhone = el.childNodes[2].innerText
        let newMail = el.childNodes[3].innerText
        let newDate = el.childNodes[4].innerText

        el.childNodes[0].style.width = "5%"
        el.childNodes[1].style.width = "20%"
        el.childNodes[2].style.width = "10%"
        el.childNodes[3].style.width = "25%"
        el.childNodes[4].style.width = "10%"

        let dataId = el.closest("li").getAttribute("data-id");

        fetch('/venteliste')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == dataId) {

                        fetch(`/venteliste/${dataId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: newId, name: newName, phone: newPhone, mail: newMail, date: newDate, check: check })
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

function updateCounts() {
    let checkedAmount = document.getElementById("checkedAmount")
    let noncheckedAmount = document.getElementById("noncheckedAmount")

    let removeNonchecked = document.getElementById("removeNonchecked")
    removeNonchecked.innerHTML = "";

    let checkedCount = 0;
    let notCheckedCount = 0;
    fetch('/venteliste')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].check == 1) {
                    checkedCount++;
                } else {
                    notCheckedCount++
                    let li = document.createElement("LI")
                    li.innerHTML = data[i].name;
                    removeNonchecked.appendChild(li)
                }
            }
            checkedAmount.innerHTML = "Har betalt: " + checkedCount;
            noncheckedAmount.innerHTML = "Har ikke betalt: " + notCheckedCount;
        })

}

async function addNewKolonist() {
    let name = nameInput.value
    let phone = phoneInput.value
    let mail = mailInput.value
    let date = dateInput.value
    if (date.trim() == '') {
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        date = yyyy + "-" + mm + "-" + dd;
    }

    var regex = /^[0-9]+$/;


    let check = "0";

    if (!phone.trim().match(regex) && phone.trim() != '') {
        alert("Telefonnr. skal bestå af tal");
    } else if (!(phone.trim() == '' || phone.trim().length == 8 || phone.trim().length == 10)) {
        alert("Telefonnr. skal bestå af 8 eller 10 tal");
    } else if (name.trim() != '' && phone.trim() != '' && mail.trim() != '') {
        try {
            let KolonistReturned = await postKolonisterToServer({ name: name, phone: phone, mail: mail, date: date, check: check })
            appendKolonistToList(KolonistReturned);
        } catch (err) {
            console.log(err)
        }
    } else {
        let string = "Tilføj venlist følgende oplysninger: ";
        let list = [name.trim(), phone.trim(), mail.trim()];
        let listNames = ["navn", "telefonnr.", "mail"]
        let listRes = [];

        for (let i = 0; i < list.length; i++) {

            if (list[i] == '') {
                let navn = listNames[i];
                listRes.push(navn);
            }

        }

        if (listRes.length == 1) {
            string += " " + listRes[0];
        }
        if (listRes.length == 2) {
            string += " " + listRes[0] + " & " + listRes[1];
        }
        if (listRes.length == 3) {
            string += " " + listRes[0] + ", " + listRes[1] + " & " + listRes[2];
        }

    }
    updateCounts();
    updateRecieverCount()
}

function appendKolonistToList(kolonistJson) {
    let el = document.createElement("LI")
    let index = document.createElement("SPAN")
    let nameEl = document.createElement("SPAN")
    let phoneEl = document.createElement("SPAN")
    let mailEl = document.createElement("SPAN")
    let dateEl = document.createElement("SPAN")

    index.setAttribute("id", "kolonistIndex")

    index.style.width = "5%"
    nameEl.style.width = "20%"
    phoneEl.style.width = "10%"
    mailEl.style.width = "25%"
    dateEl.style.width = "10%"

    index.innerHTML = list.childNodes.length;
    nameEl.innerHTML = kolonistJson.name;
    phoneEl.innerHTML = kolonistJson.phone;
    mailEl.innerHTML = kolonistJson.mail;
    dateEl.innerHTML = kolonistJson.date;

    el.dataset.id = kolonistJson.id
    index.classList.add("index-span");
    el.classList.add("notchecked");
    el.appendChild(index);
    el.appendChild(nameEl);
    el.appendChild(phoneEl);
    el.appendChild(mailEl);
    el.appendChild(dateEl);
    list.appendChild(el)
    el.addEventListener("click", function() {
        if (readyToCheck) {
            checkKolonist(el);
        } else if (readyToEdit) {
            editKolonist(el);
        } else if (readyToMove) {
            moveKolonist(el);
        }
    })
    nameInput.value = '';
    phoneInput.value = '';
    mailInput.value = '';
    dateInput.value = '';
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

async function postKolonisterToServer(data = {}) {
    const response = await fetch('/venteliste', {
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

async function deleteKolonisterServer(id) {
    const response = await fetch('/venteliste/' + id, {
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
    let filter = input.value.toUpperCase();
    let li = list.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        let searchedName = li[i].getElementsByTagName("SPAN")[1];
        let searchedPhone = li[i].getElementsByTagName("SPAN")[2];
        let searchedEmail = li[i].getElementsByTagName("SPAN")[3];
        let txtValue = searchedName.textContent || searchedName.innerText;
        let txtValue2 = searchedPhone.textContent || searchedPhone.innerText;
        let txtValue3 = searchedEmail.textContent || searchedEmail.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



///////////////////////// MAIL-CONTAINER ///////////////////////////////////////////////////////
let buttons = document.querySelectorAll("#mailOptions button");
let selectedOption;
updateRecieverCount()

sendMailBtn.addEventListener('click', async() => {
    let mailMessage;
    let subject;
    console.log(selectedOption)

    if (selectedOption == 0) {
        mailMessage = templates[0].mail;
        subject = templates[0].subject;
    }
    if (selectedOption == 1) {
        mailMessage = templates[1].mail;
        subject = templates[1].subject;
    }
    if (selectedOption == 2) {
        mailMessage = templates[2].mail;
        subject = templates[2].subject;
    }
    if (selectedOption == 3) {
        mailMessage = templates[3].mail;
        subject = templates[3].subject;
    }

    console.log("Emne: '" + subject + "' Besked: '" + mailMessage + "'")

    //loader start
    loader.style.display = "flex";
    sendMailIcon.style.display = "none";

    if (confirm("Er du sikker på du vil sende mail?")) {

        try {
            const response = await fetch("/send-email", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: emailAdresses,
                    subject: subject,
                    message: mailMessage,
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            //loader end
            loader.style.display = 'none';
            sendMailIcon.style.display = "block";
        }
    } else {
        loader.style.display = 'none';
        sendMailIcon.style.display = "block";
    }
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.style.backgroundColor === "white") {
            button.style.backgroundColor = "transparent";
            button.querySelector("i").style.color = "white";
            updateRecieverCount()
        } else {
            selectedOption = parseInt(button.id.slice(-1));
            updateRecieverCount()
            buttons.forEach((button) => {
                button.style.backgroundColor = "transparent";
                button.querySelector("i").style.color = "white";
            });
            updateRecieverCount()
            button.style.backgroundColor = "rgba(255, 255, 255, 1)";
            button.querySelector("i").style.color = "var(--background)";
        }
    });
});

function updateRecieverCount() {
    emailAdresses = "";
    mailReciever = "";

    if (selectedOption == 0) {
        let checkedCount = 0;
        fetch('/venteliste')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].check === "1") {
                        checkedCount++;
                        mailReciever = data[i].mail
                        emailAdresses = emailAdresses.concat(mailReciever, ", ");
                    }
                }
                recieverCountSpan.innerHTML = "Antal modtagere: " + checkedCount;
            })
    }

    if (selectedOption == 1) {
        let notCheckedCount = 0;
        fetch('/venteliste')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].check === "0") {
                        notCheckedCount++;
                        mailReciever = data[i].mail
                        emailAdresses = emailAdresses.concat(mailReciever, ", ");
                    }
                }

                recieverCountSpan.innerHTML = "Antal modtagere: " + notCheckedCount;
            })
    }

    if (selectedOption == 2) {
        fetch('/venteliste')
            .then(response => response.json())
            .then(data => {
                recieverCountSpan.innerHTML = "Antal modtagere: " + data.length
                for (let i = 0; i < data.length; i++) {
                    mailRecieverVenteliste = data[i].mail
                    emailAdresses = emailAdresses.concat(mailRecieverVenteliste, ", ");
                }
            })
    }

    if (selectedOption == 3) {
        fetch('/ventelisteIntern')
            .then(response => response.json())
            .then(data => {
                let internCount = data.length
                for (let i = 0; i < data.length; i++) {
                    mailRecieverIntern = data[i].mail
                }
                fetch('/venteliste')
                    .then(response => response.json())
                    .then(data => {
                        recieverCountSpan.innerHTML = "Antal modtagere: " + (+data.length + +internCount)
                        for (let i = 0; i < data.length; i++) {
                            mailRecieverVenteliste = data[i].mail
                            emailAdresses = emailAdresses.concat(mailRecieverIntern, ", ", mailRecieverVenteliste, ", ");
                        }
                    })
            })
    }
}

let subject = document.getElementById("subjectInput");
let mail = document.getElementById("mailTextInput");
let mailOptions = document.querySelectorAll("#mailOptions button");
let templateSaveBtn = document.getElementById("templateSaveBtn");
let inputArea = document.getElementById("textArea");

let templates = [];

function updateValues() {
    let index = selectedOption;
    if (selectedOption < 5) {
        subject.value = templates[index].subject;
        mail.value = templates[index].mail;

        createMailContainer.style.top = "80px"
        createMailContainer.style.height = "500px"
        inputArea.style.height = "215px";
        inputArea.style.opacity = "1"
        inputArea.style.transition = "0.3s"
        sendMailBtn.style.opacity = "1"
        mail.style.display = "block"
    } else {
        createMailContainer.style.top = "200px"
        createMailContainer.style.height = "300px"
        inputArea.style.height = "0"
        inputArea.style.opacity = "0"
        inputArea.style.transition = "0.3s"
        sendMailBtn.style.opacity = "0"
        mail.style.display = "none"
    }
}

mailOptions.forEach((option) => {
    option.addEventListener("click", () => {
        updateValues();

    });
});

fetch("/mailTemplates")
    .then((response) => response.json())
    .then((data) => {
        templates = data;
        updateValues();
    });

templateSaveBtn.addEventListener("click", () => {
    let index = selectedOption;
    let templateData = {
        subject: subject.value,
        mail: mail.value,
    };
    fetch(`/mailTemplates/${index}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(templateData),
        })
        .then((response) => response.json())
        .then((data) => {
            templates[index] = data;
        });
    checkSave()
});

function checkSave() {
    let index = selectedOption;
    fetch("/mailTemplates")
        .then((response) => response.json())
        .then((data) => {
            let huskSpan = document.getElementsByClassName("huskSave");
            if (selectedOption < 5) {
                if (mail.value !== data[index].mail || subject.value !== data[index].subject) {
                    templateSaveBtn.style.opacity = "1";
                    templateSaveBtn.innerHTML = '<i class="fa-regular fa-floppy-disk fa-beat fa-2xl" style="color: #ffffff;"></i>'
                    for (let i = 0; i < huskSpan.length; i++) {
                        huskSpan[i].style.opacity = "1";
                    }
                } else {
                    templateSaveBtn.style.opacity = "0.3";
                    templateSaveBtn.innerHTML = '<i class="fa-regular fa-floppy-disk fa-2xl" style="color: #ffffff;"></i>'
                    for (let i = 0; i < huskSpan.length; i++) {
                        huskSpan[i].style.opacity = "0";
                    }
                }
            }
        });
}
checkSave()

/////////////PROMPT////////////////

bottomDelete.addEventListener('click', function() {
    readyToMove = !readyToMove;
    if (readyToMove) {
        movePrompt.style.display = "flex"
        readyToCheck = false;
        list.style.opacity = "0.3"
        bottomCheck.style.display = "none"
        checksAmounts.style.display = "none"
    } else {
        movePrompt.style.display = "none"
        readyToCheck = true;
        list.style.opacity = "1"
        bottomCheck.style.display = "block"
        checksAmounts.style.display = "block"
    }
});

let movePrompt = document.getElementById("prompt")
let promptDone = document.getElementById("promptDone")

promptDone.addEventListener("click", function() {
    movePrompt.style.display = "none"
    list.style.opacity = "1"
    list.style.border = "2px solid var(--lightgray)"
    readyToMove = false;
    bottomMail.style.display = "block";
    bottomCheck.style.backgroundColor = "var(--darkbackground)"
    bottomEdit.style.display = "block";
    bottomMove.style.display = "block";
    bottomCheck.style.display = "block"
    checksAmounts.style.display = "none";
    bottomDelete.style.display = "none"
    loadCheck();
})

promptDone.previousElementSibling.style.display = "none"
promptDone.addEventListener("mouseover", function() {
    promptDone.previousElementSibling.style.display = "block";
})
promptDone.addEventListener("mouseout", function() {
    promptDone.previousElementSibling.style.display = "none";
})

let rememberMail = document.getElementById("rememberMail")
let moveAndDelete = document.getElementById("moveAndDelete")
let rememberYes = "rememberYes"
let rememberNo = "rememberNo"
moveAndDelete.style.display = "none";

function rememberMailAnswer(event) {
    movePrompt.style.top = "100px"
    movePrompt.style.transition = "0.3s"
    if (event.target.parentNode.id == rememberYes) {
        rememberMail.style.display = "none"
        moveAndDelete.style.display = "flex";
    } else {
        loadCheck();
        movePrompt.style.display = "none"
        readyToCheck = false;
        readyToMove = false;
        list.style.opacity = "1"
        list.style.border = "2px solid var(--lightgray)"
        bottomCheck.style.backgroundColor = 'var(--background)';
        checksAmounts.style.display = "none";
        for (let i = 0; i < list.children.length; i++) {
            list.children[i].style.cursor = "default"
        }
        bottomMail.style.display = "block";
        bottomMove.style.display = "none";
        bottomDelete.style.display = "none"

        active = true;
        createMailContainer.style.display = "flex";
        list.style.opacity = "0.3"
    }
}

async function removeNonchecked() {
    fetch('/venteliste')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let id = data[i].id
                if (data[i].check === "0") {
                    deleteKolonisterServer(id)
                    let nonchecked = document.querySelector('#venteliste li[data-id="' + id + '"]');
                    list.removeChild(nonchecked)
                }
                updateIndexLiAfterDelete()
            }
            updateCounts()
        })
}