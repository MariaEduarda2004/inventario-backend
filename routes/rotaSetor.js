const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
let setor=
[
  {
      "id":1,
      "nome":"Financeiro"
  },
  {
      "id":2,
      "nome":"Gerência"
  },
  {
      "id":3,
      "nome":"Depto Pessoal"
  },
  {
      "id":4,
      "nome":"Tesouraria"
  }

]

//para consultar todos os dados
router.get('/',(req,res,next)=>{
       
  mysql.getConnection((error, conn) => {
    conn.query(
      "SELECT * FROM `setor` ",
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
          setor: resultado

        })
      }
    )
  })
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    mysql.getConnection((error, conn) => {
      conn.query(
        "SELECT * FROM `setor` where id=?", [id],
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
            setor: resultado
  
          })
        }
      )
    })
})
// para enviar dados para salvar no banco
router.post('/',(req,res,next)=>{
      let msg=[];
      let i=0;
          
          const setor={
            nome : req.body.nome
          }
          if(usuario.nome.length<3){
              msg.push(
                {mensagem:"campo com menos de 3 caracteres!"}
                )
              i++;
            } 
        if(i==0){
          mysql.getConnection((error, conn) => {
            conn.query(
              "INSERT INTO `setor`(nome) values(?)",
              [setor.nome],
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
                  setor: resultado.insertId
      
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
     let msg=[];
     let i=0;
     const {id,nome}=req.body;
     const array_alterar = [{
           id:id,
           nome:nome
     }]


     if(nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
    }

if(i==0){ mysql.getConnection((error, conn) => {
  conn.query(
    "update setor set nome=? where id=?",
    [nome],
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
}else{
            res.status(400).send({
            mensagem:msg,  
      }) 
}
    

})
router.delete('/:id',(req,res,next)=>{
  const {id} = req.params;
  mysql.getConnection((error, conn) => {
    conn.query(
      `DELETE FROM setor WHERE id=${id}`,
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

