"use server"

import { cookies } from 'next/headers'
import { httpType, modifyDatastore, professorModel, studentModel } from './datastore'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function getApplicationData(): Promise<any> {
    const user = JSON.parse(cookies().get('user')?.value || '{}')

    if (user.application) {
        return JSON.parse(user.application)
    }

    return undefined
}

export async function saveForLater(formData: any): Promise<void> {
    const user = JSON.parse(cookies().get('user')?.value || '{}')
    const type = cookies().get('userType')?.value

    const options = {
        id: user._id,
        recordData: {
            application: JSON.stringify(formData)
        }
    }

    if (type == 'student') {
        await modifyDatastore(studentModel, httpType.PUSH, options)
        const newUser = await modifyDatastore(studentModel, httpType.GET, options)
        cookies().set('user', JSON.stringify(newUser))
        revalidatePath('/student')
        redirect("/student/ta/home");
    } else if (type == 'professor') {
        await modifyDatastore(professorModel, httpType.PUSH, options)
        const newUser = await modifyDatastore(professorModel, httpType.GET, options)
        cookies().set('user', JSON.stringify(newUser))
        revalidatePath('/professor')
        redirect("/professor/overview/home");
    }
}
