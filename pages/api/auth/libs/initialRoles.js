import RolesModel from "../models/RolesModel"

export const initilaRoles = async () => {
    try {
        const count = await RolesModel.estimatedDocumentCount()

        if (count > 0) return;

        const values = await Promise.all([
            new RolesModel({ name: 'user' }).save(),
            new RolesModel({ name: 'admin' }).save(),
            new RolesModel({ name: 'moderador' }).save(),
        ])

        console.log(values)
    } catch (error) {
        console.error(error.message)
    }

}