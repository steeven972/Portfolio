const express = require('express');
const app = express();
const path = require('path');

const nodemailer = require("nodemailer");
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();
const EMAIL_MDP_APP = process.env.EMAIL_MDP_APP;
const EMAIL_PERSO = process.env.EMAIL_PERSO;

const HOST = 'localhost' || process.env.HOST;
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landig.html'));
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Route d'envoi d'email
app.post("/send-email", async (req, res) => {
  const { name, email, objet, message } = req.body;
    console.log("email: " , EMAIL_PERSO);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_PERSO,
        pass: EMAIL_MDP_APP,
      },
    });

    const mailOptions = {
      from: email,
      to: EMAIL_PERSO,
      subject: `Message de ${name} - ${objet}`,
      text: message + `\n\nEnvoyé par : ${email}\n \nNom : ${name}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur d'envoi :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});