import mongoose, { mongo } from 'mongoose';

export const connectDB = async () => 
{
    await mongoose.connect('mongodb+srv://vmuni812:qoTgQlAL1kNi3d89@cluster0.mmnlnwp.mongodb.net/fooddl').then(() => {
        console.log("DB is Connected");
    })
}