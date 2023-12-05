const path = require('path')
const express = require('express')
const nodemailer = require('nodemailer');
const app = express()
const port = 8080

let clientDir = path.join(__dirname, 'client')
let staticDir = path.join(clientDir, 'public')


let venteliste = [
    { id: 0, name: "Pia Thomsen", phone: "93729475", mail: "nikolajwold@hotmail.com", date: "1995-01-15", check: "1" },
    { id: 1, name: "Markus Skov", phone: "52356324", mail: "markusskov@gmail.com", date: "1996-02-20", check: "1" },
    { id: 2, name: "Lars Jensen", phone: "72381957", mail: "larsjensen@gmail.com", date: "1996-04-01", check: "1" },
    { id: 3, name: "Mette Nielsen", phone: "13958672", mail: "mettenielsen@gmail.com", date: "1996-05-15", check: "0" },
    { id: 4, name: "Søren Larsen", phone: "61429378", mail: "sorenlarsen@gmail.com", date: "1997-02-22", check: "1" },
    { id: 5, name: "Camilla Hansen", phone: "89635417", mail: "camillahansen@gmail.com", date: "1998-10-04", check: "1" },
    { id: 6, name: "Anders Pedersen", phone: "37169458", mail: "anderspedersen@gmail.com", date: "1999-07-12", check: "1" },
    { id: 7, name: "Mads Andersen", phone: "14297368", mail: "madsandersen@gmail.com", date: "2000-04-19", check: "0" },
    { id: 8, name: "Line Møller", phone: "72586149", mail: "linemoller@gmail.com", date: "2001-01-26", check: "1" },
    { id: 9, name: "Morten Rasmussen", phone: "38694217", mail: "mortenrasmussen@gmail.com", date: "2002-11-07", check: "1" },
    { id: 10, name: "Charlotte Christensen", phone: "91827465", mail: "charlottechristensen@gmail.com", date: "2003-08-15", check: "0" },
    { id: 11, name: "Thomas Petersen", phone: "54327819", mail: "thomaspetersen@gmail.com", date: "2004-05-22", check: "1" },
    { id: 12, name: "Louise Jensen", phone: "17235984", mail: "louisejensen@gmail.com", date: "2005-02-28", check: "1" },
    { id: 13, name: "Martin Jørgensen", phone: "75394628", mail: "martinjorgensen@gmail.com", date: "2006-12-11", check: "0" },
    { id: 14, name: "Sara Nielsen", phone: "32961587", mail: "saranielsen@gmail.com", date: "2007-09-18", check: "0" },
    { id: 15, name: "Jens Hansen", phone: "98527163", mail: "jenshansen@gmail.com", date: "2008-06-26", check: "1" },
    { id: 16, name: "Anne Larsen", phone: "47193865", mail: "annelarsen@gmail.com", date: "2009-04-03", check: "1" },
    { id: 17, name: "Christian Nielsen", phone: "13852749", mail: "christiannielsen@gmail.com", date: "2010-01-11", check: "1" },
    { id: 18, name: "Maria Pedersen", phone: "72638495", mail: "mariapedersen@gmail.com", date: "2011-10-23", check: "0" },
    { id: 19, name: "Erik Andersen", phone: "35927186", mail: "erikandersen@gmail.com", date: "2012-07-30", check: "1" },
    { id: 20, name: "Sofie Møller", phone: "91856347", mail: "sofiemoller@gmail.com", date: "2013-05-07", check: "1" },
    { id: 21, name: "Peter Rasmussen", phone: "54291738", mail: "peterrasmussen@gmail.com", date: "2014-02-13", check: "1" },
    { id: 22, name: "Ida Christensen", phone: "17392856", mail: "idachristensen@gmail.com", date: "2014-11-26", check: "0" },
    { id: 23, name: "Andreas Petersen", phone: "75429183", mail: "andreaspetersen@gmail.com", date: "2014-09-02", check: "0" },
    { id: 24, name: "Nina Jensen", phone: "32917845", mail: "ninajensen@gmail.com", date: "2015-06-10", check: "0" },
    { id: 25, name: "Mathias Jørgensen", phone: "98573462", mail: "mathiasjorgensen@gmail.com", date: "2015-03-18", check: "1" },
    { id: 26, name: "Lotte Nielsen", phone: "47159283", mail: "lottenielsen@gmail.com", date: "2015-12-25", check: "0" },
    { id: 27, name: "Jesper Hansen", phone: "13824765", mail: "jesperhansen@gmail.com", date: "2015-10-01", check: "0" },
    { id: 28, name: "Emma Larsen", phone: "72613549", mail: "emmalarsen@gmail.com", date: "2015-07-08", check: "1" },
    { id: 29, name: "Mark Nielsen", phone: "35947826", mail: "marknielsen@gmail.com", date: "2016-04-14", check: "1" },
    { id: 30, name: "Julie Pedersen", phone: "91875634", mail: "juliepedersen@gmail.com", date: "2015-01-21", check: "1" },
    { id: 31, name: "Anders Pedersen", phone: "72938461", mail: "anderspedersen@gmail.com", date: "2016-11-24", check: "1" },
    { id: 32, name: "Emilie Nielsen", phone: "36579184", mail: "emilienielsen@gmail.com", date: "2016-09-02", check: "1" },
    { id: 33, name: "Christian Sørensen", phone: "94827563", mail: "christiansorensen@gmail.com", date: "2017-05-14", check: "0" },
    { id: 34, name: "Maria Rasmussen", phone: "24359678", mail: "mariarasmussen@gmail.com", date: "2017-01-22", check: "0" },
    { id: 35, name: "Simon Jensen", phone: "89653724", mail: "simonjensen@gmail.com", date: "2017-12-05", check: "0" },
    { id: 36, name: "Caroline Hansen", phone: "13578294", mail: "carolinehansen@gmail.com", date: "2018-08-27", check: "1" },
    { id: 37, name: "Jesper Christensen", phone: "46918253", mail: "jesperchristensen@gmail.com", date: "2018-06-08", check: "1" },
    { id: 38, name: "Louise Jensen", phone: "74569823", mail: "louisejensen@gmail.com", date: "2018-04-15", check: "0" },
    { id: 39, name: "Frederik Larsen", phone: "26357491", mail: "frederiklarsen@gmail.com", date: "2019-02-26", check: "0" },
    { id: 40, name: "Sara Christoffersen", phone: "85731246", mail: "sarachristoffersen@gmail.com", date: "2019-01-12", check: "0" },
    { id: 41, name: "Jonas Nielsen", phone: "21459837", mail: "jonasnielsen@gmail.com", date: "2019-11-22", check: "0" },
    { id: 42, name: "Mathilde Andersen", phone: "78645392", mail: "mathildeandersen@gmail.com", date: "2019-10-01", check: "1" },
    { id: 43, name: "Markus Hansen", phone: "52968143", mail: "markushansen@gmail.com", date: "2019-08-14", check: "1" },
    { id: 44, name: "Isabella Pedersen", phone: "91743528", mail: "isabellapedersen@gmail.com", date: "2020-06-25", check: "1" },
    { id: 45, name: "Oliver Jensen", phone: "34569871", mail: "oliverjensen@gmail.com", date: "2020-05-08", check: "0" },
    { id: 46, name: "Mikkel Christoffersen", phone: "21093654", mail: "mikkelchristoffersen@gmail.com", date: "2020-05-28", check: "0" },
    { id: 47, name: "Lukas Pedersen", phone: "18563792", mail: "lukaspedersen@gmail.com", date: "2021-01-22", check: "1" },
    { id: 48, name: "Sara Jensen", phone: "64827531", mail: "sarajensen@gmail.com", date: "2021-11-17", check: "0" },
    { id: 49, name: "Anders Hansen", phone: "95762341", mail: "andershansen@gmail.com", date: "2021-02-28", check: "0" },
    { id: 50, name: "Emilie Christoffersen", phone: "21049763", mail: "emiliechristoffersen@gmail.com", date: "2021-06-05", check: "1" },
    { id: 51, name: "Christian Eriksen", phone: "63920175", mail: "christianeriksen@gmail.com", date: "2022-08-13", check: "0" },
    { id: 52, name: "Isabella Jørgensen", phone: "82971046", mail: "isabellajorgensen@gmail.com", date: "2022-05-04", check: "1" },
    { id: 53, name: "Oliver Møller", phone: "46190358", mail: "olivermoller@gmail.com", date: "2022-09-11", check: "1" },
    { id: 54, name: "Julie Christensen", phone: "72851409", mail: "juliechristensen@gmail.com", date: "2022-03-21", check: "1" },
    { id: 55, name: "Simon Larsen", phone: "81930546", mail: "simonlarsen@gmail.com", date: "2023-04-13", check: "1" },
    { id: 56, name: "Mille Sørensen", phone: "36754281", mail: "millesorensen@gmail.com", date: "2023-12-19", check: "1" },
    { id: 57, name: "Lucas Nielsen", phone: "26394581", mail: "lucasnielsen@gmail.com", date: "2023-02-08", check: "1" },
    { id: 58, name: "Marie Pedersen", phone: "83927146", mail: "mariepedersen@gmail.com", date: "2023-10-25", check: "0" },
    { id: 59, name: "Felix Jensen", phone: "62401597", mail: "felixjensen@gmail.com", date: "2023-12-06", check: "0" },
    { id: 60, name: "Clara Hansen", phone: "48250963", mail: "clarahansen@gmail.com", date: "2023-07-02", check: "1" },
]

