var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 0;
camera.position.x = 0;

var webGLRenderer = new THREE.WebGLRenderer({
    antialias : true //抗锯齿
});

webGLRenderer.setPixelRatio(window.devicePixelRatio);
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.setClearColor(0x27bcff, 1);
webGLRenderer.shadowMap.enabled = true;
webGLRenderer.shadowMap.type = THREE.PCFShadowMap;
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    webGLRenderer.setSize( window.innerWidth, window.innerHeight );
}

var pointLight = new THREE.PointLight(0xccbbaa, 1, 0, 0);  
pointLight.position.set(-10, 30, -20);
pointLight.castShadow = true;
scene.add(pointLight);


// var dirLight = new THREE.DirectionalLight(0xccbbaa, 0.5, 100);
// dirLight.position.set(-120, 500, -0);
// dirLight.castShadow = true;

// dirLight.shadow.mapSize.width = 1000;
// dirLight.shadow.mapSize.height = 1000;

// dirLight.shadow.camera.near = 2;
// dirLight.shadow.camera.far = 1000;
// dirLight.shadow.camera.left = -50;
// dirLight.shadow.camera.right = 50;
// dirLight.shadow.camera.top = 50;
// dirLight.shadow.camera.bottom = -50;

// scene.add(dirLight);


var light = new THREE.AmbientLight( 0xccbbaa, 0.5 );
scene.add( light );

document.body.appendChild(webGLRenderer.domElement);

//赛道
function Ground() {
    // var meshBasicMaterial = new THREE.MeshLambertMaterial({
    //     color: 0xff0000,
    //     side: THREE.DoubleSide
    // });
    var objLoader = new THREE.OBJLoader();

    objLoader.setPath('../assets/');
    objLoader.load('ground.obj', function(object) {
        object.children.forEach(function(item) {
            item.receiveShadow = true;
        });
        object.position.y = -5;

        
        scene.add(object);

    }, function() {
        console.log('progress Ground');
    }, function() {
        console.log('error');
    });
}

