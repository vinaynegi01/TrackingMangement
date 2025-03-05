module.exports = (sequelize,DataTypes)=>{
 
    const modeldefination = {
        id:{
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
        },
        price:{
            type:DataTypes.INTEGER,
            allownull:true,
        
        },
        description:{
            type:DataTypes.TEXT
        },
        category:{
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [['Food', 'Entertainment','Transportation','Utilities','Other']],
                    msg: 'Invalid  type.'
                }
            }
        },
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    
    }
    let expense = sequelize.define('expense',modeldefination);

    return expense;
}