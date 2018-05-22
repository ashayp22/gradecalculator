//Copyright 2018, Ashay Parikh, Rohan Shah, All rights reserved.

var weightArray = [0, 0, 0, 0];


var classes = "";

//var categories = [["", sec1Grade, sec1Points, display1],["", sec2Grade, sec2Points, display2], ["", sec3Grade, sec3Points, display3], ["", sec4Grade, sec4Points, display4]];
var categories = [["", [], [], []], ["", [], [], []], ["", [], [], []], ["", [], [], []]];

function setCategory(x, y) {
    if(x === "class") {
        document.getElementById("t1").innerHTML = "Class: " + document.getElementById("class").value;
        classes = document.getElementById("class").value;
    } else if(x === "name") {
        document.getElementById("tn" + y).innerHTML = document.getElementById("p" + y + "name").value;
        categories[y-1][0] = document.getElementById("p" + y + "name").value;
    } else if(x === "weight") {
        document.getElementById("tw" + y).innerHTML = "Weight - " + document.getElementById("p" + y + "weight").value;
        weightArray[y-1] = ((document.getElementById("p" + y + "weight").value)*1)/100;
    }
}

function addGrade(x) {
    var name = document.getElementById("p"+x+"name").value;
    var grade = document.getElementById("p"+x+"grade").value;
    var points = parseInt(document.getElementById("p"+x+"points").value);
    if(weightArray[x-1] === 0 || grade === "" || points === "" || name === "") {
        alert("try again");
    } else {
        inputAssignment(name, grade, points);
        categories[x - 1][3].push("Grade: " + document.getElementById("p" + x + "grade").value + "  Points: " + parseInt(document.getElementById("p" + x + "points").value));
        document.getElementById("text" + x).innerHTML = "";
        for (var i = 0; i < categories[x - 1][3].length; i++) {
            document.getElementById("text" + x).innerHTML += categories[x - 1][3][i] + "<br />";
        }
    }
}


function inputAssignment(category, grade, point) {
    var tempG;
    for(var i = 0; i < 4; i++) {
        if(categories[i][0] === category) {
            tempG = i+1;
        }
    }
    categories[tempG-1][1].push(getGrade(grade));
    categories[tempG-1][2].push(point);
    finalGrade();

}

function getGrade(grade) {
    var score = 77-(grade.charCodeAt(0));
    if(grade.substring(0,1) === "F") {
        score = 0;
    } else {
        score -= 2 * (12 - score);
    }
    if(grade.substring(1,2) === "+") {
        score += 1;
    } else if(grade.substring(1,2) === "-") {
        score -= 1;
    }
    return score;
}

function getLetter(grade) {
    if(grade === 14) {
        grade = 13;
    }
    var gradeArray = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F+", "F"];
    return gradeArray[13-grade];
}


function finalGrade() {
    if((categories[0][1] == "" && categories[1][1] == "" && categories[2][1] == "" && categories[3][1] == "")) {
        document.getElementById("finalGrade").innerHTML = "Grade:";
        document.getElementById("closeText").innerHTML = "";

    } else {
        overallGrade(FinalHomework(), FinalQuizzes(), FinalTests(), FinalExtra());
    }
}
function FinalHomework() {
    var tpoints1 = 0;
    var finalScore1 = 0;
    for(var i = 0; i < categories[0][2].length; i++) {
        tpoints1 += (categories[0][2])[i];
    }

    for(var g = 0; g < categories[0][1].length; g++) {
        finalScore1 += ((categories[0][1])[g]*((categories[0][2])[g]/tpoints1));
    }

    return finalScore1;

}

function FinalQuizzes() {
    var tpoints2 = 0;
    var finalScore2 = 0;
    for(var j = 0; j < categories[1][2].length; j++) {
        tpoints2 += (categories[1][2])[j];
    }
    for(var h = 0; h < categories[1][1].length; h++) {
        finalScore2 += ((categories[1][1])[h]*((categories[1][2])[h]/tpoints2));
    }
    return finalScore2;
}

function FinalTests() {
    var tpoints3 = 0;
    var finalScore3 = 0;
    for(var z = 0; z < categories[2][2].length; z++) {
        tpoints3 += (categories[2][2])[z];
    }
    for(var k = 0; k < (categories[2][1]).length; k++) {
        finalScore3 += ((categories[2][1])[k]*((categories[2][2])[k]/tpoints3));
    }
    return finalScore3;
}

function FinalExtra() {
    var tpoints4 = 0;
    var finalScore4 = 0;
    for(var z = 0; z < categories[3][2].length; z++) {
        tpoints4 += (categories[3][2])[z];
    }
    for(var k = 0; k < categories[3][1].length; k++) {
        finalScore4 += ((categories[3][1])[k]*((categories[3][2])[k]/tpoints4));
    }
    return finalScore4;
}


