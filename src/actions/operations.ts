"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout(route?: string){
    cookies().delete('user')
    cookies().delete('userType')
    if(route){
        redirect(route)
    }else{
        redirect('/login')
    }
}


export async function goHome(){
    await logout('/')
}
