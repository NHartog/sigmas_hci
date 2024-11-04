"use server"

import { revalidatePath } from "next/cache"
import mongoose from 'mongoose';
import { modifyDatastore} from "./datastore"
import {courseModel, httpType, professorModel, studentModel, TAPreferenceModel} from "./datastoreTypes"


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
    console.log("Courses:");
    const options = {
        query: {}
    }

    const courses: any = await modifyDatastore(courseModel, httpType.GET, options)

    const copied = JSON.parse(JSON.stringify(courses))


    return copied.map((each: any, idx: number) => {
        var actualShape: any = {}

        actualShape.id = idx + 1
        actualShape._id = each._id
        actualShape.prefix = each.prefix
        actualShape.title = each.title
        actualShape.professors = each.professors
        actualShape.assignedTas = each.assignedTas
        actualShape.currentEnrollment = each.currentEnrollment
        actualShape.maxEnrollment = each.maxEnrollment
        actualShape.numTaHours = each.numTaHours
        actualShape.sections = each.sections

        return actualShape
    })
}

export async function updateCourse(values: any): Promise<void> {

    console.log("running");

    const copy = {...values};

    delete copy._id;
    const options = {
        id: values._id,
        relatesToOne: true,
        recordData: copy
    };
    console.log(copy);
    console.log(values._id);

    const updated = await modifyDatastore(courseModel, httpType.PUSH, options);
    console.log("UPDATED IS ", updated);
    revalidatePath('/manager')
}

export async function getTAPreferences(): Promise<any[]> {
    console.log("Fetching all TA Preferences");

    const options = {
        query: {} // No filters applied, fetching all TA preferences
    };

    const preferences: any = await modifyDatastore(TAPreferenceModel, httpType.GET, options);

    // Clone and transform the data to the required shape
    const copied = JSON.parse(JSON.stringify(preferences));

    return copied.map((each: any) => {
        return {
            id: each._id.toString(), // Use ObjectId as string
            Prefix: each.prefix,
            Title: each.title,
            Student: each.student,
            Preference: each.preference,
        };
    });
}

export async function getTAPreferencesbyStudent(name: string): Promise<any[]> {
    console.log(`Fetching all TA Preferences for ${name}`);

    const options = {
        query: {student: {name}}
    };

    const preferences: any = await modifyDatastore(TAPreferenceModel, httpType.GET, options);

    // Clone and transform the data to the required shape
    const copied = JSON.parse(JSON.stringify(preferences));

    return copied.map((each: any) => {
        return {
            id: each._id.toString(), // Use ObjectId as string
            Prefix: each.prefix,
            Title: each.title,
            Student: each.student,
            Preference: each.preference,
        };
    });
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


export async function deleteTAPreference(formData: any) {
    // Check if required fields are provided in formData
    console.log("Data:")
    console.log(formData)

    // Perform the deletion based on provided formData
    const result = await modifyDatastore(courseModel, httpType.DELETE, {
        filter: {
            prefix: formData.Prefix
        },
        relatesToOne: true,  // Set to true to ensure only one record is deleted, if desired
    });

    console.log(result)

    // Check if a record was actually deleted
    if (result && result.deletedCount > 0) {
        return {
            success: true,
            message: 'TA preference deleted successfully!',
        };
    } else {
        return {
            success: false,
            message: 'No matching TA preference found to delete.',
        };
    }
}
