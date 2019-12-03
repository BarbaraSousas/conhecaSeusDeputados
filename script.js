async function makeRequest() {
    const url = "https://dadosabertos.camara.leg.br/api/v2/deputados?itens=15";
    const request = await getDeputados('GET', url);

    console.log(request)
    setDeputados(request.dados);
}

function setDeputados(request) {
    var html = "<div></div>";

    request.forEach((v, i) => {
        html+="<div class='box-deputados'>";
        html+= `<div class='img' >`
        html+=`<img src="${v.urlFoto}"/>`;
        html+= `</div>`
        html+= `<div>`
        html+= `<div class='deputado-nome'>`
        html+=`<span>${v.nome}</span>`;
        html+= `</div>`
        html+= `<div class='deputado-info'>`
        html+=`<span>${v.email}</span>`;
        html+= `</div>`
        html+= `<div>`
        html+= `</div>`
        html+= `<div>`
        html+= `<div class='deputado-info'>`
        html+=`<span>Partido: ${v.siglaPartido}</span>`;
        html+= `</div>`
        html+= `<div class='deputado-info'>`
        html+=`<span>UF: ${v.siglaUf}</span>`;
        html+= `</div>`
        html+= `</div>`
        html+= `</div>`
        html+="</div>";
    });
    document.getElementById("content").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
    makeRequest();
});

function getDeputados(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                const jsonResponse = JSON.parse(xhr.response);
                resolve(jsonResponse);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}
