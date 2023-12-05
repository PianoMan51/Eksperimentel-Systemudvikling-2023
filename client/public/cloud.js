//fetchKolonister();
fetchKolonister()



setTimeout(function(){
    window.location.reload();
 }, 250000);



function addInformationToCloud(kolonistJson) {


    function setLine1Style(line1) {
        line1 += '<span style="font-family:Cambria, Cochin, Georgia, Times, serif;">';
        line1 += '<span style="font-weight: bolder;">';
        line1 += '<span style="font-size:90%;">';
        return line1;
    }


    function setLine2Style(line2) {
        line2 += '<span style="font-family:Cambria, Cochin, Georgia, Times, serif;">';
        line2 += '<span style="font-weight: lighter;">';
        line2 += '<span style="font-size:80%;">';
        return line2;
    }


    function setLine3Style(line3) {
        line3 += '<span style="font-family:Cambria, Cochin, Georgia, Times, serif;">';
        line3 += '<span style="font-weight: lighter;">';
        line3 += '<span style="font-size:80%;">';
        return line3;
    }

    function endSpanAndAdd(line, i) {
        line += '</span>';
        clouds[i].innerHTML += line
    }

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

    function setTextInCloud(index, i) {
        let line1 = "";
        let line2 = "";
        let line3 = "";


        line1 += setLine1Style(line1);
        line2 += setLine2Style(line2);
        line3 += setLine3Style(line3);


        let name = kolonistJson[index].name.trim().split(" ")[0];
        let months = kolonistJson[index].months;
        months = months/12;
        months =  String(round(months, 0.5)).replace(".", ",");
        let price = makeDots(kolonistJson[index].price);

        function round(value, step) {
            step || (step = 1.0);
            var inv = 1.0 / step;
            return Math.round(value * inv) / inv;
        }

        line1 += name;
        line2 += 'Ventetid: ' + months + ' år';
        line3 += 'Købt for ' + price + ' kr.';


        endSpanAndAdd(line1, i);
        clouds[i].innerHTML += "<br>";
        endSpanAndAdd(line2, i);
        clouds[i].innerHTML += "<br>";
        endSpanAndAdd(line3, i);
    }

    var clouds = [];
    for (let i = 1; i <= 46; i++) {
        let stringID = "cloud" + i;
        let cloud = document.getElementById(stringID);
        clouds.push(cloud);
    }


    let index = 0;
    for (let i = 0; i < clouds.length; i++) {
        if (kolonistJson.length <= index) {
            index = 0;
            setTextInCloud(index, i)
        } else {
            setTextInCloud(index, i)
            index++;
        }
    }
}



async function fetchKolonister() {
    try {
        let kolonister = await getKolonisterFromServer()
        addInformationToCloud(kolonister);
    } catch (err) {
        console.log(err)
    }
}




async function getKolonisterFromServer() {
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