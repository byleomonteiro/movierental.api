const FakeUser = require("../models/fakes/FakeUser");
const UserService = require("./UserService")
const AuthService = require("./AuthService")

const { userMock } = require("./mocks/UserMocks")

let fakeUser;
let userService;
let authService;

describe('Authentication', () => {
    beforeEach(async () => {
        fakeUser = new FakeUser()
        userService = new UserService(fakeUser)
        authService = new AuthService(fakeUser)
    })

    it('should authenticate a valid user', async () => {
        await userService.insert(userMock)

        const { email, password } = userMock

        const response = await authService.login({ email, password })

        expect(response).toEqual({
            error: false,
            statusCode: 200,
            token: response.token
        })
    })

    it('should not authenticate with invalid email', async () => {
        const { email, password } = userMock

        const response = await authService.login({ email, password })

        expect(response).toEqual({
            error: true,
            statusCode: 401,
            message: 'User invalid'
        })
    })


    it('should not authenticate with invalid password', async () => {
        await userService.insert(userMock)

        const { email } = userMock

        const response = await authService.login({ email, password: '123' })

        expect(response).toEqual({
            error: true,
            statusCode: 401,
            message: 'Wrong credentials'
        })
    })

    it('should not authenticate if any server error occurs', async () => {
        await userService.insert(userMock)

        const { email } = userMock

        const response = await authService.login({ email })

        expect(response).toEqual({
            error: true,
            statusCode: 500,
            message: response.message
        })
    })
})