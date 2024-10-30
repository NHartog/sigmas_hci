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

export async function addTAPreference(recordData: any) {

    const { prefix, title, student, preference } = recordData;

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
        // Return an error response if a duplicate is found
        return {
            success: false,
            message: `A TA preference for student ${recordData.student} in course ${recordData.prefix} already exists.`
        };
    }

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
