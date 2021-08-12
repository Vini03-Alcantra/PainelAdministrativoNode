const Produto = require("../models/Produto")
const Produtos = require("../models/Produtos")

module.exports = {
    async index(req, res){
        try {
            const produtos = await Produtos.findAll({raw: true, order: [
                ['id', 'DESC']
            ]})
    
            return res.status(200).json(produtos)
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Operação Indisponível"})
        }
    },

    async findUser(req, res){
        try {
            const {id} = req.params;
            const produto = await Produto.findOne({where: {id}})  
            
            if(produto){
                return res.status(200).json(produto)
            }else{
                return res.status(401).json({message: "produto don't exists"})
            }
        } catch (error) {
            return res.status(500).json({message: "Operação Indisponível"}) 
        }
    },

    async create(req, res){
        const {nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;
        let data = {}

        let produto = await Produto.findOne({where: {nome_produto}})
        
        try {
            if(!produto){  
                data = {nome_produto, descricao_produto, preco_produto, qtd_produto}
                produto = await Produto.create(data)
                
                return res.status(200).json(produto)
            }else{
                return res.status(401).json({message: "produto don't exists"})
            }
        } catch (error) {
            return res.status(500).json({message: "Operação inválida"})
        }
    },

    async delete(req, res){
        const {id} = req.params;
        try {
            const produto = await Produto.destroy({where: {id}})

            if(produto){
                return res.status(200).json({message: "produto excluído"})
            }else{
                return res.status(403).json({message: "produto don't find"})
            }
        } catch (error) {
            return res.status(500).json({message: "Operaçaão Inválida"}) 
        }
    },

    async update(req, res){
        const {id} = req.params
        const {nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;
        const data = {nome_produto, descricao_produto, preco_produto, qtd_produto}
        try {
            const produto = await Produto.update({nome_produto, descricao_produto, preco_produto, qtd_produto}, {where: {id}});    
            console.log(produto)
            console.log(qtd_produto)
            console.log(data)
            if (produto) {
                return res.status(200).json({message: "Atualizado com sucesso"})
            } else {
                return res.status(403).json({message: "produto don't find"})
            }
        } catch (error) {
            console.error(error)
        }
    }
}