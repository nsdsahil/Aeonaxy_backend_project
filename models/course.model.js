import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    popularity: {
        type: Number,
        default: 0
    },
    enrolledUsers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});
courseSchema.plugin(mongoosePaginate);

const Course = mongoose.model('Course', courseSchema);

export default Course;