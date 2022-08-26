const inputNomePokemon = document.querySelector("#nomeDoPokemon");
const botaoEnviarPokemon = document.querySelector("#enviarNomeDoPokemon");
const divPrincipalPokemon = document.querySelector("#pokemon");



function getPokemon(nomepokemon){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nomepokemon}`)
    .then(data => data.json())
    .catch(error=> console.log(error))
}

const pTipoDoPokemon = document.createElement('p');

botaoEnviarPokemon.addEventListener('click', function(e){
    try {
        e.preventDefault();

        async function mostrarPokemon(){

            const pokemon = await getPokemon(inputNomePokemon.value.toLowerCase());
            console.log(pokemon);

            //Criação da div dados-pokemon
            const divDadosPokemon = document.createElement('div');
            divDadosPokemon.setAttribute('id','dados-pokemon');

            //Nome do pokemon
            const h2NomeDoPokemon = document.createElement('h2');

            //ImagemPrincipalDoPokemon
            const ImagemPrincipalDoPokemon = document.createElement('img');
            ImagemPrincipalDoPokemon.setAttribute('class','imagemDoPokemon');

            //div status
            const divStatus = document.createElement('div');
            divStatus.setAttribute('id', 'status');

            //Div frente e verso
            const divFrenteEVerso = document.createElement('div');
            divFrenteEVerso.setAttribute('id','frenteEVerso');

            //div frente
            const divFrente = document.createElement('div');
            divFrente.setAttribute('id','frente');
            const imagemFrente = document.createElement('img');
            imagemFrente.setAttribute('class','frente-image');
            imagemFrente.setAttribute('src', pokemon.sprites.front_default);
            divFrente.appendChild(imagemFrente);

            //div frente
            const divVerso = document.createElement('div');
            divVerso.setAttribute('id','verso');
            const imagemVerso = document.createElement('img');
            imagemVerso.setAttribute('class','frente-image');
            imagemVerso.setAttribute('src', pokemon.sprites.back_default)
            divVerso.appendChild(imagemVerso);

            //Passando valores
            h2NomeDoPokemon.textContent = `Nome do Pokemon: ${pokemon.name}`;
            ImagemPrincipalDoPokemon.setAttribute('src', pokemon.sprites.other.home.front_default);


            //Inserindo na div
            divDadosPokemon.appendChild(h2NomeDoPokemon);
            divDadosPokemon.appendChild(ImagemPrincipalDoPokemon);

            pokemon.types.map(tipo =>{
                    const pTipoDoPokemonCondicional = document.createElement('p');
                    pTipoDoPokemonCondicional.innerText = `Tipo do pokemon é: ${tipo.type.name}`;
                    divDadosPokemon.appendChild(pTipoDoPokemonCondicional);
            });

            pokemon.stats.map(estatos=>{
                let pEstado = document.createElement('p');
                pEstado.setAttribute('class', estatos.stat.name)
                pEstado.textContent = `${estatos.stat.name}:${estatos.base_stat}`
                divStatus.appendChild(pEstado);
            })

            divFrenteEVerso.appendChild(divFrente);

            divFrenteEVerso.appendChild(divVerso);

            divDadosPokemon.appendChild(divStatus);

            divDadosPokemon.appendChild(divFrenteEVerso);

            divPrincipalPokemon.appendChild(divDadosPokemon);

        }
        
        mostrarPokemon()
        
    } catch (error) {
        console.log(error);
    }
});