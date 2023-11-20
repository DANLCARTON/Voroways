import * as THREE from "three"
import * as d3 from "d3"
import { OrbitControls } from 'OrbitControls'; // importation de l'addon Orbit Controls pour la gestion de la caméra

// BASIC SETUP
const width = 100
const height = 100
const nbVertices = 10

// définition de la scene et de la caméra
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1100000);
camera.position.y = 5   
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// lumières
scene.add(new THREE.AmbientLight(0xd2b48c, 5))
    // définition des contrôles de la caméra
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(camera)

// FUCTIONS
// ---------------------------------------------------------------

var vertices = d3.range(100).map(function(d) {
    return [Math.random() * width, Math.random() * height];
});

// console.log(vertices);

var delaunay = d3.Delaunay.from(vertices);
const voronoi = delaunay.voronoi();

const polygons = Array.from(voronoi.cellPolygons());

console.log(polygons);



// ACTUAL CODE
// ----------------------------------------------------------------

const shape = new THREE.BoxGeometry(1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
const mesh = new THREE.Mesh(shape, material)
scene.add(mesh)

// ----------------------------------------------------------------









// LOOP

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// on applique des règles autant de fois qu'on a défini d'itérations 
animate();