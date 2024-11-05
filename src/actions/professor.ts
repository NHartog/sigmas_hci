"use server"

import { getUserData } from "./application"
import { modifyDatastore } from "./datastore"
import {courseModel, httpType, studentModel, TAPreferenceModel} from "./datastoreTypes"
import mongoose from "mongoose";


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

export async function getProfCourses(): Promise<any[]> {

    const user = await getUserData()

    const options = {
        query: {prefix: {$in : user.courses}}
    }

    const courses: any = await modifyDatastore(courseModel, httpType.GET, options)

    const copied = JSON.parse(JSON.stringify(courses))


    return copied.map((each: any, idx: number) => {
        each.id = idx + 1
        each.enrollment = `${each.currentEnrollment}/${each.maxEnrollment}`
        return each
    })
}

export async function getPrefs(){
    const user = await getUserData()

    const options = {
        query: {professor: user.name}
    }
    const preferences: any = await modifyDatastore(TAPreferenceModel, httpType.GET, options)

    const copied = JSON.parse(JSON.stringify(preferences));
    return copied.map((each: any) => {
        var actualShape: any = {}

        actualShape.name = each.student;
        actualShape.preference = Number(each.preference);

        return actualShape
    })
}

export async function getProfTAs(): Promise<any[]> {
    //const user = await getUserData();
    const courses = await getCourses();
    const course_ids = courses.map(c => c._id);

    const options = {
        query: {
            applicationCompletionStatus: true,
            coursePreferences:{
                $elemMatch: {_id: {$in: course_ids}}
            }
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

export async function addTAPreference(recordData: any) {

    const { prefix, title, student, preference, professor } = recordData;

    console.log(recordData.professor)

    if (!prefix || !title || !student || preference === null) {
        return {
            success: false,
            message: 'All fields are required. Please fill in all details.'
        };
    }

    const existingPreference = await TAPreferenceModel.findOne({
        prefix: recordData.prefix,
        student: recordData.student
    }).exec();
    if (existingPreference) {
        const result = await modifyDatastore(TAPreferenceModel, httpType.PUSH, {
            id: existingPreference._id,
            recordData: {
                ...recordData
            }
        });

        return {
            success: true,
            message: 'TA preference updated successfully!'
        };
    }else{

        await modifyDatastore(TAPreferenceModel, httpType.POST, {
            recordData: {
                _id: new mongoose.Types.ObjectId(),
                ...recordData
            }
        });

        return {
            success: true,
            message: 'TA preference added successfully!'
        };
    }
}
