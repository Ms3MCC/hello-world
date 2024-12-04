// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// console.log(THREE)


// const scene = new THREE.Scene()

// const cubeGeometry = new THREE.BoxGeometry(1,1,1)
// const cubeMaterial = new THREE.MeshBasicMaterial({color:"red"})
// const cubeMesh = new THREE.Mesh(
//   cubeGeometry,
//   cubeMaterial
// )


// console.log(cubeMesh)


// scene.add(cubeMesh)
// console.log(scene)

// console.log(window)





// const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,30)

// const ar =window.innerWidth/window.innerHeight // aspect ratio
// // const camera =new  THREE.OrthographicCamera(-1,
// //   1*ar,
// //   1*ar,
// //   -1,
// //   0.1,
// //   200
// // )

// camera.position.z=5
// // scene.add(camera)

// const canvas =document.querySelector('canvas.threejs')
// console.log(canvas)

// const renderer = new THREE.WebGLRenderer({canvas})

// const controls = new OrbitControls(camera,canvas)

// renderer.setSize(window.innerWidth,window.innerHeight)
// controls.enableDamping=true
// controls.autoRotate=true
// const renderLoop=()=>{
 
//   controls.update()
//   renderer.render(scene,camera)
//   window.requestAnimationFrame(renderLoop)
// }

// renderLoop()






import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene 1
const scene1 = new THREE.Scene();
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene1.add(cubeMesh);

const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
camera1.position.z = 5;

const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera1, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

// Scene 2
const scene2 = new THREE.Scene();

const box1Geometry = new THREE.BoxGeometry();
const box1Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box1 = new THREE.Mesh(box1Geometry, box1Material);
scene2.add(box1);

const box2Geometry = new THREE.BoxGeometry();
const box2Material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene2.add(box2);

box1.position.set(-1, 0, 0);
box2.position.set(1, 0, 0);

const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
camera2.position.z = 5;

const box1BB = new THREE.Box3().setFromObject(box1);
const box2BB = new THREE.Box3().setFromObject(box2);

const speed = 0.02;

// Active scene management
let activeScene = 1;

// Main Animation Loop
function animate() {
  requestAnimationFrame(animate);

  if (activeScene === 1) {
    controls.update();
    renderer.render(scene1, camera1);
  } else if (activeScene === 2) {
    // Animate boxes in Scene 2
    box1.rotation.x += 0.01;
    box1.rotation.y += 0.01;
    box1.position.x += speed;

    box2.rotation.x += 0.01;
    box2.rotation.y += 0.01;
    box2.position.x -= speed;

    // Collision detection
    box1BB.setFromObject(box1);
    box2BB.setFromObject(box2);

    if (box1BB.intersectsBox(box2BB)) {
      box1.position.x -= 2*speed;
      box2.position.x += 2*speed;
    }

    renderer.render(scene2, camera2);
  }
}

// Scene Switching with Keyboard
window.addEventListener('keydown', (event) => {
  if (event.key === '1') {
    activeScene = 1; // Switch to Scene 1
  } else if (event.key === '2') {
    activeScene = 2; // Switch to Scene 2
  }
});

// Start Animation
animate();



