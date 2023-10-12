require('dotenv').config({ path: './.env' });
const { User } = require('../db');
const transporter = require('../utils/mailer');

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
        const checkAdmin = await User.findOne({ where: { ip: 'admin' } })
        if (checkIp && !checkAdmin) return res.status(402).send("Ya has registrado un numero.")

        const checkEmail = await User.findOne({ where: { email: userToSave.email } });
        if (checkEmail) return res.status(401).send("Email o usuario en uso");

        await userToSave.save();


        const mailOptions = {
            from: process.env.MAILER_MAIL,
            to: userToSave.email,
            subject: 'Ya participas en la dinámica de EXPO CASA CANADEVI 2023',
            html: `
                <p>Comprobante de la Dinámica:</p>
                <ul>
                    <li>Nombre completo: ${userToSave.name} ${userToSave.lastName}</li>
                    <li>Número de teléfono: ${userToSave.phone}</li>
                    <li>Número de pelotas: ${userToSave.number}</li>
                </ul>
                <p>¡Gracias por participar!</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

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

async function login(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ where: { email: email, password: password, admin: true, } });

        if (!user) return res.status(404).send({
            msg: "Usuario no encontrado",
            ok: false
        })

        if (user) return res.status(200).send({
            msg: 'Login exitoso',
            ok: true,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            msg: "Error al loguearse",
            ok: false
        })
    }
}

module.exports = {
    getUsers,
    addUser,
    login,
}