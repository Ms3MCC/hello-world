import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { NURBSCurve } from 'three/addons/curves/NURBSCurve.js';
import { NURBSSurface } from 'three/addons/curves/NURBSSurface.js';
import { NURBSVolume } from 'three/addons/curves/NURBSVolume.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


// // // create a scene

const scene = new  THREE.Scene()
scene.background = new THREE.Color( 'black' );

// // //setup a camera

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,2000)
camera.position.set(0,0,15)

// // // setup the renderer and attach to canvas
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// // // add lights

const ambientLight = new THREE.AmbientLight(0x404040,100); // Ambient light
scene.add(ambientLight);


// // //create your geometry etc
const controlPoints = [
    [new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(2, 0, 3, 1), new THREE.Vector4(4, 0, 0, 1)],
    [new THREE.Vector4(0, 2, 3, 1), new THREE.Vector4(2, 2, 5, 1), new THREE.Vector4(4, 2, 3, 1)],
    [new THREE.Vector4(0, 4, 0, 1), new THREE.Vector4(2, 4, 3, 1), new THREE.Vector4(4, 4, 0, 1)],
];

const controlPoints2 = [
    [new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(0, 2, 0, 1), new THREE.Vector4(4, 4, 0, 1)],
    [new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(0, 0, 0, 1)],
    [new THREE.Vector4(5, 0, 0, 1), new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(0, 0, 0, 1)],
];


const controlPoints3 = [
    [new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(4, 0, 0, 1), new THREE.Vector4(8, 0, 0, 1)],
    [new THREE.Vector4(0, 4, 0, 1), new THREE.Vector4(4, 4, 0, 1), new THREE.Vector4(8, 4, 0, 1)],
    [new THREE.Vector4(0, 8, 0, 1), new THREE.Vector4(4, 8, 0, 1), new THREE.Vector4(8, 8, 0, 1)],
];

const controlPoints4 = [
    [new THREE.Vector4(0, 8, 4, 1), new THREE.Vector4(7, 4, 0, 1), new THREE.Vector4(2, 16, 5, 1), new THREE.Vector4(0, 8, 4, 1)],
    [new THREE.Vector4(0, 8, 2, 1), new THREE.Vector4(7, 4, -2, 1), new THREE.Vector4(2, 16, 3, 1), new THREE.Vector4(0, 8, 2, 1)],
    [new THREE.Vector4(0,8, 0, 1), new THREE.Vector4(7, 4, -4, 1), new THREE.Vector4(2, 16, 1, 1), new THREE.Vector4(0, 8, 0, 1)],
];

console.log('Control Points:', controlPoints);

const degreeU = 2;
const degreeV = 2;
const knotsU = [0, 0, 0,1, 1, 1]; // degreeU + numControlPointsU + 1 = 8
const knotsV = [0, 0, 0,1, 1, 1];

console.log('KnotsU:', knotsU, 'KnotsV:', knotsV);

const nurbsSurface = new NURBSSurface(degreeU, degreeV, knotsU, knotsV, controlPoints);
console.log('NURBSSurface:', nurbsSurface);

function getSurfacePoint( u, v, target ) {

    return nurbsSurface.getPoint( u, v, target );

}
const nurbsGeometry = new ParametricGeometry( getSurfacePoint, 500, 500 );

const map = new THREE.TextureLoader().load( 'static/textures/image6.jpg' );
map.wrapS = map.wrapT = THREE.RepeatWrapping;
map.anisotropy = 16;
map.colorSpace = THREE.SRGBColorSpace;
console.log(map)

const material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );
// const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const curveObject = new THREE.Line(nurbsGeometry, material);
// curveObject.position.set(-5,-5,-5)
curveObject.position.set(6,-3,0)
scene.add(curveObject)

// second object



const nurbsSurface2 = new NURBSSurface(degreeU, degreeV, knotsU, knotsV, controlPoints2);

function getSurfacePoint2(u, v, target) {
    return nurbsSurface2.getPoint(u, v, target);
}

const nurbsGeometry2 = new ParametricGeometry( getSurfacePoint2, 500, 500 );
const curveObject2 = new THREE.Mesh(nurbsGeometry2, material);
curveObject2.position.set(-10,0,3)
curveObject2.rotation.z = Math.PI;
scene.add(curveObject2)



// third object 

const nurbsSurface3 = new NURBSSurface(degreeU, degreeV, knotsU, knotsV, controlPoints4);



function getSurfacePoint3(u, v, target) {
    return nurbsSurface3.getPoint(u, v, target);
}

const nurbsGeometry3 = new ParametricGeometry( getSurfacePoint3, 500, 500 );
const curveObject3 = new THREE.Mesh(nurbsGeometry3, material);
curveObject3.position.set(-2,-4,-5)
scene.add(curveObject3)



// 4th object

const degreeU4 = 2;
const degreeV4 = 3;
const knotsU4 = [0, 0, 0,1, 1, 1]; // degreeU + numControlPointsU + 1 = 8
const knotsV4 = [0, 0, 0,0,1,1, 1, 1];


const nurbsSurface4 = new NURBSSurface(degreeU4, degreeV4, knotsU4, knotsV4, controlPoints4);

function getSurfacePoint4(u, v, target) {
    return nurbsSurface4.getPoint(u, v, target);
}

const nurbsGeometry4 = new ParametricGeometry( getSurfacePoint4, 500, 500 );
const curveObject4 = new THREE.Mesh(nurbsGeometry4, material);
curveObject4.position.set(-2,-4,-5)
scene.add(curveObject4)



//5th object

const curveObject5 =new THREE.Mesh(nurbsGeometry4, material);

curveObject5.position.set(-3,-13,0)
scene.add(curveObject5)

//6th object

const curveObject6 =new THREE.Mesh(nurbsGeometry4, material);

curveObject6.position.set(-3,-13,4)
// curveObject6.rotation.y = Math.PI;
curveObject6.rotation.y = Math.PI;
scene.add(curveObject6)



// // //render a scene
renderer.render(scene, camera);

//controls

const controls = new OrbitControls(camera,canvas)
controls.enableDamping=true

function animate() {
    requestAnimationFrame(animate);

    // Rotate the scene for better view
    // curveObject.rotation.x += 0.01;
    // curveObject.rotation.y += 0.01;
    // curveObject.position.x=Math.sin(curveObject.rotation.y)*2
    // curveObject.position.z=Math.sin(curveObject.rotation.x)*2
    // curveObject2.rotation.x -= 0.01;
    // curveObject2.rotation.y -= 0.01;
    // curveObject2.position.x=-Math.sin(curveObject2.rotation.y)
    // curveObject2.position.z=-Math.sin(curveObject2.rotation.x)*2
    renderer.render(scene, camera);
    controls.update()
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


