import *as THREE from "three"

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.y = 6;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );



var geometry = new THREE.SphereBufferGeometry( 0.6, 16, 16);
var cube = new THREE.Mesh( geometry, material );
cube.position.set(1,0.5,1);
var cube1 = new THREE.Mesh( geometry, material );
cube1.position.set(-1,0.5,1);
var cube2 = new THREE.Mesh( geometry, material );
cube2.position.set(1,0.5,-1);
var cube3 = new THREE.Mesh( geometry, material );
cube3.position.set(-1,0.5,-1);

scene.add( cube );
scene.add( cube1 );
scene.add( cube2 );
scene.add( cube3 );


scene.add(new THREE.AmbientLight(0x666666));

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
directionalLight.castShadow = false;
directionalLight.position.set(-2,4,-2);
directionalLight.target = cube;

scene.add( directionalLight );




//COMPOSER
var composer = new THREE.EffectComposer(renderer);
var renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

//custom shader pass
var vertShader = document.getElementById('js/shader/vertex.glsl').textContent;
var fragShader = document.getElementById('js/shader/fragment.glsl').textContent;
var counter = 0.0;
var myEffect = {
  uniforms: {
    "tDiffuse": { value: null },
    "amount": { value: counter }
  },
  vertexShader: vertShader,
  fragmentShader: fragShader
}

var customPass = new THREE.ShaderPass(myEffect);
customPass.renderToScreen = true;
composer.addPass(customPass);

//RENDER LOOP
render();


function render() {

  var timer = Date.now() * 0.0002;
  camera.position.x = Math.cos(timer) * 10;
  camera.position.z = Math.sin(timer) * 10;
  camera.lookAt(new THREE.Vector3(0,1,0));

  counter += 0.01;
  customPass.uniforms["amount"].value = counter;

  requestAnimationFrame( render );
  composer.render();
}
