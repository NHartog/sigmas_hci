"use server"

import {revalidatePath} from "next/cache"
import mongoose from 'mongoose';
import {modifyDatastore} from "./datastore"
import {courseModel, httpType, professorModel, studentModel, TAPreferenceModel} from "./datastoreTypes"
import {ObjectId} from "bson";
import {string} from "prop-types";


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
        actualShape.ufID = each.ufid
        actualShape.studentName = each.name
        actualShape.applicationStatus = each.applicationStatus ? "Assigned" : "Pending";
        actualShape.collegeStatus = each.status

        return actualShape
    })
}

export async function getStudentsByCourse(coursePrefix: String) {
    const options = {
        query: {coursePreferences: {$elemMatch: {course: coursePrefix}}}
    }

    const apps: any = await modifyDatastore(studentModel, httpType.GET, options)
    const copied = JSON.parse(JSON.stringify(apps))


    return copied.map((each: any, idx: number) => {
        var actualShape: any = {}

        actualShape.id = idx + 1
        actualShape.studentName = each.name
        actualShape.applicationStatus = each.applicationStatus ? "Assigned" : "Pending";
        actualShape.collegeStatus = each.status

        return actualShape
    })
}

export async function getStudentPreference(student: string, course: string): Promise<number> {
    console.log(student)
    const options = {
        query: {
            applicationCompletionStatus: true,
            name: student,
        },
        relatesToOne: true,
    };

    const availableStudents: any = await modifyDatastore(studentModel, httpType.GET, options);
    const copied = JSON.parse(JSON.stringify(availableStudents));
    if (copied.length === 0) {
        return 0; // Student not found or no preferences
    }

    const studentPreferences = copied.coursePreferences;
    // Look for the specific course in the student's preferences
    const preferenceEntry = studentPreferences.find((pref: any) => pref.course === course);

    console.log(preferenceEntry)
    // Return the preference value or 0 if not found
    return preferenceEntry ? preferenceEntry.preferenceLevel : 0;
}



