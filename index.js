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
    // debugger;
    if(audioContext.state === 'suspended') {
        audioContext.resume()
        this.dataset.playing = 'false'
    } 
    // debugger;
    if(this.dataset.playing === 'true') {
        audioElement.pause()
        this.dataset.playing = 'false'
    } else if (this.dataset.playing === 'false') {
        audioElement.play()
        this.dataset.playing = 'true'

    }
})

const gainNode = audioContext.createGain();
track.connect(gainNode).connect(audioContext.destination);

//Analyser

var analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Connect the source to be analysed
track.connect(analyser);

// Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById("oscilloscope");
var canvasCtx = canvas.getContext("2d");

// draw an oscilloscope of the current audio source
function draw() {
    requestAnimationFrame(draw);
    
  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(200, 200, 200)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 1;
  canvasCtx.strokeStyle = "red";

  canvasCtx.beginPath();
  canvasCtx.beginPath();

  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {

    var v = dataArray[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

draw();



document.querySelector('input').addEventListener('input', function() {
     gainNode.gain.value = this.value
})

const analyserNode = audioContext.createAnalyser();
track.connect(analyserNode)

console.log(analyserNode.getByteFrequencyData)





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
    debugger;
    for (let i = 0; i < bufferLength; i++) {
        let height = 0;

        if(i===0) {
            height = 0;
        } else {
            let v = dataArray[i] / 128.0;
            height = v * window.innerHeight / 2;
        }

        cubes.forEach(cube => {
            // cube.position.x += .01;
            cube.position.y = height;
        })
    }
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