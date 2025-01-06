const urlApiUsuarios = 'https://jsonplaceholder.typicode.com/users';
let listaUsuarios = [];
let usuariosFiltrados = [];
let carregamentoInicialConcluido = false;
let usuarioParaExcluir = null;

document.addEventListener("DOMContentLoaded", () => {
    buscarUsuarios();
    document.getElementById('botaoBuscar').addEventListener('click', filtrarUsuarios);
    carregarUltimaPesquisa(); // Carrega a última pesquisa salva
    configurarEventosAdicionarUsuario();
    configurarEventosExclusaoUsuario();
});

// Busca usuários da API e popula a lista
async function buscarUsuarios() {
    try {
        exibirCarregamento(true);
        const resposta = await fetch(urlApiUsuarios);
        if (!resposta.ok) throw new Error('Falha ao carregar os dados.');
        listaUsuarios = await resposta.json();
        usuariosFiltrados = [...listaUsuarios];
        popularSeletorCidades();
        exibirUsuarios();
        carregamentoInicialConcluido = true;
    } catch (erro) {
        console.error(erro);
        alert('Erro ao carregar os dados. Tente novamente mais tarde.');
    } finally {
        exibirCarregamento(false);
    }
}

// Carrega a última pesquisa salva no localStorage
function carregarUltimaPesquisa() {
    const ultimaPesquisa = JSON.parse(localStorage.getItem('ultimaPesquisa'));
    if (ultimaPesquisa) {
        // Preenche os campos com os valores da última pesquisa
        document.getElementById('campoNome').value = ultimaPesquisa.nome || '';
        document.getElementById('seletorCidades').value = ultimaPesquisa.cidade || '';
        
        // Exibe a última pesquisa na interface
        document.getElementById('ultimoNomePesquisa').textContent = `Nome: ${capitalizarPrimeiraLetra(ultimaPesquisa.nome) || 'Não especificado'}`;
        document.getElementById('ultimaCidadePesquisa').textContent = `Cidade: ${ultimaPesquisa.cidade || 'Não especificada'}`;
        
        filtrarUsuarios(); // Aplica o filtro com base na última pesquisa
    }
}

// Popula o seletor de cidades com base nos usuários disponíveis
function popularSeletorCidades() {
    const seletorCidades = document.getElementById('seletorCidades');
    seletorCidades.innerHTML = '<option value="">Todas as cidades</option>';
    const cidadesUnicas = [...new Set(listaUsuarios.map(usuario => usuario.address.city))];
    cidadesUnicas.forEach(cidade => {
        const opcao = document.createElement('option');
        opcao.value = cidade;
        opcao.textContent = cidade;
        seletorCidades.appendChild(opcao);
    });
}

// Filtra os usuários com base no nome e na cidade
function filtrarUsuarios() {
    exibirCarregamento(true);

    setTimeout(() => {
        const consultaNome = document.getElementById('campoNome').value.toLowerCase();
        const cidadeSelecionada = document.getElementById('seletorCidades').value;

        // Salva a última pesquisa no localStorage
        localStorage.setItem('ultimaPesquisa', JSON.stringify({ nome: consultaNome, cidade: cidadeSelecionada }));

        // Atualiza a interface com a última pesquisa
        document.getElementById('ultimoNomePesquisa').textContent = `Nome: ${capitalizarPrimeiraLetra(consultaNome) || 'Não especificado'}`;
        document.getElementById('ultimaCidadePesquisa').textContent = `Cidade: ${cidadeSelecionada || 'Não especificada'}`;

        if (consultaNome === '' && cidadeSelecionada === '') {
            usuariosFiltrados = [...listaUsuarios];
        } else {
            usuariosFiltrados = listaUsuarios.filter(usuario => {
                const nomeCorresponde = usuario.name.toLowerCase().includes(consultaNome);
                const cidadeCorresponde = cidadeSelecionada ? usuario.address.city === cidadeSelecionada : true;
                return nomeCorresponde && cidadeCorresponde;
            });
        }

        exibirUsuarios();
        exibirCarregamento(false);
    }, 500);
}

