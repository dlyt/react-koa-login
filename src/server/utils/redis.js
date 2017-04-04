import Config from '../../../config'


const redis = require('redis').createClient(Config.redis)
redis.on("error", function (err) {
	console.log("Error " + err)
})

//存入redis
export function set(key, value, expire) {
	return new Promise(function(resolve, reject) {
		const multi = redis.multi()
		multi.set(key, value)
		if (expire) {
			multi.expire(key, expire)
		}
		try {
			multi.exec()
		} catch (e) {
			reject(e)
		}
		resolve()
	})
}

//从redis中取出数据
export function get(key) {
	return new Promise(function(resolve, reject) {
		redis.get(key, (e, result) => {
			if (e) {
				reject(e)
			}
			else {
				resolve(result)
			}
		})
	})
}
