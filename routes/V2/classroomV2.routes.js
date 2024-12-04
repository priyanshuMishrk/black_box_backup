const express = require("express");
const classroom = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { notify } = require('./notifyVerification')
// const sendMessage = require('./msgVerification'  )
// const axios = require('axios');
// const verifyUPI = require('validate-upi-id')
const bcrypt = require("bcrypt");
const { notifyTrainer } = require('./notifyVerification')
// const { authenticationToken } = require("../../auth/user.auth");
const {authenticationClrToken , authorizationClrToken, forLogoutClr} = require("../../auth/classroom.auth.js");

const planDet = [{
    mins : '5000',
    seats : '100',
    rp : '1499',
    ip : '299'

},{
    mins : '10000',
    seats : '250',
    rp : '4499',
    ip : '499'
},{
    mins : '20000',
    seats : '500',
    rp : '10499',
    ip : '799'
}

]

classroom.post('/register/classroom',authorizationClrToken , async (req, res) => {
    try {
    const uid = req.user_id
    const {
        title,
        industry,
        bio ,
        city,
        state,
        logo,
        planid ,
        iDU,
        adminPass,
        email_type
    }   = req.body

    const objData = {
        title,
        industry,
        bio ,
        city,
        state,
        logo,
        planid : 1 ,
        iDU : true,
        email_type : email_type,
        adminId : uid,
        adminPass : adminPass,
    } 

    const result = await  prisma.classroom_V2.create({data : objData})

    const newClr = await  prisma.classroomUser_V2.update({
        where: { id: result.id },
        data: { classroom_id: result.id },
      });
    result.admin = true
    console.log(newClr)
    return res.send(result)
} catch(er){
    console.log(er)
    res.send(er)
}
    
})

classroom.get('/register/classroom',authorizationClrToken , async (req, res) => {
    try {
        console.log(req)
    const uid = req.user_id
    /**
     * Retrieves the email address from the request query parameters.
     * @param {Object} req - The Express request object.
     * @param {string} req.query.mail - The email address to be retrieved.
     * @returns {string} The email address extracted from the request query parameters.
     */
    const mail = req.query.mail;
    // const mail = req.query.mail

    const result = await  prisma.classroom_V2.findMany({ where: { adminId: uid }})
    console.log(result)
    if (result[0]){
        result[0].admin = true
        return res.send(result)
    }
    else {
        const type = mail.split('@')[1]
        console.log(type)
        const result = await  prisma.classroom_V2.findMany({ where: { email_type: type }})
        return res.send(result)
    }
    // result.adminIs = true
} catch(er){
    console.log(er)
    res.send(er)
}
    
})

classroom.get('/register/classroom/mailTyype',authorizationClrToken , async (req, res) => {
    try {
    const uid = req.user_id
    const mailId = req.query.mailId
    const type = mailId.split('@')[1]

    const result = await  prisma.classroom_V2.findMany({ where: { email_type : type }})

    if (result){
        return res.send(result)
    }
    else {
        return res.send(false)
    }
    // result.adminIs = true
} catch(er){
    console.log(er)
    res.send(er)
}
    
})

classroom.post('/classroom/sessionInfo',authorizationClrToken , async (req, res) => {
    try {
    const kojoo = req.body
    const uiid = req.user_id
    const result = await  prisma.classroom_V2.findMany({ where: { adminId: uiid }})
    kojoo.ClassroomId = result[0].id
    console.log(kojoo)

    const mailId = kojoo.trainerMailId

    
    
    const result2 = await  prisma.classroom_Session_V2.create({data : kojoo})
    notifyTrainer(mailId , kojoo.ClassroomId , result2.id , result2.title, result2.date[0])
    res.send()
} catch(er){
    console.log(er)
    res.send(er)
}
    
})

classroom.get('/classroom/sessionInfo/all',authorizationClrToken , async (req, res) => {
    try {
    const kojoo = parseInt(req.query.id)
    // const uiid = req.user_id
    // const result = await  prisma.classroom_V2.findMany({ where: { adminId: uiid }})
    // kojoo.ClassroomId = result[0].id
    // console.log(kojoo)
    const result2 = await  prisma.classroom_Session_V2.findMany({ })
    res.send(result2)
} catch(er){
    console.log(er)
    res.send(er)
}
    
})


classroom.get('/classroomv2/sessionInfo',authorizationClrToken , async (req, res) => {
    try {
    const kojoo = parseInt(req.query.id)
    console.log(req.params)
    // const uiid = req.user_id
    // const result = await  prisma.classroom_V2.findMany({ where: { adminId: uiid }})
    // kojoo.ClassroomId = result[0].id
    // console.log(kojoo)
    const result2 = await  prisma.classroom_Session_V2.findMany({ where: { id: kojoo }})
    res.send(result2)
} catch(er){
    console.log(er)
    res.send(er)
}
    
})

classroom.get('/classroomv2/sessionInfo/host' , async (req, res) => {
    try {
    const kojoo = parseInt(req.query.id)
    console.log(req.params)
    // const uiid = req.user_id
    // const result = await  prisma.classroom_V2.findMany({ where: { adminId: uiid }})
    // kojoo.ClassroomId = result[0].id
    // console.log(kojoo)
    const result2 = await  prisma.classroom_Session_V2.findMany({ where: { id: kojoo }})
    res.send(result2)
} catch(er){
    console.log(er)
    res.send(er)
}
    
})

classroom.get('/register/classroom/host' , async (req, res) => {
    try {
    const uid = req.query.id

    const result = await  prisma.classroom_V2.findMany({ where: { id: uid }})

    if (result){
        return res.send(result)
    }
    // result.adminIs = true
} catch(er){
    console.log(er)
    res.send(er)
}
    
})

classroom.post('/signup/classroomV2', async (req,res) => {
    try{
        // const {}
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const jodo = req.body
        jodo.password = hashedPassword
        const result = await  prisma.classroomUser_V2.create({data : jodo})

        const token = await authenticationClrToken(result);
        const typerr = result.email_id.split('@')[1]

        const resultClr = await  prisma.classroom_V2.findMany({ where: { email_type: typerr }})
        console.log(resultClr[0])
        if (resultClr[0]){
            result.ClassroomId = resultClr[0].id
        }

        result.ClassroomId
        res.send({result, token})

    }catch(er){
        console.log(er)
        res.status(500).send(er)
    }
})

classroom.post('/login/classroomV2', async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await prisma.classroomUser_V2.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email or password");
        }
        const token = await authenticationClrToken(user);
        res.send({ user, token });
    }catch(er){
        console.log(er)
        res.status(500).send(er)
    }
})

module.exports = classroom;