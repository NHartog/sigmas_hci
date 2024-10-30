"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { modifyDatastore } from './datastore'
import { httpType, studentModel } from './datastoreTypes'

export async function getApplicationData(): Promise<any> {
    const user = JSON.parse(cookies().get('user')?.value || '{}')

    if (user.application) {
        return JSON.parse(user.application)
    }

    return undefined
}

export async function getUserData(): Promise<any> {
    const user = JSON.parse(cookies().get('user')?.value || '{}')

    if (user) {
        return user
    }

    return undefined
}

export async function saveForLater(formData: any): Promise<void> {
    const user = JSON.parse(cookies().get('user')?.value || '{}')

    const options = {
        id: user._id,
        recordData: {
            application: JSON.stringify(formData),
            applicationLastEditDate: new Date(),
            applicationChangeWasASubmit: false,
        }
    }

    await modifyDatastore(studentModel, httpType.PUSH, options)
    const newUser = await modifyDatastore(studentModel, httpType.GET, options)
    cookies().set('user', JSON.stringify(newUser))
    revalidatePath('/student')
    redirect("/student/ta/home");
}

export async function submitApplication(formData: any): Promise<void> {
    const user = await getUserData()

    const options = {
        id: user._id,
        recordData: {
            application: JSON.stringify(formData),
            applicationLastEditDate: new Date(),
            applicationCompletionStatus: true,
            applicationChangeWasASubmit: true,
        }
    }

    await modifyDatastore(studentModel, httpType.PUSH, options)
    const newUser = await modifyDatastore(studentModel, httpType.GET, options)
    cookies().set('user', JSON.stringify(newUser))
    revalidatePath('/student')
    redirect("/student/ta/home");
}

export async function withdrawApplication(): Promise<void> {
    const user = await getUserData()
    console.log('here')

    const options = {
        id: user._id,
        recordData: {
            application: '',
            applicationStatus: false,
            applicationCompletionStatus: false,
        }
    }

    await modifyDatastore(studentModel, httpType.PUSH, options)
    const newUser = await modifyDatastore(studentModel, httpType.GET, options)
    cookies().set('user', JSON.stringify(newUser))
    revalidatePath('/student')
    redirect("/student/ta/home");
}
