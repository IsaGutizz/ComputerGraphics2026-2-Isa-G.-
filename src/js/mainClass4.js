import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.1, 1000 );

//const backgroundColor = new THREE.Color( 0xE8E1D1); 
const backgroundColor = new THREE.Color( 0x0D0D0D); 

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
        name: 'Sol',
        geometry: new THREE.SphereGeometry( 5, 32, 32 ),
        color: 0xFFF46B,
        
        posX: 0,
    },
    {
        name: 'Mercurio',
        geometry: new THREE.SphereGeometry( 0.075, 32, 32 ),    
        color: 0x445DE9,
        posX: 10,    
    },
    {
        name: 'Venus',
        geometry: new THREE.SphereGeometry( 0.0435, 32, 32 ),    
        color: 0x445DE9,
        posX: 11, 
    }, 
    {
        name: 'Tierra',
        geometry: new THREE.SphereGeometry( 0.0458, 32, 32 ),    
        color: 0x445DE9,
        posX: 12, 
    },
    {
        name: 'Marte',
        geometry: new THREE.SphereGeometry( 0.0244, 32, 32 ),    
        color: 0x445DE9,
        posX: 13, 
    },
    {
        name: 'Jupiter',
        geometry: new THREE.SphereGeometry( 0.5026, 32, 32 ),    
        color: 0x445DE9,
        posX:  15, 
    },
    {
        name: 'Saturno',
        geometry: new THREE.SphereGeometry( 0.4185, 32, 32 ),    
        color: 0x445DE9,
        posX: 17, 
    },
    {
        name: 'Saturno ring',
        geometry: new THREE.RingGeometry( 0.6, 1, 32 ),    
        color: 0x445DE9,
        posX: 17, 
    },
    {
        name: 'Urano',
        geometry: new THREE.SphereGeometry( 0.1823, 32, 32 ),    
        color: 0x445DE9,
        posX: 19, 
    },
    {
        name: 'Neptuno',
        geometry: new THREE.SphereGeometry( 0.1770, 32, 32 ),    
        color: 0x445DE9,
        posX: 21, 
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
camera.position.set( 100, 0, 20 );
controls.update();



function animate( time ) {
  renderer.render( scene, camera );
  controls.update();

  meshes.forEach( ( mesh ) => {
    const speed = 0.001;   
    
    mesh.rotation.x = time * speed;
    mesh.rotation.y = time * speed;
  });

}



