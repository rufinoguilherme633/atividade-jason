/***************************************************************************
 * Objetivo: criar uma API para manipulação de dados de estados e cidades
 * Name:Guilherme Rufino Campos
 * Date: 10/03/2023
 * version: 1.0
 ***********************************************************************/
/**/

/*precisamos de um framework  */

/* Express -> dependencia do NODE que permite a integração entre rotocolo HTPP com código*/


/* para instalat*/

/* npm install express --save*/
/* COrs -> gerenciador de permissões para o protocolo http    */
/*npm install cors --save*/
/*Body-parser -> é uma dependencia que permite manipular dados enciados pelo body da requisição*/
/*npm install body-parser --save*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------*/


/* 1 ° instancias da depencia*/
/*Import das dependencias para criar API*/

/*responsavel pela requisição*/
const express = require("express"); // require se for um arquivo criado por mim temos que colocar caminho inteiro do arquivo inclusive  js
/*responsavel pela permissão das requisições*/
const cors = require("cors");
/*Responsavel pela manipulação do body da requisição*/
const bodyParser = require("body-parser");
const { report } = require("process");
//import do arquivo de função
const estadosCidades = require('./modulo/estados_cidades.js');

/*---------------------------------------------------------------------------------------------------------------------------------------------------*/
/* O propruo VSCODe crio por isso está comentadp
 */
// const { request } = require("http");
// const { response } = require("express");

/*---------------------------------------------------------------------------------------------------------------------------------------------------*/
/*fazer instacia dos objetos*/
const app = express(); /* -> cria um objeto com as informações da classe express*/
/*criar as permissões da API*/
/*por padrão a API vem bloquado*/
//define as permissões do header da API
app.use((request, response, next) => { /*reasponse - como vai devolver a infrmação*/ /*next roda o que esta dentro e vai pro proximo código*/
    /*configurações*/
    /* Permite gentrenciar a origem das requisições*/
    response.header('Access-Control-Allow-Origin', '*'); /*vai no header da mensagem e criando uma permissaõ de origem*/
    /*     '*' -> 'siginifica que que quer usar pode, publico*/
    /* se fosse privafda haveria o ip da máquina*/
    /*Permite gerenciar quais métodos/verbos poderão fazer requisições*/
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); /* OPTIONS responsavel por falar se o servidor está ativo*/

    //ativa no cors das requisições as permições estabelecidas
    app.use(cors());
    //para que o node não pare nas configurações ,passe para o próximo 
    next();
});


/*---------------------------------------------------------------------------------------------------------------------------------------------------*/

/*endPoint*/
/*/estados -> nome do endpoit*/
/*obedece o cors*/
/*requisição asincrona; pede ao front "esperar" para que haja o processamento de dados no back tipo tela de carregamento do jogo*/

//endPoit vai listar os estados
app.get('/estados', cors(), async function(request, response, next) {
    //mandar para o front

    //importar arquivo de funções

    //chama a função que retorna os Estados 
    let listaDeEstados = estadosCidades.getListaDeEstados();

    //tratamentos para validar se a função realizou o processamento
    if (listaDeEstados) {


        //retorna o Json e o status code
        response.json(listaDeEstados);
        // response.json('{message:"testando a api"}');
        //verificar se todas as linhas do código está funcionando
        response.status(200);
    } else {
        response.status(500); //500 -> erro interno
    }

});

//EndPoit : listas as caracteristicas do Estado pela sigla

//devolver estado pela sigla uf
app.get('/estado/sigla/:uf', cors(), async function(request, response, next) {
    //variavel que será utilizada para passagens de valores, na URL da requisição
    //criando uma variavel chamada uf para passar a sigla

    //resgatando a variave

    //requeste quando recebe
    //recebe o valor da variavel uf será encaminhada na URL da requisição
    let siglaEstado = request.params.uf; // request parametro uf-> nome da variavel que colocamos la em cima
    let statusCode;
    let dadosEstado = {}


    //tratamento para validar valores vazio, diferente de 2 e indefinido
    if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
        //response.status(404) // erro por parte do cliente
        statusCode = 400
            // response.json({ message: "Não é possivel processar a requisição, pois a sigla do Estado não foi informada ou não atende a quantidade de caracteres(2 digitos)" });
        dadosEstado.message = "Não é possivel processar a requisição, pois a sigla do Estado não foi informada ou não atende a quantidade de caracteres(2 digitos)";
    } else {

        //chama a função que filta o estado pela sigla
        //let estado = estadosCidades.getDadosEstados(siglaEstado);
        let estado = estadosCidades.getDadosEstados(siglaEstado);
        //valida o retorno válido da função
        if (estado) {
            //response.status(200) //estado encontrado
            statusCode = 200
                // response.json(estado)
            dadosEstado = estado
        } else {
            // response.status(404); // estado nao encontrado
            statusCode = 404
                // response.json();
        }
    }

    //console.log(siglaEstado)
    response.status(statusCode);
    response.json(dadosEstado);
});

