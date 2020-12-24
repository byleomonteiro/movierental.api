<p align="center">
  <a href="https://github.com/Leon4rdoMonteiro">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/VHS_diagonal.svg/1200px-VHS_diagonal.svg.png" width=300 height=300 alt="Logo">
  </a>
</p>

<h1 align="center"> <b>📼 MOVIE RENTAL API </b></h1>

Autor: [Leonardo Monteiro](https://github.com/Leon4rdoMonteiro)

#### 🚀 API construída para teste na PHI - Node.js Backend Developer.

   + 🌠 Foram utilizadas as tecnologias:
        - Node.js, Express, JWT, SQL (puro, sem ORM's).
      
   + 📝 Padronização de código: </br>
        - Eslint e Prettier. 
      
   + 🛠 Ferramentas/Frameworks:
        - Docker
    
   + 🔏 Segurança: 
        - bcryptjs: Gerador de hashs de senhas padrão.
        - express-brute: Para proteção contra ataques de força bruta. 
        - express-rate-limit: Proteção contra requisições maliciosas na rota da aplicação. 
        - helmet: Configura cabeçalhos HTTP e protege contra vários ataques como XSS e Sniffing. 
        

 ### 🖊 Configurações:
 

  - Criar arquivos de configuração: ```.env e .env.test``` com base nos arquivos: ```.env.example e .env.test.example```
 
 
  + Criar um APP_SECRET para geração dos tokens e armazenar nas variáveis de ambiente.
  
```js
SECRET=
```
 
 + Alterar variáveis de ambiente para conectar o banco de dados SQL ao Sequelize.
  
```js
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
```
    Obs: Criar uma nova base de dados no container para o realizar os testes ou utilizar a base principal. 


 ### 🏁 Instalação:
  
   ##### 1.Instalar todas as dependências:
        npm install
   ##### 2. Criando e executando Docker Container:
        docker-compose up -d
   ##### 3. Executar API em ambiente de desenvolvimento, porta padrão 3333:
        npm run dev
   ##### 4. Renderizando e visualizando documentação da API, porta padrão 3000:
        npm run doc
        npm run doc --server
   