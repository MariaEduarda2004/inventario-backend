const express = require('express');
const morgan = require('morgan');
const cors = require("cors")
const app = express();
app.use(cors()); 
const rotaUsuarios = require('./routes/rotaUsuario');
const rotaEmpresa = require('./routes/rotaEmpresa');
const rotaPatrimonio = require('./routes/rotaPatrimonio');
const rotaLotacao = require('./routes/rotaLotacao');
const rotaSetor = require('./routes/rotaSetor');
const bodyParser = require("body-parser")


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/usuario",rotaUsuarios);
app.use("/empresa",rotaEmpresa);
app.use("/patrimonio",rotaPatrimonio);
app.use("/setor",rotaSetor);
app.use("/lotacao", rotaLotacao);





app.use((req,res,next)=>{
    res.header('Access-Control-Alow-Origin','*');
    res.header(
        'Access-Control-Alow-Header',
        'Origin, X-Resquerested-with,Content-Type, Accept,Authorization'
    );
       if(req.method==='OPTIONS'){
            res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE')
            return res.status(200).send({});

       }
       next();
})

app.use((req,res,next)=>{
    const erro = new Error("Não encontrado!");
    erro.status(404);
    next(erro);

});

// app.use((error,req,res,next)=>{
//     res.status(error.status || 500);
//     return res.json({
//         erro:{
//             mensagem:error.mensagem
//         }
//     })

// });


module.exports = app

