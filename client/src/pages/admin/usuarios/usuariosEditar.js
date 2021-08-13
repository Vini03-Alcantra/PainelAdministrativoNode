import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from "../../../components/footer-admin";
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import api from "../../../services/api"
import {useParams} from "react-router-dom"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl:{
    width: '100%'
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function UsuarioCadastrar() {
  const classes = useStyles();
  
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('')
  
  const {idUsuario} = useParams()

  useEffect(() => {
      async function getUsuario(){
          var response = await api.get(`/api/usuarios/${idUsuario}`)
          const data = response.data;
          setNome(data.nome_usuario)
          setEmail(data.email_usuario)
          setSenha(data.senha_usuario)
          setTipo(data.tipo_usuario)
      }
      getUsuario();
  }, [])

  async function handleSubmit(){
    
    const data = {
      nome_usuario:nome,
      email_usuario: email,
      senha_usuario:senha, 
      tipo_usuario: tipo
    }

    if(nome !== '' && email !== '' && senha !== '' && tipo !== ''){
      const response = await api.put(`/api/usuarios/${idUsuario}`, data)
        console.log(response)
        if(response.status === 200){
          window.location.href = '/admin/usuarios'
        //   console.log("Deu certo")
        }else{
          alert("Erro ao cadastrar o usuário")
        }
      }else{
        alert("Por favor, preencha todos os dados")
      }
    }

    

  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUÁRIOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                <Paper className={classes.paper}>
                  <h2>Atualização de Usuário</h2>
                  <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="nome"
                        name="nome"
                        label="nome Completo"
                        fullWidth
                        autoComplete="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                      <Select
                        labelId="labelTipo"
                        id="tipo"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Funcionário</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        type="password"
                        id="senha"
                        name="senha"
                        label="senha"
                        fullWidth
                        autoComplete="senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                      Primary
                    </Button>
                    </Grid>
                    </Grid>        
                </Paper>
                </Grid>
            
            </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
