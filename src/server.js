/* 1 - Instalar o modulo Express para criar 
       o server de requisições da Aplicação Web
   
   2 - Instalar o modulo Nodemon para reiniciar o 
       Server, automaticamente, sempre que for feito
       uma alteração em src/server.js
*/
 
const Express = require("express")
const server = Express()

//Configurar pasta publica
server.use(Express.static("public"))

//Configurar caminhos da minha aplicação
// Pagina Inicial

//req: é a requisição do browser
//res: é a resposta à requisição
server.get("/", (req, res) => {
   res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
 })

//Ligar o Servidor
server.listen(3000)