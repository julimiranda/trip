import { ActionFunctionArgs, json } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { prisma } from "~/root"

export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData()
     const name = String(formData.get("name"))
     const email = String(formData.get("email"))
  
     const user = await prisma.user.create({
         data: {
          email: email as string,
        name: name as string,
       },
  })
  
     let errors: {email?: string; name?: string} = {}
  
     if (!email) {
         errors.email = "Email is required"
     } else if (!email.includes("@")) {
         errors.email = "Please enter a valid email address"
     }
     //se email for nulo, sinaliza o erro de que é necessário o email, se não houver um @,
     //sinaliza que o email é inválido
  
     if (!name) {
         errors.name = "Name is required"
     }
     //se name for nulo, sinaliza que é necessário inserir um nome
     
     return {
         errors: Object.keys(errors).length ? errors : null  
         //se houver um erro no email ou no name, length > 1, então ele mostra o erro,
         //caso contrário, errors = null
     }
  }

  export async function loader(){
   const usersList = await prisma.user.findMany()
    console.log(usersList)
    
return json(usersList)
     }

export default function SingUp(){
    let actionData = useActionData<typeof action>()
    let emailError = actionData?.errors?.email
    let nameError = actionData?.errors?.name 
    return(
        <>
            <h1 className="text-center font-black text-2xl">Sign Up</h1>
            <div className="flex flex-col mt-8 items-center bg-white justify-center w-96 h-80 rounded-sm">
            <form method="POST" className="flex flex-col justify-center items-center gap-4">
                <label htmlFor="email">Email address {emailError && (
                    <span className="text-red-600">
                        {emailError}
                    </span>
                )}</label>
                    <input className="rounded-sm outline outline-1 w-full px-2 py-1" placeholder="Email" name="email"/>
                <label htmlFor="password">Name {nameError && (
                    <span className="text-red-600">
                        {nameError}
                    </span>
                )}</label>
                    <input className="rounded-sm outline outline-1 w-full px-2 py-1" placeholder="Name" name="name"/>
                    <button className="rounded-sm bg-blue-400 w-full text-white font-bold" type="submit">Sign in</button>
                </form>
                <p>Already have an acoount? <span className="font-bold">Log in</span></p>
            </div>
        </>
    )
}