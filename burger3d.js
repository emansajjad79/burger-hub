const canvas = document.getElementById("burger3d");
if (canvas && window.THREE) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 1.5, 7);

  // Naram aur barabar roshni
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  scene.add(new THREE.HemisphereLight(0xffffff, 0x886644, 0.35));

  const l1 = new THREE.DirectionalLight(0xffffff, 0.35);
  l1.position.set(5, 5, 5);
  const l2 = new THREE.DirectionalLight(0xffffff, 0.35);
  l2.position.set(-5, 5, 5);
  const l3 = new THREE.DirectionalLight(0xffffff, 0.25);
  l3.position.set(0, 3, -6);
  scene.add(l1, l2, l3);

  const holder = new THREE.Group();
  scene.add(holder);

  new THREE.GLTFLoader().load(
    "burger.glb",
    (gltf) => {
      const model = gltf.scene;

      // Model ko centre aur sahi size mein laao
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const scale = 3.2 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);

      // Model ki apni lights band karo, material ko matt banao
      model.traverse((o) => {
        if (o.isLight) o.visible = false;
        if (o.isMesh && o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            if ("metalness" in m) m.metalness = 0;
            if ("roughness" in m) m.roughness = Math.max(m.roughness || 0, 0.6);
            if (m.emissive) m.emissive.set(0x000000);
            m.needsUpdate = true;
          });
        }
      });

      holder.add(model);
    },
    undefined,
    (err) => console.error("Burger model load nahi hua:", err)
  );

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  let mx = 0, my = 0;
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  });

  function tick(t) {
    if (window.scrollY < window.innerHeight * 1.2) {
      holder.rotation.y = t * 0.0005 + window.scrollY * 0.004 + mx * 0.8;
      holder.rotation.x = 0.35 + my * 0.3;
      holder.position.y = Math.sin(t * 0.0015) * 0.15;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}