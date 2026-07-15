loader.load("/avatar.vrm", (gltf) => {
  const vrm = gltf.userData.vrm;

  console.log("VRM:", vrm);
  console.log("Humanoid:", vrm?.humanoid);
