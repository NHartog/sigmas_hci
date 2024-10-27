import mongoose from 'mongoose';

const conn = mongoose.connect('mongodb://127.0.0.1/sigmas_hci');

console.log(conn)

export const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    gpa: Number
})

export const professorSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    age: Number
})

export const managerSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    som: Number
})

export const studentModel = mongoose.model('Student', studentSchema)
export const professorModel = mongoose.model('Professor', professorSchema)
export const managerModel = mongoose.model('Manager', managerSchema)

export type genericModel = typeof studentModel | typeof professorModel | typeof managerModel

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
            if (options.recordData && options.filter) {
                if (options.relatesToOne) {
                    return await model.updateOne(options.filter, options.recordData)
                }
                return await model.updateMany(options.filter, options.recordData)
            }
            break;
        }
        case httpType.DELETE: {
            if(options.id){
                return await model.findByIdAndDelete(options.id)
            }
            if(options.filter){
                if(options.relatesToOne){
                    return await model.deleteOne(options.filter)
                }
                return await model.deleteMany(options.filter)
            }
            break;
        }
    }
    return false
}
