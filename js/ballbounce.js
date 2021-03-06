function runGame() {
window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
      };
  })();
  
  // Scene size
  var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
  
  // Camera attributes.
  var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;
  
  // Our DOM element.
  var $container = document.getElementById('main');
  canvReference = document.getElementById("mycanvas");

  // WebGL renderer, camera, and scene.
  var renderer = new THREE.WebGLRenderer(
    {
      antialias:true
      ,canvas : canvReference
    }
  );
  var camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
  var scene = new THREE.Scene();
  
  
  
  camera.position.z = 400;
  camera.position.y = 300;
  camera.rotation.x = -0.4;
  
  // Start the renderer.
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColorHex(0xbfd1e5, 1);
  renderer.clear();
  renderer.shadowMapEnabled = true;
  
  // Attach the DOM element.
  //$container.appendChild(renderer.domElement);
  
  
  // Floor
  var cube = new THREE.Mesh(new THREE.CubeGeometry(350, 10, 1200),
    new THREE.MeshLambertMaterial({
      color: 0x8a8a8a
    }));
  
  cube.name = "cube";
  cube.position.z = -400;
  //console.log(cube)
  scene.add(cube);
  
  var img = new THREE.MeshBasicMaterial({
    map:THREE.ImageUtils.loadTexture('images/logo.png'),
    transparent: true,
  });
  img.map.needsUpdate = true; //ADDED
  
  // plane
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 70),img);
  plane.overdraw = true;
  plane.position.y = 8
  plane.position.z = -200
  plane.rotation.x =   -Math.PI / 2 ;
  scene.add(plane);
  
  geometry = new THREE.PlaneGeometry( 5000, 2500, 10, 10 );
  floorTexture = THREE.ImageUtils.loadTexture('images/wood_texture.jpg');
  
  
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
     floorTexture.repeat.set(5,2);
    material = new THREE.MeshBasicMaterial({map: floorTexture}),
      mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x =  - Math.PI / 2 ;
    mesh.position.y =  -100;
  
    scene.add( mesh );
  
  
  wallTexture = THREE.ImageUtils.loadTexture('images/wall_texture.jpg');
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(10,2);
  wall = new THREE.Mesh( new THREE.CubeGeometry( 10000, 10, 1000 ), new THREE.MeshBasicMaterial({ map: wallTexture}));
  wall.position.y = -100
  wall.rotation.x =   Math.PI / 2 ;
  wall.position.z= -2500
  scene.add(wall);
  
  //console.log(cube)
  var cup = new THREE.Object3D();
  cup.name = "cup";
  
  
  cupHeigh = 50
  cupWidthTop = 30
  cupWidthBottom = 15
  
  var cupPositions = [
      {
          x: -cupWidthTop*3,
          z: -800
      },
    {
      x: -cupWidthTop,
      z: -800
    },
    {
      x: cupWidthTop,
      z: -800
    },
    {
      x: cupWidthTop*3,
      z: -800
    },
    {
      x: -cupWidthTop*2,
      z: -720
    },
    {
      x: 0,
      z: -720
    },
    {
      x: cupWidthTop*2,
      z: -720
    },
    {
      x: -cupWidthTop,
      z: -640
    },
    {
      x: cupWidthTop,
      z: -640
    },
    {
      x: 0,
      z: -560
    },
  
  ]
  
  var cups = []
  
  renderCup()
  function renderCup(){
  
      for(var i=0;i<cupPositions.length; i++){
          let index = i+1
          let cupPosition = cupPositions[i]
      cup = new THREE.Object3D();
      cup.name = "cup";
  
      /*****************************************************
       *   BODY                                            *
       *****************************************************/
  
  
      cupBodyGeometry = new THREE.CylinderGeometry(cupWidthTop, cupWidthBottom, cupHeigh, 200, 100, true);
  
      cupBodyMaterial = new THREE.MeshLambertMaterial({
        color: 0xFF0000,
        side: 2,
        overdraw: 0.5
      });
      cupBodyMaterial.name = "cupBodyMaterial";
      cupBodyMesh = new THREE.Mesh(cupBodyGeometry, cupBodyMaterial)
      cupBodyMesh.name = 'cupBody';
      cup.add(cupBodyMesh);
  
  
      cupBodyGeometryTop = new THREE.CylinderGeometry(cupWidthTop, cupWidthBottom, 1, 200, 100, false);
  
      cupBodyMaterialTop = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF,
        side: 2,
        overdraw: 0.5
      });
      cupBodyMaterialTop.name = "cupBodyMaterialTop";
      cupBodyMeshTop = new THREE.Mesh(cupBodyGeometryTop, cupBodyMaterialTop)
      cupBodyMeshTop.name = 'cupBodyTop';
      cupBodyMeshTop.uuid = i;
      cupBodyMeshTop.position.set(0, cupHeigh/2, 0);
      cup.add(cupBodyMeshTop);
  
  
      /*****************************************************
       *   TOP                                             *
       *****************************************************/
  
      cupTopGeometry = new THREE.TorusGeometry(cupWidthTop, 3, 50, 50);
      cupTopMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        side: 2,
        overdraw: 1
      });
  
      cupTop = new THREE.Mesh(cupTopGeometry, cupTopMaterial);
      cupTop.name = 'cupTop';
      cupTop.position.set(0, cupHeigh/2, 0);
      cupTop.rotation.x = Math.PI/2;
  
      cup.add(cupTop);
      cup.position.set(cupPosition.x, cupHeigh/2, cupPosition.z);
      //cup.rotation.x = Math.PI/9;
      //cup.rotation.z = Math.PI/4;
      cups.push(cup);
      scene.add(cup);
      THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( cupBodyMesh ))
      THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( cupBodyMeshTop ));
      }
  
  
    //console.log(cupTop.position)
  }
  
  
  
  
  
  
  
  
  
  THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( cube ));
  //THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( cube2 ));
  //THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( cupBodyMesh ));
  
  cube.receiveShadow = true;
  // cube.castShadow = true;
  
  // Ball (will bounce!)
  var radius = 15, segments = 20, rings = 16;
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF
  });
  
  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius,
      segments,
      rings),
    sphereMaterial)
  sphere.name = "sphere";
  sphere.position.y = 15;
  sphere.position.z = 70;
  sphere.castShadow = true;
  scene.add(sphere);
  
  var mousePressed = false;
  var activeCell = false;
  var syncframe = 0;
  var projector = new THREE.Projector();
  var isThrowed = false
  
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  
  document.addEventListener( 'touchmove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentMouseDown, false );
  document.addEventListener( 'touchend', onDocumentMouseUp, false );
  
  function onDocumentMouseMove( event ) {
    //event.preventDefault();
  }
  
  var startPosition ;
  var endPosition ;
  
  function onDocumentMouseDown( event ) {
    //event.preventDefault();
    let e = event
    if(!event.clientX){
      e = event.touches[0]
    }
  
    var vector = new THREE.Vector3(
      ( e.clientX / window.innerWidth ) * 2 - 1,
      - ( e.clientY / window.innerHeight ) * 2 + 1,
      0.5
    );
    projector.unprojectVector( vector, camera );
    var ray = new THREE.Ray( camera.position,
      vector.subSelf( camera.position ).normalize() );
  
    var intersects = ray.intersectObjects( scene.children);
    if ( intersects.length > 0) {
      if(intersects[ 0 ].object.name === "sphere"){
        mousePressed = true
        //intersects[ 0 ].object.materials[ 0 ].color.setHex( Math.random() * 0xffffff );
        startPosition = vector
      }
    }
  }
  function onDocumentMouseUp( event ) {
    let e = event
    if(!event.clientX){
      e = event.changedTouches[0]
    }
    //console.log("onDocumentMouseUp")
    if(mousePressed){
      mousePressed = false;
      syncframe = 0;
      var vector = new THREE.Vector3(
        ( e.clientX / window.innerWidth ) * 2 - 1,
        - ( e.clientY / window.innerHeight ) * 2 + 1,
        0.5
      );
      projector.unprojectVector( vector, camera );
      vector.subSelf( camera.position ).normalize()
      endPosition = vector
  
      //console.log(startPosition.x, endPosition.x)
      window.sx = (startPosition.x - endPosition.x)
      window.sy = Math.abs(startPosition.y - endPosition.y) * 100
      //console.log("=============================")
      //console.log("sy", sy)
      if(sy > 0){
        //console.log( sphere.position.y*sy)
        //	sphere.position.y = sphere.position.y*sy
        syyy =  sphere.position.y*sy
      }
      isThrowed = true
    }
  
  }
  // Lights
  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.y = 200;
  pointLight.position.z = 100;
  scene.add(pointLight);
  
  var pointLight1 = new THREE.SpotLight(0xFFFFFF, .7);
  pointLight1.position.y = 500;
  pointLight1.castShadow = true;
  scene.add(pointLight1);
  window.sy = 0
  window.syyy = 0
  // The animation function.
  var a = 0.1;
  var v = new THREE.Vector3(0, -1, 0);
  var stopT = false
  var MovingCube =  sphere
  var cupCollision = null
  
  function update() {
  
     if(cupCollision){
       if (cupCollision.position.y < cupHeigh*2) {
         cupCollision.position.y += 1.5; // You decide on the increment, higher value will mean the objects moves faster
       }else{
         if (cupCollision.position.x < 500) {
           cupCollision.position.x += 10;
         }else{
           scene.remove( cupCollision );
           cupCollision = null
         }
           }
        }
  
    if (isThrowed && sy>0 && !cupCollision) {
  
  
  
      /**/
  
      if(sphere.position.y <= syyy && !stopT){
        v.y = sy;
        stopT = true
      }else{
        //console.log("=============")
        var ray = new THREE.Ray(sphere.position, new THREE.Vector3(0, -1, 0));
        var c = THREE.Collisions.rayCastNearest(ray);
  
  
        if (v.y > 0) {
          v.y -= (v.y * a);
        } else {
          v.y += (v.y * a);
        }
  
        if (v.y < 0.9 && v.y > 0) {
          v.y = -v.y;
        }
        if (c) {
          //	//console.log("=======",c.distance)
        }
        if (c && Math.floor(c.distance) <= radius) {
          if( c.mesh.name === "cube"){
            v.y = -v.y * (0.9);
          }else if(c.mesh.name === "cupBodyTop"){
            cupCollision = cups[c.mesh.uuid]
            v.y =  -100;
                  }else if(c.mesh.name === "cupBody"){
            v.y =  -100;
                  }
                  //console.log(c)
  
        }
        if(sphere.position.x > 500 || sphere.position.x < -500 ){
          v.y =  -100;
  
  
        }
  
        if(sphere.position.z <  -1000){
          //v.y =  -100;
        }
  
  
      }
  
      v.z= -sy
      v.x= -sx*20
  
      if(v.y <= -100 ){
        v.y= 0
        sphere.position.x = 0;
        sphere.position.y = 15;
        sphere.position.z = 70;
        isThrowed = false
        stopT = false
      }else{
        sphere.position.addSelf(v);
  
      }
  
    }
    renderer.render(scene, camera);
    requestAnimFrame(update);
  }
  requestAnimFrame(update);
  renderer.render(scene, camera);
  
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize() {
  
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize( window.innerWidth, window.innerHeight );
  
  }
}