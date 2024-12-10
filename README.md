<div>
<h1 align="center">Projeto Rua 4.0.4</h1>
</div>

![Rua404 - Website Showcase](https://github.com/user-attachments/assets/99001e80-aba3-47fc-8d23-5d2e3bee74a9)


## Objetivo

O objetivo deste trabalho é capturar a essência do grupo RUA 4.0.4 e traduzi-la em uma plataforma web que funcione tanto como um portfólio para os artistas quanto como uma vitrine para aqueles que desejam adquirir seus produtos. Este trabalho teve como objetivo criar um sistema multifuncional que permita a apresentação, venda e gerenciamento de obras de arte, facilitando a comunicação entre artistas e apreciadores. Isso será feito através de uma loja virtual, uma landing page com diversas experiências visuais para o cliente e um dashboard de gerenciamento para o administrador.

## Alunos integrantes da equipe

* Ana Luiza Machado Alves
* Lucas de Carvalho Barbosa
* Lucas Henrique Chaves de Barros
* Matheus Brasil Aguiar
* Matheus Martins da Silva Porto
* Raquel Inez de Almeida Calazans

## Professores responsáveis

* Joyce Christina de Paiva Carvalho
* Soraia Lúcia da Silva

## 💻 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:  

1. [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) - Para rodar o backend Spring Boot.  
2. [npm 10.8.2](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - Gerenciador de pacotes do Node.js.  
3. [Node.js LTS (20.17.0)](https://nodejs.org/en/download) - Ambiente de execução para o frontend React.  
4. [PostgreSQL LTS (17.2)](https://www.postgresql.org/download/) - Banco de dados relacional para persistência do sistema.
5. [pgAdmin 4](https://www.pgadmin.org/download/) ou [DBeaver](https://dbeaver.io/download/) - Ferramentas para gerenciar o banco de dados.
   
## 🛠️ Tecnologias & Arquitetura
Nesta seção listaremos as principais tecnologias e decisões arquiteturais do nosso projeto.
### Back-end
- Java com Spring Boot
- Arquitetura MVC - estrutura para separar as camadas de apresentação, lógica de negócios e dados.
- Repository Pattern - para acesso aos dados com desacoplamento entre as camadas de negócio e de persistência.
- Utilização de JPA/Hibernate - para persistência de dados e mapeamento objeto-relacional.
- [Swagger](http://localhost:8080/swagger-ui/index.html#/) - para documentação automática da nossa API REST.
  
### Front-end
- Core: React + TypeScript
   - Vite + SWC - ferramentas para bundling rápido e compilação eficiente do JavaScript e TypeScript.
   - React Router DOM - navegação entre páginas e gerenciamento de rotas.
   - React Context API - gerenciamento de estado global e comunicação entre componentes.
   - Axios - biblioteca para requisições HTTP para integração com o back-end.
- Arquitetura baseada em componentes - estrutura em que cada elemento de UI é cosntruído como um componente independente e reutilizável.
- Estilização:
   - shadcn/ui + Radix - biblioteca open-source de componentes altamente customizáveis.
   - Tailwind CSS - framework de utilitários para construção rápida de layouts.
  
## 🚀 Instalando RUA 4.0.4

### 1. Clonar o repositório
Abra o terminal e execute:
```bash
git clone https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-2-ti4-1254100-rua-4-0-4.git
```

### 2. Navegar para a pasta do projeto
```bash
cd .\Codigo
```

### 3. Configuração do Back-End
  1. Acesse o diretório do back-end
     ```bash
     cd \Rua-404-Api\
     ```
     
  2. Instale as dependências do Java
     ```bash
     ./mvnw clean install
     ```

  3. Configure o banco de dados
     * Ao seguir o passo a passo disponibilizado na documentação do PostgreSQL ou do DBeaver, crie uma base de dados que servirá como seu banco de dados local.
     * Atualize as credenciais do arquivo `application.properties` do backend.
    
      ```properties
          spring.datasource.url=jdbc:postgresql://localhost:5432/rua404
          spring.datasource.username=seu_usuario
          spring.datasource.password=sua_senha
      ```
    
      Obs: normalmente o `username` e `senha` é configurado convencionalmente como "root".

  4. Execute o servidor back=end
     ```bash
     ./mvnw spring-boot:run
     ```
### 4. Configuração do Front-end
  1. Acesse o diretório do front-end
     ```bash
     cd \rua-404-web\
     ```
     
  2. Instale as dependências
     ```bash
     npm install --save
     ```

  3. Execute o servidor frontend
     ```bash
     npm run dev
     ```

  4. Acesse a aplicação no navegador
     Normalmente a aplicação ficará disponível em [http://localhost:5173](http://localhost:5173).

## 📋 Observações
1. Certifique-se de que o backend está rodando antes de acessar o frontend.
2. Verifique se as portas padrão (8080 para o backend e 5173 para o frontend) não estão em uso.

## 🌍 Deploy
### Frontend
O frontend foi hospedado na Vercel, aproveitando sua integração com projetos React e suporte nativo a aplicações construídas com Vite.
Acesse a aplicação frontend em: [https://rua-404.vercel.app/](https://rua-404.vercel.app/)

### Backend
O backend foi implementado utilizando o framework Spring Boot, com deploy distribuído em dois ambientes:
- Railway: Plataforma para deploy rápido e gerenciamento automático de serviços.
- Azure: Para maior estabilidade e controle em produção.
- Acesse o banco de dados em: [ruafourzerofour.postgres.database.azure.com](ruafourzerofour.postgres.database.azure.com)

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
