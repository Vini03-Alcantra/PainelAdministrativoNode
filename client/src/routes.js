import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"

//IMPORT ADMIN
import Dashboard from "./pages/admin/dashboard";

import Produtos from "./pages/admin/produtos";
import ProdutoEditar from "./pages/admin/produtos/produtoEditar";
import ProdutoCadastrar from "./pages/admin/produtos/produtoCadastrar"

import Usuarios from "./pages/admin/usuarios"
import UsuarioEditar from "./pages/admin/usuarios/usuariosEditar"
import UsuarioCadastrar from "./pages/admin/usuarios/usuariosCadastrar"

// IMPORT CLIENT
import Home from "./pages/client/home"
import ProdutoDetails from "./pages/client/produtos/produtosDetails"


export default function Routes(){
    return (  
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/produtos/:idProduto" exact component={ProdutoDetails} />

                <Route path="/admin" exact component={Dashboard} />

                <Route path="/admin/produtos" exact component={Produtos} />
                <Route path="/admin/produtos/cadastrar" exact component={ProdutoCadastrar} />
                <Route path="/admin/produtos/editar/:idProduto" exact component={ProdutoEditar} />

                <Route path="/admin/usuarios" exact component={Usuarios} />
                <Route path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <Route path="/admin/usuarios/editar/:idProduto" exact component={UsuarioEditar} />
            </Switch>
        </BrowserRouter>
    )
}