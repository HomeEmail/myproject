var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 0;
camera.position.x = 0;

var webGLRenderer = new THREE.WebGLRenderer({
    antialias : true //抗锯齿
});

webGLRenderer.setPixelRatio(window.devicePixelRatio);
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.setClearColor(0x333333, 1);

var light = new THREE.AmbientLight( 0xccbbaa, 0.5 );
scene.add( light );

document.body.appendChild(webGLRenderer.domElement);
var oo;
function Wheel() {
    var mtlLoader = new THREE.MTLLoader();
    //var self = this;

    mtlLoader.setPath('../obj/');
    mtlLoader.load('123.mtl', function(materials) {

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('../obj/');
        objLoader.load('123.obj', function(object) {

            object.children.forEach(function(item) {
                item.castShadow = true;
            });

            // var wrapper = new THREE.Object3D();
            // wrapper.position.set(0,-5,-20);
            // wrapper.add(object);

            object.position.set(0, 0, -1000);

            scene.add(object);
            oo=object;

        }, function() {
            console.log('progress Wheel');
        }, function() {
            console.log('error');
        });
    });

}
start();
function start(){
    ground = new Wheel();

    render();
}
function render(){
    requestAnimationFrame(render);
    webGLRenderer.render(scene,camera);
}

