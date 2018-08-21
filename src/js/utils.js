function setRenderer() {
    var renderer;
    
    if ( webglAvailable() ) {
        console.log("WebGL Renderer");
        renderer = new THREE.WebGLRenderer();
	} else {
        console.log("Canvas Renderer");
		renderer = new THREE.CanvasRenderer();
    }
    return renderer;
}

function webglAvailable() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
}

function createStats() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';
    return stats;
}

function setupKeyControls(object) {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                object.rotation.x += 0.1;
                break;
            case 38:
                object.rotation.z -= 0.1;
                break;
            case 39:
                object.rotation.x -= 0.1;
                break;
            case 40:
                object.rotation.z += 0.1;
                break;
        }
    };
}

function createCube() {
    // create a cube and add to scene
    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    return cube;
}

function createTriangle() {
    var geometry = new THREE.Geometry();
    var v1 = new THREE.Vector3(0, 0,0);   // Vector3 used to specify position
    var v2 = new THREE.Vector3(10,0,0);
    var v3 = new THREE.Vector3(0,10,0);   // 2d = all vertices in the same plane.. z = 0
    var normal = (new THREE.Triangle( v1, v2, v3 )).getNormal();
    // add new geometry based on the specified positions
    geometry.vertices.push(v1);
    geometry.vertices.push(v2);
    geometry.vertices.push(v3);
    geometry.faces.push( new THREE.Face3( 0, 1, 2, normal ) );
    var material = new THREE.MeshNormalMaterial();
    var triangle= new THREE.Mesh( geometry, material );
    return triangle;
}

function createSphere() {
    // create a simple sphere
    var sphereGeometry = new THREE.SphereGeometry(6.5, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.receiveShadow = true;
    sphere.position.set(0, 1, 0);
    return sphere;
}