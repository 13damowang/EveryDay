const https = require('https')//得到https模块

// const cheerio = require('cheerio')//在node中帮助我们做获取dom结构的插件

const fs = require('fs')//引入fs文件系统模块

const url = "https://api.ethermine.org"
const path = '/miner/:0x67d5ff11fbaf3eb8639eff17a3233ec0f3670112/currentStats'

var share = [20,20,20,20,20]


function getHttp(url) {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			resolve(res)
		})
	})
}


function compute(miner) {
	if (!miner) return
	return {
		time: miner.data.time,//刷新时间戳 
		lastSeen: miner.data.lastSeen,//最后刷新时间戳 
		reportedHashrate: miner.data.reportedHashrate / 1000000, //本地报告算力
		currentHashrate: miner.data.currentHashrate / 1000000,//近一小时算力
		averageHashrate: miner.data.averageHashrate / 1000000,//六小时平均算力
		validShares: miner.data.validShares,//有效
		invalidShares: miner.data.invalidShares,//无效
		staleShares: miner.data.staleShares,//延迟		
		currentshare: miner.data.staleShares * 0.65 + miner.data.validShares,//计数份额
		activeWorkers: miner.data.activeWorkers,//在线工人
		unpaid: miner.data.unpaid,//未付余额
		
	}
}

setInterval((async function () {
	const res = await getHttp(url + path)
	if (res.statusCode === 200) {
		res.on('data', (data) => {
			fs.writeFileSync('a.json', data);

			miner = JSON.parse(data.toString('utf8'))

			const value = compute(miner)

			// console.log(value.currentshare)

			//share数组更新
			var sharetotal = share[0]+share[1]+share[2]+share[3]+share[4]
			var increaseshare = value.currentshare - sharetotal
			
   			share.splice(4,1)
   			share.unshift(increaseshare)
			console.log(share)
		})
	}

}),600000)