function Car(params){
    var self = this;
    var car;
    this.speed = 0;//前进速度
    this.rSpeed = 0;//方向速度
    this.run = false;//是否前进在跑
    this.backward = false//是否倒退跑
    this.acceleration = 0.01;//加急
    this.deceleration = 0.04;//减缓
    this.accelerationBack = -0.005;//倒退加急
    this.maxSpeed = 2;

    this.light = params.light;

    this.lock = -1;//比如在开始/重新开始前锁住不给操作车
    this.isBrake = false;//刹车

    
    this.dirRotation = 0; // 车身方向 旋转的弧度，弧度是用PI表示的,不是角度单位
    this.realRotation = 0;//真正的方向，包含刹车（偏移）方向

    var mtlLoader = new THREE.MTLLoader();//材质加载器
    mtlLoader.setPath('../assets/');
    mtlLoader.load('car4.mtl', function(materials) {

        materials.preload();
        var objLoader = new THREE.OBJLoader();//模型加载器
        objLoader.setMaterials(materials);
        objLoader.setPath('../assets/');
        objLoader.load('car4.obj', function(object) {
            car = object;
            car.children.forEach(function(item) {
                item.castShadow = true;
            });
            car.position.x = 0;
            car.position.y = -5;
            car.position.z = -20;
            
            params.scene.add(car);//车的前轮是与车分开加载了
            self.car = car;

            !!params.cb&&params.cb();

        }, function() {
            console.log('progress car4');
        }, function() {
            console.log('error');
        });
    });

    self.frontLeftWheel = new Wheel({ //前轮胎
        mtl: 'front_wheel.mtl',
        obj: 'front_wheel.obj',
        parent: car,
        offsetX: -2.79475,
        offsetZ: -3.28386
    });
    self.frontRightWheel = new Wheel({ //前轮胎
        mtl: 'front_wheel.mtl',
        obj: 'front_wheel.obj',
        parent: car,
        offsetX: 2.79475,
        offsetZ: -3.28386
    });


}
Car.prototype.tick = function(){

    if(this.run) {
        this.speed += !!this.backward ? this.accelerationBack : this.acceleration;
        if(this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
    } else {
        this.speed -= this.deceleration;
        if(this.speed < 0) {
            this.speed = 0;
        }
    }
    var speed = -this.speed;
    if(speed === 0) {
        return ;
    }

    var time = Date.now();

    this.dirRotation += this.rSpeed;
    var rotation = this.dirRotation;
    //新步长
    var speedX = Math.sin(rotation) * speed;
    var speedZ = Math.cos(rotation) * speed;

    //车新的坐标点
    var tempX = this.car.position.x + speedX;
    var tempZ = this.car.position.z + speedZ;

    this.realRotation+=this.rSpeed;

    if(this.isBrake){
        this.realRotation+=this.rSpeed*(this.speed/2);
    } else {
        if(this.realRotation !== this.dirRotation) { //漂移后 方向要统一 dirRotation 逐渐向 realRotation 靠;促使摄像机调整方向位置
            this.dirRotation += (this.realRotation - this.dirRotation) / 2000 * (this.speed) * (time - this.cancelBrakeTime); //2000这个数值控制漂移恢复正确方向的速度
           // console.log('漂移后 方向要统一',(this.realRotation - this.dirRotation) / 20000 * (this.speed) * (time - this.cancelBrakeTime));
        }
    }



    //更新光的坐标
    this.light.position.set(-10+tempX, 30, tempZ);
    this.light.shadow.camera.updateProjectionMatrix();

    this.car.rotation.y = this.realRotation;//rotation; //车身方向



    //前轮跟着方向转动
    this.frontLeftWheel.wrapper.rotation.y = this.realRotation;
    this.frontRightWheel.wrapper.rotation.y = this.realRotation;
    this.frontLeftWheel.wheel.rotation.y = (rotation) / 2;
    this.frontRightWheel.wheel.rotation.y = (rotation) / 2;


    this.car.position.x = tempX;
    this.car.position.z = tempZ;
    ///console.log('this.car.position:',this.car.position.x,this.car.position.y,this.car.position.z,'this.car.rotation',this.car.rotation.x,this.car.rotation.y,this.car.rotation.z);

    //前轮跟着车移动
    this.frontLeftWheel.wrapper.position.z += speedZ;
    this.frontLeftWheel.wrapper.position.x += speedX;
    this.frontRightWheel.wrapper.position.z += speedZ;
    this.frontRightWheel.wrapper.position.x += speedX;

    //相机跟着车动
    camera.rotation.y=rotation;
    camera.position.x=this.car.position.x+Math.sin(rotation) * 20;//取20因为是车开始就与摄像机相距20
    camera.position.z=this.car.position.z+Math.cos(rotation) * 20;//取20因为是车开始就与摄像机相距20
    

};

Car.prototype.brake = function() {
   
    this.isBrake = true;
};

Car.prototype.cancelBrake = function() {
    this.cancelBrakeTime = Date.now();
    this.isBrake = false;
};


function rr(r){
    car.frontLeftWheel.wrapper.rotation.x+=r;
    car.frontLeftWheel.wrapper.rotation.y+=r;
    car.frontLeftWheel.wrapper.rotation.z+=r;
}

function Wheel(params) {
    var mtlLoader = new THREE.MTLLoader();
    var self = this;

    mtlLoader.setPath('../assets/');
    mtlLoader.load(params.mtl, function(materials) {

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('../assets/');
        objLoader.load(params.obj, function(object) {

            object.children.forEach(function(item) {
                item.castShadow = true;
            });
            var wrapper = new THREE.Object3D();
            wrapper.position.set(0,-5,-20);
            wrapper.add(object);

            object.position.set(params.offsetX, 0, params.offsetZ);

            scene.add(wrapper);
            self.wheel = object;
            self.wrapper = wrapper;

        }, function() {
            console.log('progress Wheel');
        }, function() {
            console.log('error');
        });
    });

}

var car=new Car({
    scene:scene,
    light:pointLight,
    cb:start
});
var ground;

// start();

function start(){
    ground = new Ground();

    render();
}
function render(){
    car.tick();
    requestAnimationFrame(render);
    webGLRenderer.render(scene,camera);
}


document.body.addEventListener('keydown', function(e) {
    // console.log(e.keyCode);
    switch(e.keyCode) {
        case 87: // w
            car.run = true;
            break;
        case 65: // a
            car.rSpeed = 0.02;
            break;
        case 68: // d
            car.rSpeed = -0.02;
            break;
        case 83://s
            car.run = true;
            car.backward=true;
            break;
        case 32: // space
            car.brake();
            break;
    }
});

document.body.addEventListener('keyup', function(e) {
    switch(e.keyCode) {
        case 87: // w
            car.run = false;
            break;
        case 65: // a
            car.rSpeed = 0;
            break;
        case 68: // d
            car.rSpeed = 0;
            break;
        case 83://s
            car.run = false;
            car.backward=false;
            break;
        case 32: // space
            car.cancelBrake();
            break;
    }
});