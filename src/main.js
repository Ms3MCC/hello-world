import * as THREE from 'three';

console.log(THREE)


const scene = new THREE.Scene()

const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color:"red"})
const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)

console.log(cubeMesh)


scene.add(cubeMesh)
console.log(scene)

console.log(window)

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,30)

camera.position.z=5
// scene.add(camera)

const canvas =document.querySelector('canvas.threejs')
console.log(canvas)

const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,camera)