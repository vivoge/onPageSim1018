/*CREATE FAKE JSONDATA*/

function getRandom(n,m){
    return Math.round(Math.random()*(m-n)+n);
}
var str1 ="的风景都吉林省身份用户根本对方根据交易地方的法国人的环境的法规记录多少";
var str2 = "英国太阳报报道称这位美国小伙名叫布洛克今年虽然才岁但是身高已经达到了米而且这个生长趋势还没有停止";
var str3 = "互联网家装掀起创业投资热潮据不完全统计年国内共出现多家互联网家装品牌企业其中家企业获得天使轮或轮";
var ary=[];
var resultObj ={};

for(var i=1;i<=19;i++){
    var obj={};
    obj["fodderNum"] = getRandom(11000,28000);
    obj["fodderName"] = str1[getRandom(0,str1.length)]+str2[getRandom(0,str2.length)]+str3[getRandom(0,str3.length)];
    obj["fileSrc"] = "../imgs/a0.mp3";
    ary.push(obj)
}

resultObj["Status"]=1;
resultObj["Message"] = '';
resultObj["userId"] = '';
resultObj["totalPage"] =9;
resultObj["pageNum"] =1;
resultObj["pageSize"] =6;
resultObj["data"] =ary;



var data = JSON.stringify(resultObj);

console.log(data);