// 随机数据
var data = [{ "name": "北京", "value": 43 }, { "name": "天津", "value": 97 }, { "name": "河北", "value": 72 }, { "name": "山西", "value": 46 }, { "name": "内蒙古", "value": 5 }, { "name": "辽宁", "value": 92 }, { "name": "吉林", "value": 71 }, { "name": "黑龙江", "value": 25 }, { "name": "上海", "value": 68 }, { "name": "江苏", "value": 87 }, { "name": "浙江", "value": 94 }, { "name": "安徽", "value": 67 }, { "name": "福建", "value": 56 }, { "name": "江西", "value": 11 }, { "name": "山东", "value": 88 }, { "name": "河南", "value": 85 }, { "name": "湖北", "value": 34 }, { "name": "湖南", "value": 57 }, { "name": "广东", "value": 58 }, { "name": "广西", "value": 45 }, { "name": "海南", "value": 31 }, { "name": "重庆", "value": 84 }, { "name": "四川", "value": 98 }, { "name": "贵州", "value": 31 }, { "name": "云南", "value": 38 }, { "name": "西藏", "value": 18 }, { "name": "陕西", "value": 15 }, { "name": "甘肃", "value": 28 }, { "name": "青海", "value": 52 }, { "name": "宁夏", "value": 27 }, { "name": "新疆", "value": 75 }, { "name": "台湾", "value": 65 }, { "name": "香港", "value": 65 }, { "name": "澳门", "value": 50 }, { "name": "南海诸岛", "value": 65 }, { "name": "南海诸岛", "value": 67 }];
// 初始化图表
var map = new Highcharts.Map('map', {
  title: {
    text: '中国地图'
  },
  colorAxis: {
    min: 0,
    minColor: 'rgb(255,255,255)',
    maxColor: '#006cee'
  },
  series: [{
    data: data,
    name: '随机数据',
    mapData: Highcharts.maps['cn/china'],
    joinBy: 'name' // 根据 name 属性进行关联
  }]
});