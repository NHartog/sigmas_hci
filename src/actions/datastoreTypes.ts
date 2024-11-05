import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1/sigmas_hci');

export const coursePreferenceSchema = new mongoose.Schema({
    course: String,
    preferenceLevel: Number,
    courseTaken: Boolean
})

export const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    status: String,
    application: String,
    semesterAdmitted: String,
    gpa: Number,
    ufid: Number,
    email: String,
    countryOfOriginIsUSA: Boolean,
    toeflScore: String,
    researchAreas: String,
    travelPlans: String,
    coursePreferences: [coursePreferenceSchema],
    applicationStatus: Boolean,
    applicationChangeWasASubmit: Boolean,
    applicationCompletionStatus: Boolean,
    applicationLastEditDate: Date,
    username: String,
    password: String
})

export const professorSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    email: String,
    department: String,
    courses: [String],
    username: String,
    password: String
})

export const managerSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    som: Number,
    username: String,
    password: String
})

export const courseSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    prefix: String,
    title: String,
    professors: [String],
    assignedTas: [String],
    numTaHours: Number,
    currentEnrollment: Number,
    maxEnrollment: Number,
    sections: Number,
})

export const TAPreferenceSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    prefix: String,
    title: String,
    student: String,
    preference: Number,
    professor: String,
})

function getModel(name: string, schema: any) {
    return mongoose.model(name, schema)
}

export const studentModel = mongoose.models.Student ?? getModel('Student', studentSchema)
export const professorModel = mongoose.models.Professor ?? getModel('Professor', professorSchema)
export const managerModel = mongoose.models.Manager ?? getModel('Manager', managerSchema)
export const courseModel = mongoose.models.Course ?? getModel('Course', courseSchema)
export const TAPreferenceModel = mongoose.models.Tapreference ?? getModel('Tapreference', TAPreferenceSchema)

export enum httpType {
    GET = 'GET',
    POST = 'POST',
    PUSH = 'PUSH',
    DELETE = 'DELETE'
}

export interface httpOptions {
    id?: string,
    query?: any,
    relatesToOne?: boolean
    recordData?: any
    filter?: any
}
