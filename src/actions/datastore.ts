"use server"

import mongoose from 'mongoose';
import { httpOptions, httpType } from './datastoreTypes';

console.log("Connecting to database")
if(process.env.USE_REMOTE_MONGO == "true"){
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@sigmas-hci.0wvhf.mongodb.net/sigmas_hci?retryWrites=true&w=majority&appName=sigmas-hci`
    console.log(uri)
    mongoose.connect(uri, { serverApi: { version: '1', strict: true, deprecationErrors: true } });
}else{
    console.log("localhost")
    mongoose.connect('mongodb://127.0.0.1/sigmas_hci');
}
console.log(`0: disconnected
1: connected
2: connecting
3: disconnecting`)
console.log(mongoose.connection.readyState);

export async function modifyDatastore<T>(model: mongoose.Model<T>, type: httpType, options: httpOptions): Promise<mongoose.Document[] | mongoose.Document | mongoose.DeleteResult | mongoose.UpdateWriteOpResult | null | boolean> {
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
