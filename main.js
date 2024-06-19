import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight 
}

const light = new THREE.PointLight (0x00ffff, 1, 100);
light.position.set(-10, -10, -15);
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight * 0.75) , 0.1, 100);
camera.position.z = 10;
camera.up.set(0, 0, -1);


const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3);
renderer.render(scene,camera)

const startColor = new THREE.Color(0x00ffff);
const color1 = new THREE.Color(0xff00ff);
const color2 = new THREE.Color(0xffff00);
const color3 = new THREE.Color(0x00ff00);
let currentRotation = 0;

const controls = new OrbitControls(camera, canvas);
controls.enabled = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

window.addEventListener("resize" , () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect =sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

function animate(){
  window.requestAnimationFrame(animate);

  mesh.rotation.y += 0.01;
  currentRotation += 0.01;

  let normalizedRotation = currentRotation % (2 * Math.PI);
  if (normalizedRotation < 0) {
    normalizedRotation += 2* Math.PI;
  }
  const rotationPercentage = normalizedRotation / (2 * Math.PI) 

  if (rotationPercentage <= 0.25) {
    light.color.copy(startColor.clone().lerp(color1, rotationPercentage * 4));
  }
  else if (rotationPercentage <= 0.50) {
    light.color.copy(color1.clone().lerp(color2, (rotationPercentage - 0.25) * 4));
  }
  else if (rotationPercentage <= 0.75) {
    light.color.copy(color2.clone().lerp(color3, (rotationPercentage - 0.5) * 4));
  }
  else {
    light.color.copy(color3.clone().lerp(startColor, (rotationPercentage - 0.75) * 4));
  }

  controls.update();
  renderer.render(scene, camera);
}

animate()