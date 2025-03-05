const {Sequelize,DataTypes} = require('sequelize');
const dbName = 'BudgetManagement';
const dbUser = 'root';
const dbPassword ='';

const sequelize = new Sequelize(dbName, dbUser, dbPassword,{
    host: 'localhost',
    port: 3306,
    dialect:'mysql'
});

const db = {}


db.User = require('../model/userModel')(sequelize,DataTypes);
db.expense = require('../model/expense')(sequelize,DataTypes);
db.budget = require('../model/budget')(sequelize,DataTypes);

db.Sequelize = Sequelize
db.sequelize = sequelize;



// Gallery And GalleryName Model Relationship.
// db.galleryName.hasMany(db.gallery,{foreignKey:'imageId', onDelete: 'CASCADE'});
// db.gallery.belongsTo(db.galleryName,{foreignKey:'imageId', onDelete: 'CASCADE',unique:false});


// db.sectionname.hasMany(db.partnersection,{foreignKey:'sectionId', onDelete: 'CASCADE'});
// db.partnersection.belongsTo(db.sectionname,{foreignKey:'sectionId',onDelete:'CASCADE',unique:false});

db.User.hasMany(db.expense,{foreignKey:'UserId', onDelete: 'CASCADE'});
db.expense.belongsTo(db.User,{foreignKey:'UserId', onDelete: 'CASCADE',unique:false});

db.User.hasMany(db.budget,{foreignKey:'UserId', onDelete: 'CASCADE'});
db.budget.belongsTo(db.User,{foreignKey:'UserId', onDelete: 'CASCADE',unique:false});


module.exports = db;