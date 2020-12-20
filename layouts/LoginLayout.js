import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useStyles from './MaterialStyles'

//layout de la pagina de inicio de sesion y de la pagina de registro tambien
export default function LoginLayout(props) {
  const classes = useStyles()
  return (
    <>
      <CssBaseline/>
      <Container maxWidth="xl" className={classes.container}>
        <Grid 
          container
          justify="center"
          alignItems="center"
          className={classes.gridContainer}
        >
          <Grid item>
            {props.children}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}