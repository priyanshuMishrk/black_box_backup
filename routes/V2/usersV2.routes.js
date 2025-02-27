const express = require("express");
const userInfo = express.Router();
const { authorizationToken } = require("../../auth/user.auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { notify } = require('./notifyVerification')
const sendMessage = require('./msgVerification')
const axios = require('axios');
const verifyUPI = require('validate-upi-id')
const bcrypt = require("bcrypt");
const { authenticationToken } = require("../../auth/user.auth");
// const { validatePattern, verifyUPI } = require('bhimupijs');

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_live_hn3vBQHVAvEsDm',
  key_secret: 'nTClHwPvfxKfYyFimEIfmw6O',
});

const apiKey = 'rzp_live_hn3vBQHVAvEsDm';
const apiSecret = 'nTClHwPvfxKfYyFimEIfmw6O';

userInfo.post('/verify-upi', async (req, res) => {
  const { upiId } = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: apiKey,
      password: apiSecret
    }
  };

  const data = {
    vpa: upiId
  };

  try {
    // const response = await axios.post('https://api.razorpay.com/v1/payments/validate/vpa', data, config);
    const response = await verifyUPI(upiId)
    console.log(response)
    res.json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

userInfo.post('/create-invoice', async (req, res) => {
  // const { amount, currency, receipt, payment_id } = req.body;

  const invoiceOptions = {
    type: 'link',
    amount: 20000,
    currency: "INR",
    description: 'Course/Class Fee',
    receipt: "receipt#1",
    customer: {
      name: 'Priyanshu Mishra',
      email: 'customer@example.com',
      contact: '1234567890',
    },
    payment_id: 'pay_NlQjzk49l7jJF5',
  };

  try {
    const response = await razorpay.invoices.create(invoiceOptions);
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Define the userInfo route
userInfo.post("/userInfo", async (req, res) => {
  const {
    whatBrings,
    currentIndustry,
    interestedTags,
    heardBy,
    dob,
    languages,
    education,
    currentCompany,
    awards,
    flink,
    xlink,
    tubelink,
    linkedin,
    about,
    imgLink,
    location,
    skilss,
    bio,
    headline
  } = req.body;

  const user_id = parseInt(req.body.userId)

  try {
    let daaa
    // Check if the user_id and at least one of the additional keys are provided
    if (about || imgLink) {
      if (!imgLink) {
        daaa = {
          about
        }
      }
      else {
        daaa = {
          img_thumbnail: imgLink,
          about
        }
      }
    }

    // Update the User table with 'about' and 'imgLink'
    if (about || imgLink) {
      await prisma.users.updateMany({
        where: { id: user_id },
        data: daaa,
      });
    }

    // Check if UserInfo already exists
    const existingUserInfo = await prisma.user_Info.findMany({ where: { user_id: user_id } });

    // Prepare the userInfo data
    const userInfo = {
      user_id,
      whatBrings,
      currentIndustry,
      interestedTags,
      heardBy,
      dob,
      languages,
      education,
      currentCompany,
      awards,
      flink,
      xlink,
      tubelink,
      linkedin,
      bio,
      headline,
      skilss
    };

    let result;
    if (existingUserInfo.length > 0) {
      // Update existing UserInfo
      result = await prisma.user_Info.updateMany({
        where: { user_id: user_id },
        data: userInfo,
      });

    } else {
      // Create new UserInfo
      result = await prisma.user_Info.create({ data: userInfo });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Define the userInfo route
userInfo.post("/classInfo", authorizationToken, async (req, res) => {
  try {
    const data = req.body
    data.trainer_id = req.user_id
    // console.log(data)
    const result = await prisma.class_V.create({ data: data });
    const result2 = await prisma.class_V.findMany({
      where: { id: result.id },
      include: {
        user: true,
      },
    });
    notify(result2[0].user.email, result2[0].id, result2[0].title, result2[0].price, `${result2[0].user.first_name} ${result2[0].user.last_name}`)
    const message = `Hey 
      Recently ${result2[0].user.first_name} ${result2[0].user.last_name} posted a class online.
      You should verify it.
      The name of the class is ${result2[0].title}
      The price of the class is ${result2[0].price}
      The mail id of the user is ${result2[0].user.email}
      The link for the class is http://localhost:3000/classV2/${result2[0].id}
    `
    sendMessage(message).then((message) => console.log('Message sent successfully:', message.sid))
      .catch((error) => console.error('Error sending message:', error));
    return res.send()
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.get("/classInfo", async (req, res) => {

  try {
    const data = parseInt(req.query.id)

    const result = await prisma.class_V.findMany({
      where: { id: data },
      include: {
        user: true
      },
    });
    return res.send(result[0])
  } catch (er) {
    return res.send(er)
  }
});

userInfo.patch("/admin/classInfo", async (req, res) => {

  try {
    const id = parseInt(req.body.id)
    const bool = req.body.verify
    console.log("new Update")
    const result = await prisma.class_V.update({
      where: { id: id },
      data: {
        verified: bool
      },
    });
    return res.send(result[0])
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.get("/classInfo/all", async (req, res) => {

  try {

    const result = await prisma.class_V.findMany({
      where: {},
      include: {
        user: true,
      },
    });
    return res.send(result)
  } catch (er) {
    return res.send(er)
  }
});

userInfo.get("/wishlist", authorizationToken, async (req, res) => {
  const id = req.user_id
  try {

    const result = await prisma.wishlist.findMany({
      where: {
        user_id: id
      },
      include: {
        classes: {
          include: {
            user: true,
          }
        },
        courses: {
          include: {
            user: true,
          }
        }
      },
    });
    return res.send(result[0])
  } catch (er) {
    return res.send(er)
  }
});

userInfo.post("/wishlist", authorizationToken, async (req, res) => {
  const id = req.user_id
  const newClassId = parseInt(req.query.id)
  const type = req.query.type
  try {
    if (type === 'class') {
      const existingCart = await prisma.wishlist.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          classes: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.wishlist.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            classes: {
              set: [
                ...existingCart[0].classes.map((c) => ({ id: c.id })), // Preserve existing classes
                { id: newClassId }, // Add the new class ID
              ],
            },
          },
        });
        return res.send(updatedCart)
      }

      else {
        const newCart = await prisma.wishlist.create({
          data: {
            user_id: id, // Replace with the actual user ID
            classes: {
              connect: [{ id: newClassId }], // Replace with the actual class IDs
            },
          },
        });
        return res.send(newCart)
      }
    }

    if (type === 'course') {
      const existingCart = await prisma.wishlist.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          courses: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.wishlist.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            courses: {
              set: [
                ...existingCart[0].courses.map((c) => ({ id: c.id })), // Preserve existing classes
                { id: newClassId }, // Add the new class ID
              ],
            },
          },
        });
        return res.send(updatedCart)
      }

      else {
        const newCart = await prisma.wishlist.create({
          data: {
            user_id: id, // Replace with the actual user ID
            courses: {
              connect: [{ id: newClassId }], // Replace with the actual class IDs
            },
          },
        });
        return res.send(newCart)
      }
    }


  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.patch("/wishlist", authorizationToken, async (req, res) => {
  const id = req.user_id
  const newClassId = parseInt(req.query.id)
  const type = req.query.type
  try {
    if (type === 'class') {
      const existingCart = await prisma.wishlist.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          classes: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.wishlist.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            classes: {
              set: [
                ...existingCart[0].classes
                  .filter((c) => c.id !== newClassId) // Exclude the class with id === id3
                  .map((c) => ({ id: c.id })), // Preserve remaining classes
              ],
            },
          },
        });
        return res.send(updatedCart)
      }
    }

    if (type === 'course') {
      const existingCart = await prisma.wishlist.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          courses: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.wishlist.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            courses: {
              set: [
                ...existingCart[0].classes
                  .filter((c) => c.id !== newClassId) // Exclude the class with id === id3
                  .map((c) => ({ id: c.id })), // Preserve remaining classes
              ],
            },
          },
        });
        return res.send(updatedCart)
      }
    }


  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.get("/cart", authorizationToken, async (req, res) => {
  const id = req.user_id
  try {

    const result = await prisma.cart.findMany({
      where: {
        user_id: id
      },
      include: {
        classes: {
          include: {
            user: true,
          }
        },
        courses: {
          include: {
            user: true,
          }
        }
      },
    });
    return res.send(result[0])
  } catch (er) {
    return res.send(er)
  }
});

userInfo.post("/cart", authorizationToken, async (req, res) => {
  const id = req.user_id
  const newClassId = parseInt(req.query.id)
  const type = req.query.type
  try {
    if (type === 'class') {
      const existingCart = await prisma.cart.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          classes: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.cart.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            classes: {
              set: [
                ...existingCart[0].classes.map((c) => ({ id: c.id })), // Preserve existing classes
                { id: newClassId }, // Add the new class ID
              ],
            },
          },
        });
        return res.send(updatedCart)
      }

      else {
        const newCart = await prisma.cart.create({
          data: {
            user_id: id, // Replace with the actual user ID
            classes: {
              connect: [{ id: newClassId }], // Replace with the actual class IDs
            },
          },
        });
        return res.send(newCart)
      }
    }

    if (type === 'course') {
      const existingCart = await prisma.cart.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          courses: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.cart.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            courses: {
              set: [
                ...existingCart[0].courses.map((c) => ({ id: c.id })), // Preserve existing classes
                { id: newClassId }, // Add the new class ID
              ],
            },
          },
        });
        return res.send(updatedCart)
      }

      else {
        const newCart = await prisma.cart.create({
          data: {
            user_id: id, // Replace with the actual user ID
            courses: {
              connect: [{ id: newClassId }], // Replace with the actual class IDs
            },
          },
        });
        return res.send(newCart)
      }
    }


  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.patch("/cart", authorizationToken, async (req, res) => {
  const id = req.user_id
  const newClassId = parseInt(req.query.id)
  const type = req.query.type
  try {
    if (type === 'class') {
      const existingCart = await prisma.cart.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          classes: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.cart.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            classes: {
              set: [
                ...existingCart[0].classes
                  .filter((c) => c.id !== newClassId) // Exclude the class with id === id3
                  .map((c) => ({ id: c.id })), // Preserve remaining classes
              ],
            },
          },
        });
        console.log(updatedCart)
        return res.send(updatedCart)
      }
    }

    if (type === 'course') {
      const existingCart = await prisma.cart.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          courses: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.cart.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            courses: {
              set: [
                ...existingCart[0].courses
                  .filter((c) => c.id !== newClassId) // Exclude the class with id === id3
                  .map((c) => ({ id: c.id })), // Preserve remaining classes
              ],
            },
          },
        });
        console.log(updatedCart)
        return res.send(updatedCart)
      }
    }


  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});











