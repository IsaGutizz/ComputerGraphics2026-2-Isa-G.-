import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );

//const backgroundColor = new THREE.Color( 0xE8E1D1); 
const backgroundColor = new THREE.Color( 0x0D0D0D); 

scene.background = new THREE.Color( backgroundColor );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );


const light = new THREE.DirectionalLight( 0xFFF391, 1.6 );
light.position.set( -10, 10, 7 );
scene.add( light );

//AÑADI OTRA LUZ PARA VER MEJOR LA ESCENA
const light2 = new THREE.DirectionalLight( 0xffffff, 1 );
light2.position.set( 15, -3, -7 );
scene.add( light2 );

//EL ANILLO FUERA DEL MESH SHAPES DATA PARA AÑADIRLE LA ROTACION INDIVIDUAL
const ring= new THREE.RingGeometry( 2.5, 2, 32);
const material = new THREE.MeshBasicMaterial( { color: 0x7A8385 } );
const anilloJupiter= new THREE.Mesh( ring, material );

anilloJupiter.rotation.x = Math.PI / 2;
anilloJupiter.position.x = 27;

scene.add(anilloJupiter);

//definiendo las esferas de planetas
const shapesData = [
    {
        name: 'Sol',
        geometry: new THREE.SphereGeometry( 5, 32, 32 ),
        color: 0xFFF46B,
        
        posX: 0,
    },
    {
        name: 'Mercurio',
        geometry: new THREE.SphereGeometry( 0.15, 32, 32 ),    
        color: 0x8C8C8C,
        posX: 15,    
    },
    {
        name: 'Venus',
        geometry: new THREE.SphereGeometry( 0.35, 32, 32 ),    
        color: 0xE6C27A,
        posX: 17, 
    }, 
    {
        name: 'Tierra',
        geometry: new THREE.SphereGeometry( 0.38, 32, 32 ),    
        color: 0x2F6DB0,
        posX: 19, 
    },
    {
        name: 'Marte',
        geometry: new THREE.SphereGeometry( 0.22, 32, 32 ),    
        color: 0xC1440E,
        posX: 22, 
    },
    {
        name: 'Jupiter',
        geometry: new THREE.SphereGeometry( 1.5, 32, 32 ),    
        color: 0xC88B5A,
        posX:  27, 
    },
    {
        name: 'Saturno',
        geometry: new THREE.SphereGeometry( 1.3, 32, 32 ),    
        color: 0xD8C28A,
        posX: 35, 
    },
    {
        name: 'Urano',
        geometry: new THREE.SphereGeometry( 0.75, 32, 32 ),    
        color: 0x7DE3E3,
        posX: 40, 
    },
    {
        name: 'Neptuno',
        geometry: new THREE.SphereGeometry( 0.73, 32, 32 ),    
        color: 0x4169E1,
        posX: 45, 
    },
];

const meshes =[];
       
//GENERAR MESHES PARA CADA SHAPE Y AGREGARLOS A LA ESCENA
shapesData.forEach( ( shapeData ) => {
    const material = new THREE.MeshStandardMaterial( { color: shapeData.color, wireframe: false, roughness: 2, metalness: 0.1} );
    const mesh = new THREE.Mesh( shapeData.geometry, material );
    mesh.position.x = shapeData.posX;
    scene.add( mesh );
    meshes.push( mesh );
} );


//CONTROLES DE CAMARA
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 90,20,50 );
controls.update();


function animate( time ) {
  controls.update();

  const speed = 0.0002;
  
meshes.forEach( ( mesh,index ) => {
    
    const shapeData = shapesData[index];

    if (shapeData.name === 'Sol') {
            return;
        }

        const angle = time * speed * (50 / shapeData.posX);
        const distance = shapeData.posX;

        mesh.position.x = Math.cos(angle) * distance;
        mesh.position.z = Math.sin(angle) * distance;

    
    mesh.rotation.y += 0.01;
    
  });

  const angle = time * speed * (50 / 27);

        anilloJupiter.position.x = Math.cos(angle) * 27;
        anilloJupiter.position.z = Math.sin(angle) * 27;

    

 renderer.render( scene, camera );
}

function onWindowResize() {
 
  camera.aspect = window.innerWidth / window.innerHeight;
  
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener('resize', onWindowResize);

function changeVisibilityObject() {
    isWireframe = !isWireframe;
    meshes.forEach( ( mesh ) => {
        mesh.material.wireframe = isWireframe;

        button.textContent = isWireframe ? 'Change Wireframe (true)' : 'Change Wireframe (false)';
    });
}

const button = document.getElementById( 'chWirerframe' );
button.addEventListener( 'click', changeVisibilityObject );

