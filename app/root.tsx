import { cssBundleHref } from "@remix-run/css-bundle";
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

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

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
