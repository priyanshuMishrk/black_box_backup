const nodemailer = require("nodemailer");

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "blackboxcreative42@gmail.com",
    pass: "bcbnvyguitidvkme",
  },
});

const notify = (email, courseID, courseName, CoursePrice, userName) => {
  const mailOptions = {
    from: "blackboxcreative42@gmail.com",
    to: "iampriyanshu1009@gmail.com",
    subject: `${userName} has uploaded a class`,
    html: `<div>
    <h4>
        ${userName} has uploaded a class, the user's email-id is ${email}. The name of course is ${courseName} and the price of course is ${CoursePrice}, click on the following link<br/>
        <strong><a href="http://localhost:3000/classV2/${courseID}">Course/Class</a></strong> <br/><br/>
        
        To Verify it    
    </h4>
    
    </div> <br/>
    ~ Thank you`,
  };
  transpoter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    else {
      console.log(info);
      //   const forgetPass = JSON.parse(fs.readFileSync("./youtube.json", "utf-8"));
      //   forgetPass["passCode"] = otp;
      //   forgetPass["passEmail"] = email;
      //   console.log(forgetPass);
      //   fs.writeFileSync("./youtube.json", JSON.stringify(forgetPass, null, 4));
    }
  });
  // return true;
};

const notifyTrainer = (email, classroomId, courseId, sessionName, dateObject) => {
  const {date , time} = dateObject
  const mailOptions = {
    from: "blackboxcreative42@gmail.com",
    to: email,
    subject: `Session Update`,
    html: `<div>
    <h4>
        Dear Trainer.
         The ${sessionName} session has been uploaded to the blackbox Please use the following link to host your session<br/>
        <strong><a href="https://blackboxnow.com/classroomv2/host/${classroomId}/${courseId}">Course/Class</a></strong> <br/><br/>
        <strong>Date</strong> : ${date} <br/>
        <strong>Time</strong> : ${time} 
    </h4>
    
    </div> <br/>
    ~ Black Box`,
  };
  transpoter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    else {
      console.log(info);
      //   const forgetPass = JSON.parse(fs.readFileSync("./youtube.json", "utf-8"));
      //   forgetPass["passCode"] = otp;
      //   forgetPass["passEmail"] = email;
      //   console.log(forgetPass);
      //   fs.writeFileSync("./youtube.json", JSON.stringify(forgetPass, null, 4));
    }
  });
  // return true;
};

// send_OTP("vikash21@navgurukul.org", 435345);
module.exports = { notify, notifyTrainer };
