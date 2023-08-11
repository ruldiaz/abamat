import mongoose from 'mongoose';

const connectToDatabase = async () => {
   try {
      mongoose.set('strictQuery', false);
      const connect = await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log(`Connected to Mongo Db: ${connect.connection.host}`);
   } catch (error) {
      console.error('Error connecting to Mongo Db: ', error);
   }
}

export default connectToDatabase;