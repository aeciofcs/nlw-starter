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
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for (const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener( "change", getCities )

// Items de Coleta
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    // Adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
       
    
    // verificar se existem itens selecionados, se sim, pegar os
    // itens selecionados
    const alreadySelected = selectedItems.findIndex( item => item == itemId )

    // Se já estiver selecionado, tirar da seleção.
    if (alreadySelected >= 0 ){
        //remover da seleção
        const filteredItems = selectedItems.filter( item => item != itemId )
        selectedItems = filteredItems
    }else{

        // Se não estiver selecionado, adiciona à seleção
        selectedItems.push(itemId)
    }

    console.log(selectedItems)    

    // atualizar o campo escondido com os itens selecionados    
    collectedItems.value = selectedItems
}
