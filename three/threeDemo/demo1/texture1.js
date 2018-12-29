

var renderer=null;//渲染器
function initRenderer(){
    renderer = new THREE.WebGLRenderer({
        antialias : true //抗锯齿
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor(0xFFFFFF, 1);
    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var scene = null;//场景
function initScene(){
    scene=new THREE.Scene();
}

var camera = null;//摄像机
function initCamera(){
	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 400;

    //threejs版本v99 相机以下属性方法不要乱用，容易看不到物体
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new THREE.Vector3(0,0,0)); //v99后的新用法

}

var light1 = null;
function initLight() {
    light1 = new THREE.AmbientLight(0xFFFFFF);//环境光
    light1.position.set(100, 100, 200);
    scene.add(light1);

     /*
    PointLight( color, intensity, distance )

    这个类的参数稍微复杂一些，我们花点时间来解释一下：

    Color：光的颜色

    Intensity：光的强度，默认是1.0,就是说是100%强度的灯光，

    distance：光的距离，从光源所在的位置，经过distance这段距离之后，光的强度将从Intensity衰减为0。 默认情况下，这个值为0.0，表示光源强度不衰减。
    */
   light2 = new THREE.PointLight(0xFF0000,1,0);//点光源
   light2.position.set(110, 110,0);
   scene.add(light2);

   //聚光灯
   /*
   聚光灯的构造函数是：

   THREE.SpotLight( hex, intensity, distance, angle, exponent )

   函数的参数如下所示：

   Hex：聚光灯发出的颜色，如0xFFFFFF

   Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些。和上面点光源一样。

   Distance：光线的强度，从最大值衰减到0，需要的距离。 默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.

   Angle：聚光灯着色的角度，用弧度作为单位，这个角度是和光源的方向形成的角度。

   exponent：光源模型中，衰减的一个参数，越大衰减约快。
   */
   light3 = new THREE.SpotLight(0xFF0000,0.9,0,90,5);
   light3.position.set(500, 300, 200);
   scene.add(light3);

     //方向光
    // 第二个参数是光源强度，你可以改变它试一下0-1，1最强
    light4 = new THREE.DirectionalLight(0x00FF00,1);
    // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    light4.position.set(200,0,10);
    scene.add(light4);
}

var cube=null,cube2=null;//物品
function initCube(){
    var loader = new THREE.TextureLoader();

    //地皮
    var groundTexture = loader.load( 'textures/grasslight-big.jpg' ); //图片大小最好用2的次方
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 30, 30 );
    groundTexture.anisotropy = 16;

    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
    var plane = new THREE.PlaneBufferGeometry( 20000, 20000 );
    var mesh = new THREE.Mesh( plane, groundMaterial );
    mesh.position.y = -250;
    mesh.rotation.x = - Math.PI / 3;
    mesh.receiveShadow = true;
    scene.add( mesh );
    
    /*
	//一个平面
	var geometry3 = new THREE.PlaneGeometry(300,300,1,1);
	//为平面赋予纹理坐标,在正常的情况下，你在0.0到1.0的范围内指定纹理坐标
	geometry3.vertices[0].uv = new THREE.Vector2(0,0);
	geometry3.vertices[1].uv = new THREE.Vector2(2,0);
	geometry3.vertices[2].uv = new THREE.Vector2(2,2);
	geometry3.vertices[3].uv = new THREE.Vector2(0,2);

    */
	//加载纹理
    var texture = loader.load("textures/crate.gif");
    //创建几何图形
    var geometry = new THREE.BoxBufferGeometry(200, 200, 200);//BoxBufferGeometry CubeGeometry
	//将纹理应用于材质
	var material = new THREE.MeshBasicMaterial({map:texture});
    cube = new THREE.Mesh(geometry,material);
    cube.position.z=-100;
	scene.add(cube);

	var geometry2 = new THREE.CubeGeometry(200, 200, 200);
    // 纹理坐标怎么弄
    var texture2 = loader.load("textures/2.jpg");
    var material2 = new THREE.MeshBasicMaterial({map:texture2});
    cube2 = new THREE.Mesh( geometry2,material2 );
    cube2.position.x=300;
    cube2.position.y=200;
    cube2.position.z=-300;
    scene.add( cube2 );

   

}
function initTween(){
    tween1=new TWEEN.Tween(cube.position)
        .to({ x : -200 },3000)
        .delay(1000)
        .easing(TWEEN.Easing.Elastic.InOut)
        //tween1.repeat(Infinity)
    ;

    tweenBack=new TWEEN.Tween(cube.position)
        .to({x:0},2000)
        .easing(TWEEN.Easing.Elastic.InOut)

    ;

    tween1.chain(tweenBack);//下一个动画是 tweenBack
    tweenBack.chain(tween1);
    tween1.start()
}

//初始化统计fps
var stats=null;
function initStats(){
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}


function animation() {
    //renderer.clear();
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.01;
    cube.rotation.z += 0.01;

    cube2.rotation.y += 0.01;
    //cube2.rotation.x += 0.01;
    //cube2.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animation);

    stats.update();//更新监控的fps数据
    TWEEN.update();//动画引擎更新
}

function initPage(){
    initCamera();//摄像机
    initScene();//场景
    initLight();//光源
    initCube();//添加物品到场景中


   
    
    initRenderer();//渲染器

    initStats();//初始化监控fps
    initTween();//初始化动画引擎

    animation();//动起来
    
    
} 

initPage();