function overallGrade(x, y, z, k) {
    var totalWeight = 0;
    if(categories[0][1].length !== 0) {
        totalWeight += weightArray[0];
    }
    if(categories[1][1].length !== 0) {
        totalWeight += weightArray[1];
    }
    if(categories[2][1].length !== 0) {
        totalWeight += weightArray[2];
    }
    if(categories[3][1].length !== 0) {
        totalWeight += weightArray[3];
    }
    weightArray[0] = weightArray[0]/totalWeight;
    weightArray[1] = weightArray[1]/totalWeight;
    weightArray[2] = weightArray[2]/totalWeight;
    weightArray[3] = weightArray[3]/totalWeight;
    var finalGrade = (x*weightArray[0])+(y*weightArray[1])+(z*weightArray[2])+(k*weightArray[3]); //actual grade
    var finalLetter = Math.round(finalGrade); //nearest grade
    if(finalLetter-finalGrade > 0) {
        if(finalLetter === 13) {
            document.getElementById("closeText").innerHTML = "You are closer to an A+ than an A";
        } else {
            document.getElementById("closeText").innerHTML = "You are closer to a " + getLetter((finalLetter - 1)) + " than a " + getLetter((finalLetter + 1));
        }
    } else if(finalLetter - finalGrade < 0) {
        document.getElementById("closeText").innerHTML = "You are closer to a " + getLetter((finalLetter+1)) + " than a " + getLetter((finalLetter-1));
    } else if(finalLetter === finalGrade) {
        document.getElementById("closeText").innerHTML = "You are exactly at a/an " + getLetter(finalLetter);
    }
    document.getElementById("finalGrade").innerHTML = "Grade: " + getLetter(finalLetter);
}

function remove(x) {
    categories[x-1][1].splice(categories[x-1][1].length-1,1);
    categories[x-1][2].splice(categories[x-1][2].length-1,1);
    categories[x-1][3].splice(categories[x-1][3].length-1,1);
    document.getElementById("text" + x).innerHTML = "";
    for(var i = 0; i < categories[x-1][3].length; i++) {
        document.getElementById("text" + x).innerHTML += categories[x-1][3][i] + "<br />";
    }
    finalGrade();
}

function reset() {



    weightArray = [0, 0, 0, 0];


    classes = "";

    var categories = [["", [], [], ""], ["", [], [], ""], ["", [], [], ""], ["", [], [], ""]];

    document.getElementById("text1").innerHTML = "";
    document.getElementById("text2").innerHTML = "";
    document.getElementById("text3").innerHTML = "";
    document.getElementById("text4").innerHTML = "";
    document.getElementById("t1").innerHTML = "Class:";
    document.getElementById("class").value =  "";
    document.getElementById("tn1").innerHTML = "First Category";
    document.getElementById("tn2").innerHTML = "Second Category";
    document.getElementById("tn3").innerHTML = "Third Category";
    document.getElementById("tn4").innerHTML = "Fourth Category";
    document.getElementById("finalGrade").innerHTML = "Grade: ";
    document.getElementById("closeText").innerHTML = "";
    for(var j = 1; j < 5; j++) {
        document.getElementById("tw" + j).innerHTML =  "Weight - Enter as decimal";
        document.getElementById("p" + j + "weight").value =  "";
        document.getElementById("p" + j + "points").value =  "";
        document.getElementById("p" + j + "grade").value =  "";
        document.getElementById("p" + j + "name").value =  "";
    }
}





//final code



function campusCalc() {
    var temp = (document.getElementById('userGrade').value);
    var current = 0;
    current = changeTemp(temp,current);
    var required = document.getElementById('desiredGrade').value;
    var weight = document.getElementById('FinalWeight').value;
    calcFinal(current, required, weight);
}


function calcFinal(current, required, weight) {
    var finalgrade = (required - (100 -  weight) * (current/100))/weight;
    document.getElementById("Real Text").innerHTML = "The grade you actually have is a " + current + "%";
    document.getElementById("Final Text").innerHTML = "You need a " + Math.round(finalgrade*100) + "% on the final";
}

function changeTemp(temp,current) {
    var stringBool = false;
    temp = temp.toUpperCase();
    if (temp === 'f-' || temp ==='F-') {
        temp = 51;
        stringBool = true
    }
    if (temp === 'f'  || temp ==='F') {
        temp = 55;
        stringBool = true
    }
    if (temp === 'f+' || temp ==='F+') {
        temp = 59;
        stringBool = true
    }
    if (temp === 'd-' || temp ==='D-') {
        temp = 61;
        stringBool = true
    }
    if (temp === 'd'  || temp ==='D') {
        temp = 65;
        stringBool = true
    }
    if (temp === 'd+' || temp ==='D+') {
        temp = 69;
        stringBool = true
    }
    if (temp === 'c-' || temp ==='C-') {
        temp = 71;
        stringBool = true
    }
    if (temp === 'c'  || temp ==='C') {
        temp = 75;
        stringBool = true
    }
    if (temp === 'c+' || temp ==='C+') {
        temp = 79;
        stringBool = true
    }
    if (temp === 'b-' || temp ==='B-') {
        temp = 81;
        stringBool = true
    }
    if (temp === 'b'  || temp ==='B') {
        temp = 85;
        stringBool = true
    }
    if (temp === 'b+' || temp ==='B+') {
        temp = 89;
        stringBool = true
    }
    if (temp === 'a-' || temp ==='A-') {
        temp = 91;
        stringBool = true
    }
    if (temp === 'a'  || temp ==='A') {
        temp = 95;
        stringBool = true
    }
    if (temp === 'a+' || temp ==='a+') {
        temp = 99;
        stringBool = true
    }
    if (stringBool === false) {
        current = 100 - ((100 - temp) / 2);
    }
    if (stringBool === true) {
        current = temp
    }
    return current
}
