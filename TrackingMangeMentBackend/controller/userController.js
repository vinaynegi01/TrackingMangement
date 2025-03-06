const db = require('../dbconfig/db.config');
const user = db.User;
const Response = require('../Utiles/ResponseHelper');
const CommonServices = require('../Utiles/common-config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const csv = require('csvtojson');
const CsvParser = require('json2csv').Parser;
const puppeteer = require('puppeteer')
const path = require('path')

// const sendResetPasswordMail = async (pdfBuffer) => {

//     try {
  
//       const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         requireTLS: true,
//         auth: {
//           user: config.emailUser,
//           pass: config.emailPassword
  
//         }
//       });
  
//       const mailOptions = {
//         from: config.emailUser,
//         to: 'checka759@gmail.com',
//         subject: 'For Reset Password',
//         attachments: [
//             {
//               filename: 'document.pdf',
//               content: pdfBuffer
//             }
//           ]
//       }
//       transporter.sendMail(mailOptions, function (error, infor) {
//         if (error) {
//           console.log(error);
//         }
//         else {
//           console.log("Mail has been sent successfully...", infor.response)
//         }
//       })
//     } catch (error) {
//       if (error.name === 'SequelizeValidationError') {
//         Response.SetSuccessErrorResponse(error.message, res, CommonServices.STATUS_CODE.BAD_REQUEST);
//         return null;
//       } else {
//         Response.SetSuccessErrorResponse(error.message, res, CommonServices.STATUS_CODE.BAD_REQUEST)
//         throw error;
//       }
//     }
  
//   }

const loadRegister = async (req, res) => {
    try {

        res.render('registration');

    } catch (error) {
        res.send(error);
    }
}

const SignUpUser = async (req, res) => {

    const { name, email, password, ConfirmPassword, Roles } = req.body
    // const UsersData = await user.findOne({email:email})

    // if(UsersData){
    //   res.status(401).send({"status": "Failed","message":"Email already exists"})
    // }


    if (name && email && password && ConfirmPassword) {
        if (password === ConfirmPassword) {

            try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt)

                const doc = {
                    name: name,
                    email: email,
                    password: hashPassword,
                    Roles: Roles
                }

                await user.create(doc);
                const save_user = await user.findOne({
                    where:
                        { email: email }
                });

                //Generate jwt token

                const token = jwt.sign({ userId: save_user }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' })
                res.status(201).send({ "status": "Sucesses", "message": "Your Detail has been saved", "token": token });

            } catch (error) {
                if (error.name === 'SequelizeValidationError') {
                    Response.SetSuccessErrorResponse(
                        error.message,
                        res,
                        CommonServices.STATUS_CODE.BAD_REQUEST);
                    return null;
                } else {
                    Response.SetSuccessErrorResponse(
                        error.message,
                        res,
                        CommonServices.STATUS_CODE.BAD_REQUEST)
                    throw error;
                }

            }
        }
        else {
            Response.SetSuccessErrorResponse(
                "Confirmpassword and password not match",
                res,
                CommonServices.STATUS_CODE.BAD_REQUEST);
        }

    }
    else {
        Response.SetSuccessErrorResponse(
            "All Field are required",
            res,
            CommonServices.STATUS_CODE.BAD_REQUEST);
    }
}

const GetAllUser = async (req, res) => {

    try {

        const AllUser = await user.findAll();
        Response.SetSuccessResponse(
            AllUser,
            res,
            CommonServices.STATUS_CODE.OK)

    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            Response.SetSuccessErrorResponse(
                error.message,
                res,
                CommonServices.STATUS_CODE.NOT_FOUND);
            return null;
        } else {
            Response.SetSuccessErrorResponse(
                error.message,
                res,
                CommonServices.STATUS_CODE.NOT_FOUND);
            throw error;
        }
    }
}

const LoggedInUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email && password) {
            const userDetail = await user.findOne({ 
                where: { email } 
            })
            if (userDetail != null) {

                const PasswordMatch = await bcrypt.compare(password, userDetail.password)
                if ((userDetail.email === email) && PasswordMatch) {
                    const token = jwt.sign({ userID: userDetail.id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' })
                    res.status(201).send({ "status": "Success", "message": "Login Success", "token": token, userDetail })
                }
                else {
                    res.status(201).send({ "status": "Error", "message": "UserEmail or password is wrong" });
                }
            }
            else {
                res.status(401).send({ "status": "Failed", "message": "User is not registered" });
            }
        }
        else {
            res.status(401).send({ "status": "Failed", "message": "All Field are required" });
        }

    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            Response.SetSuccessErrorResponse(
                error.message,
                res,
                CommonServices.STATUS_CODE.NOT_FOUND);
            return null;
        } else {
            Response.SetSuccessErrorResponse(
                error.message,
                res,
                CommonServices.STATUS_CODE.NOT_FOUND);
            throw error;
        }

    }
}

