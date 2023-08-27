// importing three rendering library
import * as THREE from 'node_modules/three';

// check if the canvas is loaded
document.addEventListener('DOMContentLoaded', function() {
    // load in the things you need at the start
    const canvas = document.getElementById('render');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('render') });

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const canvasBounds = canvas.getBoundingClientRect();
    let isMouseDown = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let inCanvas = false;

    

    // function to check if the canvas was clicked on or not
    document.addEventListener('click', function(event){
        if(canvasBounds.left <= pointer.x && pointer.x <= canvasBounds.right && canvasBounds.top <= pointer.y && pointer.y <= canvasBounds.bottom){
            inCanvas = true;
            console.log(inCanvas);
        }
        else{
            inCanvas = false;
            console.log(inCanvas);
        }
    });

    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    // create the starter cube
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // set the material
    const material = new THREE.MeshPhysicalMaterial( {color: 0xffffff,
        transparent: true,
        metalness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
        roughness: 0.5
    } );
    // declare the cube
    const cube = new THREE.Mesh( geometry, material );
    // this is for the raycaster to sort out selectable objects
    var objects = []
    // ambient light for some environment lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);
    // directional light on top of the cube
    const DL = new THREE.DirectionalLight(0xffffff, 1.8, 5);
    scene.add(DL);
    DL.position.set(0, 2, 0);
    // adding the cube to the scene and pushing it to be a selectable object
    scene.add( cube );
    objects.push(cube);
    // selectable variables
    var selectedobject;
    var haswire = false;
    var wire; 
    // camera position
    camera.position.z = 5;

    // create a grid for the user
    const helpergrid = new THREE.GridHelper(10, 10);
    scene.add(helpergrid);
    helpergrid.position.y = -1


    // create the axes marker
    const xyz = new THREE.AxesHelper( 5 );
    scene.add( xyz );
    xyz.position.y = -1

    
    // render the scene constantly
    function render() {
      requestAnimationFrame( render );
      renderer.render( scene, camera );
    }
    render();

    var button = document.getElementById("NewCube");
    button.addEventListener("click", function(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // set the material
        const material = new THREE.MeshPhysicalMaterial( {color: 0xffffff,
            transparent: true,
            metalness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0.2,
            roughness: 0.5
        } );
        // declare the cube
        const newcube = new THREE.Mesh( geometry, material );
        scene.add(cube);
        objects.push(cube);
        cube.name = "NewCube";

    });
    
    // function to check if cookie canvas_selected is set to true or not
    // function checkSelected(){
    // //    if (document.cookie === "canvas_selected=true"){
    // //        console.log("canvas is selected");
    // //    }else{
    // //        console.log("canvas is not selected");
    // //    }
    // }

    // keyboard controls for the camera
    document.addEventListener('keydown', function(event) {
        if (document.activeElement !== document.getElementsByTagName('input')[0]) {
            if (event.key === 's' || event.key === 'S') {
                const movementSpeed = 0.1;  // Adjust the movement speed as needed
        
                // Get the camera's direction
                const cameraDirection = new THREE.Vector3();
                camera.getWorldDirection(cameraDirection);
        
                // Calculate the movement vector
                const movementVector = cameraDirection.multiplyScalar(-movementSpeed);
        
                // Move the camera along the movement vector
                camera.position.add(movementVector);
            }
            if (event.key === 'w' || event.key === 'W') {
                const movementSpeed = -0.1;  // Adjust the movement speed as needed
        
                // Get the camera's direction
                const cameraDirection = new THREE.Vector3();
                camera.getWorldDirection(cameraDirection);
        
                // Calculate the movement vector
                const movementVector = cameraDirection.multiplyScalar(-movementSpeed);
        
                // Move the camera along the movement vector
                camera.position.add(movementVector);
            }
            if (event.key === 'a' || event.key === 'A') {
                // Move left
                const movementSpeed = 0.1; // Adjust the movement speed as needed
    
                const cameraDirection = new THREE.Vector3();
                camera.getWorldDirection(cameraDirection);
    
                const cameraRight = new THREE.Vector3();
                cameraRight.crossVectors(cameraDirection, camera.up).normalize();
    
                const movementVector = cameraRight.clone().multiplyScalar(-movementSpeed);
    
                camera.position.add(movementVector);
            }
            if (event.key === 'd' || event.key === 'D') {
                // Move left
                const movementSpeed = -0.1; // Adjust the movement speed as needed
    
                const cameraDirection = new THREE.Vector3();
                camera.getWorldDirection(cameraDirection);
    
                const cameraRight = new THREE.Vector3();
                cameraRight.crossVectors(cameraDirection, camera.up).normalize();
    
                const movementVector = cameraRight.clone().multiplyScalar(-movementSpeed);
    
                camera.position.add(movementVector);
            }
            if (event.key === 'E' || event.key === 'e') {
                camera.position.y += 0.1;
            }
            if (event.key === 'Q' || event.key === 'q') {
                camera.position.y -= 0.1;
            }
            if(event.key == "Delete"){
                if (selectedobject != null) {
                    scene.remove(selectedobject);
                    objects.splice(objects.indexOf(selectedobject), 1);
                }
            }
        }
        
    });

    // Function to handle mouse down event
    function onMouseDown(event) {
        if (event.button === 0) { // Left mouse button
            isMouseDown = true;
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
        }
    }
    
    // Function to handle mouse up event
    function onMouseUp(event) {
        if (event.button === 0) { // Left mouse button
            isMouseDown = false;
        }
    }
    
    // Function to handle mouse move event
    function onMouseMove(event) {
        if (isMouseDown) {
            const deltaX = event.clientX - previousMouseX;
            const deltaY = event.clientY - previousMouseY;
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
    
            // Calculate the rotation angles based on the mouse movement
            const rotationSpeed = 0.005; // Adjust the rotation speed as needed
    
            const angleX = -deltaY * rotationSpeed;
            const angleY = -deltaX * rotationSpeed;
    
            camera.rotateX(angleX);
            camera.rotateY(angleY);
        }
    }
    
    // Add event listeners to the document
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);

    // event listener to check if M was pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'm' || event.key === 'M') {
            console.log('M was pressed');
        }
    })

    // handle selecting objects
    function onMouseClick(event){
        const canvas = document.getElementById('render'); // Replace 'myCanvas' with the ID of your canvas element

        // setup mouse coords
        var intersect = null;
        pointer.x = ((event.clientX - canvasBounds.left) / canvas.clientWidth) * 2 - 1;
        pointer.y = -((event.clientY - canvasBounds.top) / canvas.clientHeight) * 2 + 1;
        
        // create a raycaster
        raycaster.setFromCamera(pointer, camera);
        intersect = raycaster.intersectObjects(objects, false);
        
        // check if the raycaster intersects with an object
        if(intersect.length > 0){
            
            console.log(intersect)
            // check if the object is already selected
            selectedobject = intersect[0].object;
            if (haswire == false) {
                const geo = new THREE.EdgesGeometry( intersect[0].object.geometry );
                const mat = new THREE.LineBasicMaterial( { color: 0x00ffea} );
                const wireframe = new THREE.LineSegments( geo, mat );
                selectedobject.add(wireframe);
                haswire = true;
                selectedobject.material.opacity = 0.9
            }
                // if the user clicks away from the object then deselect it
        }else {
            if (selectedobject != null){
                haswire = false;
                selectedobject.material.opacity = 1
                console.log(selectedobject.children)
                selectedobject.remove(selectedobject.children[0]);
                selectedobject = null;
                wire = null
                console.log(selectedobject)
                console.log(haswire)
            }

        }
        // Check if canvas is selected

    }
    // enable selecting
    canvas.addEventListener('click', onMouseClick);
  });
  