let ventelisteIntern = [
    { id: 0, name: "Nikolaj Vinther", phone: "40154739", mail: "nikolajvinther@hotmail.com", houseNr: "4", check: "0" },
    { id: 1, name: "Line Sommer", phone: "52462445", mail: "line sommer@hotmail.com", houseNr: "7", check: "1" },
    { id: 2, name: "Lars Hansen", phone: "31234567", mail: "lars.hansen@email.dk", houseNr: "43", check: "0" },
    { id: 3, name: "Mette Jensen", phone: "22345678", mail: "mette.jensen@mail.com", houseNr: "87", check: "0" },
    { id: 4, name: "Anders Nielsen", phone: "40123456", mail: "anders.nielsen@mail.dk", houseNr: "111", check: "0" },
    { id: 5, name: "Maria Petersen", phone: "50123456", mail: "maria.petersen@outlook.com", houseNr: "245", check: "0" },
    { id: 6, name: "Hanne Jensen", phone: "22123456", mail: "hanne.jensen@mail.com", houseNr: "25", check: "1" },
    { id: 7, name: "Morten Pedersen", phone: "40111111", mail: "morten.pedersen@outlook.com", houseNr: "99", check: "0" },
    { id: 8, name: "Sofie Andersen", phone: "51234567", mail: "sofie.andersen@mail.dk", houseNr: "167", check: "0" },
    { id: 9, name: "Jens Nielsen", phone: "31234568", mail: "jens.nielsen@email.dk", houseNr: "283", check: "0" },
    { id: 10, name: "Maja Christensen", phone: "25123456", mail: "maja.christensen@mail.com", houseNr: "12", check: "0" },
    { id: 11, name: "Thomas Larsen", phone: "41234567", mail: "thomas.larsen@mail.dk", houseNr: "38", check: "0" },
    { id: 12, name: "Louise Petersen", phone: "50112233", mail: "louise.petersen@outlook.com", houseNr: "54", check: "0" },
    { id: 13, name: "Mads Andersen", phone: "31231231", mail: "mads.andersen@mail.com", houseNr: "75", check: "0" },
    { id: 14, name: "Emma Jensen", phone: "22334455", mail: "emma.jensen@outlook.com", houseNr: "92", check: "1" },
    { id: 15, name: "Jakob Nielsen", phone: "40128899", mail: "jakob.nielsen@mail.dk", houseNr: "113", check: "1" },
    { id: 16, name: "Camilla Madsen", phone: "50125678", mail: "camilla.madsen@mail.com", houseNr: "134", check: "0" },
    { id: 17, name: "Rasmus Hansen", phone: "31233445", mail: "rasmus.hansen@mail.dk", houseNr: "189", check: "0" },
    { id: 18, name: "Ida Pedersen", phone: "51234456", mail: "ida.pedersen@mail.com", houseNr: "206", check: "0" },
    { id: 19, name: "Oskar Jensen", phone: "22336677", mail: "oskar.jensen@outlook.com", houseNr: "222", check: "1" }
]

