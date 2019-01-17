var renderer;

function initRender() {

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //告诉渲染器需要阴影效果

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.body.appendChild(renderer.domElement);

}



var camera;

function initCamera() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 100);
    camera.lookAt(new THREE.Vector3(0,0,0));

}



var scene;

function initScene() {
    scene = new THREE.Scene();
    //three.js实现雾化效果很简单，只需要在给场景scene对象的fog属性添加值就好
    //scene.fog = new THREE.Fog(0xff00ff,80,120);//雾的颜色，雾化开始的距离相机的位置，全雾化距离相机的位置）

    //随着距离呈指数增长的雾化效果，只需要设置雾的颜色和浓度即可
    //scene.fog = new THREE.FogExp2(0xff00ff,0.02);

    //场景内所有模型都使用同一种材质
    //scene.overrideMaterial = new THREE.MeshStandardMaterial({color:0x00ffff});

    //添加天空 //给场景添加天空盒子纹理
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath('./textures/skybox/');
    //六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
    var cubeTexture = cubeTextureLoader.load( [
        'px.jpg', 'nx.jpg',
        'py.jpg', 'ny.jpg',
        'pz.jpg', 'nz.jpg'
    ] );
    scene.background = cubeTexture;

}



//初始化dat.GUI简化试验流程
var gui;
function initGui() {

    //声明一个保存需求修改的相关数据的对象
    gui = {
        lightY:30, //灯光y轴的位置
        sphereX:0, //球的x轴的位置
        sphereZ:0, //球的z轴的位置
        cubeX:25, //立方体的x轴位置
        cubeZ:-5 //立方体的z轴的位置

    };

    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.add(gui,"lightY",0,100);
    datGui.add(gui,"sphereX",-30,30);
    datGui.add(gui,"sphereZ",-30,30);
    datGui.add(gui,"cubeX",0,60);
    datGui.add(gui,"cubeZ",-30,30);

}



var light;

function initLight() {

    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(15,30,10);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;
    scene.add(light);

}



var sphere,cube;

function initModel() {
    //上面的球
    var sphereGeometry = new THREE.SphereGeometry(5,200,200);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0xaaaaaa});

    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 5;

    //告诉球需要投射阴影
    sphere.castShadow = true;
    scene.add(sphere);

    //光源的球
    var spGeometry = new THREE.SphereGeometry(5,20,20);
    var spMaterial = new THREE.MeshPhysicalMaterial({color:0xffffff});
    var sp = new THREE.Mesh(spGeometry,spMaterial);
    sp.position.set(15,30,10);//位置和光源一样
    scene.add(sp);

    //辅助工具
    var helper = new THREE.AxisHelper(10);
    scene.add(helper);

    //立方体
    var cubeGeometry = new THREE.CubeGeometry(10,10,8);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 25;
    cube.position.y = 5;
    cube.position.z = -5;

    //告诉立方体需要投射阴影
    cube.castShadow = true;
    scene.add(cube);



    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(1000,1000);
    var planeMaterial = new THREE.MeshStandardMaterial({color:0xaaaaaa});

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - 0.5 * Math.PI;
    plane.position.y = -0;

    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;
    scene.add(plane);
}



//初始化性能插件

var stats;

function initStats() {

    stats = new Stats();

    document.body.appendChild(stats.dom);

}



//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放

var controls;

function initControls() {
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );

    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;

    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;

    //是否可以缩放
    controls.enableZoom = true;

    //是否自动旋转
    controls.autoRotate = false;

    //设置相机距离原点的最远距离
    controls.minDistance  = 1;

    //设置相机距离原点的最远距离
    controls.maxDistance  = 2000;

    //是否开启右键拖拽
    controls.enablePan = true;

}



function render() {
    renderer.render( scene, camera );
}



//窗口变动触发的函数
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize( window.innerWidth, window.innerHeight );
}



function animate() {
    //更新控制器
    render();

    //更新性能插件
    stats.update();

    //更新相关位置
    light.position.y = gui.lightY;
    sphere.position.x = gui.sphereX;
    sphere.position.z = gui.sphereZ;
    cube.position.x = gui.cubeX;
    cube.position.z = gui.cubeZ;

    controls.update();

    requestAnimationFrame(animate);

}



function initPage(){
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();

    animate();

    window.onresize = onWindowResize;

}
//initPage();