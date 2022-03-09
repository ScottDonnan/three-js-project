// camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//object
const geometry = new THREE.BoxGeometry(1,1,1);

function makeShape(geometry, color, x = 0, y = 0) {
    const material = new THREE.MeshPhongMaterial( {color} )

    const cube = new THREE.Mesh( geometry, material )

    scene.add( cube )

    cube.position.x = x
    cube.position.y = y

    return cube;
}

const cubes = [
    makeShape(geometry, 0x44aa88, 0),
    makeShape(geometry, 0x8844aa, -2),
    makeShape(geometry, 0xaa8844, 2),
    makeShape(geometry, 0xaa8844, 0, 2),
]

//lighting
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1)
directionalLight.position.set(-1, 2, 6)
directionalLight.castShadow = true;
scene.add( directionalLight )

camera.position.z = 5;

//scene adjustments
const color = new THREE.Color();
scene.background = color;


//sound
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const audioElement = document.querySelector('audio')
const track = audioContext.createMediaElementSource(audioElement)
track.connect(audioContext.destination)

document.querySelector('#play').addEventListener('click', function() {
    debugger;
    if(audioContext.state === 'suspended') {
        audioContext.resume()

    } else {
        audio
    }

    if(this.dataset.playing === true) {
        audioElement.pause()
    } else {
        audioElement.play()

    }
})




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
    console.log("animate clicked")
    myReq = requestAnimationFrame( animate )

    cubes.forEach(cube => {
        cube.rotation.x += .01;
        cube.rotation.y += .01;
    })
    
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