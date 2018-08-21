/* global variables */
var renderer;
var scene;
var camera;
var stats;
var control;

function init() {

    // create a scene, that will hold all our elements
    // such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    // position and point the camera to the center
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 13;
    camera.lookAt(scene.position);

    // create a renderer, set the background color and size
    renderer = setRenderer();
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // var cube = createCube();
    // scene.add(cube);

    var sphere = createSphere();
    scene.add(sphere);

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    /** STATS */
    stats = createStats();
    document.body.appendChild( stats.domElement );

    /** CONTROLS */
    control = new function() {
        this.rotationSpeed = 0.005;
        this.scale = 1;
    };
    addControls(control);

    // call the render function    
    var render = function () {
        requestAnimationFrame( render );

        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;

        sphere.scale.set(control.scale, control.scale, control.scale);

        renderer.render( scene, camera );
        stats.update()
    };
    // setupKeyControls(cube);
    render();
}

function addControls(controlObject) {
    var gui = new dat.GUI();
    // add control props
    gui.add(controlObject, 'rotationSpeed', -0.1, 1);
    gui.add(controlObject, 'scale', 0.01, 1);
}

// calls the init function when the window is done loading.
window.onload = init;