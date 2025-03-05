const express = require('express');
const path = require('path');
const router = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const controller = require('../controller/userController');
const AdminController = require('../controller/adminController');
const {RequestMethodsMiddlewares} = require('.././middleware/middlewares')





router.post('/SignUpUser',
controller.SignUpUser);

router.post('/addexpense',
RequestMethodsMiddlewares.ApplicationJsonData,
controller.AddExpense)


router.post('/LoggingUser',
controller.LoggedInUser);

router.get('/number',
controller.GetNumberOfUser);

router.delete('/delete/:id',
controller.deleteUser);

// AdminController api...


router.get('/ExcelCsv',
controller.Export)


router.get('/report',
controller.Report)

router.get('/Generate-report',
controller.generateReport)






module.exports = router;