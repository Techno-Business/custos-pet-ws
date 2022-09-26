import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Owner',
        required: [true, 'owner is required'],
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    photo: {
        type: String,
        required: [true, 'photo is required']
    },
    weight: {
        type: Number,
        required: [true, 'weight is required']
    },
    age: {
        type: String,
        required: [true, 'age is required']
    },
    sex: {
        type: String,
        required: [true, 'sex is required']
    },
    species: {
        type: String,
        required: [true, 'species is required']
    },
    breed: {
        type: String,
        required: [true, 'breed is required']
    }
});

export default mongoose.model('Pet', PetSchema);
