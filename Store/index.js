import { useReducer, useContext, createContext } from 'react'
const storeContext = createContext()
const dispatchContext = createContext()

const initialState = {
  user:{},
  tasks:[]
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks:[
          ...state.tasks,
          action.newTask
        ]
      }
      break
    case 'LOGIN_USER':
      return {
        ...state,
        user:action.user
      }
      break
    case 'INITIAL_TASKS':
      return {
        ...state,
        tasks:action.tasks
      }
      break
    case 'CHECK_TASK':
      return {
        ...state,
        tasks:state.tasks.map(task=>{
          if(task.id===action.checkId){
            return {
              ...task,
              checked:action.check
            }
          }else{
            return task
          }
        })
      }
      break
    case 'DELETE_TASK':
      return {
        ...state,
        tasks:state.tasks.filter(task=>task.id!==action.deleteId)
      }
      break
    case 'RESET_STATE':
      return {
			  user:{},
			  tasks:[]
			}
      break
    default:
      return state
  }
} 

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <dispatchContext.Provider value={dispatch}>
      <storeContext.Provider value={state}>
        {children}
      </storeContext.Provider>
    </dispatchContext.Provider>
  )
}

export const useStore = () => useContext(storeContext)

export const useDispatch = () => useContext(dispatchContext)

export default StoreProvider