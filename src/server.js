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

//Pegar o banco de dados
const db = require("./database/db")

//Configurar pasta publica
server.use(Express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(Express.urlencoded({ extended: true }))

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
    // req.query: query Strings da nossa url
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: O corpo do nosso formulário
    //console.log(req.body)

    //Inserir dados no banco de dados
    const query = `INSERT INTO places 
                    (image, name, address, 
                     address2, state, city, 
                     items) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ? );`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!") // Criar uma tela de erro e enviar para o home
        }
        //console.log("Cadastrado com sucesso.")
        //console.log(this)

        return res.render("create-point.html", { saved: true } )
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    // Se a pesquisa vier com o campo cidade em branco, retornará 0
    const search = req.query.search
    if (search === ""){
        return res.render("search-results.html", { total: 0 })
    }

    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro na pesquisa! ")
        }

        const total = rows.length
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total })
    })

})

//Ligar o Servidor
server.listen(3000)