let listHaveejere = [
    { id: 0, name: "Lasse Rosenmeier", phone: "52354525", mail: "lasserosenmeier@gmail.com", houseNr: "9", months: "34", price: "200000" },
    { id: 1, name: "Karen Holm", phone: "85375847", mail: "karenholm@gmail.com", houseNr: "74", months: "20", price: "150000" },
    { id: 2, name: "Anders Jensen", phone: "87253468", mail: "anders.jensen@mail.dk", houseNr: "37", months: "18", price: "130000" },
    { id: 3, name: "Sofie Larsen", phone: "72345612", mail: "sofie.larsen@mail.com", houseNr: "81", months: "28", price: "170000" },
    { id: 4, name: "Mikkel Nielsen", phone: "83456789", mail: "mikkel.nielsen@mail.dk", houseNr: "129", months: "54", price: "100000" },
    { id: 5, name: "Marie Andersen", phone: "92345678", mail: "marie.andersen@mail.com", houseNr: "166", months: "64", price: "50000" },
    { id: 6, name: "Jesper Pedersen", phone: "61324578", mail: "jesper.pedersen@mail.dk", houseNr: "213", months: "24", price: "140000" },
    { id: 7, name: "Freja Madsen", phone: "78345612", mail: "freja.madsen@mail.com", houseNr: "246", months: "59", price: "110000" },
    { id: 8, name: "Simon Christensen", phone: "83576489", mail: "simon.christensen@mail.dk", houseNr: "14", months: "46", price: "200000" },
    { id: 9, name: "Ida Sørensen", phone: "71234567", mail: "ida.sorensen@mail.com", houseNr: "59", months: "26", price: "160000" },
    { id: 10, name: "Emilie Petersen", phone: "67345678", mail: "emilie.petersen@mail.dk", houseNr: "88", months: "66", price: "70000" },
    { id: 11, name: "Jonas Nielsen", phone: "81234567", mail: "jonas.nielsen@mail.com", houseNr: "107", months: "45", price: "80000" },
    { id: 12, name: "Emma Larsen", phone: "74356789", mail: "emma.larsen@mail.dk", houseNr: "162", months: "42", price: "150000" },
    { id: 13, name: "Niklas Hansen", phone: "82763549", mail: "niklas.hansen@mail.com", houseNr: "202", months: "30", price: "230000" },
    { id: 14, name: "Maja Jørgensen", phone: "61387456", mail: "maja.jorgensen@mail.dk", houseNr: "255", months: "26", price: "180000" },
    { id: 15, name: "Oliver Christoffersen", phone: "82537654", mail: "oliver.christoffersen@mail.com", houseNr: "292", months: "23", price: "180000" },
    { id: 16, name: "Laura Petersen", phone: "73245897", mail: "laura.petersen@mail.dk", houseNr: "45", months: "35", price: "60000" },
    { id: 17, name: "Christian Andersen", phone: "81234567", mail: "christian.andersen@mail.com", houseNr: "91", months: "25", price: "130000" },
    { id: 18, name: "Julie Møller", phone: "62548739", mail: "julie.moller@mail.dk", houseNr: "135", months: "66", price: "100000" },
    { id: 19, name: "Mathias Jensen", phone: "83456789", mail: "mathias.jensen@mail.com", houseNr: "172", months: "24", price: "140000" },
    { id: 20, name: "Emilie Nielsen", phone: "92345678", mail: "emilie.nielsen@mail.dk", houseNr: "219", months: "53", price: "110000" },
    { id: 21, name: "Lucas Hansen", phone: "61324578", mail: "lucas.hansen@mail.com", houseNr: "252", months: "52", price: "70000" },
    { id: 22, name: "Signe Pedersen", phone: "78345612", mail: "signe.pedersen@mail.dk", houseNr: "295", months: "54", price: "80000" },
    { id: 23, name: "Simon Larsen", phone: "83576489", mail: "simon.larsen@mail.com", houseNr: "23", months: "20", price: "160000" },
    { id: 24, name: "Nina Christensen", phone: "71234567", mail: "nina.christensen@mail.dk", houseNr: "68", months: "26", price: "180000" },
    { id: 25, name: "Martin Sørensen", phone: "67345678", mail: "martin.sorensen@mail.com", houseNr: "97", months: "30", price: "230000" },
    { id: 26, name: "Ida Petersen", phone: "81234567", mail: "ida.petersen@mail.dk", houseNr: "144", months: "63", price: "150000" },
    { id: 27, name: "Rasmus Nielsen", phone: "82763549", mail: "rasmus.nielsen@mail.com", houseNr: "191", months: "35", price: "130000" },
    { id: 28, name: "Mette Hansen", phone: "61387456", mail: "mette.hansen@mail.dk", houseNr: "234", months: "26", price: "100000" },
    { id: 29, name: "Andreas Jørgensen", phone: "82537654", mail: "andreas.jorgensen@mail.com", houseNr: "281", months: "24", price: "140000" },
    { id: 30, name: "Louise Christoffersen", phone: "73245897", mail: "louise.christoffersen@mail.dk", houseNr: "39", months: "16", price: "110000" },
    { id: 31, name: "Maja Sørensen", phone: "85432178", mail: "majasorensen@hotmail.com", houseNr: "56", months: "25", price: "90000" },
    { id: 32, name: "Anders Jensen", phone: "78596324", mail: "andersjensen@gmail.com", houseNr: "162", months: "24", price: "250000" },
    { id: 33, name: "Louise Nielsen", phone: "64781239", mail: "louisenielsen@hotmail.com", houseNr: "90", months: "66", price: "50000" },
    { id: 34, name: "Rasmus Madsen", phone: "45237841", mail: "rasmusmadsen@gmail.com", houseNr: "125", months: "55", price: "350000" },
    { id: 35, name: "Ida Larsen", phone: "69321874", mail: "idalarsen@hotmail.com", houseNr: "243", months: "35", price: "180000" },
    { id: 36, name: "Peter Christensen", phone: "87651234", mail: "peterchristensen@gmail.com", houseNr: "72", months: "45", price: "70000" },
    { id: 37, name: "Emma Petersen", phone: "39875624", mail: "emmapetersen@hotmail.com", houseNr: "287", months: "30", price: "280000" },
    { id: 38, name: "Simon Jensen", phone: "69321547", mail: "simonjensen@gmail.com", houseNr: "84", months: "16", price: "100000" },
    { id: 39, name: "Sofie Jørgensen", phone: "47632815", mail: "sofiejorgensen@hotmail.com", houseNr: "211", months: "24", price: "240000" },
    { id: 40, name: "Frederik Nielsen", phone: "98567412", mail: "frederiknielsen@gmail.com", houseNr: "39", months: "65", price: "50000" },
    { id: 41, name: "Mette Poulsen", phone: "67219843", mail: "mettepoulsen@hotmail.com", houseNr: "267", months: "18", price: "170000" },
    { id: 42, name: "Lars Rasmussen", phone: "58647932", mail: "larsrasmussen@gmail.com", houseNr: "109", months: "36", price: "330000" },
    { id: 43, name: "Line Pedersen", phone: "32965781", mail: "linepedersen@hotmail.com", houseNr: "16", months: "63", price: "50000" },
    { id: 44, name: "Andreas Hansen", phone: "79482136", mail: "andreashansen@gmail.com", houseNr: "144", months: "16", price: "110000" },
    { id: 45, name: "Sara Møller", phone: "69874521", mail: "saramoller@hotmail.com", houseNr: "248", months: "24", price: "230000" },
    { id: 46, name: "Jesper Christensen", phone: "85472961", mail: "jesperchristensen@gmail.com", houseNr: "63", months: "38", price: "80000" },
    { id: 47, name: "Maria Jensen", phone: "31257986", mail: "mariajensen@hotmail.com", houseNr: "191", months: "30", price: "260000" },
    { id: 48, name: "Christian Nielsen", phone: "94768513", mail: "christiannielsen@gmail.com", houseNr: "96", months: "18", price: "170000" },
    { id: 49, name: "Louise Larsen", phone: "58674921", mail: "louiselarsen@hotmail.com", houseNr: "224", months: "24", price: "240000" },
    { id: 50, name: "Mads Sørensen", phone: "75396481", mail: "madssorensen@gmail.com", houseNr: "41", months: "65", price: "50000" }
]

