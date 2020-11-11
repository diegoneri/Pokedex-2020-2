const atualizaTela = (pokemon) => {
    const imagem = document.getElementById("foto-pokemon");
    const nomePokemon = document.getElementById("nome-pokemon");
    const selecaoTema = document.getElementById("selecao-tema");
    imagem.src = pokemon.sprites.other["official-artwork"].front_default;
    nomePokemon.innerHTML = pokemon.name;

    selecaoTema.hidden = false;
}

const urlPokemonAleatorio = () => {
    const numeroSorteado = Math.round(Math.random() * 150) +1;
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${numeroSorteado}`; 
    return urlPokemon;
}

const iniciar = async () => {
    document.getElementById("tema").addEventListener("change", avaliaTemaSelecionado);
    validarLocalStorage();

    const url = urlPokemonAleatorio();
    const response = await fetch(url);
    const result = await response.json();
    atualizaTela(result);  
}

const avaliaTemaSelecionado = (evt) => {
    const valorSelecionado = document.getElementById("tema").value;

    if (valorSelecionado){
        localStorage.setItem('tema', valorSelecionado); 
       aplicaTemaSelecionado();
    }

}



const aplicaTemaSelecionado = () => {
    document.body.className = localStorage.tema;
}

const validarLocalStorage = () => {
    if (!localStorage.tema){
        localStorage.setItem('tema','light-style');
    }

    Array.from(document.getElementById("tema").options).forEach(
            opt => opt.value === localStorage.tema 
                 ? opt.selected = true 
                 : opt.selected = false);
    aplicaTemaSelecionado();
};

document.addEventListener('DOMContentLoaded', iniciar)
