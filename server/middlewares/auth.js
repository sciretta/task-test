import jwt from 'jsonwebtoken'

//con este middleware se autentifica si el token del usuario es correcto
const auth = (req,res) => new Promise((resolve)=>{
  try{
    const token = req.headers["auth-token"]
    
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified)
      return res
        .status(400)
        .json({ error: "Autorizacion denegada." })

    req.user = verified.id
    return resolve()
  }catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default auth