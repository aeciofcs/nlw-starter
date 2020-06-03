function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        
        for (const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    stateInput.value = event.target.options[event.target.selectedIndex].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`    

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for (const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener( "change", getCities )