userInfo.get("/bookmark", authorizationToken , async (req, res) => {
  const id = req.user_id
  try {

    const result = await prisma.book_mark_Post.findMany({
      where: {
        user_id: id
      },
      include: {
        postId: {
          where : {deleted : false},
          include: {
            user: true,
          }
        },
      },
    });
    return res.send(result[0])
  } catch (er) {
    return res.send(er)
  }
});

userInfo.post("/bookmark", authorizationToken , async (req, res) => {
  const id = req.user_id
  const newClassId = parseInt(req.query.id)
  try {
      const existingCart = await prisma.book_mark_Post.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          postId: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.book_mark_Post.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            postId: {
              set: [
                ...existingCart[0].postId.map((c) => ({ id: c.id })), // Preserve existing classes
                { id: newClassId }, // Add the new class ID
              ],
            },
          },
        });
        return res.send(updatedCart)
      }

      else {
        const newCart = await prisma.book_mark_Post.create({
          data: {
            user_id: id, // Replace with the actual user ID
            postId: {
              connect: [{ id: newClassId }], // Replace with the actual class IDs
            },
          },
        });
        return res.send(newCart)
      }
    


  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.patch("/bookmark", authorizationToken, async (req, res) => {
  const id = req.user_id
  const newClassId = parseInt(req.query.id)
  try {
      const existingCart = await prisma.book_mark_Post.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          postId: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.book_mark_Post.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            postId: {
              set: [
                ...existingCart[0].postId
                  .filter((c) => c.id !== newClassId) // Exclude the class with id === id3
                  .map((c) => ({ id: c.id })), // Preserve remaining classes
              ],
            },
          },
        });
        console.log(updatedCart)
        return res.send(updatedCart)
      }


  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});


