let highScores = [
    { Date: "2021/01/17", Duration: "3:41" },
    { Date: "2021/01/21", Duration: "4:01" },
    { Date: "2021/02/01", Duration: "2:52" },
    { Date: "2021/02/17", Duration: "3:08" },
    { Date: "2021/03/02", Duration: "2:51" }
];

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

let table = document.getElementById("high-scores");
// let table = document.querySelector("table");
let data = Object.keys(highScores[0]);
generateTableHead(table, data);
generateTable(table, highScores);