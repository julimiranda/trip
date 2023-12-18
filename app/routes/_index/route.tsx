import { ActionFunctionArgs, json } from "@remix-run/node";
import { prisma } from "~/root";
import { useLoaderData } from "@remix-run/react";
import { User } from "@prisma/client";

export async function action({request}:ActionFunctionArgs){
   const formData = await request.formData()
     const name = formData.get("name")
    const email = formData.get("email")
    const user = await prisma.user.create({
        data: {
          email: email as string,
          name: name as string,
      },
      })
    console.log(user)
   return null
}

export async function loader(){
    const usersList = await prisma.user.findMany()
    console.log(usersList)
    
    return json(usersList)
     }

export default function Index(){
    const users = useLoaderData<typeof loader>();
    return (
        <>
            <div className="min-h-screen flex gap-8 items-center justify-center">
                <form method="POST" className="flex flex-col justify-center items-center bg-blue-200 p-12 gap-4">
                    <input className="rounded-md outline outline-none w-32 px-2 py-1" placeholder="Name" name="name"/>
                    <input className="rounded-md outline outline-none w-32 px-2 py-1" placeholder="Email" name="email"/>
                    <button className="rounded-md bg-blue-400 w-24 text-white font-bold" type="submit">Submit</button>
                </form>
                <ul className="flex flex-col mt-4">
                {users.map((user: any) => (
                <li className="bg-blue-200 rounded-md px-2 py-1 mb-1" key={user.id}>{user.name}</li>
             ))}
            </ul>
            </div>
        </>
    )
}