// Capitaliza a primeira letra de uma string
function capitalizarPrimeiraLetra(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Exibe os usuários filtrados na interface
function exibirUsuarios() {
    const listaDeUsuarios = document.getElementById('listaDeUsuarios');
    listaDeUsuarios.replaceChildren();

    if (usuariosFiltrados.length === 0) {
        document.getElementById('semResultados').style.display = 'block';
    } else {
        document.getElementById('semResultados').style.display = 'none';
        usuariosFiltrados.forEach(usuario => {
            const cardUsuario = document.createElement('div');
            cardUsuario.classList.add('user-card');
            cardUsuario.innerHTML = `
                <button class="iconeExcluir"><i class="fas fa-times"></i></button>
                <h3>${capitalizarPrimeiraLetra(usuario.name)}</h3>
                <p class="email">EMAIL: <a class="email" href="mailto:${usuario.email}" class="email-usuario">${usuario.email}</a></p>
                <p class="cidade">CIDADE: ${usuario.address.city}</p>
            `;

            setTimeout(() => {
                cardUsuario.classList.add('visivel');
            }, 50);

            listaDeUsuarios.appendChild(cardUsuario);
        });
    }
}

// Exibe ou oculta a tela de carregamento
function exibirCarregamento(mostrar) {
    const telaDeCarregamento = document.getElementById('telaDeCarregamento');
    telaDeCarregamento.style.display = mostrar ? 'block' : 'none';
}

// Configura os eventos para adicionar um novo usuário
function configurarEventosAdicionarUsuario() {
    document.getElementById('botaoAdicionarUsuario').addEventListener('click', () => {
        document.getElementById('areaAdicionarUsuario').style.display = 'block';
        document.getElementById('botaoAdicionarUsuario').style.display = 'none';
    });

    document.getElementById('botaoSalvar').addEventListener('click', () => {
        const nome = document.getElementById('campoNomeAdicionar').value.trim();
        const email = document.getElementById('campoEmailAdicionar').value.trim();
        const cidade = document.getElementById('campoCidadeAdicionar').value.trim();

        if (nome && email && cidade) {
            if (!validarEmail(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            const novoUsuario = {
                name: nome,
                email: email,
                address: { city: cidade }
            };
            listaUsuarios.push(novoUsuario); 
            usuariosFiltrados.push(novoUsuario); 
            exibirUsuarios(); 
            limparCamposAdicionarUsuario();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    document.getElementById('botaoCancelar').addEventListener('click', limparCamposAdicionarUsuario);
}

// Limpa os campos do formulário de adicionar usuário
function limparCamposAdicionarUsuario() {
    document.getElementById('campoNomeAdicionar').value = '';
    document.getElementById('campoEmailAdicionar').value = '';
    document.getElementById('campoCidadeAdicionar').value = '';
    document.getElementById('areaAdicionarUsuario').style.display = 'none';
    document.getElementById('botaoAdicionarUsuario').style.display = 'block';
}

// Valida o formato do email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Configura os eventos para exclusão de usuários
function configurarEventosExclusaoUsuario() {
    document.getElementById('listaDeUsuarios').addEventListener('click', (e) => {
        if (e.target.classList.contains('iconeExcluir')) {
            const cardUsuario = e.target.closest('.user-card');
            const nomeUsuario = cardUsuario.querySelector('h3').textContent.trim();

            usuarioParaExcluir = listaUsuarios.find(usuario => usuario.name.trim().toLowerCase() === nomeUsuario.toLowerCase());

            if (usuarioParaExcluir) {
                document.getElementById('caixaConfirmacao').style.display = 'block';
            }
        }
    });

    document.getElementById('confirmarExclusao').addEventListener('click', () => {
        if (usuarioParaExcluir) {
            usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.name.trim().toLowerCase() !== usuarioParaExcluir.name.trim().toLowerCase());
            listaUsuarios = listaUsuarios.filter(usuario => usuario.name.trim().toLowerCase() !== usuarioParaExcluir.name.trim().toLowerCase());

            exibirUsuarios();
            document.getElementById('caixaConfirmacao').style.display = 'none';
            usuarioParaExcluir = null;
        }
    });

    document.getElementById('cancelarExclusao').addEventListener('click', () => {
        usuarioParaExcluir = null;
        document.getElementById('caixaConfirmacao').style.display = 'none';
    });
}

