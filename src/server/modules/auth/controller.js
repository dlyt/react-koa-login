import passport from 'koa-passport'

/**
   @apiDefine TokenError
   @apiError  Unauthorized Invalid JWT token

   @apiErrorExample {json} Unauthorized-Error:
       HTTP/1.1 401 Unauthorized
       {
         "status": 401,
         "error": "没有权限"
       }
 */

 /**
    @api {post} /auth  验证权限
    @apiVersion 1.0.0
    @apiName AuthUser
    @apiGroup Auth

    @apiParam {String} username  账号.
    @apiParam {String} password  密码.

    @apiExample Example usage:
    curl -H "Content-Type: application/json" -X POST -d '{ "username": "johndoe@gmail.com", "password": "foo" }' localhost:5000/api/auth

    @apiSuccess {Object}   user           用户对象
    @apiSuccess {ObjectId} user._id       用户ID
    @apiSuccess {String}   user.name      用户姓名
    @apiSuccess {String}   user.username  用户账号
    @apiSuccess {String}   token          JWT token

    @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
          "user": {
             "_id": "56bd1da600a526986cf65c80"
             "username": "johndoe"
           },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
        }

    @apiError Unauthorized Incorrect credentials

    @apiErrorExample {json} Error-Response:
        HTTP/1.1 401 Unauthorized
        {
          "status": 401,
          "error": "没有权限"
        }
  */
export async function authUser (ctx, next) {
  return passport.authenticate('local', (user) => {
    if (!user) {
      ctx.throw(401)
    }

    const token = user.generateToken()
    const response = user.toJSON()

    delete response.password

    ctx.body = {
      token,
      user: response
    }
  })(ctx, next)
}
