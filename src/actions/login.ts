"use server";
import { cookies } from 'next/headers'
import {redirect} from "next/navigation";
import { httpType, managerModel, modifyDatastore, professorModel, studentModel } from "./datastore";

export async function redirectUser(formData: FormData): Promise<boolean> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies()

    const options = {
        relatesToOne: true,
        query: {
            username: username,
            password: password
        }
    }

    const potentiallyStudent = await modifyDatastore(studentModel, httpType.GET, options)
    const potentiallyProfessor = await modifyDatastore(professorModel, httpType.GET, options)
    const potentiallyManager = await modifyDatastore(managerModel, httpType.GET, options)

    if(potentiallyStudent){
        cookieStore.set('user', JSON.stringify(potentiallyStudent))
        cookieStore.set('userType', 'student')
        redirect("/student/ta/home");
    }else if(potentiallyProfessor){
        cookieStore.set('user', JSON.stringify(potentiallyProfessor))
        cookieStore.set('userType', 'professor')
        redirect("/professor/overview/home");
    }else if(potentiallyManager){
        cookieStore.set('user', JSON.stringify(potentiallyManager))
        cookieStore.set('userType', 'manager')
        redirect("/manager/admin/home");
    }

    await new Promise( resolve => setTimeout(resolve, 1000) );

    return true
};
