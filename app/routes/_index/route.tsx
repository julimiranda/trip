import { Outlet, useLoaderData } from "@remix-run/react";
import Header from "./header";
import SingUp from "../signup/signup";

export default function Index(){
    //const users = useLoaderData<typeof loader>();
    return (
        <>
        <Header/>
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <Outlet/>
        </div>
        </>
    )
}

