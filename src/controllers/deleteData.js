import {Usuario} from "../entities/Usuario.js";


const deleteOneUser = async(req, res) => {
    try {
        const { ID_PACIENTE: id } = req.body;
        const inst = new Usuario() 
        const result = await inst.deleteUser(id);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}   