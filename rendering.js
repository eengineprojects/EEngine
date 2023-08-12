document.addEventListener('DOMContentLoaded', function() {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('render') });
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
  
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
  
    camera.position.z = 5;
  
    function animate() {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }
    animate();
  });
  