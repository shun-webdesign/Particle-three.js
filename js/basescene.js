//===============================================================
// Import Library
//===============================================================
import * as THREE from 'three';

//===============================================================
// Base scene
//===============================================================
let scene,camera,container,renderer;

init();

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000);
	camera.position.set(70,40,60);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth,window.innerHeight);

	container = document.querySelector('#canvas_vr');
	container.appendChild(renderer.domElement);

	//custom shader pass
    var vertShader = document.getElementById('js/shader/vertex.glsl').textContent
    var fragShader = document.getElementById('js/shader/fragment.glsl').textContent
    var counter = 0.0
    var myEffect = {
        uniforms: {
            "tDiffuse": { value: null },
            "amount":{value: counter}
        },
        vertexShader: vertShader,
        fragShader: fragShader
    }

    var customPass = new THREE.ShaderPass(myEffect)
    customPass.renderToScreen = true
    composer.addPass(customPass)
    customPass.uniforms["amount"].value = counter;

	window.addEventListener('resize',function(){
		camera.aspect = window.innerWidth/window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth,window.innerHeight);
	},false);
}

export { scene, camera, container, renderer }
