module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define('UserMangement',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email:{
            type: DataTypes.STRING,
            unique: 'email',
            allowNull: false,
            validate:{
                isEmail:{
                    args:true,
                    msg:'Please enter a valid email'
                }
            },
            trime:true
        },
        password:{
            type: DataTypes.STRING,
            min:8,
            max:16,
            // validate: {
            //     is: /^[0-9a-f]{64}$/i
            //   },
             allowNull: false 

        },
        is_verified:{
            type:DataTypes.INTEGER,
            default:0
    
        },
        Profile_Image:{
            type:DataTypes.STRING,
            allowNull:true
        },
        token:{
            type:DataTypes.STRING,
            default:''
        },
         
          
    },{
        paranoid: true
    })

    return User;
}