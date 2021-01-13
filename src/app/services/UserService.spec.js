const FakeUser = require("../models/fakes/FakeUser");
const UserService = require("./UserService")

const { userMock } = require("./mocks/UserMocks")

let fakeUser
let userService

describe('UserService', () => {
    beforeEach(() => {
        fakeUser = new FakeUser()
        userService = new UserService(fakeUser)
    })

    it('should create a new user in database', async () => {
        const response = await userService.insert(userMock)

        expect(response).toEqual({
            error: false,
            statusCode: 201,
            data: response.data
        })

        expect(response.data).toHaveProperty('id')
    })

    it('should not create a new user if already exists', async () => {
        await userService.insert(userMock)

        const response = await userService.insert(userMock)

        expect(response).toEqual({
            error: true,
            statusCode: 400,
            message: 'User already exists'
        })
    })

    it('should not create a new user if an server error occurrs', async () => {
        const response = await userService.insert(2)

        expect(response).toEqual({
            error: true,
            statusCode: 500,
            message: response.message
        })
    })

    it('should be able to get all users', async () => {

        await userService.insert(userMock)

        const response = await userService.getAll()

        expect(response).toEqual({
            error: false,
            statusCode: 200,
            data: response.data
        })
    })

    it('should not get all users if no user is found', async () => {
        const response = await userService.getAll()

        expect(response).toEqual({
            error: true,
            statusCode: 404,
            message: 'No user found'
        })
    })

    it('should delete an user if exists', async () => {
        const { data: user } = await userService.insert(userMock)

        const response = await userService.delete(user.id)

        expect(response).toEqual({
            error: false,
            statusCode: 204
        })
    })

    it('should not delete an user if not found', async () => {
        const response = await userService.delete(1)

        expect(response).toEqual({
            error: true,
            statusCode: 404,
            message: 'User not found'
        })
    })
})