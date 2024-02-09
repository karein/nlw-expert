# Sobre

Repositório de estudos com dois projetos do NLW experts, evento de programação prática e gratuito da Rocketseat.

# Projeto Node.js

Um sistema de votação em tempo real onde usuários podem criar enquete, votar e acompanhar o ranking de votação das opções da enquete. Utilizando fastify, prisma e redis.

## Rodar o projeto

- Entrar no projeto
  - cd polls-trilha-nodejs
- Instalar dependências
  - npm install
- Iniciar Docker
  - docker compose up -d
- Iniciar Server
  - npm run dev
- Gerar tabelas
  - npx prisma migrate dev

# Projeto React

Aplicação de Notas, onde podem ser criadas novas notas por texto ou gravação de audio. Utilizando TypeScript, Tailwind e SpeechRecognition API.

## Rodar o projeto

- Entrar no projeto
  - cd notes-trilha-react
- Instalar dependências
  - npm install
- Iniciar Server
  - npm run dev

<!-- # Observações
Verificar se o speech recognition é suportado pelo navegador: https://caniuse.com/?search=speechrecognition
 -->
