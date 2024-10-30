"use server"

import { revalidatePath } from "next/cache"
import mongoose from 'mongoose';
import { modifyDatastore} from "./datastore"
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
        actualShape._id = each._id
        actualShape.Professor = each.name
        actualShape.email = each.email
        actualShape.department = each.department
        actualShape.courses = each.courses

        return actualShape
    })
}

export async function updateProfessor(values: any): Promise<void> {


    const copy = JSON.parse(JSON.stringify(values))

    delete copy._id
    const options = {
        id: values._id,
        relatesToOne: true,
        recordData: copy
    }

    modifyDatastore(professorModel, httpType.PUSH, options)
    revalidatePath('/manager')
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

export async function postCourse(formData) {
    const actualForm = {...formData, _id: new mongoose.Types.ObjectId()}
    const options = {
        recordData: actualForm
    }
    const newCourse = await modifyDatastore(courseModel, httpType.POST, options);
    console.log(newCourse);
}

export async function postProf(formData) {
    const actualForm = {...formData, _id: new mongoose.Types.ObjectId()}
    const options = {
        recordData: actualForm
    }
    const newProf = await modifyDatastore(professorModel, httpType.POST, options);
    console.log(newProf);
}