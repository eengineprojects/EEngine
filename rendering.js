import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('render');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('render') });

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const canvasBounds = canvas.getBoundingClientRect();
    


    
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
  
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshLambertMaterial( {color: 0x00ff00, transparent: true} );
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
    
    function onMouseMove(event){
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
                selectedobject.material.opacity = 0.5
            }
                
        }else {
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

    canvas.addEventListener('click', onMouseMove);
  });
  
