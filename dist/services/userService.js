// import * as userDal from '../db/dal/user'
// import { UserInput, UserOuput } from '../models/User'
// import User from '../models/User'
// export const create = (payload: string): Promise<User> => {
//     try {
//         console.log("Calling dal")
//         return userDal.create(payload)
//     } catch (error) {
//         console.log("was an error in service")
//         throw new Error("Error in the service")
//     }
// }
// export const findOrCreate = (phoneNumber: string): Promise<User> => {
//     return userDal.findOrCreate(phoneNumber)
// }
// export const nextQuestion = (user: User) => {
//     userDal.nextQuestion(user)
// }
// export const update = (phoneNumber: string, payload: Partial<UserInput>): Promise<UserOuput> => {
//     return userDal.update(phoneNumber, payload)
// }
// export const getByPhoneNumber = (phoneNumber: string): Promise<User> => {
//     return userDal.getByPhoneNumber(phoneNumber)
// }
// export const phoneValidation = (phoneNumber: string): Boolean => {
//     const phoneRegex = new RegExp('^\\+34(?:6[0-9]|7[1-9])[0-9]{7}$')
//     return (phoneRegex.test(phoneNumber))
// }
//# sourceMappingURL=userService.js.map