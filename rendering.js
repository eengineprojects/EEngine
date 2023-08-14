import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('render');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('render') });

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const canvasBounds = canvas.getBoundingClientRect();
    let isMouseDown = false;
    let previousMouseX = 0;


    
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
  
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshPhysicalMaterial( {color: 0x00ff00,
        transparent: true,
        metalness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
        roughness: 0.5
    } );
    const cube = new THREE.Mesh( geometry, material );
    var objects = []
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);
    const DL = new THREE.DirectionalLight(0xffffff, 1.8, 5);
    scene.add(DL);
    DL.position.set(0, 2, 0);
    
    scene.add( cube );
    objects.push(cube);
    var selectedobject;
    var haswire = false;
    var wire; 
    camera.position.z = 5;
    
    function animate() {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }
    animate();
    
    document.addEventListener('keydown', function(event) {
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
    });

    function onMouseDown(event) {
        if (event.button === 0) { // Left mouse button
            isMouseDown = true;
            previousMouseX = event.clientX;
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
            const delta = event.clientX - previousMouseX;
            previousMouseX = event.clientX;
    
            // Adjust camera rotation based on mouse movement
            camera.rotation.y += delta * 0.01; // Adjust rotation sensitivity as needed
        }
    }
    
    // Add event listeners to the document
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    function onMouseClick(event){
        var intersect = null;
        pointer.x = ((event.clientX - canvasBounds.left) / canvas.clientWidth) * 2 - 1;
        pointer.y = -((event.clientY - canvasBounds.top) / canvas.clientHeight) * 2 + 1;
        

        raycaster.setFromCamera(pointer, camera);
        intersect = raycaster.intersectObjects(objects, false);
        // check if wireframe in intersect
       
        if(intersect.length > 0){
            
            console.log(intersect)
            
            selectedobject = intersect[0].object;
            // check if intersect[0].object has the wireframe property
            if (haswire == false) {
                const geo = new THREE.EdgesGeometry( intersect[0].object.geometry );
                const mat = new THREE.LineBasicMaterial( { color: 0x00ffea} );
                const wireframe = new THREE.LineSegments( geo, mat );
                selectedobject.add(wireframe);
                haswire = true;
                selectedobject.material.opacity = 0.9
            }
                
        }else {
            if (selectedobject != null){
                haswire = false;
                selectedobject.material.opacity = 1
                // remove wireframe
                console.log(selectedobject.children)
                selectedobject.remove(selectedobject.children[0]);
                selectedobject = null;
                wire = null
                console.log(selectedobject)
                console.log(haswire)
            }

        }
    }

    canvas.addEventListener('click', onMouseClick);
  });
  