const GetNumberOfUser = async (req, res) => {

    try {
        const TotalUser = await user.count();
        Response.SetSuccessResponse(
            TotalUser,
            res,
            CommonServices.STATUS_CODE.OK)
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {

            Response.SetSuccessErrorResponse(
                error.message,
                res,
                CommonServices.STATUS_CODE.NOT_FOUND);
            return null;
        } else {
            Response.SetSuccessErrorResponse(
                error.message,
                res,
                CommonServices.STATUS_CODE.NOT_FOUND);
            throw error;
        }

    }

}
const deleteUser = async (req, res) => {

    try {
        // const id = req.body.id;
        const id = req.params.id;
        if (!id) {
            res.send("Please enter the id..");
        }
        await user.destroy({ where: { id: id } });
        res.send("Sucessfully deleted...." + req.params.id);
    } catch (error) {
        res.send(error.message);
    }

}

const Export = async (req,res,next) => {
    try {
        const users = [];

        const Userdata = await db.User.findAll();

        Userdata.forEach((user) => {
            const {id,name,email,Roles} = user;
            users.push({id,name,email,Roles});
        });

        const csvFields = ['Id','Name','Email','Roles'];
        const csvParser = new CsvParser({csvFields});
        const csvData = csvParser.parse(users);
 
        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attachment; filename=usersData.csv");

        // res.status(200).end(csvData)

        Response.SetSuccessResponse(csvData,res,CommonServices.STATUS_CODE.OK);

    } catch (error) {
        next(error)
    }
}
const Report = async(req,res,next) => {
    try {
        res.render('Invoice')
    } catch (error) {
        next(error)
    }
}

const generateReport = async(req,res,next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${req.protocol}://${req.get('host')}`+"/make",{
            waitUntil:'networkidle2'
        })
        
        await page.setViewport({ width:1680, height: 1050 });
        const todayDate = new Date()
      const pdfn =  await page.pdf({
            path: `${path.join(__dirname,'../public/files', todayDate.getTime()+".pdf")}`,
            printBackground: true,
            format:"A4"
        });
        await browser.close();
       const pdfURL = path.join(__dirname,'../public/files',todayDate.getTime()+".pdf")

       res.set({
        "Content-Type":"application/pdf",
        "Content-Length":pdfn.length
       })
    //    sendResetPasswordMail(pdfn)
       res.sendFile(pdfURL)
      
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const AddExpense = async(req,res,next) => {
   try {
     const {description, category, price, UserId} = req.body
     const addExpense = await db.expense.create(req.body)
     if(!addExpense)
     {
        return Response.SetSuccessErrorResponse('unable to add expense',res,CommonServices.STATUS_CODE.BAD_REQUEST)
     }
     return Response.SetSuccessResponse(addExpense,res,CommonServices.STATUS_CODE.OK)
   } catch (error) {
      next(error)
   }
}

const AddBudget = async(req,res,next) => {
    try {
        const {price,userId} = req.body
        const checkBudget = await db.budget.findOne({
            where:{
                UserId:userId
            }
        })
        if(checkBudget)
        {
            return Response.SetSuccessErrorResponse('Buget Already added please update',res,CommonServices.STATUS_CODE.OK)
        }
        const budgetadd = await db.budget.create(req.body)
        if(!budgetadd)
            {
               return Response.SetSuccessErrorResponse('unable to add expense',res,CommonServices.STATUS_CODE.BAD_REQUEST)
            }
            return Response.SetSuccessResponse(budgetadd,res,CommonServices.STATUS_CODE.OK)

    } catch (error) {
        next(error)
    }
}

const GetAllExpense = async(req,res,next)=>{
    try {
        const {userId} = req.params
        const getdata = await db.User.findOne({
            include: [
                {
                    model: db.expense, // Assuming a user has multiple expenses
                },
                {
                    model: db.budget, // Assuming a user has only one budget
                    
                }
            ],
            where:{
                id:userId
            }
        })
        if(!getdata)
        {
            return Response.SetSuccessErrorResponse('unable to get data',res,CommonServices.STATUS_CODE.BAD_REQUEST)
        }
        return Response.SetSuccessResponse(getdata,res,CommonServices.STATUS_CODE.OK)
    } catch (error) {
        next(error)
    }
}

const expenseUser = async(req,res,next)=>{
    try {
        const {userId} = req.params
        const getexpense = await db.expense.findAll({
            where:{
                UserId:userId
            }
        })
        if(!getexpense)
            {
                return Response.SetSuccessErrorResponse('unable to get data',res,CommonServices.STATUS_CODE.BAD_REQUEST)
            }
            return Response.SetSuccessResponse(getexpense,res,CommonServices.STATUS_CODE.OK)
    } catch (error) {
        next(error)
    }
}

const updateBudget = async(req,res,next)=>{
    try {
        const {price,userId} = req.body
        const updatedata = await db.budget.update({price:price},{
            where:{
                UserId:userId
            }
        })
        if(!updatedata)
        {
            return Response.SetSuccessErrorResponse('unable to update',res,CommonServices.STATUS_CODE.BAD_REQUEST)
        }
        return Response.SetSuccessResponse('Updated the budget',res,CommonServices.STATUS_CODE.OK)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    loadRegister,
    SignUpUser,
    GetAllUser,
    LoggedInUser,
    GetNumberOfUser,
    deleteUser,
    Export,
    generateReport,
    Report,
    AddExpense,
    AddBudget,
    GetAllExpense,
    updateBudget,
    expenseUser
}