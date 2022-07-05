import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CostSchema = new Schema({
    petId: {
        type: mongoose.Types.ObjectId,
        ref: 'Pet',
        required: [true, 'pet is required'],
    },
    type: {
        type: String,
        enum: ['Service', 'Vaccine', 'Feed'],
        required: [true, 'type is required'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    },
    goal: {
        type: String,
        required: [true, 'goal is required'],
    },
    extra: {
        type: Object,
        required: [
        function () {
            // feed
            return ['Feed'].includes(this.type);
        },
        'extra is required',
        ],
    }
});

export default mongoose.model('Cost', CostSchema);