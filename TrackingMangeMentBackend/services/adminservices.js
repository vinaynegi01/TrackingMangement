const db = require('../dbconfig/db.config')

AdminService = function () { }

AdminService.prototype.ContentDataPages = {

    Add: async (data) => {
        try {
            return await db.ContentData.create(data);
        } catch (error) {
            throw (error)
        }
    },

    Update: async (data, id) => {
        try {

            let dataUpdate = {
                Content: data.Content
            }
            await db.ContentData.update(dataUpdate, {
                where: {
                    id: id,

                }

            });
            return await db.ContentData.findOne({ where: { id: id } })

        } catch (error) {
            throw (error)
        }

    },
    Delete: async (categoryId) => {
        try {
            // const isAddedinProduct = await db.ProductCategory.findOne({
            //     where: {
            //         categoryId: {
            //             [Op.eq]: categoryId
            //         }
            //     }
            // })
            // if (isAddedinProduct) {
            //     return false
            // }
            const isExist = await db.Category.findOne({
                where: {
                    id: {
                        [Op.eq]: categoryId
                    }
                }
            })
            if (!isExist) {
                return false
            }
            const isExistMediaObjec = await db.MediaObject.findOne({
                where: {
                    categoryId: {
                        [Op.eq]: categoryId
                    }
                }
            })
            let res = await db.Category.destroy({
                where: {
                    id: {
                        [Op.eq]: categoryId
                    }
                }
            })
            await db.MediaObject.destroy({
                where: {
                    categoryId: {
                        [Op.eq]: categoryId
                    }
                }
            })
            if (res && isExistMediaObjec.fileName) {
                fs.unlinkSync(isExistMediaObjec.imageUrl)
            }
            return res;
        } catch (error) {
            throw (error)
        }
    },
    FiveKm: async (data) => {
        try {
            return await db.fiveKm.create(data);
        } catch (error) {
            throw (error)
        }
    },
    UpdateFive: async (data, id) => {
        try {

            let dataUpdate = {
                Content: data.Content
            }
            await db.fiveKm.update(dataUpdate, {
                where: {
                    id: id,

                }

            });
            return await db.fiveKm.findOne({ where: { id: id } })

        } catch (error) {
            throw (error)
        }

    },
    TenKm: async (data) => {
        try {
            return await db.tenKm.create(data);
        } catch (error) {
            throw (error)
        }
    },
    UpdateTen: async (data, id) => {
        try {

            let dataUpdate = {
                Content: data.Content
            }
            await db.tenKm.update(dataUpdate, {
                where: {
                    id: id,

                }

            });
            return await db.tenKm.findOne({ where: { id: id } })

        } catch (error) {
            throw (error)
        }

    }
}



module.exports = new AdminService();