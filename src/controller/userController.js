// const userModel = require("../model/userModel")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")

// const isEmpty = function (value) {
//     if (typeof value === "undefined" || value === null) return false;
//     if (typeof value === "string" && value.trim().length === 0) return false;
//     return true;
// };


// //******regex validation*****
// let nameRegex = /^[a-z A-Z]+$/
// let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// let mobileRegex = /^((\+91)?|91)?[6789][0-9]{9}$/
// let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/


// const signUp = async function (req, res) {
//     try {
//         let data = req.body
//         let { name, email, mobile, password } = data

//         if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Enter input field" })

//         if (!isEmpty(name)) return res.status(400).send({ status: false, msg: "Enter your name" })
//         if (!nameRegex.test(name)) return res.status(400).send({ status: false, msg: "Enter valid name ..!!" })

//         if (!isEmpty(email)) return res.status(400).send({ status: false, msg: "Enter your Email" })
//         if (!emailRegex.test(email)) return res.status(400).send({ status: false, msg: "Enter valid Email ..!!" })
//         //unique
//         let isEmail = await userModel.findOne({ email: email })
//         if (isEmail) return res.status(409).send({ status: false, msg: " Email already exist ..!!" })


//         if (!isEmpty(mobile)) return res.status(400).send({ status: false, msg: "Enter your Mobile no." })
//         if (!mobileRegex.test(mobile)) return res.status(400).send({ status: false, msg: "Enter valid mobile no. ..!!" })
//         //unique
//         let isMobile = await userModel.findOne({ mobile: mobile })
//         if (isMobile) return res.status(409).send({ status: false, msg: "Mobile already exist ..!!" })


//         if (!isEmpty(password)) return res.status(400).send({ status: false, msg: "Enter your password" })
//         if (!passwordRegex.test(password)) return res.status(400).send({ status: false, msg: "Enter valid password like Abc@123 ..!!" })
//         //Encryption
//         let salt = await bcrypt.genSalt(10)
//         let EncryptedPassword = await bcrypt.hash(password, salt)
//         data.password = EncryptedPassword

//         let teacher = await userModel.create(data)
//         return res.status(201).send({ status: true, data: teacher })
//     } catch (error) {
//         return res.status(500).send({ status: false, msg: error.message })
//     }

// }

// let counter = 1
// const MAX_ATTEMPS = 5

// const login = async function (req, res) {
//     try {
//         let data = req.body
//         let { email, password } = data

//         if (!isEmpty(email)) return res.status(400).send({ status: false, msg: "Enter your Email" })
//         if (!emailRegex.test(email)) return res.status(400).send({ status: false, msg: "Enter valid Email ..!!" })

//         if (!isEmpty(password)) return res.status(400).send({ status: false, msg: "Enter your password" })
//         if (!passwordRegex.test(password)) return res.status(400).send({ status: false, msg: "Enter valid password like Abc@123 ..!!" })

//         //DB call
//         let teacher = await userModel.findOne({ email: email })
//         if (!teacher) return res.status(400).send({ status: false, msg: "Invalid Email " })

//         //user verification trow password
//         let pass = await bcrypt.compare(password, teacher.password)

//         //============================//
//         // console.log(counter);
//         if (pass == false) {
//             if (counter >= MAX_ATTEMPS) {

//                 setTimeout(() => { counter = 1 }, 1000 * 60 * 60 * 24)

//                 return res.status(400).send({ status: false, msg: "You are blocked for 24hrs!" })
//             }
//             counter++
//         }

//         //============================//



//         if (!pass) return res.status(400).send({ status: false, msg: " password is Invalid..!!" })


//         let payload = { id: teacher._id }

//         let token = jwt.sign(payload, "Rajesh")

//         return res.status(200).send({ status: true, data: { teacherId: teacher._id, token: token } })

//     } catch (error) {

//         return res.status(500).send({ status: false, msg: error.message })
//     }
// }



// module.exports = { signUp, login }