app.get('/estado/capital/:uf', cors(), async function(request, response, next) {
    let capitalEstado = request.params.uf

    if (capitalEstado == '' || capitalEstado == undefined || capitalEstado.length != 2 || !isNaN(capitalEstado)) {
        response.status(404) // erro por parte do cliente

        response.json({ message: "Não é possivel processar a requisição, pois a sigla do Estado não foi informada ou não atende a quantidade de caracteres(2 digitos)" });

    } else {

        let estado = estadosCidades.getCapitalEstados(capitalEstado)

        if (estado) {
            response.status(200) //estado encontrado
                //  statusCode = 200
            response.json(estado)
                //  dadosEstado = estado
        } else {
            response.status(404); // estado nao encontrado
            // statusCode = 404
            response.json();
        }
    }

    console.log(capitalEstado)
});


app.get('/estado/regiao/:uf', cors(), async function(request, response, next) {

    let capitalEstado = request.params.uf

    if (capitalEstado == '' || capitalEstado == undefined || !isNaN(capitalEstado)) {
        response.status(404) // erro por parte do cliente

        response.json({ message: "Não é possivel processar a requisição, pois a sigla do Estado não foi informada ou não atende a quantidade de caracteres(2 digitos)" });

    } else {

        let estado = estadosCidades.getEstadosRegiao(capitalEstado)

        if (estado) {
            response.status(200) //estado encontrado
                //  statusCode = 200
            response.json(estado)
                //  dadosEstado = estado
        } else {
            response.status(404); // estado nao encontrado
            // statusCode = 404
            response.json();
        }
    }

    console.log(capitalEstado)
});

app.get('/estado/pais', cors(), async function(request, response, next) {

    // let regiao = request.params.uf;
    // if (regiao == '' || regiao == undefined || /*regiao.length != 2 ||*/ !isNaN(regiao)) {
    //     response.status(404) // erro por parte do cliente

    //     response.json({ message: "Não é possivel processar a requisição, pois a sigla do Estado não foi informada ou não atende a quantidade de caracteres(2 digitos)" });

    // } else {
    let estado = estadosCidades.getCapitalPais()

    //     if (estado) {
    //         response.status(200) //estado encontrado
    //             //  statusCode = 200
    //         response.json(estado)
    //             //  dadosEstado = estado
    //     } else {
    //         response.status(404); // estado nao encontrado
    //         // statusCode = 404
    //         response.json();
    //     }
    // }
    // console.log(regiao)
    if (estado) {


        //retorna o Json e o status code
        response.json(estado);
        // response.json('{message:"testando a api"}');
        //verificar se todas as linhas do código está funcionando
        response.status(200);
    } else {
        response.status(500); //500 -> erro interno
    }

});



// app.get('/estado/cidade/:uf', cors(), async function(request, response, next) {

//     let regiao = request.params.uf;
//     if (regiao == '' || regiao == undefined || /*regiao.length != 2 ||*/ !isNaN(regiao)) {
//         response.status(404) // erro por parte do cliente

//         response.json({ message: "Não é possivel processar a requisição, pois a sigla do Estado não foi informada ou não atende a quantidade de caracteres(2 digitos)" });

//     } else {
//         let estado = estadosCidades.getCidades(regiao)

//         if (estado) {
//             response.status(200) //estado encontrado
//                 //  statusCode = 200
//             response.json(estado)
//                 //  dadosEstado = estado
//         } else {
//             response.status(404); // estado nao encontrado
//             // statusCode = 404
//             response.json();
//         }
//     }
//     console.log(regiao)

// });



// CIDADE FILTADA PELA SIGLA DO ESTADO
///
app.get('/v1/senai/cidades', cors(), async function(request, response, next) {
    // supondo que tenha várias versoes (sitações onde a pessoa ja usa, mas tenho que fazer uma nova para não prejudica-la) e pertence a uma empresa




    //Recebe o valor da váriavel que será enviadda por QueryString ->   VARIAVEIS CRIADAS NA UR
    //EX: www.uol.br.?uf=us
    //antes do ? endereço do site
    //depois variaveis que estão sendo encamminhadas pela URL


    //usamos o query para recebber diversas variáveis para realizar o filtro
    //usamos parms para receber ID (pk) 
    let siglaEstado = request.query.uf
        // let cep = request.query.capitalEstado
        // console.log(siglaEstado)
        // console.log(cep)


    let statusCode;
    let daddosCidades = {}


    if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
        //response.status(404) // erro por parte do cliente
        statusCode = 400

        daddosCidades.message = "Não é possivel processar a requisição, pois a sigla do Estado não foi informada ou não atende a quantidade de caracteres(2 digitos)";
    } else {

        let cidades = estadosCidades.getCidades(siglaEstado);

        if (cidades) {

            statusCode = 200

            daddosCidades = cidades
        } else {

            statusCode = 404

        }
    }

    //console.log(siglaEstado)
    response.status(statusCode);
    response.json(daddosCidades);


})



// supondo que tenha várias versoes (sitações onde a pessoa ja usa, mas tenho que fazer uma nova para não prejudica-la) e pertence a uma empresa

//EndPoit versão 2 : lista de cidades filtrada pela sigla di estado //com mais detalhes
app.get('/v2/senai/cidades', cors(), async function(request, response, next) {

})




//permite carregar os endpoits criados e aguardar as requisiões pelo protocólo http na porta 8080
app.listen(8080, function() {
    console.log("servidor aguardando requisições na porta 8080")
})