let listAnsogere = [
    { id: 0, name: "Isabella Nordkvist", phone: "12345678", mail: "isabella123@gmail.com", date: "2023-04-23", check: "0" },
    { id: 1, name: "Carl Høj", phone: "23456789", mail: "carlhoj@gmail.com", date: "2023-04-22", check: "0" },
    { id: 2, name: "Oliver Mortensen", phone: "34567890", mail: "olivermortensen@gmail.com", date: "2023-04-21", check: "0" },
    { id: 3, name: "Carlo Rasmussen", phone: "45678901", mail: "carlorasmussen@gmail.com", date: "2023-04-20", check: "0" },
    { id: 4, name: "Ellen Christensen", phone: "56789012", mail: "ellenchristensen@gmail.com", date: "2023-04-19", check: "0" },
    { id: 5, name: "Nanna Madsen", phone: "67890123", mail: "nannamadsen@gmail.com", date: "2023-04-18", check: "0" },
    { id: 6, name: "Malthe Damgaard", phone: "78901234", mail: "malthedamgaard@gmail.com", date: "2023-04-17", check: "0" },
    { id: 7, name: "Jonathan Balling", phone: "89012345", mail: "jonathanballing@gmail.com", date: "2023-04-16", check: "0" },
    { id: 8, name: "Karla Berthelsen", phone: "90123456", mail: "karlaberthelsen@gmail.com", date: "2023-04-15", check: "0" },
    { id: 9, name: "Hilde Enevoldsen", phone: "01234567", mail: "hildeenevoldsen@gmail.com", date: "2023-04-14", check: "0" },
    { id: 10, name: "Elias Morvad", phone: "12345678", mail: "eliasmorvad@gmail.com", date: "2023-04-13", check: "0" },
    { id: 11, name: "Esben Hermandsen", phone: "23456789", mail: "Jens.motorvejmand@outlook.dk", date: "2023-04-12", check: "0" },

]

