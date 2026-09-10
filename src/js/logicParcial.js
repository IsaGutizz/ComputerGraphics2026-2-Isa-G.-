import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. ESCENA, CÁMARA Y RENDER
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a); // Noche azulada

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(-20, 10, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 10, 0);
controls.update();

// 2. ILUMINACIÓN Y PISO
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(15, 30, 20);
dirLight.castShadow = true;
scene.add(dirLight);

const floorGeo = new THREE.PlaneGeometry(40, 40);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// =========================================================
// TODO: CONSTRUIR LA RUEDA DE LA FORTUNA
// =========================================================

// En esta seccion, debes crear la rueda de la fortuna utilizando geometrías y materiales de Three.js. 

const shapesData = [
    {
        name: 'Soporte1',
        geometry: new THREE.CylinderGeometry( 0.3, 0.3, 10, 32 ),
        color: 0x44B2E9,
        
        posX: 2.5,
        posY: 3.5,
        posZ: -2,
        rotationZ: Math.PI / 6,
    },
    {
        name: 'Soporte2',
        geometry: new THREE.CylinderGeometry( 0.3, 0.3, 10, 32 ),
        color: 0x44B2E9,
        
        posX: -2.5,
        posY: 3.5,
        posZ: -2,
        rotationZ: -Math.PI / 6,
    },
    {
        name: 'Soporte3',
        geometry: new THREE.CylinderGeometry( 0.3, 0.3, 10, 32 ),
        color: 0x44B2E9,
        
        posX: 2.5,
        posY: 3.5,
        posZ: 2,
        rotationZ: Math.PI / 6,
    },
    {
        name: 'Soporte4',
        geometry: new THREE.CylinderGeometry( 0.3, 0.3, 10, 32 ),
        color: 0x44B2E9,
        
        posX: -2.5,
        posY: 3.5,
        posZ: 2,
        rotationZ: -Math.PI / 6,
    },
    {
        name: 'SoporteCentral',
        geometry: new THREE.CylinderGeometry( 0.4, 0.4, 5.1, 32 ),
        color: 0x94a3b8,
        
        posX: 0,
        posY: 8,
        posZ: 0,
        rotationX: Math.PI / 2,
    },
];
const meshes =[];
shapesData.forEach( ( shapeData ) => {
    const material = new THREE.MeshStandardMaterial( { color: shapeData.color, roughness: 0.3, metalness: 0.2} );
    const mesh = new THREE.Mesh( shapeData.geometry, material );
    mesh.position.x = shapeData.posX;
    mesh.position.y = shapeData.posY;
    mesh.position.z = shapeData.posZ;
    
    mesh.rotation.z = shapeData.rotationZ || 0;
    mesh.rotation.x = shapeData.rotationX || 0;

    scene.add( mesh );
    meshes.push( mesh );
} );

const numCabinas = 8;
const radioRueda = 6;
const cabinas = [];

const rueda = new THREE.Group();
rueda.position.y = 8;

scene.add(rueda);

const aroForma = new THREE.TorusGeometry(radioRueda, 0.2, 12, 64);
const aroMaterial = new THREE.MeshStandardMaterial({color: 0x94a3b8});
const aro1 = new THREE.Mesh(aroForma, aroMaterial);
const aro2 = new THREE.Mesh(aroForma, aroMaterial);

aro1.position.z = -1.5;
aro2.position.z = 1.5;

rueda.add(aro1);
rueda.add(aro2);

const radioForma = new THREE.CylinderGeometry(0.08, 0.08, radioRueda * 2, 8);
const radioMaterial = new THREE.MeshStandardMaterial({color: 0xcbd5e1});

for (let i = 0; i < numCabinas; i++) {
const radio = new THREE.Mesh(radioForma, radioMaterial);
const radio2 = new THREE.Mesh(radioForma, radioMaterial);

radio.rotation.z = (i * Math.PI * 2) / numCabinas;
radio2.rotation.z = (i * Math.PI * 2) / numCabinas;

radio.position.z = -1.5;
radio2.position.z = 1.5;
rueda.add(radio);
rueda.add(radio2);
}

for (let i = 0; i < numCabinas; i++) {

    const angulo = (i * Math.PI * 2) / numCabinas;
    const cabina = new THREE.Group();

    cabina.position.x = Math.cos(angulo) * radioRueda;
    cabina.position.y = Math.sin(angulo) * radioRueda;

    const cestaForma= new THREE.BoxGeometry(2, 2, 2);
    const cestaMaterial = new THREE.MeshStandardMaterial({color: 0xf59e0b});

    const techoForma = new THREE.ConeGeometry(1.6, 1.3, 4);
    const techoMaterial = new THREE.MeshStandardMaterial({color: 0xfbbf24});
    const techo = new THREE.Mesh(techoForma, techoMaterial);
    techo.position.y = 1.5;
    techo.rotation.y = Math.PI / 4;

    const cesta = new THREE.Mesh(cestaForma, cestaMaterial);

    cesta.castShadow = true;

    cabina.add(cesta);
    cabina.add(techo);
    rueda.add(cabina);
    cabinas.push(cabina);
}
// Loop de Animación
let velocidadGiro = 0.01;

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

function animate() {
    requestAnimationFrame(animate);

    // Aqui colocar el codigo de Rotación de la rueda
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});