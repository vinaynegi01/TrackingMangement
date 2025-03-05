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
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    
    }
    let expense = sequelize.define('budget',modeldefination);

    return expense;
}