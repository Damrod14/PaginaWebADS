import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'erickrodriguez932@gmail.com', 
    pass: 'qzjo awde tabv udkv'   
  }
});

export default transporter;