import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

//este componente de alert es importante ya que la configuracion del
//ervidor de 8base es gratuita por lo tanto tiende a exeder en los requests
export default function Alerts({success,setSuccess,error,setError,message,login=false,recargue=false}) {
  const recargar = recargue?'y recargue la pagina':''
  
  //evento que cierra las alertas
  const handleCloseAlert = () => {
    setSuccess(false)
    setError(false)
  }
  
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={success}
        onClose={handleCloseAlert}
        autoHideDuration={5000}
      >
        <Alert severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={error}
        onClose={handleCloseAlert}
        autoHideDuration={recargue?20000:5000}
      >
        <Alert severity="error">
          {login?
            'Limite de requests alcanzado o datos erroneos.':
            `Limite de requests alcanzado, espere un momento ${recargar} :(`}
        </Alert>
      </Snackbar>
    </>
  )
}