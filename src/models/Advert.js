import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/edu',{useUnifiedTopology: true ,useNewUrlParser: true})
const advertSchema = mongoose.Schema({
    title: {type: String ,required: true},
    image: {type: String ,required: true},
    link:  {type: String , require: true},
    start_time: { type: Date, require:true},
    end_time: {type: Date, require: true},
    create_time: { type: Date, default: Date.now},
    last_modified: { type: Date, default: Date.now}

})
export default mongoose.model('Advert',advertSchema)