app.use(express.static(staticDir))
app.use(express.json())

//app root
app.get('/', offentligVentelisteHandler)
app.get('/tilmelding', tilmeldingHandler)
app.get('/internVenteliste', internVentelisteHandler)
app.get('/ukendte', ukendteHandler)
app.get('/adminList', adminListHandler)
app.get('/ansogere', ansogereHandler)
app.get('/haveejere', haveejereListHandler)

app.get('/venteliste', getKolonisterHandler)
app.post('/venteliste', addKolonisterHandler)
app.delete('/venteliste/:id', deleteKolonisterHandler)
app.put('/venteliste/:id', updateKolonistHandler)

app.get('/ventelisteIntern', getInternHandler)
app.post('/ventelisteIntern', addInternHandler)
app.delete('/ventelisteIntern/:id', deleteInternHandler)
app.put('/ventelisteIntern/:id', updateInternHandler)

app.get('/ansogereListe', getAnsogereHandler)
app.post('/ansogereListe', addAnsogereHandler)
app.delete('/ansogereListe/:id', deleteAnsogereHandler)
app.put('/ansogereListe/:id', updateAnsogerHandler)

app.get('/listeHaveejere', getHaveejereHandler)
app.post('/listeHaveejere', addHaveejereHandler)
app.delete('/listeHaveejere/:id', deleteHaveejereHandler)
app.put('/listeHaveejere/:id', updateHaveejereHandler)

