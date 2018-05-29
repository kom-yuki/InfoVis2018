function main()
{
  //var volume = new KVS.SingleCubeData();
  //var volume = new KVS.CreateHydrogenData( 64, 64, 64 );
  var volume = new KVS.LobsterData();
  var screen = new KVS.THREEScreen();
  var surfaces;

  screen.init(volume, {
    width: window.innerWidth * 0.8,
    height: window.innerHeight,
    targetDom: document.getElementById('display'),
    enableAutoResize: false
  });
  setup();
  screen.loop();

  function setup()
  {
    var color = new KVS.Vec3( 0, 0, 0 );
    var box = new KVS.BoundingBox();
    box.setColor( color );
    box.setWidth( 2 );

    var smin = volume.min_value;
    var smax = volume.max_value;
    var isovalue = KVS.Mix( smin, smax, 0.5 );
    var isosurface = new KVS.Isosurface();
    isosurface.setIsovalue( isovalue );

    document.getElementById('label').innerHTML = "Isovalue: " + Math.round( isovalue );

    var line = KVS.ToTHREELine( box.exec( volume ) );
    surfaces = Isosurfaces( volume, isovalue );
    screen.scene.add( surfaces );
    screen.scene.add( line );

    document.getElementById('isovalue')
    .addEventListener('mousemove', function() {
      var value = +document.getElementById('isovalue').value;
      var isovalue = KVS.Mix( smin, smax, value );
      document.getElementById('label').innerHTML = "Isovalue: " + Math.round( isovalue );
    });

    document.getElementById('change-isovalue-button')
    .addEventListener('click', function() {
      screen.scene.remove(surfaces)
      var value = +document.getElementById('isovalue').value;
      var isovalue = KVS.Mix( smin, smax, value );
      var isosurface = new KVS.Isosurface();
      isosurface.setIsovalue( isovalue );
      surfaces = Isosurfaces( volume, isovalue );
      screen.scene.add( surfaces );
    });

    document.addEventListener( 'mousemove', function() {
      screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener('resize', function() {
      screen.resize([
        window.innerWidth * 0.8,
        window.innerHeight
      ]);
    });

    screen.draw();
  }
}

function changeIsovalue() {

}
