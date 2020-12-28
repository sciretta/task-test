import gql from 'graphql-tag'

const UPLOAD_TASK = gql`
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

module.exports = async (event, ctx) => {
  // const {checkId,check} = event.data //8base (invoke/invoke-local) checkTask -m request

  // const {checkId,check} = event.body         //probando como recibir la informacion
  // console.log(event.body,event.body.checkId) //probando como recibir la informacion
  
  const {checkId,check} = event.body.json()

  const taskUploaded = await ctx.api.gqlRequest(UPLOAD_TASK,{idInput:checkId,checkInput:check})
  return {
    body:JSON.stringify({data:taskUploaded})
  }
}