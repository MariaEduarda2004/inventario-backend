const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
let patrimonio=
[
  {
      "id":1,
      "nome":"Caneta"
  },
  {
      "id":2,
      "nome":"Lápis",
  },
  {
      "id":3,
      "nome":"Grafite"
  },
  {
      "id":4,
      "nome":"Envelope"
  },
  {
      "id":5,
      "nome":"Fichário"
  },
  {
      "id":6,
      "nome":"Camputador"
  },
  {
      "id":7,
      "nome":"Mesa"
  },
  {
      "id":8,
      "nome":"Carro"
  },
  {
      "id":9,
      "nome":"Moto"
  }
  
]


//para consultar todos os dados
router.get('/',(req,res,next)=>{
       
  mysql.getConnection((error,conn)=>{
    conn.query(
      "SELECT * FROM `patrimonio` ",
      (error,resultado,field)=>{
        conn.release();
        if(error){
         return res.status(500).send({
            error:error,
            response:null
          })
        }
        res.status(200).send({
          mensagem:"aqui é a lista de patrimonio!!!!",
          patrimonio:resultado
        
        })
      }
      )
 })  
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    let listapatrimonio=patrimonio.filter(value=>value.id==id);
    mysql.getConnection((error,conn)=>{
      conn.query(
        "SELECT * FROM `patrimonio` where id=?",[id],
        (error,resultado,field)=>{
          conn.release();
          if(error){
           return res.status(500).send({
              error:error,
              response:null
            })
          }
          res.status(200).send({
            mensagem:"aqui é a lista de patrimonio!!!!",
            patrimonio:resultado
          
          })
        }
        )
   })  
    
})
// para enviar dados para salvar no banco
router.post('/',(req,res,next)=>{
      let msg=[];
      let i=0;
          
          const patrimonio={
            nome : req.body.nome
          }
          if(usuario.nome.length<3){
              msg.push(
                {mensagem:"campo com menos de 3 caracteres!"}
                )
              i++;
            }

        if(i==0){
          mysql.getConnection((error,conn)=>{
            conn.query(
              "INSERT INTO `patrimonio`(nome) values(?)",
              [patrimonio.nome],
              (error,resultado,field)=>{
                conn.release();
                if(error){
                  console.log("passei aqui")
                 return res.status(500).send({
                    error:error,
                    response:null
                  })
                }
                res.status(201).send({
                  mensagem:"Cadastro criado sucesso!!!!",
                  patrimonio:resultado.insertId
                
                })
               }
              )
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
      for(let i=0; i<patrimonio.length; i++){
          if(patrimonio.indexOf(patrimonio[i])===id){
            patrimonio[i]=array_alterar;
             console.log(array_alterar);
          }
      }

     if(nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
    } 
if(i==0){
  mysql.getConnection((error, conn) => {
    conn.query(
      "update patrimonio set nome=? where id=?",
      [nome,id],
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
      `DELETE FROM patrimonio WHERE id=${id}`,
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

