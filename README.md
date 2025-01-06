## 💻 L5 Network 💻

# Teste Técnico - L5 Networks

Este projeto tem como objetivo a criação de uma aplicação web simples que consome dados de uma API pública e exibe uma lista de usuários com interações básicas aprimoradas. A aplicação é capaz de realizar busca, filtragem e exibir informações sobre os usuários, com foco em uma interface responsiva e interativa.

### Funcionalidades Implementadas 

- Exibição da Lista de Usuários: A página exibe uma lista de usuários, com as informações de nome, e-mail e cidade, consumidas de uma API pública.
- Campos de Busca e Filtro: O usuário pode filtrar a lista de usuários por nome e cidade de forma dinâmica.
- Interface Responsiva: A aplicação foi estilizada utilizando Flexbox e é responsiva, adaptando-se a diferentes tamanhos de tela.
- Indicador de Carregamento: Durante o carregamento dos dados, é exibido um indicador visual, informando ao usuário que a lista está sendo carregada.
- Tratamento de Erros: Foi implementado um sistema de tratamento de erros para o usuário em caso de falha no carregamento dos dados.
- Mensagem para Nenhum Resultado: Caso não haja resultados da busca, uma mensagem é exibida.
- Uso de localStorage: O último estado de pesquisa é salvo e restaurado utilizando localStorage.

## GitPages Link

## Estrutura de Arquivos
- index.html: Arquivo principal da aplicação com a estrutura HTML.
- styles.css: Arquivo de estilos da aplicação.
- app.js: Script que realiza o consumo da API e implementa as funcionalidades de busca, filtro, e manipulação de erros.

## Como o Projeto Pode Ser Expandido
- Aprimoramento da Busca: Implementar filtros adicionais, como por nome completo ou por outros parâmetros.
- Integração com Outras Plataformas: Se conectar a APIs para exibir informações adicionais relacionadas aos usuários ou funcionalidades.
- Exportação de Dados: Permitir que os dados sejam exportados em formatos como CSV ou PDF.
- Modo Escuro: Oferecer suporte para temas escuros, ajustados com base nas preferências do usuário ou do sistema operacional.

## Como Visualizar o Projeto
- Clone este repositório.
- Abra o arquivo index.html em seu navegador.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).