
var renderer=null;//渲染器
function initRenderer(){
    renderer = new THREE.WebGLRenderer({
        antialias : true //抗锯齿
    });
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


var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;

function initEvent(){
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
}

function onDocumentMouseDown( event ) {

    event.preventDefault();

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp() {

    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut() {

    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

    }

}

var scene = null;//场景
function initScene(){
    scene=new THREE.Scene();
}

var camera = null;//摄像机
function initCamera(){
    //透视投影
    /*
        PerspectiveCamera( fov, aspect, near, far )
        1、视角fov：这个最难理解,我的理解是,眼睛睁开的角度,即,视角的大小,如果设置为0,相当你闭上眼睛了,所以什么也看不到,如果为180,那么可以认为你的视界很广阔,但是在180度的时候，往往物体很小，因为他在你的整个可视区域中的比例变小了。

        2、近平面near：这个呢，表示你近处的裁面的距离。补充一下，也可以认为是眼睛距离近处的距离，假设为10米远，请不要设置为负值，Three.js就傻了,不知道怎么算了,

        3、远平面far：这个呢，表示你远处的裁面,

        4、纵横比aspect：实际窗口的纵横比，即宽度除以高度。这个值越大，说明你宽度越大，那么你可能看的是宽银幕电影了，如果这个值小于1，那么可能你看到的是如下的图中的LED屏幕了。
    */
    camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 0.1, 1000);
    //camera.position.z = 5;

    //正投影
    //var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );//相机正好在窗口的中心点上
    //scene.add( camera );

    camera.position.x = 200;
    camera.position.y = 0;
    camera.position.z = 200;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new THREE.Vector3(0,0,0));
}

var light1=null,light2=null,light3=null,light4=null;//光源
function initLight() {
    light1 = new THREE.AmbientLight(0xFF0000);//环境光
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
    light3 = new THREE.SpotLight(0xFF0000,0.9,0,60,10);
    light3.position.set(300, 300, 200);
    scene.add(light3);


    //方向光
    // 第二个参数是光源强度，你可以改变它试一下0-1，1最强
    light4 = new THREE.DirectionalLight(0x00FF00,1);
    // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    light4.position.set(0,0,10);
    scene.add(light4);

}

var cube=null;//物品
var cube2=null;
var group=null;
function initCube(){
    group = new THREE.Group();
    group.position.y = 0;

    scene.add( group );

    var geometry = new THREE.CubeGeometry(100,100,100);
    //var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var material = new THREE.MeshLambertMaterial( { color:0x990000} );

    cube = new THREE.Mesh(geometry, material);
    cube.position = new THREE.Vector3(0,0,0);
    group.add(cube);

    var geometry2 = new THREE.CubeGeometry(100,100,100);
    var material2 = new THREE.MeshLambertMaterial({color:0xFFFFFF});
    cube2 = new THREE.Mesh(geometry2,material2);
    //cube2.position = new THREE.Vector3(0,120,0);
    cube2.position.set(10,150,0);
    group.add(cube2);

   
                
}
//动画控制引擎
var tween1=null,tweenBack=null;
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

function animation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //cube.rotation.z += 0.01;

    group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05; //鼠标拖动旋转

    camera.lookAt(new THREE.Vector3(0,0,0));

    renderer.clear();
    renderer.render(scene, camera);

    
    requestAnimationFrame(animation);

    
    stats.update();//更新监控的fps数据

    TWEEN.update();//动画引擎更新
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


function initPage(){
    initRenderer();//渲染器
    initScene();//场景
    initCamera();//摄像机
    initLight();//光源
    initCube();//添加物品到场景中


    initStats();//初始化监控fps
    initTween();//初始化动画引擎
    animation();//动起来
    
    initEvent();
}
