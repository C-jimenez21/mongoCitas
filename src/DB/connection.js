import dotenv from "dotenv";
import {MongoClient} from "mongodb"
dotenv.config("../src/");
export async function con(){
    try {
        const URI = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.qbqr4gp.mongodb.net/${process.env.ATLAS_DATABASE}`;
        //const URI =" mongodb+srv://C-jimenez21:admin21@cluster0.qbqr4gp.mongodb.net/DB_BODEGAS_V1"
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const client = await MongoClient.connect(URI, options);
        return client.db()
    } catch (error) {
        return{status: 500, message: error};
    }
}



