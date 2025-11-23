const cardContainer = document.querySelector('.card-container');
const campoBusca = document.getElementById('campo-busca');
let dadosMapas = [];

async function buscarDados() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados: ' + response.statusText);
        }
        dadosMapas = await response.json();
        renderizarCards(dadosMapas);
    } catch (error) {
        console.error(error);
        cardContainer.innerHTML = '<p>Não foi possível carregar os mapas.</p>';
    }
}

function renderizarCards(mapas) {
    cardContainer.innerHTML = '';
    if (mapas.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum mapa encontrado.</p>';
        return;
    }

    mapas.forEach(mapa => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-info">
                <h2>${mapa.nome}</h2>
                <p>${mapa.descricao}</p>                
            </div>            
            <img src="${mapa.imagem}" alt="Imagem do mapa ${mapa.nome}" class="card-image">
            <br><a href="${mapa.link}" target="_blank" class = "card-link">Sobre</a>
        `;
        cardContainer.appendChild(card);
    });
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const mapasFiltrados = dadosMapas.filter(mapa => mapa.nome.toLowerCase().includes(termoBusca));
    renderizarCards(mapasFiltrados);
}

document.addEventListener('DOMContentLoaded', buscarDados);
campoBusca.addEventListener('input', iniciarBusca);