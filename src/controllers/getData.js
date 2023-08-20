import {Usuario} from "../entities/Usuario.js";

const getAllUsers = async(req, res) => {
    try {
        const inst = new Usuario() 
        const result = await inst.getAllUsers();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

export {
    getAllUsers
}