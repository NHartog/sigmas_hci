"use server";
import {redirect} from "next/navigation";
import { httpType, managerModel, modifyDatastore, professorModel, studentModel } from "./datastore";

export async function redirectUser(formData: FormData): Promise<boolean> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    console.log("started")
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
        redirect("/student/ta/home");
    }else if(potentiallyProfessor){
        redirect("/professor/overview/home");
    }else if(potentiallyManager){
        redirect("/manager/admin/home");
    }

    await new Promise( resolve => setTimeout(resolve, 1000) );

    console.log("completed")

    return true
};
