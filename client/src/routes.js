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
import Login from "./pages/admin/login"

import PrivateRoute from './services/wAuth'

export default function Routes(){
    return (  
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/produtos/:idProduto" exact component={ProdutoDetails} />

                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute path="/admin" exact component={Dashboard} />

                <PrivateRoute path="/admin/produtos" exact component={Produtos} />
                <PrivateRoute path="/admin/produtos/cadastrar" exact component={ProdutoCadastrar} />
                <PrivateRoute path="/admin/produtos/editar/:idProduto" exact component={ProdutoEditar} />

                <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
                <PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component={UsuarioEditar} />
            </Switch>
        </BrowserRouter>
    )
}