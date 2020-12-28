import client from 'server/8base.config'
import auth from 'server/middlewares/auth'



//creando una nueva tarea
//method POST
export const newTask = async (req,res) =>{
	//validando token (accion solo para usuarios)
	await auth(req,res)
		.then(async()=>{
			try{
				const {task,para,de} = req.body

        //creando tarea y devolviendo informacion
				const MAKE_TASK = `
				  mutation($taskInput:String!,$paraInput:String!,$deInput:String!) {
				    todoCreate(data: {
				        task: $taskInput
		            para: $paraInput
		            de: $deInput
				        checked: false
				      }
				    ) {
				      id
		          task
		          checked
		          para
		          de
		          createdAt
				    }
				  }
				`
			  const taskCreated = await client.request(MAKE_TASK,{taskInput:task,paraInput:para,deInput:de})
			  if(!taskCreated)
			  	return res.status(400).json({success:false})

        //respuesta
			  return res.status(200).json({
					succes:true,
					message:`Tarea guardada correctamente.`,
					data:taskCreated
				})
			}catch(err){
        return res.status(500).json({error:err.message})
			}
	})
	.catch(err=>res.status(500).json({error:err.message}))
}



//obteniendo todas las tareas de un usuario
//method GET
export const getTasks = async (req,res) =>{
	//validando token (accion solo para usuarios)
	await auth(req,res)
		.then(async()=>{
      try{
      	//obteniendo informacion del usuario
      	const GET_USER = `
		      query($inputId:ID!) {
		        usuario(id: $inputId) {
		          username
		        }
		      }
		    `
		    const {usuario} = await client.request(GET_USER,{inputId:req.user})
		    if(!usuario) return res.status(400).json({ error: "Usuario no encontrado." })

		    //obteniendo las tareas del usuario 
				const GET_TASKS = `
			    query($para:String!) {
			      todosList(filter:{para:{contains:$para}}) {
			        items {
			          id
			          task
			          checked
			          de
			          createdAt
			        }
			      }
			    }
				`
			  const tasks = await client.request(GET_TASKS,{para:usuario.username})
			  if(!tasks)
			  	return res.status(400).json({success:false})

        //respuesta
			  return res.status(200).json({
					succes:true,
					message:`Tareas enviadas correctamente.`,
					data:tasks.todosList.items
				})
			}catch(err){
        return res.status(500).json({error:err.message})
			}
	})
	.catch(err=>res.status(500).json({error:err.message}))
}



// //actualizando tarea a checkeada
// //method POST
export const checkTask = async (req,res) =>{
	//validando token (accion solo para usuarios)
	await auth(req,res)
		.then(async()=>{
			try{
				const {checkId,check} = req.body
        
        //actualizando tarea y devolviendo la informacion modificada
				const UPLOAD_TASK = `
				  mutation($idInput:ID!,$checkInput:Boolean!) {
					  todoUpdateByFilter(
					  data: {
					     checked: {
						     set: $checkInput
						   }
					  },
					  filter: {
					    id: {
					      contains: $idInput
					    }
					  }) {
					    items {
					      id
			          task
			          checked
			          de
			          createdAt
					    }
					  }
					}
				`
			  const taskUploaded = await client.request(UPLOAD_TASK,{idInput:checkId,checkInput:check})
			  if(!taskUploaded)
			  	return res.status(400).json({success:false})

        //respuesta
			  return res.status(200).json({
					succes:true,
					message:`Tarea checkeada correctamente.`,
					data:taskUploaded
				})
			}catch(err){
        return res.status(500).json({error:err.message})
			}
	})
	.catch(err=>res.status(500).json({error:err.message}))
}



//eliminando tarea 
//method POST
export const deleteTask = async (req,res) =>{
	//validando token (accion solo para usuarios)
	await auth(req,res)
		.then(async()=>{
			try{
				const {deleteId} = req.body
				
				//borrando tarea y devolviendo confirmacion
				const DELETE_TASK = `
				  mutation($idInput:ID!) {
					  todoDestroy(
					  filter: {
					    id: $idInput
					  }) {
					    success
					  }
					}
				`
			  const taskDeleted = await client.request(DELETE_TASK,{idInput:deleteId})
			  if(!taskDeleted)
			  	return res.status(400).json({success:false})

        //respuesta
			  return res.status(200).json({
					succes:true,
					message:`Tarea eliminada correctamente.`,
					data:{deleted:taskDeleted}
				})
			}catch(err){
        return res.status(500).json({error:err.message})
			}
	})
	.catch(err=>res.status(500).json({error:err.message}))
}