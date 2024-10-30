"use server"

import { modifyDatastore } from "./datastore"
import { courseModel, httpType, professorModel, studentModel } from "./datastoreTypes"


export async function getStudents(): Promise<any[]> {

    const options = {
        query: {
            applicationCompletionStatus: true
        }
    }

    const availableStudents: any = await modifyDatastore(studentModel, httpType.GET, options)

    const copied = JSON.parse(JSON.stringify(availableStudents))


    return copied.map((each: any, idx: number) => {
        var actualShape: any = {}

        actualShape.id = idx + 1
        actualShape.studentName = each.name
        actualShape.applicationStatus = "Pending" // TODO: Actually handle this field
        actualShape.collegeStatus = each.status

        return actualShape
    })
}

export async function getProfessors(): Promise<any[]> {

    const options = {
        query: {}
    }

    const professors: any = await modifyDatastore(professorModel, httpType.GET, options)

    const copied = JSON.parse(JSON.stringify(professors))


    return copied.map((each: any, idx: number) => {
        var actualShape: any = {}

        actualShape.id = idx + 1
        actualShape.Professor = each.name
        actualShape.email = each.email
        actualShape.courses = each.courses

        return actualShape
    })
}

export async function getManagerCourses(): Promise<any[]> {

    const options = {
        query: {}
    }

    const courses: any = await modifyDatastore(courseModel, httpType.GET, options)

    const copied = JSON.parse(JSON.stringify(courses))


    return copied.map((each: any, idx: number) => {
        var actualShape: any = {}

        actualShape.id = idx + 1
        actualShape.Prefix = each.prefix
        actualShape.Title = each.title
        actualShape.Professors = each.professors
        actualShape.Assigned_TAs = each.assignedTas
        actualShape.Current_Enrollment = each.currentEnrollment
        actualShape.Max_Enrollment = each.maxEnrollment
        actualShape.TA_Hours = each.numTaHours
        actualShape.Sections = each.sections

        return actualShape
    })
}


