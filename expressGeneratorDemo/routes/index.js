var express = require('express');
var router = express.Router();


/**路由级中间件，注意顺序*/
router.use(function (req,res,next){

  if(req.session.lastPage){
    console.log('Last page was: '+req.session.lastPage);
  }
  req.session.lastPage='/index';
  
  //获取cookie
  console.log('cookies:'+req.cookies.cookiename);
  if ('undefined' === (typeof req.cookies.cookiename)){
    console.log('deleted cookie');
  }
  //设置cookie
  res.cookie('cookiename','i am a cookie',{ maxAge: 20000,httpOnly:true, path:'/'});//cooike 时长 20 sec
  //清除cookie
  //res.cookie('cookiename','null',{maxAge:0});


  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('token', 'xxoo1100');
  //重定向
  //res.location('/login');
  //res.status(301).send('跳转中...');
  //重定向
  //res.redirect('/login');
  res.render('index', { title: 'Express' });
});

router.get('/logout',function(req,res,next){
	res.send('logout ooh! are u sure?');
});

router.get('/login',function(req,res){
  //res.setHeader('AuthorityId', 'xxoo1100');
  //res.setHeader('Content-Type', 'application/json');//application/x-www-form-urlencoded application/json text/xml form-data ext/html
  //res.send('hello login');
  console.log(req.get('content-type'));
  console.log('req header token: '+req.get('token'));
  //req.xhr//是否是ajax发起的请求
  res.render('login',{title:'login'});
  console.log('login');
});
router.post('/login',function(req,res){
  res.setHeader('token', 'xxoo1100');
  var info=req.body.username+'<br/>'+req.body.pwd;
  res.send(info+'<br/>login success');
  console.log(req.body);
  //console.log(res);
});
router.get('/login/check',function(req,res){
  res.send('login check');
  console.log('/login/check');
});



/**生成指定范围的随机整数*/
function fRandomBy(under, over){ 
  switch(arguments.length){ 
    case 1: return parseInt(Math.random()*under+1); 
    case 2: return parseInt(Math.random()*(over-under+1) + under); 
    default: return 0; 
  } 
} 
var heyuData={
  total: 301,
  records: [
    {
      id: 1,
      gid: 1,
      name: "小传",
      greeting: "春节到，快乐找你谈心，幸福揽你入怀，健康赐你福寿，吉祥赏你好运，平安保你满意，朋友则送你祝福：祝你新春快乐，吉星高照，阖家幸福，万事如意",
      zone: "天河",
      createTime: 1454031784,
      statusCode: "0",
      sortNum: 0
    }
  ],
  pageSize: 8
};

var letter='春节到，快乐找你谈心，幸福揽你入怀，健康赐你福寿，吉祥赏你好运，平安保你满意，朋友则送你祝福：祝你新春快乐，吉星高照，阖家幸福，万事如意';
letter=letter.split('');
function getName(){
  var len=letter.length;
  return letter[fRandomBy(0,len-1)]+letter[fRandomBy(0,len-1)]+letter[fRandomBy(0,len-1)];
}
function getHeyu(){
  var len=letter.length;
  var s='';
  for(var i=0;i<80;i++){
    s+=letter[fRandomBy(0,len-1)];
  }
  return s;
}
function generateData(offset,pageSize){
  heyuData.pageSize=pageSize;
  if((offset+pageSize)>=heyuData.total){
    pageSize=heyuData.total-offset;
  }
  var records=[];
  if(offset<heyuData.total){
    for(var i=0;i<pageSize;i++){
      records.push({
        id:offset+i
        ,gid:offset+i
        ,name:getName()
        ,greeting:getHeyu()
        ,zone: "南海"
        ,createTime: +new Date()
        ,statusCode: "0"
        ,sortNum: 0
      });
    }
  }
  heyuData.records=records;
  return JSON.stringify(heyuData);
}
router.get('/heyu',function(req,res){
  ///heyu?offset=0&pageSize=10
  var offset=req.query.offset||0;
  var pageSize=req.query.pageSize||5;
  offset=parseInt(offset,10);
  pageSize=parseInt(pageSize,10);
  var str=generateData(offset,pageSize);
  res.send(str);
  console.log('/heyu?offset='+offset+'&pageSize='+pageSize);
});

