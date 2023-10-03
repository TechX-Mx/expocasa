require('dotenv').config({ path: './.env' });
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const saltRounds = 5;

async function getUsers(req, res) {
    const userDB = await User.findAll({
        attributes: {
            exclude: ['password']
        }
    });
    return res.status(200).json(userDB);
}

async function addUser(req, res) {
    let ip = req.body.ip;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;    
    let phone = req.body.phone;
    let password = req.body.password;
    let number = req.body.number;

    try {        
        const userToSave = new User({
            ip: ip,
            name: name,
            lastName: lastName,
            email: email,
            phone: phone,          
            password: password,            
            number: number,            
        });

        userToSave.email = userToSave.email?.toLowerCase();

        const checkIp = await User.findOne({ where: { ip: userToSave.ip } })
        if (checkIp) return res.status(402).send("Ya has registrado un numero.")

        const checkEmail = await User.findOne({ where: { email: userToSave.email } });
        if (checkEmail) return res.status(401).send("Email o usuario en uso");        

        await userToSave.save();

        return res.send({
            msg: 'Creacion exitosa',            
            ok: true,
        });

    } catch (error) {
        console.log(error, 'error');
        res.status(400).send({
            msg: 'No se pudo guardar el usuario',
            ok: false
        });
    }
}

module.exports = {
    getUsers,
    addUser,
}