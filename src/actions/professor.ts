"use server"

import { getUserData } from "./application"
import { modifyDatastore } from "./datastore"
import { courseModel, httpType, studentModel } from "./datastoreTypes"


export async function getCourses(): Promise<any[]> {

    const options = {
        query: {}
    }

    const courses: any = await modifyDatastore(courseModel, httpType.GET, options)

    const copied = JSON.parse(JSON.stringify(courses))


    return copied.map((each: any, idx: number) => {
        each.id = idx + 1
        each.enrollment = `${each.currentEnrollment}/${each.maxEnrollment}`
        return each
    })
}

export async function getTAs(): Promise<any[]> {
    const user = await getUserData()

    const options = {
        query: {
            applicationCompletionStatus: true
        }
    }

    const availableTAs: any = await modifyDatastore(studentModel, httpType.GET, options)

    const copied = JSON.parse(JSON.stringify(availableTAs))


    return copied.map((each: any, idx: number) => {
        var actualShape: any = {}

        actualShape.id = idx + 1
        actualShape.name = each.name
        actualShape.status = each.status
        actualShape.assignedToYou = 'No' //TODO: Actually handle this field

        return actualShape
    })
}
