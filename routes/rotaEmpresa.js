const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const empresa=
[
  {
      "id":1,
      "nome":"Inovare",
      "responsavel":"joao",
      "contato":"9999-0000"
  },
  {
      "id":2,
      "nome":"Best Place",
      "responsavel":"joao",
      "contato":"9999-0000"
  },
  {
      "id":3,
      "nome":"Cultura Store",
      "responsavel":"joao",
      "contato":"9999-0000"
  },
  {
      "id":4,
      "nome":"Iarly Software S/A",
      "responsavel":"iarly@gmail.com",
      "contato"    :"123"
  },
  {
      "id":5,
      "nome":"Requint",
      "email":"mariaeduarda@gmail.com",
      "contato":"123"
  },
  {
      "id":6,
      "nome":"Digimund",
      "responsavel":"filipe@gmail.com",
      "contato":"123"
  },
  {
      "id":7,
      "nome":"RaInfo",
      "responsavel":"ray@gmail.com",
      "contato":"123"
  },
  {
      "id":8,
      "nome":"MaxHand",
      "responsavel":"max@gmail.com",
      "contato":"123"
  },
  {
      "id":9,
      "nome":"King & Queen",
      "responsavel":"gabriela@gmail.com",
      "contato":"123"
  }
  
]

//para consultar todos os dados
router.get('/:idempresa',(req,res,next)=>{
  const id = req.params.idempresa;
  mysql.getConnection((error, conn) => {
    conn.query(
      "SELECT * FROM `empresa` where id=? ",[id],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          })
        }
        res.status(200).send({
          mensagem: "aqui é a lista de empresa!!!!",
          empresa: resultado

        })
      }
    )
  })
})       


//para consultar um determinado cadastro
router.get('/',(req,res,next)=>{
 
  mysql.getConnection((error, conn) => {
    conn.query(
      "SELECT * FROM `empresa`",
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          })
        }
        res.status(200).send({
          mensagem: "aqui é a lista de setor!!!!",
          empresa: resultado

        })
      }
    )
  })
})
// para enviar dados para salvar no banco
router.post('/',(req,res,next)=>{
      let msg=[];
      let i=0;
          
          const empresa={
            nome : req.body.nome,
             responsavel : req.body.responsavel,
             contato : req.body.contato
          }
          if(empresa.nome.length<3){
              msg.push(
                {mensagem:"campo com menos de 3 caracteres!"}
                )
              i++;
            }

            if(empresa.contato.length==0){
              msg.push({mensagem:"contato invalido!"})
              i++;                
            }  
        if(i==0){
          mysql.getConnection((error, conn) => {
            conn.query(
              "INSERT INTO `empresa`(nome,responsavel,contato) values(?,?,?)",
              [empresa.nome, empresa.responsavel, empresa.contato],
              (error, resultado, field) => {
                conn.release();
                if (error) {
                  console.log("passei aqui")
                  return res.status(500).send({
                    error: error,
                    response: null
                  })
                }
                res.status(201).send({
                  mensagem: "Cadastro criado sucesso!!!!",
                  usuario: resultado.insertId
      
                })
              }
            )
          })       
        }else{
                    res.status(400).send({
                    mensagem:msg,  
              }) 
        }
            
        }
      
      
);

router.patch('/',(req,res,next)=>{

let msg = [];
let i = 0;
const { id, nome, responsavel, contato } = req.body;
const array_alterar = [{
  id: id,
  nome: nome,
  responsavel: responsavel,
  contato: contato
}]
for (let i = 0; i < empresa.length; i++) {
  if (empresa.indexOf(empresa[i]) === id) {
    empresa[i] = array_alterar;
    console.log(array_alterar);
  }
}

if (nome.length < 3) {
  msg.push({ mensagem: "campo com menos de 3 caracteres!" })
  i++;
}
// if (validacaoEmail(email) == false) {
//   msg.push({ mensagem: "E-mail invalido!" })
//   i++;
// }
// if (senha.length == 0) {
//   msg.push({ mensagem: "senha invalida!" })
//   i++;
// }
if (i == 0) {
  mysql.getConnection((error, conn) => {
    conn.query(
      "update empresa set nome=?,responsavel=?,contato=? where id=?",
      [nome, responsavel, contato, id],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          })
        }
        res.status(201).send({
          mensagem: "Cadastro alterado com sucesso!!!!",

        })
      }
    )
  })
} else {
  res.status(400).send({
    mensagem: msg,
  })
}


})

router.delete('/:id',(req,res,next)=>{
  const { id } = req.params;
  // let dadosdeletados=usuario.filter(value=>value.id==id);
  // let listausuario=usuario.filter(value=>value.id!=id);
  mysql.getConnection((error, conn) => {
    conn.query(
      `DELETE FROM empresa WHERE id=${id}`,
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          })
        }
        res.status(200).send({
          mensagem: "cadastro deletado com sucesso!!!!",


        })
      }
    )
  }) 

 
})
module.exports = router;

