const User = require("../models/users")
const bcrypt = require("bcrypt")

module.exports = {
    index(req, res){
        res.json({message:"Hello world"})
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