const User = require("../models/users")
const bcrypt = require("bcrypt")

module.exports = {
    async index(req, res){
        const users = await User.findAll({raw: true, order: [
            ['id', 'DESC']
        ]})

        return res.status(200).json(users)
    },

    async findUser(req, res){
        const {id} = req.params;
        const user = await User.findOne({where: {id}})
        return res.status(200).json(user)
    },

    async create(req, res){
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        let data = {}

        let user = await User.findOne({where: {email_usuario}})
        
        if(!user){  
            var passwordHash = bcrypt.hashSync(senha_usuario, 10) 
            data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario: passwordHash}
            user = await User.create(data)
            
            return res.status(200).json(user)
        }else{
            return res.status(500).json({message: "user already exists"})
        }
    },

    async delete(req, res){
        const {id} = req.params;
        const user = await User.destroy({where: {id}})

        if(user){
            return res.status(200).json({message: "User excluído"})
        }else{
            return res.status(403).json({message: "User don't find"})
        }
    },

    async update(req, res){
        const {id} = req.params
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        const data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario}
        const user = await User.update({data}, {where: {id}});
        
        if (user) {
            return res.status(200).json({message: "Atualizado com sucesso"})
        } else {
            return res.status(403).json({message: "User don't find"})
        }
    }
}