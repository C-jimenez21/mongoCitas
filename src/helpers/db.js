import  {con}  from '../DB/connection.js';

const genCollection = async (coleccion) => {
    try {
        let db = await con();
        let newCollection = db.collection(coleccion)
        return newCollection;
        
    } catch (error) {
        console.log(error);
    }
}

 async function getNewId(coleccion) {
        try {
            const countersCollection = await genCollection("counters");
            const counterDoc = await countersCollection.findOneAndUpdate(
                { _id: `${coleccion}Id` },
                { $inc: { sequence_value: 1 } },
                { returnOriginal: false, upsert: true }
            );
            const newId = Number(counterDoc.value.sequence_value + 1);
            return newId;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
 
export {
    genCollection,
    getNewId
}