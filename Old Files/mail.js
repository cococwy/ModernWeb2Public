var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
     service: 'Gmail', // no need to set host or port etc.
     auth: {
         user: 'eric.305cde@gmail.com',
         pass: '305cdefg'
     }
});

var message = {
    from: 'eric.305cde@gmail.com',
    to: 'teta',
    subject: 'NodeJS email testing Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
};

transporter.sendMail(message, function(err) {
 
  if (err) {
    console.log(err);
    
  }
  
  else {
    console.log('success.');
  }
});