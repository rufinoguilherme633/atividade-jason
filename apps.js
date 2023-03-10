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
    const estadosCidades = require('./modulo/estados_cidades.js');

    let listaDeEstados = estadosCidades.getListaDeEstados();


    response.json(listaDeEstados);
    // response.json('{message:"testando a api"}');
    //verificar se todas as linhas do código está funcionando
    response.status(200);


});
//permite carregar os endpoits criados e aguardar as requisiões pelo protocólo http na porta 8080
app.listen(8080, function() {
    console.log("servidor aguardando requisições na porta 8080")
})