export async function updateStudent(values: any): Promise<void> {


    const copy = JSON.parse(JSON.stringify(values))
    copy.name = copy.studentName;
    copy.applicationStatus = copy.applicationStatus === "Assigned";
    copy.status = copy.collegeStatus;
    delete copy.id;
    delete copy.collegeStatus;
    const old_name = copy.oldName;
    delete copy.oldName;
    const options = {
        relatesToOne: true,
        recordData: copy,
        filter: {name: old_name}
    }

    const updated = await modifyDatastore(studentModel, httpType.PUSH, options);
    console.log("UPD, ", updated)
    if(copy.name !== old_name){
        //First fix assugned courses
        //Since that's not stored in TA it must be done filtering all of them
        const allCourses: any[] = await getManagerCourses();
        const focusCourses = allCourses.filter((course) => course.assignedTas.includes(old_name));
        for(let i = 0; i < focusCourses.length; i++){
            const updatedData = {...focusCourses[i], assignedTas: focusCourses[i].assignedTas.map((ta: any) => ta !== old_name ? ta : copy.name)};
            const options = {
                    id: focusCourses[i]._id,
                    relatesToOne: true,
                    recordData: updatedData
                };
                const newPref = await modifyDatastore(courseModel, httpType.PUSH, options);
        }
        //Handle TA Preferences
        //Have to grab them all and filter since professor doesnt hold info on all applicants
        const focusPrefs = await getTAPreferencesbyStudent(old_name);
        console.log("FOCUS", focusPrefs);
        for(let j = 0; j < focusPrefs.length; j++){
            const updatedData = {prefix: focusPrefs[j].Prefix, title: focusPrefs[j].Title, student: copy.name,
                preference: focusPrefs[j].Preference, professor: focusPrefs[j].Professor};
                const options = {
                    id: focusPrefs[j].id,
                    relatesToOne: true,
                    recordData: updatedData
                };
                const newPref = await modifyDatastore(TAPreferenceModel, httpType.PUSH, options);
        }
    }
    revalidatePath('/manager')
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

export async function getSpecificProf(profName: string) {
    const options = {
        query: {name: profName}
    }

    const prof: any = await modifyDatastore(professorModel, httpType.GET, options)
    const copied = JSON.parse(JSON.stringify(prof))


    const result =  copied.map((each: any, idx: number) => {
        var actualShape: any = {}

        actualShape.id = idx + 1
        actualShape._id = each._id
        actualShape.Professor = each.name
        actualShape.email = each.email
        actualShape.department = each.department
        actualShape.courses = each.courses

        return actualShape
    })
    console.log(result, "RESULTS")
    return result[0];
}

export async function updateProfessor(values: any): Promise<void> {


    const copy = JSON.parse(JSON.stringify(values))
    copy.name = copy.Professor;
    delete copy._id
    delete copy.Professor;
    const old_name = copy.oldName;
    delete copy.oldName;
    const options = {
        id: values._id,
        relatesToOne: true,
        recordData: copy
    }

    const updated = await modifyDatastore(professorModel, httpType.PUSH, options);
    if(copy.name !== old_name){
        //Name has been changed, must make fixes to courses and preferences
        for(let i = 0; i < copy.courses.length; i++){
            const courseToModify = await getSpecificCourse(copy.courses[i]);
            if (!courseToModify){
                continue;
            }
            const val_id = courseToModify._id;
            delete courseToModify._id;
            courseToModify.professors = courseToModify.professors.map((prof: any) => prof !== old_name ? prof : copy.name);
            console.log(courseToModify);
            const options = {
                id: val_id,
                relatesToOne: true,
                recordData: courseToModify
            };

            const newCourse = await modifyDatastore(courseModel, httpType.PUSH, options);
        }
        //Handle TA Preferences
        const focus = await getTAPreferencesbyProfessor(old_name);
        for(let j = 0; j < focus.length; j++){
            const updatedData = {prefix: focus[j].Prefix, title: focus[j].Title, student: focus[j].Student,
                preference: focus[j].Preference, professor: copy.name};
                const options = {
                    id: focus[j].id,
                    relatesToOne: true,
                    recordData: updatedData
                };
                const newPref = await modifyDatastore(TAPreferenceModel, httpType.PUSH, options);
        }
    }
    revalidatePath('/manager')
}

export async function assignProfessorCourse(prof: String, course: String): Promise<any[]>{
    const optionsA = {
        query: {
            name: prof
        }
    };
    const professor: any = await modifyDatastore(professorModel, httpType.GET, optionsA);
    console.log(professor);
    console.log(professor[0]);
    const newProfessor = professor[0];
    console.log(newProfessor);
    newProfessor.courses.push(course);
    const prof_id = newProfessor._id;
    delete newProfessor._id;
    const optionsB = {
        id: prof_id,
        relatesToOne: true,
        recordData: newProfessor
    };
    
    const resultA: any = await modifyDatastore(professorModel, httpType.PUSH, optionsB);
    console.log(resultA);
    const optionsC = {
        query: {
            prefix: course
        }
    };
    const old_course: any = await modifyDatastore(courseModel, httpType.GET, optionsC);
    const newCourse = old_course[0];
    newCourse.professors.push(prof);
    const course_id = newCourse._id;
    delete newCourse._id;
    console.log(newCourse);
    const optionsD = {
        id: course_id,
        relatesToOne: true,
        recordData: newCourse
    };
    const resultB: any = await modifyDatastore(courseModel, httpType.PUSH, optionsD);

    return resultB;
}

export async function unassignProfessorCourse(prof: string | null, course: string | null){
    if(!prof || !course){
        return {
            success: false,
            message: 'Either professor or course is missing',
        };
    }
    const optionsA = {
        query: {
            name: prof
        }
    };
    const professor: any = await modifyDatastore(professorModel, httpType.GET, optionsA);
    console.log(professor);
    console.log(professor[0]);
    const newProfessor = professor[0];
    console.log(newProfessor);
    newProfessor.courses = newProfessor.courses.filter((c: any) => c !== course);
    const prof_id = newProfessor._id;
    delete newProfessor._id;
    const optionsB = {
        id: prof_id,
        relatesToOne: true,
        recordData: newProfessor
    };
    
    const resultA: any = await modifyDatastore(professorModel, httpType.PUSH, optionsB);
    console.log(resultA);
    if (!resultA) {
        return {
            success: false,
            message: 'An issue arose with this action (professor side).',
        };
    }
    //Now update course
    const optionsC = {
        query: {
            prefix: course
        }
    };
    const old_course: any = await modifyDatastore(courseModel, httpType.GET, optionsC);
    const newCourse = old_course[0];
    newCourse.professors = newCourse.professors.filter((p: any) => p !== prof);
    const course_id = newCourse._id;
    delete newCourse._id;
    console.log(newCourse);
    const optionsD = {
        id: course_id,
        relatesToOne: true,
        recordData: newCourse
    };
    const resultB: any = await modifyDatastore(courseModel, httpType.PUSH, optionsD);

     // Check if a record was actually deleted
     if (resultB) {
        return {
            success: true,
            message: 'Professor and Course unassigned successfully!',
        };
    } else {
        return {
            success: false,
            message: 'An issue arose with this action (course side).',
        };
    }
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

export async function getSpecificCourse(coursePrefix: string) {
    const options = {
        query: {prefix: coursePrefix}
    }
    console.log(coursePrefix);
    const course: any = await modifyDatastore(courseModel, httpType.GET, options)
    console.log(course, "COURSE")
    const copied = JSON.parse(JSON.stringify(course))


    const result =  copied.map((each: any, idx: number) => {
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
    console.log(result, "RESULTS")
    return result[0];
}



export async function updateCourse(values: any): Promise<void> {
    const copy = {...values};
    const old_pre = copy.oldPrefix;
    delete copy._id;
    delete copy.oldPrefix;
    const options = {
        id: values._id,
        relatesToOne: true,
        recordData: copy
    };
    console.log(copy);
    console.log(values._id);

    const updated = await modifyDatastore(courseModel, httpType.PUSH, options);
    if(copy.prefix !== old_pre){
        //Prefix changed, have to fix all changes
        for(let i = 0; i < copy.professors.length; i++){
            const profToModify = await getSpecificProf(copy.professors[i]);
            if (!profToModify){
                continue;
            }
            const val_id = profToModify._id;
            delete profToModify._id;
            profToModify.name = profToModify.Professor;
            delete profToModify.Professor;
            profToModify.courses = profToModify.courses.map((pre: any) => pre !== old_pre ? pre : copy.prefix);
            console.log(profToModify);
            const options = {
                id: val_id,
                relatesToOne: true,
                recordData: profToModify
            };

            const newProf = await modifyDatastore(professorModel, httpType.PUSH, options);
        }
        //Next handle TA Preferences
        const focus = await getTAPreferencesbyCourse(old_pre);
        for(let j = 0; j < focus.length; j++){
            const updatedData = {prefix: copy.prefix, title: focus[j].Title, student: focus[j].Student,
                preference: focus[j].Preference, professor: focus[j].Professor};
                const options = {
                    id: focus[j].id,
                    relatesToOne: true,
                    recordData: updatedData
                };
                const newPref = await modifyDatastore(TAPreferenceModel, httpType.PUSH, options);
        }
        //Then handle TAs themselves
        //Wrote specific function for this
        cleanUpPreferencesOnCourse(old_pre, copy.prefix);
        
    }
    console.log("UPDATED IS ", updated);
    revalidatePath('/manager')
}

export async function cleanUpPreferencesOnCourse(oldCourse: string, newCourse: string): Promise<any> {
    console.log(oldCourse)
    const options = {
        query: {
            applicationCompletionStatus: true,
        }
    };

    const allStudents: any = JSON.parse(JSON.stringify(await modifyDatastore(studentModel, httpType.GET, options)));
    const selectedStudents: any = allStudents.filter((student: any) => student.coursePreferences.some((c: any) => c.course === oldCourse));
    for(let i = 0; i < selectedStudents.length; i++){
        //selectedStudents[i].coursePreferences = selectedStudents[i].coursePreferences.map((c: any) => c !== oldCourse ? c : newCourse);
        const id_to_use = selectedStudents[i]._id.toString();
        const updatedData = {...selectedStudents[i], coursePreferences: selectedStudents[i].coursePreferences.map((c: any) => c.course !== oldCourse ? c : {...c, course: newCourse})}
        console.log(i, updatedData, id_to_use, oldCourse, newCourse)
        const options = {
            id: id_to_use,
            relatesToOne: true,
            recordData: updatedData
        };
        const updateStudent = await modifyDatastore(studentModel, httpType.PUSH, options);
    }
}

export async function getTAPreferences(): Promise<any[]> {
    console.log("Fetching all TA Preferences");

    const options = {
        query: {}, // No filters applied, fetching all TA preferences
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
            Professor: each.professor
        };
    });
}

export async function getTAPreferencesbyStudent(name: string): Promise<any[]> {
    console.log(`Fetching all TA Preferences for ${name}`);

    const options = {
        query: {student: name},
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

export async function getTAPreferencesbyProfessor(name: string): Promise<any[]> {
    console.log(`Fetching all TA Preferences for ${name}`);

    const options = {
        query: {professor: name},
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

export async function getTAPreferencesbyCourse(course: string): Promise<any[]> {
    console.log(`Fetching all TA Preferences for ${course}`);

    const options = {
        query: {prefix: course},
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

export async function getTAPreferencesbyStudentCourseCombo(studentName: string, course: string): Promise<any[]> {

    const options = {
        query: {prefix: course, student: studentName},
    };

    const preference: any = await modifyDatastore(TAPreferenceModel, httpType.GET, options);

    // Clone and transform the data to the required shape
    const copied = JSON.parse(JSON.stringify(preference));
    return copied;
}

export async function postCourse(formData: any) {
    const actualForm = {...formData, _id: new mongoose.Types.ObjectId()}
    const options = {
        recordData: actualForm
    }
    const newCourse = await modifyDatastore(courseModel, httpType.POST, options);
    console.log(newCourse);
}

export async function deleteCourse(formData: any) {
    // Check if required fields are provided in formData
    console.log("Data:")
    console.log(formData)
    //Next "unassign" professors
    for(let i = 0; i < formData.professors.length; i++){
        const profToModify = await getSpecificProf(formData.professors[i]);
        if (!profToModify){
            continue;
        }
        const val_id = profToModify._id;
        delete profToModify._id;
        profToModify.name = profToModify.Professor;
        delete profToModify.Professor;
        profToModify.courses = profToModify.courses.filter((pre: any) => pre !== formData.prefix);
        console.log(profToModify);
        const options = {
            id: val_id,
            relatesToOne: true,
            recordData: profToModify
        };

        const newProf = await modifyDatastore(professorModel, httpType.PUSH, options);
    }
    // Perform the deletion based on provided formData
    const resultA = await modifyDatastore(courseModel, httpType.DELETE, {
        filter: {
            prefix: formData.prefix
        },
        relatesToOne: true,  // Set to true to ensure only one record is deleted, if desired
    });
    
    //Next remove all related TA Preferences
    const resultB = await modifyDatastore(TAPreferenceModel, httpType.DELETE, {
        filter: {
            prefix: formData.prefix
        },
        relatesToOne: false,  // Set to true to ensure only one record is deleted, if desired
    });
    
    console.log(resultA, resultB)

    // Check if a record was actually deleted
    if (resultA && (resultA as any).deletedCount > 0 && resultB) {
        return {
            success: true,
            message: 'Course deleted successfully!',
        };
    } else {
        return {
            success: false,
            message: 'No matching course found to delete.',
        };
    }
}

export async function postProf(formData: any) {
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
            prefix: formData.prefix
        },
        relatesToOne: true,  // Set to true to ensure only one record is deleted, if desired
    });

    console.log(result)

    // Check if a record was actually deleted
    if (result && (result as any).deletedCount > 0) {
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

export async function updateWithTAPreference(studentName: string, coursePrefix: string): Promise<any> {
    // Find the student by name to update the application status
    const studentOptions = {
        query: { name: studentName }
    };
    const studentData: any = await modifyDatastore(studentModel, httpType.GET, studentOptions);
    if (!studentData.length) {
        return { success: false, message: "Student not found." };
    }

    // Update student's application status to true
    const studentUpdateOptions = {
        id: studentData[0]._id,
        relatesToOne: true,
        recordData: { applicationStatus: true }
    };
    await modifyDatastore(studentModel, httpType.PUSH, studentUpdateOptions);

    // Find the course to update assigned TAs
    const courseOptions = {
        query: { prefix: coursePrefix }
    };
    const courseData: any = await modifyDatastore(courseModel, httpType.GET, courseOptions);
    if (!courseData.length) {
        return { success: false, message: "Course not found." };
    }

    // Check if the student is already assigned as a TA for this course
    if (courseData[0].assignedTas.includes(studentName)) {
        return { success: false, message: "Student is already assigned as a TA for this course." };
    }

    // Update course with new assigned TA
    const courseUpdateOptions = {
        id: courseData[0]._id,
        relatesToOne: true,
        recordData: {
            assignedTas: [...courseData[0].assignedTas, studentName]
        }
    };
    await modifyDatastore(courseModel, httpType.PUSH, courseUpdateOptions);

    return { success: true, message: "Student application status and course assigned TAs updated successfully." };
}

export async function assignTACourse(appl: String, course: String): Promise<any[]>{
    const optionsC = {
        query: {
            prefix: course
        }
    };
    const old_course: any = await modifyDatastore(courseModel, httpType.GET, optionsC);
    const newCourse = old_course[0];
    newCourse.assignedTas.push(appl);
    const course_id = newCourse._id;
    delete newCourse._id;
    console.log(newCourse);
    const optionsD = {
        id: course_id,
        relatesToOne: true,
        recordData: newCourse
    };
    const resultB: any = await modifyDatastore(courseModel, httpType.PUSH, optionsD);

    return resultB;
}

export async function unassignTACourse(appl: String, course: String): Promise<any[]>{
    const optionsC = {
        query: {
            prefix: course
        }
    };
    const old_course: any = await modifyDatastore(courseModel, httpType.GET, optionsC);
    const newCourse = old_course[0];
    newCourse.assignedTas = newCourse.assignedTas.filter((a: any) => a !== appl);
    const course_id = newCourse._id;
    delete newCourse._id;
    console.log(newCourse);
    const optionsD = {
        id: course_id,
        relatesToOne: true,
        recordData: newCourse
    };
    const resultB: any = await modifyDatastore(courseModel, httpType.PUSH, optionsD);

    return resultB;
}

export async function addStudent(studentData: any){

    const existingStudent = await studentModel.findOne({
        $or: [
            { username: studentData.username },
            { name: studentData.name }
        ]
    });

    console.log("hello")
    console.log(existingStudent);
    // If a student with the same username or name exists, return an error
    if (existingStudent) {
        console.log("in here")
        return { success: false, message: "A student with this username or name already exists." };
    }

    const actualForm = {
        _id: new mongoose.Types.ObjectId(),
        ...studentData,
        username: studentData.username || '',
        password: studentData.password || '',
        application: studentData.application || '',
        applicationCompletionStatus: studentData.applicationCompletionStatus || false,
        applicationStatus: studentData.applicationStatus || false,
        applicationChangeWasASubmit: studentData.applicationChangeWasASubmit || false,
        applicationLastEditDate: studentData.applicationLastEditDate || '',
        countryOfOriginIsUSA: studentData.countryOfOriginIsUSA || false,
        coursePreferences: studentData.coursePreferences || [], // Default to empty array
        email: studentData.email || '',
        gpa: studentData.gpa || null,
        researchAreas: studentData.researchAreas || '',
        semesterAdmitted: studentData.semesterAdmitted || '',
        toeflScore: studentData.toeflScore || '',
        travelPlans: studentData.travelPlans || '',
        ufid: studentData.ufid || null,
        status: studentData.status || '',
    };

    // Define the options for the datastore modification
    const options = {
        recordData: actualForm,
    };

    // Call modifyDatastore to save the student data
    const newStudent = await modifyDatastore(studentModel, httpType.POST, options);
    return { success: true, message: "Student successfully added" };
}

export async function deleteStudent(studentId: any) {
    try {
        const options = {
            filter: {
                ufid: studentId.ufID
            },
            relatesToOne: true,
        };

        console.log(options)
        const result = await modifyDatastore(studentModel, httpType.DELETE, options);

        const tapReferenceOptions = {
            filter: { student: studentId.studentName },
        };

        const taPrefResult = await modifyDatastore(TAPreferenceModel, httpType.DELETE, tapReferenceOptions);
        console.log('TAPreference deletion result:', taPrefResult);

        const courseOptions = {
            query: {}
        };
        const courseData: any = await modifyDatastore(courseModel, httpType.GET, courseOptions);

        const coursesToUpdate = courseData.filter((course: { assignedTas: string | any[]; }) =>
            course.assignedTas.includes(studentId.studentName)
        );

        console.log(coursesToUpdate)

        for (const course of coursesToUpdate) {
            // Remove the student's name from assignedTas
            const updatedAssignedTas = course.assignedTas.filter((ta: string) => ta !== studentId.studentName);
            console.log(updatedAssignedTas);
            const updateOptions = {
                id: course._id,
                relatesToOne: true,
                recordData: {
                    assignedTas: updatedAssignedTas,
                },
            };

            // Update the course using modifyDatastore with httpType.PUSH
            const updateResult = await modifyDatastore(courseModel, httpType.PUSH, updateOptions);
            console.log(`Updated course ${course.prefix}:`, updateResult);
        }

        if (result && (result as any).deletedCount > 0) {
            return {
                success: true,
                message: 'Student removed successfully.',
            };
        } else {
            return {
                success: false,
                message: 'No matching student found to delete.',
            };
        }
    } catch (error) {
        console.error('Error removing student:', error);
        throw error;
    }
}
