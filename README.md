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
Mapa da viagem
Funcionalidades Não Concluídas
Salvamento de Dados:

O banco de dados foi configurado, mas não houve tempo para integrar o salvamento de dados ao histórico.

Histórico de Viagens:

Tela e lógica para exibir o histórico de viagens do usuário não foram implementadas.



O que Aprendi Durante o Desenvolvimento:
Como configurar um servidor com Express.js e TypeScript;
A importância de um bom planejamento e organização de tempo para cumprir prazos;
Uso inicial de Docker para ambientes isolados de desenvolvimento;
Apesar das limitações, este projeto foi uma excelente oportunidade para aprender e identificar áreas de melhoria;

Próximos Passos
Se tivesse mais tempo, os próximos passos seriam:

Implementar o salvamento das viagens no banco de dados.
Finalizar a tela de histórico de viagens.
Corrigir possíveis vulnerabilidades e melhorar a segurança da aplicação.

Espero que este README transmita minha abordagem e esforço durante o desenvolvimento, mesmo que o projeto esteja incompleto. Estou aberto a receber feedback para melhorar nas próximas oportunidades.



Instalação e Execução

Backend

Instale as dependências:

npm install

Rode as migrações para configurar o banco de dados (Knex com suporte a TSX):

$env:NODE_OPTIONS="--import tsx"
npx knex migrate:make name_of_migration

Inicie o servidor:

npx tsx src/index.ts

