function helloWorld() {
    document.getElementById("jsTest").innerText =
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, eum!";
}

function getJSONorXML(type) {
    fetch(`http://localhost:5000/text/1.${type}`, {
        method: 'GET',
        headers: {'Content-Type': `application/${type}`, 'Accept': `application/${type}`}
    }).then(res => res.text())
        .then(res => document.getElementById(`${type}File`).innerHTML = res);
}
