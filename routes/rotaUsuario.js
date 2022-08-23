const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem:"aqui e a lista de usuários!!!!",
        nome:"Maria Eduarda"
    });
});

router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).send({
        mensagem:`aqui e a lista de um usuário com id:${id}`,
        nome:"Maria Eduarda"
    });
});
router.post('/',(req,res,next)=>{
    
    const usuario={
        nome : req.body.nome,
        email :req.body.email,
        senha : req.body.senha
    }
    res.status(201).send({
        mensagem:"Dados Inseridos!",
        usuarioCriado:usuario
    })
})

module.exports = router;