let nameInput = document.getElementById("name")
let phoneInput = document.getElementById("phonenr")
let mailInput = document.getElementById("mail")

let nameTextInput = document.getElementById("nameTextInput")
let phoneTextInput = document.getElementById("phoneTextInput")
let mailTextInput = document.getElementById("mailTextInput")
let button = document.getElementById("submitBtn")
let noMoreSpaceLeft = document.getElementById("noMoreSpaceLeft")

//Antal mennesker der højest må være på følgende 3 ventelister tilsammen: venteliste, ventelisteansøger, ventelisteintern
let maxNumberWaiting = 100;

let templates = [];
fetch("/mailTemplates")
    .then((response) => response.json())
    .then((data) => {
        templates = data;
        updateValues();
    });


//Send mail med information om hvordan man betaler for at komme på ventelisten
async function sendMailWithPaymentDetails(mail){
    try {
            const response = await fetch("/send-email", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: mail,
                    subject: templates[6].subject,
                    message: templates[6].mail,
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
}



makePrompt();
showTheRightMenu();

button.addEventListener("click", showTheRightMenu())


async function makePrompt(){
    let sum = await numberOfPeopleInLists()

    if(sum >= maxNumberWaiting){
        alert("Beklager, der er ikke mere plads på ventelisten. Normalvis bliver der plads på ventelisten i april måned.");
    }
}

let sendMail = true;

async function showTheRightMenu(){
    let sum = await numberOfPeopleInLists()
    console.log(sum)

    if(sum < maxNumberWaiting){
        if(sendMail){
            sendMail = false;
        }
        nameInput.disabled = false;
        phoneInput.disabled = false;
        mailInput.disabled = false;
        button.disabled = false;
    }
    else{
        sendMail = true;
        nameInput.disabled = true;
        phoneInput.disabled = true;
        mailInput.disabled = true;
        button.disabled = true;
        button.style.backgroundColor = "#bdc3c7";
        button.style.pointerEvents="none"
    }
}

async function numberOfPeopleInLists(){
    let venteliste = await fetchKolonister2()   
    if(venteliste !=null){
        venteliste = Object.keys(venteliste).length
    }else{
        venteliste = 500;
    }

    let ventelisteAnsoger = await fetchKolonisterAnsoger()    
    if(ventelisteAnsoger != null){
        ventelisteAnsoger = Object.keys(ventelisteAnsoger).length
    }else{
        ventelisteAnsoger = 10000;
    }
    console.log("Ventelistenumre: " + venteliste + " " + ventelisteAnsoger)

    let sum = venteliste + ventelisteAnsoger
    return sum;
}

async function fetchKolonisterAnsoger() {
    try {
        let kolonister = await getKolonisterAnsogerFromServer()
        return kolonister
    } catch (err) {
        console.log(err)
    }
}

async function getKolonisterAnsogerFromServer() {
    const response = await fetch('/ansogereListe', {
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

async function fetchKolonister2() {
    try {
        let kolonister = await getKolonisterFromServer2()
        return kolonister
    } catch (err) {
        console.log(err)
    }
}

async function getKolonisterFromServer2() {
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

function validateForm() {

    let name = document.forms["myForm"]["name"].value;
    let phone = document.forms["myForm"]["phonenr"].value;
    let mail = document.forms["myForm"]["mail"].value;
    let year = new Date().getFullYear()
    let month = addZero(new Date().getMonth() + 1)
    let day = addZero(new Date().getDate())
    let date = year + "-" + month + "-" + day;


    if(readyToPush(name,phone,mail)){
        addNewAnsoger(name,phone,mail,date)
        nameInput.value = ""
        phoneInput.value = ""
        mailInput.value = ""
        showTheRightMenu();
        nameTextInput.value = ""
        phoneTextInput.valie = ""
        mailTextInput.value = ""
        return false
    }
    else{
        return false
    }
}


function readyToPush(name, phone, mail){

    let allInfoCorrect = true;

    if(name.trim() == ''){
        nameInput.style.border = "1px solid  var(--red)"
        nameTextInput.innerHTML = "Indtast venligst fulde navn."
        nameTextInput.style.color =  "var(--red)";
        nameTextInput.style.fontStyle = "italic"
        allInfoCorrect = false
    } else {
        nameInput.style.border = "1px solid  black"
        nameTextInput.innerHTML = " "
    }


    var regex = /^[0-9]+$/;
    if (!phone.trim().match(regex) && phone.trim() != '') {
        phoneInput.style.border = "1px solid  var(--red)"
        phoneTextInput.style.color =  "var(--red)";
        phoneTextInput.style.fontStyle = "italic"
        phoneTextInput.innerHTML = "Telefonnr. skal bestå af tal";
        allInfoCorrect = false
    } else if (!(phone.trim() == '' || phone.trim().length == 8 || phone.trim().length == 10)) {
        phoneInput.style.border = "1px solid  var(--red)"
        phoneTextInput.innerHTML = "Telefonnr. skal bestå af 8 eller 10 tal"
        phoneTextInput.style.color =  "var(--red)";
        phoneTextInput.style.fontStyle = "italic"
        allInfoCorrect = false
    } else if(phone.trim() == ''){
        phoneInput.style.border = "1px solid  var(--red)"
        phoneTextInput.innerHTML = "Indtast venligst telefonnr."
        phoneTextInput.style.color =  "var(--red)";
        phoneTextInput.style.fontStyle = "italic"
        allInfoCorrect = false
    } else{
        phoneInput.style.border = "1px solid  black"
        phoneTextInput.innerHTML = " "
    }
    

    if(mail.trim() == ''){
        mailInput.style.border = "1px solid  var(--red)"
        mailTextInput.innerHTML = "Indtast venligst mailadresse."
        mailTextInput.style.color =  "var(--red)";
        mailTextInput.style.fontStyle = "italic"
        allInfoCorrect = false
    } else {
        mailInput.style.border = "1px solid  black"
        mailTextInput.innerHTML = " "
    }


    return allInfoCorrect;

}

function addZero(num){
    if(num<10){
        return "0" + String(num)
    }
    else{
        return String(num)
    }
}

async function addNewAnsoger(name, phone, mail, date) {
    try {
        postKolonisterToServer({ name: name, phone: phone, mail: mail, date: date, check: "0" })
        alert("Tak for din ansøgning om at komme på ventelisten.\nVi har sendt dig en mail med yderligere information om, hvordan du betaler for din plads på ventelisten.\nBetales dette beløb ikke, vil din ansøgning blive slettet.")
        sendMailWithPaymentDetails(mail)
    } catch (err) {
        console.log(err)
    }
}

async function postKolonisterToServer(data = {}) {
    const response = await fetch('/ansogereListe', {
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



document.getElementById("admin").addEventListener("click", function(event) {
    event.preventDefault();
    var password = prompt("Indtast venligst adgangskode:");
    if (password === "anton") {
        window.location.href = "/adminList";
    } else {
        alert("Forkert adgangskode, prøv venligst igen");
    }
});

