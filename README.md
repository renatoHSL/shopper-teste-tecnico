Shopper - Teste Técnico

Descrição do Projeto

Este projeto é parte de um teste técnico para a vaga de [Nome da vaga]. A aplicação tem como objetivo criar uma funcionalidade de solicitação de viagens, com integração de APIs e exibição de motoristas disponíveis, incluindo detalhes como veículo, avaliação e preço estimado.

Status do Projeto
Infelizmente, devido ao tempo limitado de uma semana, não foi possível concluir todas as etapas do projeto. A funcionalidade principal foi parcialmente implementada. O que está pronto:

Solicitação de Viagem

Formulário com campos para informar o ID do usuário, endereço de origem e destino.
Requisição para a API com os parâmetros informados, retornando as opções de motoristas disponíveis.

Exibição das Opções de Viagem

Lista de motoristas com as informações: nome, descrição, veículo, avaliação e valor estimado da viagem.


Botão "Escolher" para confirmar a viagem.

Limitações

Não foi implementada a funcionalidade de salvamento no banco de dados; os dados de motoristas exibidos são buscados a partir de informações já salvas.
Mapa estático e histórico de viagens não foram finalizados.
Correções de vulnerabilidades foram deixadas de lado, por serem irrelevantes no contexto deste desenvolvimento inicial.
Instalação e Execução
Backend
Instale as dependências:
bash
Copiar código
npm install
Rode as migrações para configurar o banco de dados (Knex com suporte a TSX):
bash
Copiar código
$env:NODE_OPTIONS="--import tsx"
npx knex migrate:make name_of_migration
Inicie o servidor:
bash
Copiar código
npx tsx src/index.ts
Frontend
Siga as instruções para criar e configurar o frontend com React:
React Docs
Create React App Docs
Funcionalidades Implementadas
Formulário de Solicitação de Viagem:

O usuário pode informar:
ID do usuário
Endereço de origem
Endereço de destino
Ao clicar no botão "Estimar Viagem", o sistema faz uma requisição para a API.
Exibição de Opções de Viagem:

Lista de motoristas com informações como:
Nome
Descrição
Veículo
Avaliação
Valor estimado da viagem
Botão "Escolher", que confirma a viagem via API (simulado).
Funcionalidades Não Concluídas
Salvamento de Dados:

O banco de dados foi configurado, mas não houve tempo para integrar o salvamento de dados ao histórico.
Histórico de Viagens:

Tela e lógica para exibir o histórico de viagens do usuário não foram implementadas.
Mapa Estático:

Não foi possível integrar o mapa com a rota estimada, mas o plano era usar a API do Google Maps para isso.
Fontes Utilizadas
O desenvolvimento contou com diversas fontes de apoio e documentação, listadas abaixo:

Backend
Documentação Express.js
Tutorial DigitalOcean - TypeScript
ESLint e Prettier
Guia de ESLint e Prettier
Frontend
Documentação React
Docker e Docker-Compose
Introdução ao Docker
Documentação Oficial do Docker Compose
API do Google Maps
Documentação Google Maps
O que Aprendi Durante o Desenvolvimento
Como configurar um servidor com Express.js e TypeScript.
A importância de um bom planejamento e organização de tempo para cumprir prazos.
Uso inicial de Docker para ambientes isolados de desenvolvimento.
Apesar das limitações, este projeto foi uma excelente oportunidade para aprender e identificar áreas de melhoria.

Próximos Passos
Se tivesse mais tempo, os próximos passos seriam:

Implementar o salvamento das viagens no banco de dados.
Adicionar a funcionalidade de exibição de um mapa estático com a rota estimada.
Finalizar a tela de histórico de viagens.
Corrigir possíveis vulnerabilidades e melhorar a segurança da aplicação.
Espero que este README transmita minha abordagem e esforço durante o desenvolvimento, mesmo que o projeto esteja incompleto. Estou aberto a receber feedback para melhorar nas próximas oportunidades.
