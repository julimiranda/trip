import { ActionFunctionArgs, json, redirect } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { validate } from "./validate"
import Header from "~/components/header"
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData()
     const name = String(formData.get("name"))
     const email = String(formData.get("email"))
     
     let errors = validate(email, name)
    
     if (errors){
        return {errors}
     } else if (!errors){
     const user = await prisma.user.create({
         data: {
          email: email as string,
        name: name as string,
       },
  })}
  
     return redirect("/")
  }

  export async function loader(){
   const usersList = await prisma.user.findMany()
    console.log(usersList)
    
return json(usersList)
     }

export default function SignUp(){
    let actionData = useActionData<typeof action>()
    let emailError = actionData?.errors?.email
    let nameError = actionData?.errors?.name 
    return(
        <>
        <Header/>
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
            <h1 className="text-center font-black text-2xl">Sign Up</h1>
            <div className="flex flex-col mt-8 items-center bg-white justify-center w-[600px] h-96 rounded-sm">
            <form method="POST" className="flex flex-col justify-center w-[600px] px-12 items-center gap-4">
                <label className="font-bold self-start" htmlFor="email">Email address {emailError && (
                    <span className="text-red-600">
                        {emailError}
                    </span>
                )}</label>
                    <input className="rounded-sm outline outline-1 px-2 py-1 w-full" placeholder="Email" name="email"/>
                <label className="font-bold self-start" htmlFor="password">Name {nameError && (
                    <span className="text-red-600">
                        {nameError}
                    </span>
                )}</label>
                    <input className="rounded-sm outline outline-1 px-2 py-1 w-full" placeholder="Name" name="name"/>
                    <button className="rounded-sm bg-blue-400 text-white font-bold w-full my-4 py-1" type="submit">Sign in</button>
                </form>
                <p>Already have an acoount? <span className="font-bold">Log in</span></p>
            </div>
            </div>
        </>
    )
}