async function makeRequest() {
    const url = "https://dadosabertos.camara.leg.br/api/v2/deputados?itens=100";
    const request = await getDeputados('GET', url);

    console.log(request)
    setDeputados(request.dados);
}

function setDeputados(request) {
    var html = "<tr></tr>";

    html+="<tr>";
    html+="<td>Deputado</td>";
    html+="<td>email</td>";
    html+="<td>Partido</td>";
    html+="<td>Uf</td>";
    html+="<td>foto</td>";
    html+="</tr>";

    request.forEach((v, i) => {
        html+="<tr>";
        html+=`<td>${v.nome}</td>`;
        html+=`<td>${v.email}</td>`;
        html+=`<td>${v.siglaPartido}</td>`;
        html+=`<td>${v.siglaUf}</td>`;
        html+=`<td><img src="${v.urlFoto}"/></td>`;
        html+="</tr>";
    });
    document.getElementById("table").innerHTML = html;
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
