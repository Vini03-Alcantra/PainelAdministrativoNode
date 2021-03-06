import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from "../../../components/footer-admin";
import { ButtonGroup, Paper, Button, Chip } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../services/api';
import { getNomeTipo, getNomeTipoLabel } from '../../../functions/static_data';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));  

export default function UsuariosListagem() {
  const classes = useStyles();
  
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      async function loadUsuarios(){
          const response = await api.get("/api/usuarios")
          setUsuarios(response.data)
          setLoading(false)
      }
      loadUsuarios()
  },[])

  async function handleDelete(id){
    if(window.confirm("Do you have sure that want this user ?")){
      var result = await api.delete(`/api/usuarios/${+id}`)
      if (result.status === 200) {
        window.location.href = "/admin/usuarios"
      } else {
        alert("Ocorreu erro. Por favor tente novamente")
      }
    }
  }

  return (
    <div className={classes.root}>
    
      <MenuAdmin title={"USU??RIOS"}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={`/admin/usuarios/cadastrar`}>Cadastrar</Button>
            <Paper className={classes.paper}>
              <h2>Listagem de Usu??rios</h2>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                <TableContainer component={Paper}>
              {loading?(<LinearProgress style={{width: '50%', margin: '0 auto'}} />):(
            
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Tipo</TableCell>
                        <TableCell align="center">Data de Cadastro</TableCell>
                        <TableCell align="right">Op????es</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {usuarios.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.nome_usuario}
                        </TableCell>
                        <TableCell align="center">{row.email_usuario}</TableCell>
                        <TableCell align="center"><Chip label={getNomeTipo(row.tipo_usuario)} color={getNomeTipoLabel(row.tipo_usuario)}/></TableCell>
                        <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                        <TableCell align="right">
                          <ButtonGroup aria-label="outlined primary button group">
                            <Button variant="contained" color="primary" href={`/admin/usuarios/editar/${row.id}`}>Atualizar</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(row.id)} >Excluir</Button>
                          </ButtonGroup>  
                        </TableCell> 
                      </TableRow>
                    ))}
                    </TableBody>
                </Table>
                )}
                </TableContainer>
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
