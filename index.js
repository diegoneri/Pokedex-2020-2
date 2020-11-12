const atualizaTela = (pokemon) => {
    const imagem = document.getElementById("foto-pokemon");
    const nomePokemon = document.getElementById("nome-pokemon");
    imagem.src = pokemon.sprites.other["official-artwork"].front_default;
    nomePokemon.innerHTML = pokemon.name;
}

const urlPokemonAleatorio = () => {
    const numeroSorteado = Math.round(Math.random() * 150) +1;
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${numeroSorteado}`; 
    return urlPokemon;
}

const iniciar = async () => {
    iniciaSelecaoTemas();
    
    validaLocalStorage();

    const url = urlPokemonAleatorio();
    const response = await fetch(url);
    const result = await response.json();
    atualizaTela(result);  
}

const iniciaSelecaoTemas = () => {
    const selectTema = document.getElementById("tema");

    JSON.parse(localStorage.temas).forEach(tema => 
        selectTema.add(new Option(tema.nome, tema.id))
    );
    
    selectTema.addEventListener("change", avaliaTemaSelecionado);
}

const avaliaTemaSelecionado = (evt) => {
    const valorSelecionado = document.getElementById("tema").value;

    if (valorSelecionado){
        localStorage['tema'] = valorSelecionado; 
        aplicaTemaSelecionado();
    }

}

const aplicaTemaSelecionado = () => {
    JSON.parse(localStorage.temas).forEach(tema => 
        document.body.classList.remove(tema.id)
    );
    document.body.classList.add(localStorage.tema);
}

const validaLocalStorage = () => {
    if (!localStorage.temas){
        const temas = [
            {id: "light-style", nome: "Claro"}
           ,{id: "dark-style", nome: "Escuro"}
        ];        
        
        localStorage.temas = JSON.stringify(temas);
    }
    if (!localStorage.tema){
        localStorage.setItem('tema'
                            ,JSON.parse(localStorage.temas)[0].id);
    }

    Array.from(document.getElementById("tema").options).forEach(
            opt => opt.selected = 
                   opt.value === localStorage.tema);
    aplicaTemaSelecionado();
};

document.addEventListener('DOMContentLoaded', iniciar)
