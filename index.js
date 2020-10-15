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
    const url = urlPokemonAleatorio();
    const response = await fetch(url);
    const result = await response.json();
    atualizaTela(result);
};


document.addEventListener('DOMContentLoaded', iniciar);