//hifi 获得风格列表
router.get('/hifi/fenge',function(req,res){
  var str='{"code":"0","data":[{"name":"流行","id":12},{"name":"古典","id":11}]}';
  res.send(str);
});

//hifi 根据风格拿专辑
router.get('/hifi/fenge/get',function(req,res){
  var str='{"code":"0","data":{"list":[{"name":"刘德华经典","id":11}],"totalPage":1,"page":1,"total":1}}';
  res.send(str);
});

//hifi 最近播放
router.get('/hifi/history/list',function(req,res){
  var str='{"code":0,"data":{"page":1,"size":6,"count":8,"totalPage":2,"list":[{"id":"1","playTime":"2016-02-26 17:02:44.0","trackName":"单曲3","trackId":"83","duration":"","mp3Url":"","flacUrl":"","vodId":""},{"id":"1","playTime":"2016-02-26 17:02:44.0","trackName":"单曲4","trackId":"84","duration":"","mp3Url":"","flacUrl":"","vodId":""},{"id":"1","playTime":"2016-02-26 17:02:44.0","trackName":"单曲5","trackId":"85","duration":"","mp3Url":"","flacUrl":"","vodId":""},{"id":"1","playTime":"2016-02-26 17:02:44.0","trackName":"单曲6","trackId":"86","duration":"","mp3Url":"","flacUrl":"","vodId":""},{"id":"1","playTime":"2016-02-26 17:02:44.0","trackName":"单曲7","trackId":"87","duration":"","mp3Url":"","flacUrl":"","vodId":""},{"id":"1","playTime":"2016-02-26 17:02:44.0","trackName":"单曲8","trackId":"88","duration":"","mp3Url":"","flacUrl":"","vodId":""},{"id":"1","playTime":"2016-02-26 17:02:44.0","trackName":"单曲9","trackId":"89","duration":"","mp3Url":"","flacUrl":"","vodId":""},{"id":"1","playTime":"2016-02-26 17:02:44.0","trackName":"单曲0","trackId":"80","duration":"","mp3Url":"","flacUrl":"","vodId":""}]}}';
  res.send(str);
});

