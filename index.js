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


// let speedUp = .01
// let speedDown = .01
let myReq
let speed = 0;
const spinBttn = document.querySelector("#spin").addEventListener('click', handleClick)
const stopBttn = document.querySelector("#stop-spin").addEventListener('click', stopAnimate)
// document.addEventListener('keydown', handleClick)
// document.addEventListener('keydown', stopAnimate)
document.addEventListener('keydown', move)

function handleClick() {
    animate()
    speedUp()
}

function render() {
    renderer.render( scene, camera );
}

function animate() {
    myReq = requestAnimationFrame( animate )
    cube.rotation.x += .01;
    cube.rotation.y += .01;
    renderer.render( scene, camera );
}

function stopAnimate() {
    cancelAnimationFrame(myReq)
    speedDown()
}

function speedUp() {
    speed++
    document.querySelector('#speed').innerHTML = `Speed = ${speed}`
}

function speedDown() {
    if(speed > 0) {
        speed--
        document.querySelector('#speed').innerHTML = `Speed = ${speed}`
    }
}

function move() {
    if(event.keyCode === 39) {
        cube.position.x += 3
        renderer.render( scene, camera );
    }

    if(event.keyCode === 37) {
        cube.position.x -= 3
        renderer.render( scene, camera );
    }

    if(event.keyCode === 38) {
        cube.position.y += 3
        renderer.render( scene, camera );
    }

    if(event.keyCode === 40) {
        cube.position.y -= 3
        renderer.render( scene, camera );
    }
}


render();