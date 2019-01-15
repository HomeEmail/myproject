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
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 2000);
    camera.position.set(100, 200, 300);
    //camera.lookAt(new THREE.Vector3(0,0,0));

}



var scene;

function initScene() {
    scene = new THREE.Scene();
    //three.js实现雾化效果很简单，只需要在给场景scene对象的fog属性添加值就好
    scene.background = new THREE.Color( 0xaaaaaa );
    scene.fog = new THREE.Fog(0xaaaaaa,100,800);//雾的颜色，雾化开始的距离相机的位置，全雾化距离相机的位置）

    //随着距离呈指数增长的雾化效果，只需要设置雾的颜色和浓度即可
    //scene.fog = new THREE.FogExp2(0xff00ff,0.02);

    //场景内所有模型都使用同一种材质
    //scene.overrideMaterial = new THREE.MeshStandardMaterial({color:0x00ffff});


}



//初始化dat.GUI简化试验流程
var gui,datGui;
function initGui() {

    //声明一个保存需求修改的相关数据的对象
    gui = {
        //lightY:30, //灯光y轴的位置

    };

    datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    //datGui.add(gui,"lightY",0,100);

}



var light;

function initLight() {

    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(35,60,50);
    //告诉光需要开启阴影投射
    light.castShadow = true;
    scene.add(light);

}



var mixer,meshHelper,meshNaruto;
var actions = []; //所有的动画数组
var clock = new THREE.Clock();
function initModel() {
    
    //辅助工具
    var helper = new THREE.AxisHelper(50);
    scene.add(helper);

    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(2000,2000);
    var planeMaterial = new THREE.MeshStandardMaterial({color:0xaaaaaa});

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - 0.5 * Math.PI;
    //plane.position.y = -0;
    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;
    scene.add(plane);

    var grid = new THREE.GridHelper(2000,50,0x000000,0x000000);
    grid.material.opacity=0.5;
    grid.material.transparent=true;
    scene.add(grid);

    //加载模型
    var loader = new THREE.FBXLoader();
    loader.load('./models/Naruto.fbx',function(mesh){
        console.log('fbx loaded:',mesh);
        meshNaruto=mesh;
        //添加骨骼辅助
        meshHelper=new THREE.SkeletonHelper(meshNaruto);
        scene.add(meshHelper);

        //设置模型的每个部位都可以投影
        meshNaruto.traverse(function(child){
            if(child.isMesh){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        //AnimationMixer是场景中特定对象的动画播放器。当场景中的多个对象独立动画时，可以为每个对象使用一个AnimationMixer
        mixer = meshNaruto.mixer = new THREE.AnimationMixer(meshNaruto);

        //mixer.clipAction 返回一个可以控制动画的AnimationAction对象  参数需要一个AnimationClip 对象
        //AnimationAction.setDuration 设置一个循环所需要的时间，当前设置了一秒
        //告诉AnimationAction启动该动作
        //action = mixer.clipAction(mesh.animations[0]);
        //action.play();

        
        var animations = datGui.addFolder("animations");

        for(var i=0; i<mesh.animations.length; i++){
            //reateAction(i);
            actions[i] = mixer.clipAction(mesh.animations[i]);
            
            (function(ii){
                gui["action"+ii] = function () {
                    for(var j=0; j<actions.length; j++){
                        if(j === ii){
                            actions[j].play();
                        }
                        else{
                            actions[j].stop();
                        }
                    }
                };
            })(i);
            animations.add(gui, "action"+i);
        }

        //function createAction(i){
            //actions[i] = mixer.clipAction(mesh.animations[i]);
            // gui["action"+i] = function () {
            //     for(var j=0; j<actions.length; j++){
            //         if(j === i){
            //             actions[j].play();
            //         }
            //         else{
            //             actions[j].stop();
            //         }
            //     }
            // };

            //animations.add(gui, "action"+i);
        //}

        //添加暂停所有动画的按键
        // gui.stop = function(){
        //     for(var i=0; i<actions.length; i++){
        //         actions[i].stop();
        //     }
        // };

        //datGui.add(gui, "stop");

        

        meshNaruto.position.y += 109;

        scene.add(meshNaruto);

        actions[24].play();

    });



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

    //设置相机距离原点的最近距离
    controls.minDistance  = 1;

    //设置相机距离原点的最远距离
    controls.maxDistance  = 2000;

    //是否开启右键拖拽
    controls.enablePan = true;

}



function render() {
    var time = clock.getDelta();
    if(mixer){
        mixer.update(time);
    }
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