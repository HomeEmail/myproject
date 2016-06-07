

var renderer=null;//渲染器
function initRenderer(){
    renderer = new THREE.WebGLRenderer({
        antialias : true //抗锯齿
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xFFFFFF, 1);
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
	camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1000);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 400;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 0;
    camera.lookAt({
        x : 0,
        y : 0,
        z : 0
    });

}

var light1 = null;
function initLight() {
    light1 = new THREE.AmbientLight(0xFFFFFF);//环境光
    light1.position.set(100, 100, 200);
    scene.add(light1);
}

var cube=null,cube2=null;//物品
function initCube(){
	//一个平面
	var geometry = new THREE.PlaneGeometry(300,300,1,1);
	//为平面赋予纹理坐标,在正常的情况下，你在0.0到1.0的范围内指定纹理坐标
	geometry.vertices[0].uv = new THREE.Vector2(0,0);
	geometry.vertices[1].uv = new THREE.Vector2(2,0);
	geometry.vertices[2].uv = new THREE.Vector2(2,2);
	geometry.vertices[3].uv = new THREE.Vector2(0,2);

	//加载纹理
	var texture = THREE.ImageUtils.loadTexture("textures/a.jpg",null,function(t){

	});
	//将纹理应用于材质
	var material = new THREE.MeshBasicMaterial({map:texture});
	cube = new THREE.Mesh(geometry,material);
	scene.add(cube);

	var geometry2 = new THREE.CubeGeometry(150, 150, 150);
    // 纹理坐标怎么弄
    var texture2 = THREE.ImageUtils.loadTexture("textures/2.jpg",null,function(t)
    {
    });
    var material2 = new THREE.MeshBasicMaterial({map:texture2});
    cube2 = new THREE.Mesh( geometry2,material2 );
    cube2.position.x=300;
    cube2.position.y=200;
    cube2.position.z=0;
    scene.add( cube2 );
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
    //cube.rotation.y += 0.01;
    cube2.rotation.y += 0.01;
    cube2.rotation.x += 0.01;
    cube2.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animation);

    stats.update();//更新监控的fps数据

    //TWEEN.update();//动画引擎更新
}

function initPage(){
    initRenderer();//渲染器
    initScene();//场景
    initCamera();//摄像机
    initLight();//光源
    initCube();//添加物品到场景中


    initStats();//初始化监控fps
    //initTween();//初始化动画引擎
    animation();//动起来
}