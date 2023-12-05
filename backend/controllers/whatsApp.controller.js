const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const whatsappCtrl = {}

let client;
let sessionData;
const SESSION_FILE_PATH = '.session.json';

whatsappCtrl.createSession = async ( req, res)=> {
    console.log('No tenemos session guardada');
    client = new Client({
        puppeteer: {
		args: ['--no-sandbox'],
	    }
    });
    
    try{
        client.on('qr', qr =>{
            res.json(qr);
        });
        client.on('ready', () =>{
            console.log("Conexion exitosa");
        })
        client.initialize()
    }catch{
        res.send("error");
    }
}

whatsappCtrl.sendMessage = async (req, res )=>{
    client.sendMessage(req.body.to+"@c.us", req.body.message);
    res.json("Mensaje enviado exitosamente.")
}


/*
const withSession = () => {
    console.log('Validando sesión con WhatsApp...');
    sessionData = require(SESSION_FILE_PATH);
    client = new Client({
        session: sessionData
    });

    client.on('ready', () => {
        console.log('¡Cliente listo!');
    });

    client.on('auth_failure', () => {
        console.log('** Error de autenticación. Vuelve a generar el código QR.');
    });

    client.initialize();
}

const withOutSession = () => {
    console.log("No tenemos una sesión guardada.");
    client = new Client();
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

   client.on('authenticated', (session) => {
        // Guardamos las credenciales de sesión para usarlas posteriormente.
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.log(err);
            }
        });
    });

    client.initialize();
}

(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();

*/

module.exports = whatsappCtrl;