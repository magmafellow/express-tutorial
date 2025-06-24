import { returnFoundUser } from "../handlers/users.mjs"

describe('get users', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks()
  // })
  
  it('should return user', () => {
    returnFoundUser(mockRequest, mockResponse)

    expect(mockResponse.send).toHaveBeenCalled()
    expect(mockResponse.send).toHaveBeenCalledWith({username:'mffg'})
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })

  it('should call sendStatus with 404 when user not found', () => {
    const copyMockRequest = { ...mockRequest, foundUser: null }
    returnFoundUser(copyMockRequest, mockResponse)

    expect(mockResponse.sendStatus).toHaveBeenCalled()
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404)
    expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1)
    expect(mockResponse.send).not.toHaveBeenCalled()
  })
})