app.use(express.urlencoded({ extended: true }));
async function sendMail({ to, subject, message: text }) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'nikolajwold@outlook.com',
            pass: 'batman123',
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    const info = {
        from: 'nikolajwold@outlook.com',
        to,
        subject,
        text,
    };

    try {
        const result = await transporter.sendMail(info);
        console.log('Message sent:', result.messageId);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        await sendMail({ to, subject, message });
        console.log('Email sent successfully');
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
});


function offentligVentelisteHandler(request, response) {
    response.sendFile(path.join(clientDir, "offentligVenteliste.html"))
}

function tilmeldingHandler(request, response) {
    response.sendFile(path.join(clientDir, "tilmelding.html"))
}

function adminListHandler(request, response) {
    response.sendFile(path.join(clientDir, "venteliste.html"))
}

function internVentelisteHandler(request, response) {
    response.sendFile(path.join(clientDir, "internVenteliste.html"))
}

function ansogereHandler(request, response) {
    response.sendFile(path.join(clientDir, "ansogere.html"))
}

function ukendteHandler(request, response) {
    response.sendFile(path.join(clientDir, "ukendte.html"))
}

function haveejereListHandler(request, response) {
    response.sendFile(path.join(clientDir, "haveejere.html"))
}



/////Venteliste//////
function getKolonisterHandler(request, response) {
    response.json(venteliste);
}

