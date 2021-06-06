const URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

async function getAllStates() {
  const response = await fetch(`${URL}?orderBy=nome`)
  const json = await response.json();

  let stateSelector = document.querySelector("#stateSelector");

  for (var i in json) {
    let option = document.createElement("option");
    option.text = ` ${json[i].sigla} - ${[json[i].nome]}`;
    stateSelector.add(option);
  }
  
}
getAllStates();

async function filterCity() {
    const stateSelector = document.getElementById("stateSelector");

    if (stateSelector[0].innerHTML === "Open this select menu") {
      stateSelector.remove(0);
    }

    const stateSelected = stateSelector.value.split(' ')[0].trim();

    const response = await fetch(`${URL}/${stateSelected}/municipios?orderBy=nome`)
    const json = await response.json();

    var citySelector = document.querySelector("#citySelector");
    citySelector.innerHTML = "";

    for (var i in json) {
      let option = document.createElement("option");
      option.text = json[i].nome;
      citySelector.add(option);
    }

    citySelector.removeAttribute("disabled");

  }