//hifi首页api
router.get('/hifi/index',function(req,res){

  var str='{"code":"0","data":[{"jingxuan":{"name":"精选","code":"jingxuan_2616","id":2616,"tuList":[{"tu0":{"title":"2016湖南卫视元宵喜乐会","href":"album.html?id=33","id":84330,"img":"2016/02/29/27b32954-da8c-4f16-a4be-33ecb5c82b58.png"}},{"tu1":{"title":"汪峰《谢谢》","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31413&fromTable=hc","id":84333,"img":"2016/02/24/4d93a1d6-4725-4ba9-b8ab-f82ed9c10cdc.png"}},{"tu2":{"title":"《功夫熊猫3》全球主题曲《Try》:周杰伦携爱徒派伟俊演唱 ","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31161&fromTable=hc","id":84334,"img":"2016/02/29/4e3380bd-53d8-442c-b016-4075c960172f.png"}},{"tu3":{"title":"Girl\'s Day《我想你》中文字幕","href":"tvutvgo/quicksearch/detail.action?contentId=29670&channelId=10052&fromTable=hc","id":84335,"img":"2016/02/24/288d4e2a-a162-4cc5-b785-50126c003a53.png"}},{"tu4":{"title":"少女时代《Marry You》","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31854&fromTable=hc","id":84331,"img":"2016/02/24/c4797ac1-78d7-497f-8c9e-ea3c096d57bb.png"}},{"tu5":{"title":"徐佳莹《大雨将至》","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31808&fromTable=hc","id":84336,"img":"2016/02/24/842a6e09-8a8b-4144-9d92-e4cdcfdf3d1c.png"}},{"tu6":{"title":"林俊杰《弹唱》官方版","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31482&fromTable=hc","id":84337,"img":"2016/02/24/449b29be-07d6-44e1-9e5c-045c20dc540a.png"}},{"tu7":{"title":"张碧晨《幸福梦》","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31855&fromTable=hc","id":84338,"img":"2016/02/24/898187ef-e674-4e6e-a88f-7935dd253c00.png"}},{"tu8":{"title":"李克勤《月半小夜曲》演唱会","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31743&fromTable=hc","id":84339,"img":"2016/02/24/dd07abdf-c135-496a-b3e0-564171b5fc2d.png"}}]}},{"hi-res":{"name":"Hi-Res","code":"hi-res_2617","id":2617,"tuList":[{"tu0":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}},{"tu1":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}},{"tu2":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}},{"tu3":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}},{"tu4":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}},{"tu5":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}},{"tu6":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}},{"tu7":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}},{"tu8":{"title":"测试3","href":"tvutvgo/index/newUpgrade.action?month=12","id":84328,"img":"2016/02/23/6db9ad08-f053-4c8a-a17d-f49ab84c7b6d.jpg"}}]}},{"liuxing":{"name":"流行","code":"liuxing_2618","id":2618,"tuList":[{"tu0":{"title":"hifi音乐测试","href":"","id":84349,"img":"2016/02/24/41944583-72b4-4c0b-932c-7721b321f6bc.png"}},{"tu1":{"title":"hifi音乐测试","href":"","id":84350,"img":"2016/02/24/fd4b55f4-ebe2-4b7f-94b9-4d3fdb55c05e.png"}},{"tu2":{"title":"hifi音乐测试","href":"","id":84351,"img":"2016/02/24/11d991fe-18a6-4cd1-a74e-18d15acc851c.png"}},{"tu3":{"title":"hifi音乐测试","href":"","id":84352,"img":"2016/02/24/6e63affa-f217-4617-8aca-b71e7563dce2.png"}},{"tu4":{"title":"hifi音乐测试","href":"3526","id":84357,"img":"2016/02/24/adc546f7-db1c-492f-93fd-bbc70ad39285.png"}},{"tu5":{"title":"hifi音乐测试","href":"345347ds","id":84359,"img":"2016/02/24/f38dd7d8-ec9c-4f28-83c2-36f5d258c09f.png"}},{"tu6":{"title":"hifi音乐测试","href":"36dsg","id":84361,"img":"2016/02/24/30676b92-d72f-445e-b6c5-bf540ceb2078.png"}},{"tu7":{"title":"hifi音乐测试","href":"yjfjftj","id":84365,"img":"2016/02/24/f8d2d82e-c05a-4299-a58d-cee11bab141f.png"}},{"tu8":{"title":"hifi音乐测试","href":"356437","id":84366,"img":"2016/02/24/868e9e23-8c72-4db8-ae89-07656c4e6317.png"}}]}},{"qingyinle":{"name":"轻音乐","code":"qingyinle_2619","id":2619,"tuList":[{"tu0":{"title":"hifi音乐测试","href":"wey7eu","id":84369,"img":"2016/02/24/fe9a0c4b-7722-4d95-83a4-f0bf0aefa8d5.png"}},{"tu1":{"title":"hifi音乐测试","href":"wey7eu","id":84369,"img":"2016/02/24/fe9a0c4b-7722-4d95-83a4-f0bf0aefa8d5.png"}},{"tu2":{"title":"hifi音乐测试","href":"3643tyedert","id":84373,"img":"2016/02/24/e389a92a-d27f-4d99-8490-296025d938a6.png"}},{"tu3":{"title":"hifi音乐测试","href":"ryegdr457346y","id":84375,"img":"2016/02/24/e703e7e9-4d2a-4e8b-9147-c68dfdee6915.png"}},{"tu4":{"title":"hifi音乐测试","href":"wyueryery","id":84376,"img":"2016/02/24/e12a72c9-537f-4918-ac5e-13c5704e089c.png"}},{"tu5":{"title":"hifi音乐测试","href":"wyueryery","id":84376,"img":"2016/02/24/e12a72c9-537f-4918-ac5e-13c5704e089c.png"}},{"tu6":{"title":"hifi音乐测试","href":"54745784","id":84380,"img":"2015/10/19/a38f1ff3-3160-45f5-9bc7-876ed5fe9954.PNG"}},{"tu7":{"title":"hifi音乐测试","href":"54745784","id":84380,"img":"2015/10/19/a38f1ff3-3160-45f5-9bc7-876ed5fe9954.PNG"}},{"tu8":{"title":"hifi音乐测试","href":"35fwet","id":84384,"img":"2016/01/06/2c16053c-1961-4a00-ae9d-61a3ba07b97e.PNG"}}]}},{"gudian":{"name":"古典","code":"gudian_2620","id":2620,"tuList":[{"tu0":{"title":"HIFI音乐测试","href":"111","id":84353,"img":"2016/02/24/1b5f027d-031d-4a7a-aef6-b8836da77400.png"}},{"tu1":{"title":"HIFI音乐测试","href":"1111","id":84354,"img":"2016/02/24/fa94165b-a098-493c-b3b2-262ef39ecb4a.png"}},{"tu2":{"title":"HIFI音乐测试","href":"111","id":84355,"img":"2016/02/24/08f101e9-10c4-4275-a6c4-fa3528b3e27a.png"}},{"tu3":{"title":"HIFI音乐测试","href":"1111","id":84356,"img":"2016/02/24/51aeab5e-1070-45a4-9838-62a4d8890f31.png"}},{"tu4":{"title":"HIFI音乐测试","href":"111","id":84358,"img":"2016/02/24/ced8dc56-5609-4232-9b0f-5a62403d9da4.png"}},{"tu5":{"title":"HIFI音乐测试","href":"1111","id":84360,"img":"2016/02/24/5bbdfa89-0489-41bd-b259-5fc7d7c07835.png"}},{"tu6":{"title":"HIFI音乐测试","href":"1111","id":84362,"img":"2016/02/24/3f37dd11-0f7e-4d12-bfeb-b9ad37ea6d44.png"}},{"tu7":{"title":"HIFI音乐测试","href":"1111","id":84363,"img":"2016/02/24/c8c3c8b8-d1ca-46b4-b009-c378a90a137c.png"}},{"tu8":{"title":"HIFI音乐测试","href":"1111","id":84364,"img":"2016/02/24/3b6f7d55-07b7-43bd-95a0-c818a93a581e.png"}}]}},{"jueshi":{"name":"爵士","code":"jueshi_2621","id":2621,"tuList":[{"tu0":{"title":"李荣浩《有理想》官方版","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31853&fromTable=hc","id":84367,"img":"2016/02/24/2931ddfe-f4b0-4b68-905e-e3220d1bf588.png"}},{"tu1":{"title":"魏晨《白日梦想家》官方版","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31802&fromTable=hc","id":84368,"img":"2016/02/24/07080b71-b30c-4e07-86e1-59eb8605bd3e.png"}},{"tu2":{"title":"魏晨《白日梦想家》官方版","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31802&fromTable=hc","id":84370,"img":"2016/02/24/56b9cbcd-851b-47b1-8afb-8821c68b52ea.png"}},{"tu3":{"title":"张艺兴《青春快乐》","href":"tvutvgo/quicksearch/detail.action?contentId=29142&channelId=10052&fromTable=hc","id":84371,"img":"2016/02/24/7f961822-c308-4f72-b82c-2d66d06cb582.png"}},{"tu4":{"title":"徐佳莹《大雨将至》","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31808&fromTable=hc","id":84374,"img":"2016/02/24/1b0f42f3-2703-44cc-889a-9417c60dc0fd.png"}},{"tu5":{"title":"Turbo《Again》中文字幕","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31807&fromTable=hc","id":84377,"img":"2016/02/24/31cbece6-97d3-4026-8b55-e1e3c997aec7.png"}},{"tu6":{"title":"Goose House《Love & Life》","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31411&fromTable=hc","id":84379,"img":"2016/02/24/60374c2a-ee94-4706-a1a6-08a8838a525f.png"}},{"tu7":{"title":"S·H·E《你曾是少年》","href":"tvutvgo/tvPage/ks_detailNew.jsp?&channelId=10052&contentId=31421&fromTable=hc","id":84381,"img":"2016/02/24/7d8e09f9-5d56-42be-ae00-275f08336dfe.png"}},{"tu8":{"title":"西野加奈《トリセツ》中日字幕","href":"tvutvgo/quicksearch/detail.action?contentId=29547&channelId=10052&fromTable=hc","id":84382,"img":"2016/02/24/6f6579e8-4f62-43cb-9f19-49c97e71b0fb.png"}}]}},{"minzu":{"name":"民族","code":"minzu_2622","id":2622,"tuList":[{"tu0":{"title":"111","href":"","id":84340,"img":"2016/02/24/93e75397-eb1f-4b0b-b94d-5ffdca064e6a.png"}},{"tu1":{"title":"111","href":"","id":84341,"img":"2016/02/24/630bd48c-7dda-4721-85a0-3bd08420b892.png"}},{"tu2":{"title":"111","href":"","id":84342,"img":"2016/02/24/8d54371f-1b01-4ddc-9c80-07aaf040f3a2.png"}},{"tu3":{"title":"111","href":"","id":84343,"img":"2016/02/24/ef178799-8986-4da9-9504-91766b9c07f8.png"}},{"tu4":{"title":"111","href":"","id":84344,"img":"2016/02/24/5792b61c-2d25-469b-b740-1795027dcf58.png"}},{"tu5":{"title":"111","href":"","id":84345,"img":"2016/02/24/07647664-9878-4e3d-a310-7eba51ef228e.png"}},{"tu6":{"title":"111","href":"","id":84346,"img":"2016/02/24/737fafd1-24ca-472b-bb62-b6567eaf8695.png"}},{"tu7":{"title":"111","href":"","id":84347,"img":"2016/02/24/211b3321-63fd-4b94-ab4b-a06de824b2ef.png"}},{"tu8":{"title":"111","href":"","id":84347,"img":"2016/02/24/211b3321-63fd-4b94-ab4b-a06de824b2ef.png"}}]}},{"wode":{"name":"我的","code":"wode_2623","id":2623,"tuList":[{"tu0":{"title":"111","href":"","id":84340,"img":"2016/02/24/93e75397-eb1f-4b0b-b94d-5ffdca064e6a.png"}},{"tu1":{"title":"111","href":"","id":84341,"img":"2016/02/24/630bd48c-7dda-4721-85a0-3bd08420b892.png"}},{"tu2":{"title":"111","href":"","id":84342,"img":"2016/02/24/8d54371f-1b01-4ddc-9c80-07aaf040f3a2.png"}},{"tu3":{"title":"111","href":"","id":84343,"img":"2016/02/24/ef178799-8986-4da9-9504-91766b9c07f8.png"}},{"tu4":{"title":"111","href":"","id":84344,"img":"2016/02/24/5792b61c-2d25-469b-b740-1795027dcf58.png"}},{"tu5":{"title":"111","href":"","id":84345,"img":"2016/02/24/07647664-9878-4e3d-a310-7eba51ef228e.png"}},{"tu6":{"title":"111","href":"","id":84346,"img":"2016/02/24/737fafd1-24ca-472b-bb62-b6567eaf8695.png"}},{"tu7":{"title":"111","href":"","id":84347,"img":"2016/02/24/211b3321-63fd-4b94-ab4b-a06de824b2ef.png"}},{"tu8":{"title":"111","href":"","id":84347,"img":"2016/02/24/211b3321-63fd-4b94-ab4b-a06de824b2ef.png"}}]}}]}';
  res.send(str);
});



module.exports = router;
