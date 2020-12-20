import client from 'server/8base.config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//registrando un nuevo usuario
//method POST
export const newUser = async (req,res) => {
	try{
		const { username, password } = req.body
    // validando
    if (!username || !password )
      return res
        .status(400)
        .json({ error: "Datos invalidos." })

  	if (password.length < 5)
      return res
        .status(400)
        .json({ error: "La contrasena necesita por lo menos 5 caracteres." })

    
    //encriptando la contrasena
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password,salt)

    //creando y guardando al usuario
    const MAKE_USER = `
		  mutation($username:String!,$password:String!) {
		    usuarioCreate(data: {
		        username: $username
		        password: $password
		      }
		    ) {
		      id
		      username
		    }
		  }
		`
	  const userCreated = await client.request(MAKE_USER,{username,password:passwordHash})
	  if(!userCreated)
	  	return res.status(400).json({success:false})

    //respuesta
    return res.status(200).json({
			succes:true,
			message:`Usuario creado correctamente.`,
			data:userCreated
		})
  }catch(err){
  	return res.status(500).json({error:err.message})
  }
}


//iniciando sesion
//method POST
export const getUser = async (req,res) => {
  try {
    const { username, password } = req.body

    //validando
    if (!username || !password)
      return res.status(400).json({ error: "No todos los campos han sido rellenados." })

    //obteniendo la informacion del usuario para comprobacion
    const GET_USER = `
	    query($username:String!) {
			  usuario(username: $username) {
			  	id
			    username
			    password
			  }
			}
		`
		
	  const {usuario} = await client.request(GET_USER,{username})
    if(!usuario) return res.status(400).json({ error: "Usuario no encontrado." })

    //comparando contrasenas
    const isMatch = await bcrypt.compare(password, usuario.password)
    if (!isMatch) return res.status(400).json({ error: "Credenciales invalidas." })

    //generando token de autentificacion
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET)

    //respuesta
    return res.status(200).json({
			succes:true,
			message:`Sesion iniciada correctamente.`,
			data:{
				username:usuario.username,
				id:usuario.id,
				token
			}
		})
  }catch(err){
    return res.status(500).json({error:err.message})
  }
}



//validando el token de usuario cuando se conecta a la aplicacion
//method GET
export const validToken = async (req, res) => {
  try {
    const token = req.headers["auth-token"]
    //validando que el token no es nulo
    if (!token) 
      return res.json({error:"El token no fue encontrado."})

    //verificando si el token es valido 
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) 
      return res.json({error:"Token incorrecto."})

    //obteniendo la informacion del usuario
    const GET_USER = `
	    query($id:ID!) {
			  usuario(id: $id) {
			  	id
			    username
			  }
			}
		`
		
	  const {usuario} = await client.request(GET_USER,{id:verified.id})
    if(!usuario) return res.status(400).json({ error: "Usuario no encontrado." })

    //respuesta
    return res.status(200).json({
			succes:true,
			message:`Este usuario esta loggeado correctamente`,
			data:{
				username:usuario.username,
				id:usuario.id,
				token
			}
		})
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
