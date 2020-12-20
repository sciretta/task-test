import Head from 'next/head'
import StoreProvider from 'Store'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from 'styles/Theme'

function MyApp({ Component, pageProps }) {
  return(
  	<>
	  	<Head>
	    	<title>Tasks App</title>
	    </Head>
		  <StoreProvider>
		    <ThemeProvider theme={theme}>
			    <Component {...pageProps} />
		    </ThemeProvider>
		  </StoreProvider>
	  </>
  )
}

export default MyApp

