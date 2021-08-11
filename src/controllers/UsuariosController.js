const User = require("../models/users")
const bcrypt = require("bcrypt")

module.exports = {
    async index(req, res){
        const users = await User.findAll({raw: true, order: [
            ['id', 'DESC']
        ]})

        res.json(users)
    },

    async fundUser(req, res){
        const {id} = req.params;
        const user = await User.findOne({where: {id}})
        res.json(user)
    },

    async create(req, res){
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        let data = {}

        let user = await User.findOne({where: {email_usuario}})
        
        if(!user){  
            var passwordHash = bcrypt.hashSync(senha_usuario, 10) 
            console.log(passwordHash)
            data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario: passwordHash}
            user = await User.create(data)
            
            return res.status(200).json(user)
        }else{
            return res.status(500).json({message: "user already exists"})
        }
    }
}