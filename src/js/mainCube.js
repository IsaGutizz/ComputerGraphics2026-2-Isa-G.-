import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const backgroundColor = new THREE.Color( 0xE8E1D1); 
//const backgroundColor = new THREE.Color( 0x0D0D0D); 

scene.background = new THREE.Color( backgroundColor );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

const light = new THREE.DirectionalLight( 0xffffff, 1.2 );
light.position.set( 5, 10, 7 );
scene.add( light );

//defnition of primitive shapes
const shapesData = [
    {
        name: 'Cube',
        geometry: new THREE.BoxGeometry( 1, 2.5, 1 ),
        color: 0x44B2E9,
        
        posX: -4,
    },
    {
        name: 'Sphere',
        geometry: new THREE.SphereGeometry( 1, 32, 32 ),    
        color: 0x445DE9,
        posX: -2,    
    },
    {
        name: 'Cylinder',
        geometry: new THREE.CylinderGeometry( 0.7, 0.7, 2.5, 32 ),
        color: 0x9144E9,
        posX: 0,
    }, 
    {
        name: 'Torus',
        geometry: new THREE.TorusGeometry( 1, 0.3, 16, 100 ),
        color: 0xE94478,
        posX: 2,
    },
    {
        name: 'cone',
        geometry: new THREE.ConeGeometry( 0.7, 2.5, 32 ),
        color: 0xE98C44,
        posX: 4,
    },
];

//ARREGLO DE OBJETOS
const meshes =[];
let isWireframe = false;

const wireframeButton = document.getElementById('wireframeButton');


wireframeButton.addEventListener('click', () => {
    isWireframe = !isWireframe;
    
    meshes.forEach( ( mesh ) => {
        mesh.material.wireframe = isWireframe;
    });

    wireframeButton.textContent = isWireframe ? 'Desactivar Wireframe' : 'Activar Wireframe';
});
 

//GENERAR MESHES PARA CADA SHAPE Y AGREGARLOS A LA ESCENA
shapesData.forEach( ( shapeData ) => {
    const material = new THREE.MeshStandardMaterial( { color: shapeData.color, wireframe: isWireframe, roughness: 0.3, metalness: 0.2} );
    const mesh = new THREE.Mesh( shapeData.geometry, material );
    mesh.position.x = shapeData.posX;
    scene.add( mesh );
    meshes.push( mesh );
} );


//CONTROLES DE CAMARA
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, -1.5, 9 );
controls.update();


// GRID 
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
// AXES X Y
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

function animate( time ) {
  renderer.render( scene, camera );
  controls.update();

  meshes.forEach( ( mesh ) => {
    const speed = 0.001;   
    
    mesh.rotation.x = time * speed;
    mesh.rotation.y = time * speed;
  });

}



