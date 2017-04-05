import User from '../../models/users'

/**
   @api {POST} /users 新增用户
   @apiDescription
   @apiVersion 1.0.0
   @apiName 新增游客
   @apiGroup Users
   @apiExample Example usage:
    curl -H "Content-Type: application/json" -X GET http://localhost:5000/api/users

   @apiParam {Object} user               用户对象 (必需)
   @apiParam {String} user.username      用户名.
   @apiParam {String} user.password      密码.

   @apiSuccess {Object}   users           用户对象
   @apiSuccess {ObjectId} users._id       用户ID
   @apiSuccess {String}   users.name      用户名
   @apiSuccess {String}   users.username  用户账号

   @apiSuccess {String}   token            token

   @apiSuccessExample {json} Success-Response:
      HTTP/1.1 200 OK
      {
        "user": {
          "username": "johnde",
          "_id": "58da1714794c88617e658ed4",
          "type": "User"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZGExNzE0Nzk0Yzg4NjE3ZTY1OGVkNCIsImlhdCI6MTQ5MDY4Nzc2NH0.ac4t-Qhyv0u8PGbPQLRTwhnD_3B8c21ciHOeJWuWNSg"
      }
   @apiErrorExample {json} Error-Response:
      HTTP/1.1 422 Unprocessable Entity
      {
        "status": 422,
        "error": ""
       }
 */
 export async function createUser (ctx) {
   const user = new User(ctx.request.body.user)
   try {
     await user.save()
   } catch (e) {
     Handle.sendEmail(e.message)
     ctx.throw(422, e.message)
   }

   const token = user.generateToken()
   const response = user.toJSON()

   delete response.password

   ctx.body = {
     user: response,
     token
   }
 }