let counter = venteliste.length + 1;

function addKolonisterHandler(request, response,) {
    let kolonist = {
        id: counter++,
        name: request.body.name,
        phone: request.body.phone,
        mail: request.body.mail,
        date: request.body.date,
        check: request.body.check
    };
    venteliste.push(kolonist);
    response.json(kolonist);
}

function deleteKolonisterHandler(request, response) {
    const id = parseInt(request.params.id);
    const index = venteliste.findIndex(name => name.id === id);
    if (index !== -1) {
        venteliste.splice(index, 1);
        response.sendStatus(204);
    } else {
        response.sendStatus(404);
    }
}

function updateKolonistHandler(request, response) {
    const id = parseInt(request.params.id);
    const updatedKolonist = request.body;

    const index = venteliste.findIndex(kolonist => kolonist.id === id);

    if (index !== -1) {
        venteliste[index].name = updatedKolonist.name;
        venteliste[index].phone = updatedKolonist.phone;
        venteliste[index].mail = updatedKolonist.mail;
        venteliste[index].date = updatedKolonist.date;
        venteliste[index].check = updatedKolonist.check;

        response.json({ message: 'Kolonist updated successfully' });
    } else {
        response.status(404).json({ error: 'Kolonist not found' });
    }
}


/////////////////


/////INTERN//////

function getInternHandler(request, response) {
    response.json(ventelisteIntern);
}


let internCounter = ventelisteIntern.length + 1;

function addInternHandler(request, response) {
    let internKolonist = {
        id: internCounter++,
        name: request.body.name,
        phone: request.body.phone,
        mail: request.body.mail,
        houseNr: request.body.houseNr,
        check: request.body.check
    };
    ventelisteIntern.push(internKolonist);
    response.json(internKolonist);
}

function deleteInternHandler(request, response) {
    const id = parseInt(request.params.id);
    const index = ventelisteIntern.findIndex(name => name.id === id);
    if (index !== -1) {
        ventelisteIntern.splice(index, 1);
        response.sendStatus(204);
    } else {
        response.sendStatus(404);
    }
}

function updateInternHandler(request, response) {
    const id = parseInt(request.params.id);
    const updatedIntern = request.body;

    const index = ventelisteIntern.findIndex(internKolonist => internKolonist.id === id);

    if (index !== -1) {
        ventelisteIntern[index].name = updatedIntern.name;
        ventelisteIntern[index].phone = updatedIntern.phone;
        ventelisteIntern[index].mail = updatedIntern.mail;
        ventelisteIntern[index].houseNr = updatedIntern.houseNr;
        ventelisteIntern[index].check = updatedIntern.check;

        response.json({ message: 'Kolonist updated successfully' });
    } else {
        response.status(404).json({ error: 'Kolonist not found' });
    }
}

////////////////////

/////ANSOGERE/////////

function getAnsogereHandler(request, response) {
    response.json(listAnsogere);
}

let AnsogereCounter = listAnsogere.length + 1;

function addAnsogereHandler(request, response) {
    let ansoger = {
        id: AnsogereCounter++,
        name: request.body.name,
        phone: request.body.phone,
        mail: request.body.mail,
        date: request.body.date,
        check: request.body.check
    };
    listAnsogere.push(ansoger);
    response.json(ansoger);
}

function deleteAnsogereHandler(request, response) {
    const id = parseInt(request.params.id);
    const index = listAnsogere.findIndex(name => name.id === id);
    if (index !== -1) {
        listAnsogere.splice(index, 1);
        response.sendStatus(204);
    } else {
        response.sendStatus(404);
    }
}

