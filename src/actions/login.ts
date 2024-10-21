"use server";
import {redirect} from "next/navigation";

export async function redirectUser(formData: FormData): Promise<void> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (username === "professor" && password == "admin") {
        redirect("/professor/overview/home");
    }
    else if (username === "student" && password == "admin") {
        redirect("/student/ta/home");
    }
    else if (username === "manager" && password == "admin") {
        redirect("/manager/admin/home");
    }
    else {
        redirect("/student/home");
    }
};