import { 
  newTask,
  getTasks,
  checkTask,
  deleteTask
} from 'server/controllers/Tasks'

import { 
  newUser,
  getUser,
  validToken
} from 'server/controllers/Users'

export default async (req, res) => {
	const { method,query:{route} } = req
  
  //.../api/[route]
  switch(route){
    case 'newtask':
      if(method==='POST')
        return newTask(req,res)
      else
        return res.status(400).json({error:'Metodo no valido'}) 
      break
    case 'gettasks':
      if(method==='GET')
        return getTasks(req,res)
      else
        return res.status(400).json({error:'Metodo no valido'}) 
      break
    case 'checktask':
      if(method==='POST')
        return checkTask(req,res)
      else
        return res.status(400).json({error:'Metodo no valido'}) 
      break
    case 'deletetask':
      if(method==='POST')
        return deleteTask(req,res)
      else
        return res.status(400).json({error:'Metodo no valido'}) 
      break
    case 'newuser':
      if(method==='POST')
        return newUser(req,res)
      else
        return res.status(400).json({error:'Metodo no valido'}) 
      break
    case 'getuser':
      if(method==='POST')
        return getUser(req,res)
      else
        return res.status(400).json({error:'Metodo no valido'}) 
      break
    case 'validtoken':
      if(method==='GET')
        return validToken(req,res)
      else
        return res.status(400).json({error:'Metodo no valido'}) 
      break
  	default:
  	  res.status(400).json({error:'Ruta no valida.'})
  }
}