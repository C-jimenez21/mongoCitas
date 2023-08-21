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

async function FoundById(collection, id) {
    try {
        const coletion = await genCollection(collection);
        let result = await coletion.findOne({"_id":Number(id)});
        if(!result){ console.log({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
        return result;
    } catch (error) {
        console.log(error);
    }
  
}


    const meses ={
        enero: 0,
        febrero: 1,
        marzo: 2,
        abril: 3,
        mayo: 4,
        junio: 5,
        julio: 6,
        agosto: 7,
        septiembre: 8,
        octubre: 9,
        noviembre: 10,
        diciembre: 11
      };
 
export {
    genCollection,
    getNewId,
    meses,
    FoundById
}


