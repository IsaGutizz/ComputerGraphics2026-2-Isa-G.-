import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x9F83E6 } );
const cube = new THREE.Mesh( geometry, material );
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
const backgroundColor = new THREE.Color( 0xFFFFFF ); // beige color
renderer.setClearColor( backgroundColor, 1 ); // set background color


scene.add( cube );
scene.add( light );
scene.add( directionalLight );

camera.position.z =5;

function animate( time ) {
  renderer.render( scene, camera );
cube.rotation.x = time / 2000;
cube.rotation.y = time / 500;
}
renderer.setAnimationLoop( animate );