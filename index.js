// Our Javascript will go here.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.TorusKnotGeometry(10, 3, 64, 8, 2, 3);
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 50;


// let myVar=1;
// const spinFaster = () => {
//     animate();
//     console.log('spinning')
//     myVar++;
// }
// const button = document.querySelector("button")
// button.addEventListener("click", spinFaster)

// let speedUp = .01
// let speedDown = .01


function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += .01;
    // cube.rotation.y += .01;
    renderer.render( scene, camera );
    console.log(cube.rotation)
}
animate();