userInfo.post("/changePass", authorizationToken , async (req, res) => {
  const id = req.user_id
  const newPass = req.body.pass
  try {
    const password = await bcrypt.hash(newPass, 12);
    const result = await prisma.users.update({
      where: { id : id },
      data: { password},
    });
    const token = await authenticationToken(result);
    return res.send({ result, token });

  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.post("/changeMail", authorizationToken , async (req, res) => {
  const id = req.user_id
  const newPass = req.body.mailID
  try {
    const result = await prisma.users.update({
      where: { id : id },
      data: { email : newPass },
    });
    return res.send({ result });

  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});


















userInfo.get("/likedPost", authorizationToken , async (req, res) => {
  const id = req.user_id
  console.log(id)
  try {

    const result = await prisma.liked_Post.findMany({
      where: {
        user_id: id, 
      },
      include: {
        postId: {
          where : {deleted : false},
          include: {
            user: true,
          }
        }
      },
    });
    console.log(result)
    return res.send(result[0])
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.post("/likedPost", authorizationToken , async (req, res) => {
  const id = req.user_id
  const newClassId = parseInt(req.query.id)
  try {
      const existingCart = await prisma.liked_Post.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          postId: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.liked_Post.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            postId: {
              set: [
                ...existingCart[0].postId.map((c) => ({ id: c.id })), // Preserve existing classes
                { id: newClassId }, // Add the new class ID
              ],
            },
          },
        });
        return res.send(updatedCart)
      }

      else {
        const newCart = await prisma.liked_Post.create({
          data: {
            user_id: id, // Replace with the actual user ID
            postId: {
              connect: [{ id: newClassId }], // Replace with the actual class IDs
            },
          },
        });
        return res.send(newCart)
      }
    


  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.patch("/likedPost", authorizationToken, async (req, res) => {
  const id = req.user_id
  const newClassId = parseInt(req.query.id)
  try {
      const existingCart = await prisma.liked_Post.findMany({
        where: {
          user_id: id, // Replace with the actual user ID
        },
        include: {
          postId: true, // Include the current classes in the cart
        },
      });

      if (existingCart[0]) {
        const updatedCart = await prisma.liked_Post.update({
          where: {
            user_id: id, // Replace with the actual user ID
          },
          data: {
            postId: {
              set: [
                ...existingCart[0].postId
                  .filter((c) => c.id !== newClassId) // Exclude the class with id === id3
                  .map((c) => ({ id: c.id })), // Preserve remaining classes
              ],
            },
          },
        });
        console.log(updatedCart)
        return res.send(updatedCart)
      }


  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});























// userInfo.delete("/cart", authorizationToken, async (req, res) => {
//   const id = req.user_id
//   const cid = parseInt(req.query.id)
//   try{

//     const existingCart = await prisma.cart.findUnique({
//       where: {
//         user_id: id, // Replace with the actual user ID
//       },
//       include: {
//         classes: true, // Include the current classes in the cart
//       },
//     });

//     const classIdToDelete = existingCart.classes.find((c) => c.id !== cid); // Replace classId with the ID of the class you want to delete


//     const updatedCart = await prisma.cart.update({
//       where: {
//         user_id: id, // Replace with the actual user ID
//       },
//       data: {
//         classes: classIdToDelete,
//       },
//     });
//     return res.send(updatedCart)
//   } catch (er){
//     return res.send(er)
//   }
// });

userInfo.post("/courseInfo", authorizationToken, async (req, res) => {
  try {
    const data = req.body
    data.trainer_id = req.user_id
    const result = await prisma.course_V.create({ data: data });
    const result2 = await prisma.course_V.findMany({
      where: { id: result.id },
      include: {
        user: true,
      },
    });
    notify(result2[0].user.email, result2[0].id, result2[0].title, result2[0].price, `${result2[0].user.first_name} ${result2[0].user.last_name}`)
    const message = `Hey 
      Recently ${result2[0].user.first_name} ${result2[0].user.last_name} posted a course online.
      You should verify it.
      The name of the course is ${result2[0].title}
      The price of the course is ${result2[0].price}
      The mail id of the user is ${result2[0].user.email}
      The link for the course is http://localhost:3000/classV2/${result2[0].id}
    `
    sendMessage(message).then((message) => console.log('Message sent successfully:', message.sid))
      .catch((error) => console.error('Error sending message:', error));
    return res.send()
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.get("/courseInfo", async (req, res) => {

  try {
    const data = parseInt(req.query.id)

    const result = await prisma.course_V.findMany({
      where: { id: data },
      include: {
        user: true,
      },
    });
    return res.send(result[0])
  } catch (er) {
    return res.send(er)
  }
});

userInfo.delete("/courseInfo", async (req, res) => {

  try {
    const data = parseInt(req.query.id)

    const result = await prisma.course_V.delete({
      where: { id: data }
    });
    return res.send(result)
  } catch (er) {
    return res.send(er)
  }
});

userInfo.delete("/classInfo", async (req, res) => {

  try {
    const data = parseInt(req.query.id)

    const result = await prisma.class_V.delete({
      where: { id: data }
    });
    return res.send(result[0])
  } catch (er) {
    return res.send(er)
  }
});


userInfo.get("/courseInfo/my",authorizationToken , async (req, res) => {

  try {
    const data = parseInt(req.user_id)

    const result = await prisma.course_V.findMany({
      where: { trainer_id : data },
      include: {
        user: true,
      },
    });
    console.log(result)
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
    
  }
});


userInfo.get("/classInfo/my",authorizationToken , async (req, res) => {

  try {
    const data = parseInt(req.user_id)

    const result = await prisma.class_V.findMany({
      where: { trainer_id : data },
      include: {
        user: true,
      },
    });
    console.log(result)
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
    
  }
});


userInfo.get("/accountInfo/my",authorizationToken , async (req, res) => {

  try {
    const data = parseInt(req.user_id)

    const result = await prisma.class_V.findMany({
      where: { trainer_id : data },
      include: {
        user: true,
      },
    });

    if (!result[0]){
      const result2 = await prisma.course_V.findMany({
        where: { trainer_id : data },
        include: {
          user: true,
        },
      }); 

      if (!result2[0]){
        return res.send()
      }

      const dataToSend = {
        accN : result2[0].accN,
        bankN : result2[0].bankN,
        holderN : result2[0].holderN,
        accTpe : result2[0].accTpe,
        ifsc : result2[0].ifsc
      }
      return res.send(dataToSend)

    }
    const dataToSend = {
      accN : result[0].accN,
      bankN : result[0].bankN,
      holderN : result[0].holderN,
      accTpe : result[0].accTpe,
      ifsc : result[0].ifsc
    }
    return res.send(dataToSend)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});


userInfo.post("/accountInfo/update", authorizationToken, async (req, res) => {
  try {
    const data = parseInt(req.user_id);
    
    // Extracting the fields from the request body
    const { accN, bankN, holderN, accTpe, ifsc, id } = req.body;

    // Update the class_V table for the provided id
    const updatedClasses = await prisma.class_V.updateMany({
      where: {
        trainer_id: data,
        id: id, // Assuming 'id' is part of the class_V table
      },
      data: {
        accN: accN,
        bankN: bankN,
        holderN: holderN,
        accTpe: accTpe,
        ifsc: ifsc
      },
    });

    const updatedClasses2 = await prisma.course_V.updateMany({
      where: {
        trainer_id: data,
        id: id, // Assuming 'id' is part of the class_V table
      },
      data: {
        accN: accN,
        bankN: bankN,
        holderN: holderN,
        accTpe: accTpe,
        ifsc: ifsc
      },
    });

    // Respond with the updated data
    return res.send({ message: "Update successful"});
  } catch (er) {
    console.log(er);
    return res.send(er);
  }
});

userInfo.patch("/admin/courseInfo", async (req, res) => {

  try {
    const id = parseInt(req.body.id)
    const bool = req.body.verify
    console.log("new Update")
    const result = await prisma.course_V.update({
      where: { id: id },
      data: {
        verified: bool
      },
    });
    return res.send(result[0])
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.get("/courseInfo/all", async (req, res) => {

  try {

    const result = await prisma.course_V.findMany({
      where: {},
      include: {
        user: true,
      },
    });
    return res.send(result)
  } catch (er) {
    return res.send(er)
  }
});


userInfo.post("/courseInfo/all", async (req, res) => {

  try {

    const currentData = req.body
    const user_id = Number(req.user_id)

    if (!currentData.descrition) {
      return res.status(400).send('No Description Found!!')
    }


    const result = await prisma.course_V.findMany({
      where: {},
      include: {
        user: true,
      },
    });
    return res.send(result)
  } catch (er) {
    return res.send(er)
  }
});

userInfo.get('/profileDetails', authorizationToken, async (req, res) => {
  try {
    const id = Number(req.user_id)

    console.log(id)

    const userData = await prisma.users.findUnique({ where: { id } })


    const userData2 = await prisma.user_Info.findMany({ where: { user_id: id } })


    const data = {
      full_name: `${userData.first_name} ${userData.last_name}`,
      first_name: userData.first_name,
      backbanner : userData?.backbanner,
      last_name: userData.last_name,
      email: userData.email,
      about: userData.about,
      joined_at: userData.created_at,
      interestedTags: userData2[0]?.interestedTags,
      heardBy: userData2[0]?.heardBy,
      languages: userData2[0]?.languages,
      education: userData2[0]?.education,
      currentCompany: userData2[0]?.currentCompany,
      flink: userData2[0]?.flink,
      xlink: userData2[0]?.xlink,
      tubelink: userData2[0]?.tubelink,
      linkedin: userData2[0]?.linkedin,
      dob: userData2[0]?.dob,
      location : userData2[0]?.location,
      skilss :  userData2[0]?.skilss,
      headline : userData2[0]?.headline

    }
    
    // console.log(data)

    res.send(data)

  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})

userInfo.get('/profileDetails/other', async (req, res) => {
  try {
    const id = Number(req.query.id)

    // console.log(id)

    const userData = await prisma.users.findUnique({ where: { id } })


    const userData2 = await prisma.user_Info.findMany({ where: { user_id: id } })


    const data = {
      full_name: `${userData?.first_name} ${userData?.last_name}`,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      backbanner : userData?.backbanner,
      email: userData?.email,
      about: userData?.about,
      joined_at: userData?.created_at,
      interestedTags: userData2[0]?.interestedTags,
      heardBy: userData2[0]?.heardBy,
      languages: userData2[0]?.languages,
      education: userData2[0]?.education,
      currentCompany: userData2[0]?.currentCompany,
      flink: userData2[0]?.flink,
      xlink: userData2[0]?.xlink,
      tubelink: userData2[0]?.tubelink,
      linkedin: userData2[0]?.linkedin,
      dob: userData2[0]?.dob,
      img : userData?.img_thumbnail ,
      location : userData2[0]?.location,
      skilss :  userData2[0]?.skilss,
      headline : userData2[0]?.headline
    }

    // console.log(data)

    res.send(data)

  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})  

userInfo.patch('/profileDetails', async (req, res) => {
  try {
    const user_id = parseInt(req.query.id)

    const userData = await prisma.users.findUnique({ where: { id: user_id } })
    const userData2 = await prisma.user_Info.findMany({ where: { user_id: user_id } })
    // console.log(userData2)

    const data2 = {
      interestedTags: req.body.interestedTags,
      heardBy: req.body.heardBy,
      languages: req.body.languages,
      education: req.body.education,
      currentCompany: req.body.currentCompany,
      flink: req.body.flink,
      xlink: req.body.xlink,
      tubelink: req.body.tubelink,
      linkedin: req.body.linkedin,
      dob: req.body.dob,
      user_id: user_id,
      headline : req.body.headline,
      location : req.body.location,
      skilss : req.body.skilss
    }

    let result
    console.log(userData2.length === 0)
    if (userData2.length !== 0) {
      console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
      try {
        result = await prisma.user_Info.updateMany({
          where: { user_id: user_id },
          data: data2,
        });
      } catch (er) {
        console.log(er)
        return res.send(er)
      }
      console.log(result, "saa")

    } else {
      //  When User doesn't Has any history
      result = await prisma.user_Info.create({ data: data2 });
      console.log(result, "sbb")
    }

    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      about: req.body.about,
    }

    const result2 = await prisma.users.update({
      where: { id: user_id },
      data: data,
    });
    res.send()

  } catch (er) {
    console.log(er)
    return res.status(400).send(er)
  }
})

userInfo.patch('/profileDetails/image', async (req, res) => {
  try {
    const user_id = parseInt(req.query.id)


    const data = {
      img_thumbnail : req.body.img  
    }

    const result2 = await prisma.users.update({
      where: { id: user_id },
      data: data,
    });

    console.log(result2)
    res.send()

  } catch (er) {
    console.log(er)
    return res.status(400).send(er)
  }
})


userInfo.patch('/profileDetails/backbanner', async (req, res) => {
  try {
    const user_id = parseInt(req.query.id)


    const data = {
      backbanner : req.body.img  
    }

    const result2 = await prisma.users.update({
      where: { id: user_id },
      data: data,
    });

    console.log(result2)
    res.send()

  } catch (er) {
    console.log(er)
    return res.status(400).send(er)
  }
})




userInfo.get('/teacherClasses', async (req, res) => {


  try {
    const id = parseInt(req.query.id)
    const result = await prisma.course_V.findMany({
      where: {
        trainer_id: id
      },
      include: {
        user: true,
      },
    });
    const result2 = await prisma.class_V.findMany({
      where: {
        trainer_id: id
      },
      include: {
        user: true,
      },
    });

    const finalResult = result.concat(result2)
    return res.send(finalResult)
  } catch (er) {
    return res.send(er)
  }
})


userInfo.get('/isTeacher', async (req, res) => {


  try {
    const id = parseInt(req.query.id)
    const result = await prisma.course_V.findMany({
      where: {
        trainer_id: id
      },
      include: {
        user: true,
      },
    });
    const result2 = await prisma.class_V.findMany({
      where: {
        trainer_id: id
      },
      include: {
        user: true,
      },
    });

    const finalResult = result.concat(result2)

    if (finalResult.length > 0) {
      return res.send(true)
    } else {
      return res.send(false)
    }
  } catch (er) {
    return res.send(er)
  }
})


userInfo.post('/submit-stream', authorizationToken, async (req, res) => {


  try {
    const id = Number(req.user_id)
    const {
      title,
      thumbnail,
      tags
    } = req.body

    const data = {
      title,
      thumbnail,
      tags,
      user_id: id,
      live: true
    }

    const result = await prisma.live_Streaming.create({
      data: data
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})


userInfo.post('/publicPost', authorizationToken, async (req, res) => {


  try {
    const id = Number(req.user_id)
    const {
      caption,
      images,
      videos
    } = req.body

    const data = {
      caption,
      images,
      user_id: id,
      videos
    }

    const result = await prisma.public_Post.create({
      data: data
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})

userInfo.delete('/publicPost', async (req, res) => {


  try {

    const postId = parseInt(req.query.id)

    const result = await prisma.public_Post.update({
      where: { id: postId },
      data: { deleted : true }
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})

userInfo.get('/publicPost', async (req, res) => {


  try {
    const result = await prisma.public_Post.findMany({
      where: { private: false, deleted : false }, include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',  // Replace 'createdAt' with the field you want to order by
      }
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})

userInfo.get('/publicPost/my',authorizationToken, async (req, res) => {


  try {
    const id = Number(req.user_id)
    const result = await prisma.public_Post.findMany({
      where: { user_id: id, deleted : false}, include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',  // Replace 'createdAt' with the field you want to order by
      }
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})


userInfo.get('/publicPost/other', async (req, res) => {


  try {
    const id = Number(req.query.id)
    const result = await prisma.public_Post.findMany({
      where: { user_id: id, deleted : false}, include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',  // Replace 'createdAt' with the field you want to order by
      }
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})


userInfo.patch('/publicPost/private', async (req, res) => {
  const { postId } = req.body;

  try {
    // Update the post with the given postId and set 'private' to true
    const result = await prisma.public_Post.update({
      where: { id: postId },
      data: { private: true, deleted : false }
    });
    return res.send(result);
  } catch (er) {
    console.log(er);
    return res.status(500).send(er);
  }
});





userInfo.get('/all-stream', async (req, res) => {


  try {
    const result = await prisma.live_Streaming.findMany({
      where: { live: true }, include: {
        user: true,
      },
      orderBy: {
        streamStartedAt: 'desc',  // Replace 'createdAt' with the field you want to order by
      }
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})

userInfo.patch('/start-stream', async (req, res) => {


  try {
    const id = Number(req.query.id)
    const date = new Date(Date.now())

    const result = await prisma.live_Streaming.updateMany({
      where: { id: id },
      data: {
        streamStartedAt: date,
        live: true
      }
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})

userInfo.patch('/stop-stream', async (req, res) => {


  try {
    const id = Number(req.query.id)
    const date = new Date(Date.now())

    const result = await prisma.live_Streaming.updateMany({
      where: { id: id },
      data: {
        streamEndedAt: date,
        live: false
      }
    });
    return res.send(result)
  } catch (er) {
    console.log(er)
    return res.send(er)
  }
})

userInfo.patch('/stream-view', async (req, res) => {
  try {
    const id = Number(req.query.id);

    // First, fetch the current live view count and highest view count
    const stream = await prisma.live_Streaming.findUnique({
      where: { id: id },
      select: {
        liveViewCount: true,
        highestViewCount: true,
      },
    });

    if (!stream) {
      return res.status(404).send({ error: 'Stream not found' });
    }

    // Increment the live view count
    const updatedLiveViewCount = (stream.liveViewCount || 0) + 1;

    // Determine if highestViewCount needs to be updated
    const updatedHighestViewCount = Math.max(
      updatedLiveViewCount,
      stream.highestViewCount || 0
    );

    // Update the live_Streaming record
    const result = await prisma.live_Streaming.update({
      where: { id: id },
      data: {
        liveViewCount: updatedLiveViewCount,
        highestViewCount: updatedHighestViewCount,
      },
    });

    return res.send(result);
  } catch (er) {
    console.log(er);
    return res.status(500).send(er);
  }
});

userInfo.patch('/stream-exit', async (req, res) => {
  try {
    const id = Number(req.query.id);

    // First, fetch the current live view count
    const stream = await prisma.live_Streaming.findUnique({
      where: { id: id },
      select: {
        liveViewCount: true,
      },
    });

    if (!stream) {
      return res.status(404).send({ error: 'Stream not found' });
    }

    // Decrement the live view count, ensuring it doesn't go below 0
    const updatedLiveViewCount = Math.max((stream.liveViewCount || 0) - 1, 0);

    // Update the live_Streaming record
    const result = await prisma.live_Streaming.update({
      where: { id: id },
      data: {
        liveViewCount: updatedLiveViewCount,
      },
    });

    return res.send(result);
  } catch (er) {
    console.log(er);
    return res.status(500).send(er);
  }
});

userInfo.get('/courseTag', async (req, res) => {
  try {
    const tag = req.body.tag
    return res.send(`no course found with the tag: ${tag}`);
  } catch (er) {
    console.log(er);
    return res.status(500).send(er);
  }
});

userInfo.get('/searchQuery', async (req, res) => {
  try {
    const tag = req.query.tag.toLowerCase(); // Get the tag from the query and convert to lowercase

    if (!tag) {
      return res.status(400).send({ error: 'Tag query parameter is required' });
    }

    // Find users based on the tag
    const users = await prisma.users.findMany({
      where: {
        OR: [
          { first_name: { contains: tag, mode: 'insensitive' } },
          { last_name: { contains: tag, mode: 'insensitive' } },
          { email: { contains: tag, mode: 'insensitive' } },
          { about: { contains: tag, mode: 'insensitive' } }
        ]
      }
    });

    // Extract user IDs
    const userIds = users.map(user => user.id);

    // Fetch user information
    const userInfos = await prisma.user_Info.findMany({
      where: {
        user_id: { in: userIds }
      }
    });

    // Fetch courses and classes
    const courses = await prisma.course_V.findMany({
      where: {
        OR: [
          {trainer_id: { in: userIds }},
          { title: { contains: tag, mode: 'insensitive' } },
          { description: { contains: tag, mode: 'insensitive' } },
          { trainerBio: { contains: tag, mode: 'insensitive' } }
        ]
      },
      include: {
        user: true,
      },
    });

    const classes = await prisma.class_V.findMany({
      where: {
        OR: [
          {trainer_id: { in: userIds }},
          { title: { contains: tag, mode: 'insensitive' } },
          { description: { contains: tag, mode: 'insensitive' } },
          { trainerBio: { contains: tag, mode: 'insensitive' } }
        ]
      },
      include: {
        user: true,
      },
    });

    // Fetch public posts
    const publicPosts = await prisma.public_Post.findMany({
      where: {
        OR: [
          {user_id: { in: userIds }},
          { caption: { contains: tag, mode: 'insensitive' } }
        ]
      },
      include: {
        user: true,
      },
    });

    // Format the response
    const responseData = {
      profile: users.map(user => {
        const userInfo = userInfos.find(info => info.user_id === user.id);
        return {
          full_name: `${user.first_name} ${user.last_name}`,
          id : `${user.id}`,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          about: user.about,
          joined_at: user.created_at,
          interestedTags: userInfo?.interestedTags,
          heardBy: userInfo?.heardBy,
          languages: userInfo?.languages,
          education: userInfo?.education,
          currentCompany: userInfo?.currentCompany,
          flink: userInfo?.flink,
          xlink: userInfo?.xlink,
          tubelink: userInfo?.tubelink,
          linkedin: userInfo?.linkedin,
          dob: userInfo?.dob,
          img: user.img_thumbnail
        };
      }),
      course: courses,
      classes: classes,
      publicPost: publicPosts
    };

    res.send(responseData);

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while processing your request' });
  }
});

userInfo.post("/boughtClass", authorizationToken, async (req, res) => {
  const id = req.user_id
  console.log(id)
  const newClassId = parseInt(req.query.id)
  try {
        const existingCart = await prisma.class_V.findFirst({where: {
          id: newClassId, // Replace with the actual user ID
        }})

        if (existingCart.users){
          const updatedCart = await prisma.class_V.update({
            where: {
              id: newClassId, // Replace with the actual user ID
            },
            data: {
              users: 
                 [
                  ...existingCart.users.map((c) => ({ id: c.id })), // Preserve existing classes
                  { id: id }, // Add the new class ID
                ],
            },
          });
          return res.send(updatedCart)
        }else {
          const newCart = await prisma.class_V.update({
            where: {
              id: newClassId, // Replace with the actual user ID
            },
            data: {// Replace with the actual user ID
              users: 
               [{ id: id }]// Replace with the actual class IDs
              ,
            },
          });
          return res.send(newCart)
        }

  } catch (er) {
    console.log(er)
    return res.send(er)
  }
});

userInfo.patch('/follow', async (req, res) => {
  try {
    let { ownerId, targetUserId } = req.body;
    ownerId = parseInt(ownerId)
    targetUserId = parseInt(targetUserId)
    
    if (!ownerId || !targetUserId) {
      return res.status(400).json({ error: 'ownerId and targetUserId are required' });
    }

    // Fetch current connections for the owner
    let ownerConnection = await prisma.connections.findMany({
      where: { ownerId },
    });

    // If the owner doesn't have a connections record, create one
    if (!ownerConnection[0]) {
      ownerConnection = await prisma.connections.create({
        data: {
          ownerId,
          followers: [],
          following: [targetUserId],
        },
      });
    } else {
      // Add targetUserId to following if not already following
      if (!ownerConnection[0].following.includes(targetUserId)) {
        ownerConnection = await prisma.connections.updateMany({
          where: { ownerId },
          data: { following: { push: targetUserId } },
        });
      }
    }

    // Fetch or create target user's connections
    let targetConnection = await prisma.connections.findMany({
      where: { ownerId: targetUserId },
    });

    if (!targetConnection[0]) {
      targetConnection = await prisma.connections.create({
        data: {
          ownerId: targetUserId,
          followers: [ownerId],
          following: [],
        },
      });
    } else {
      // Add ownerId to followers if not already in the list
      if (!targetConnection[0].followers.includes(ownerId)) {
        targetConnection = await prisma.connections.updateMany({
          where: { ownerId: targetUserId },
          data: { followers: { push: ownerId } },
        });
      }
    }

    return res.json({ message: 'Followed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get followers and following count
userInfo.get('/connections/:ownerId', async (req, res) => {
  try {
    const ownerId = Number(req.params.ownerId);
    
    const connection = await prisma.connections.findMany({
      where: { ownerId },
    });
    
    if (!connection[0]) {
      return res.json({ followers: 0, following: 0 });
    }
    
    return res.json({
      followers: connection[0].followers.length,
      following: connection[0].following.length,
      followersList : connection[0].followers
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = userInfo;

