/* 1 - Instalar o modulo Express para criar 
       o server de requisições da Aplicação Web
   
   2 - Instalar o modulo Nodemon para reiniciar o 
       Server, automaticamente, sempre que for feito
       uma alteração em src/server.js

   3 - Instalar o modulo nunjucks, criação de templates
       HTML inteligentes
*/
 
const Express = require("express")
const server = Express()

//Configurar pasta publica
server.use(Express.static("public"))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//Configurar caminhos da minha aplicação
// Pagina Inicial

//req: é a requisição do browser
//res: é a resposta à requisição
server.get("/", (req, res) => {
   return res.render("index.html", {
       title: "Seu marketplace de coleta de resíduos"
   })
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
 })

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//Ligar o Servidor
server.listen(3000)