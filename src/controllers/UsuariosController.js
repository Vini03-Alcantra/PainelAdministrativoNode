const User = require("../models/users")
const bcrypt = require("bcrypt")

module.exports = {
    async index(req, res){
        try {
            const users = await User.findAll({raw: true, order: [
                ['id', 'DESC']
            ]})
    
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({message: "Operação Indisponível"})
        }
    },

    async findUser(req, res){
        try {
            const {id} = req.params;
            const user = await User.findOne({where: {id}})  
            
            if(user){
                return res.status(200).json(user)
            }else{
                return res.status(401).json({message: "User don't exists"})
            }
        } catch (error) {
            return res.status(500).json({message: "Operação Indisponível"}) 
        }
    },

    async create(req, res){
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        let data = {}

        let user = await User.findOne({where: {email_usuario}})
        
        try {
            if(!user){  
                var passwordHash = bcrypt.hashSync(senha_usuario, 10) 
                data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario: passwordHash}
                user = await User.create(data)
                
                return res.status(200).json(user)
            }else{
                return res.status(401).json({message: "user already exists"})
            }
        } catch (error) {
            return res.status(500).json({message: "Operação inválida"})
        }
    },

    async delete(req, res){
        const {id} = req.params;
        try {
            const user = await User.destroy({where: {id}})

            if(user){
                return res.status(200).json({message: "User excluído"})
            }else{
                return res.status(403).json({message: "User don't find"})
            }
        } catch (error) {
            return res.status(500).json({message: "Operaçaão Inválida"}) 
        }
    },

    async update(req, res){
        const {id} = req.params
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        const user = await User.update({nome_usuario, email_usuario, tipo_usuario, senha_usuario}, {where: {id}});
        
        if (user) {
            return res.status(200).json({message: "Atualizado com sucesso"})
        } else {
            return res.status(403).json({message: "User don't find"})
        }
    }
}