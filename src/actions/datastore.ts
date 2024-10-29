import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1/sigmas_hci');

export const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    status: String,
    application: String,
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
    age: Number,
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
    numTaHours: Number,
    enrollment: String,
})

function getModel(name: string, schema: any) {
    return mongoose.model(name, schema)
}

export const studentModel = mongoose.models.Student ?? getModel('Student', studentSchema)
export const professorModel = mongoose.models.Professor ?? getModel('Professor', professorSchema)
export const managerModel = mongoose.models.Manager ?? getModel('Manager', managerSchema)
export const courseModel = mongoose.models.Course ?? getModel('Course', courseSchema)

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

export async function modifyDatastore<T>(model: mongoose.Model<T>, type: httpType, options: httpOptions): Promise<mongoose.Document[] | mongoose.Document | mongoose.DeleteResult | mongoose.UpdateWriteOpResult | null | boolean> {
    "use server"
    switch (type) {
        case httpType.GET: {
            if (options.id) {
                return await model.findById(options.id).exec()
            } else if (options.query) {
                if (options.relatesToOne) {
                    return await model.findOne(options.query).exec()
                }
                return await model.find(options.query).exec()
            }
            break;
        }
        case httpType.POST: {
            if (options.recordData) {
                return await model.create(options.recordData)
            }
            break;
        }
        case httpType.PUSH: {
            if (options.recordData) {
                if (options.id) {
                    return await model.findByIdAndUpdate({_id: options.id}, options.recordData).exec()
                }
                if (options.filter) {
                    if (options.relatesToOne) {
                        return await model.updateOne(options.filter, options.recordData).exec()
                    }
                    return await model.updateMany(options.filter, options.recordData).exec()
                }
            }
            break;
        }
        case httpType.DELETE: {
            if (options.id) {
                return await model.findByIdAndDelete(options.id).exec()
            }
            if (options.filter) {
                if (options.relatesToOne) {
                    return await model.deleteOne(options.filter).exec()
                }
                return await model.deleteMany(options.filter).exec()
            }
            break;
        }
    }
    return false
}
