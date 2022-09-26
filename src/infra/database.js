import 'dotenv/config' 
import mongoose from 'mongoose';

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
  .connect(process.env.MONGODB_URI, options)
  .then(() => console.log('DB is Up!'))
  .catch((err) => console.log(err));
