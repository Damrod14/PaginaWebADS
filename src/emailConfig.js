import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'erodriguezm1406@gmail.com', 
    pass: 'qzjo awde tabv udkv'   
  }
});

export default transporter;