function updateAnsogerHandler(request, response) {
    const id = parseInt(request.params.id);
    const updatedAnsoger = request.body;

    const index = listAnsogere.findIndex(ansoger => ansoger.id === id);

    if (index !== -1) {
        listAnsogere[index].name = updatedAnsoger.name;
        listAnsogere[index].phone = updatedAnsoger.phone;
        listAnsogere[index].mail = updatedAnsoger.mail;
        listAnsogere[index].date = updatedAnsoger.date;
        listAnsogere[index].check = updatedAnsoger.check;

        response.json({ message: 'Kolonist updated successfully' });
    } else {
        response.status(404).json({ error: 'Kolonist not found' });
    }
}


/////////////////////
////////////HAVEEJER//////

function getHaveejereHandler(request, response) {
    response.json(listHaveejere);
}

let haveejerCounter = listHaveejere.length + 1;

function addHaveejereHandler(request, response) {
    let haveejer = {
        id: haveejerCounter++,
        name: request.body.name,
        phone: request.body.phone,
        mail: request.body.mail,
        houseNr: request.body.houseNr,
        months: request.body.months,
        price: request.body.price
    };
    listHaveejere.push(haveejer);
    response.json(haveejer);
}

function deleteHaveejereHandler(request, response) {
    const id = parseInt(request.params.id);
    const index = listHaveejere.findIndex(name => name.id === id);
    if (index !== -1) {
        listHaveejere.splice(index, 1);
        response.sendStatus(204);
    } else {
        response.sendStatus(404);
    }
}

function updateHaveejereHandler(request, response) {
    const id = parseInt(request.params.id);
    const updatedHaveejer = request.body;

    const index = listHaveejere.findIndex(haveejer => haveejer.id === id);

    if (index !== -1) {
        listHaveejere[index].name = updatedHaveejer.name;
        listHaveejere[index].phone = updatedHaveejer.phone;
        listHaveejere[index].mail = updatedHaveejer.mail;
        listHaveejere[index].houseNr = updatedHaveejer.houseNr;
        listHaveejere[index].months = updatedHaveejer.months;
        listHaveejere[index].price = updatedHaveejer.price;

        response.json({ message: 'Kolonist updated successfully' });
    } else {
        response.status(404).json({ error: 'Kolonist not found' });
    }
}

//////////////////////
/////MAIL TEMPLATES////////
let templates = [
    { subject: "Bekræftigelse på betaling", mail: "Hej! Vi har modtaget din betaling og bekræfter hermed din plads på ventelisten. Mvh bestyrrelsen" },
    { subject: "Mangel på betaling", mail: "Hej! Eftersom vi ikke har modtaget din betaling, er du røget af ventelisten. Mvh bestyrrelsen" },
    { subject: "Påmindelse", mail: "Hej! Husk betaling af det årlige kontigent på 100dkk" },
    { subject: "Nyt havesalg", mail: "Hej! Vi har have nr. 15 til salg. Haven koster 150.000,- og vil blive fremvist den 5. juli kl 13:00." },
    { subject: "Bekræftigelse på optagelse", mail: "Hej! Vi har modtaget din betaling og bekræfter hermed din optagelse på ventelisten. Mvh bestyrrelsen" },
    { subject: "Afslag på optagelse", mail: "Hej! Vi må beklageligvis meddele at de desværre ikke er optaget på ventelisten. Dette kan skyldes mangel på betaling" },
    { subject: "Tak for din tilmelding", mail: "Hej \n \n Tusinde tak for din tilmeldning til vores ventelise \n Hvis de ønsker optagelse på ventelisten til den kommende sæson skal de, inden for den næste uge, sende 100 kr til dette konto nr: XXXXXXXXXXX \n \n mvh Oldhøjen Bolighaveforening"}
];

app.get('/mailTemplates', getTemplateHandler);
app.put('/mailTemplates/:id', updateTemplateHandler);

function getTemplateHandler(request, response) {
    response.json(templates);
}

function updateTemplateHandler(request, response) {
    let id = request.params.id;
    let template = {
        subject: request.body.subject,
        mail: request.body.mail
    };
    templates[id] = template;
    response.json(template);
}


//////////////////////



app.listen(port, () => {
    console.log(`SUUUI ${port}`)
})