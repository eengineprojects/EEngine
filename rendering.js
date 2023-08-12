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
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    var selectedobject;
    
    camera.position.z = 5;
    cube.name = "cube";
    
    function animate() {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }
    animate();

    // document.addEventListener('click', function(event){
    //     console.log(event);
    // })
    function onMouseMove(event){
        pointer.x = ((event.clientX - canvasBounds.left) / canvas.clientWidth) * 2 - 1;
        pointer.y = -((event.clientY - canvasBounds.top) / canvas.clientHeight) * 2 + 1;
        

        raycaster.setFromCamera(pointer, camera);
        const intersect = raycaster.intersectObjects(scene.children);
        
        if(intersect.length > 0){
            selectedobject = intersect[0].object;
            intersect[0].object.material.color.set(0x00ffcc);
            
        }else {
            selectedobject.material.color.set(0x00ff00);
        }

    }
    canvas.addEventListener('click', onMouseMove);
  });
  
