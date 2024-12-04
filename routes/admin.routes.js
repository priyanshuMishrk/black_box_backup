const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/d23h6kkblackboxdigitalschool", async (req,res)=>{
    try{
        let data = {}
        // add check for email unique and for phone number too
        for (const key of ['email', 'password', 'first_name', 'last_name', 'phone_num', 'superadmin']) {
            if (req.body[key] !== undefined && req.body[key] !== '') {
              data[key] = req.body[key];
            }
          }
        const result2 = await prisma.admin.create({
            data: {
              ...data
            },
          });
        res.send(result2)
    }catch (err){
        res.status(400).send(err)
    }
});

router.delete("/delete", async (req,res)=>{
    try{
        let email = req.body.email
        const result2 = await prisma.admin.deleteMany({
            where: { email: email },
          })
        res.send(result2)
    }catch (err){
        res.status(400).send(err)
    }
});

router.patch("/edit", async (req,res)=>{
    try{
        let data = {}
        for (const key of ['password', 'first_name', 'last_name', 'phone_num']) {
            if (req.body[key] !== undefined && req.body[key] !== '') {
              data[key] = req.body[key];
            }
          }
        let email = req.body.email
        const result2 = await prisma.admin.update({where: { email : email }, data : {...data} })
        res.send(result2)
    }catch (err){
        res.status(400).send(err)
    }
});

router.patch("/toggleSuperAdmin", async (req,res)=>{
    try{
        let email = req.body.email
        let supe

        const admin = await prisma.admin.findUnique({
            where: { email : email }
          })

        if (admin.superadmin){
            supe = false
        } else {
            supe = true
        }
        
        const result2 = await prisma.admin.update({where: { email : email }, data : {superadmin : supe  } })
        res.send(result2)
    }catch (err){
        res.status(400).send(err)
    }
});

module.exports = router;
