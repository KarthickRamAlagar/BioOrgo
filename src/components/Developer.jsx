import React, { useEffect, useRef, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

//  Preload FBX animations for faster load
useFBX.preload("/modals/animations/idle.fbx");
useFBX.preload("/modals/animations/salute.fbx");
useFBX.preload("/modals/animations/clapping.fbx");
useFBX.preload("/modals/animations/victory.fbx");

//  Preload GLTF model
useGLTF.preload("/modals/animations/developer.glb");

const Developer = ({ animationName = "idle", ...props }) => {
  const group = useRef();

  // Load and clone the GLTF scene
  const { scene } = useGLTF("/modals/animations/developer.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // State to hold loaded animations
  const [animations, setAnimations] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load FBX animations asynchronously
  useEffect(() => {
    const loadAnimations = async () => {
      const idle = await useFBX("/modals/animations/idle.fbx");
      const salute = await useFBX("/modals/animations/salute.fbx");
      const clap = await useFBX("/modals/animations/clapping.fbx");
      const victory = await useFBX("/modals/animations/victory.fbx");

      // Rename animations for easy access
      idle.animations[0].name = "idle";
      salute.animations[0].name = "salute";
      clap.animations[0].name = "clapping";
      victory.animations[0].name = "victory";

      setAnimations([
        idle.animations[0],
        salute.animations[0],
        clap.animations[0],
        victory.animations[0],
      ]);
      setLoaded(true);
    };

    loadAnimations();
  }, []);

  // Hook into animation actions
  const { actions } = useAnimations(animations, group);

  // Play the selected animation
  useEffect(() => {
    if (!loaded || !actions) return;
    const action = actions[animationName];
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => action.fadeOut(0.5);
    }
  }, [animationName, actions, loaded]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
};

export default Developer;
