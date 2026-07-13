"use client";

import { useEffect, useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";


export default function VRMModel(){

  const group = useRef<Group>(null);
  const vrmRef = useRef<any>(null);


  useEffect(()=>{

    const loader = new GLTFLoader();


    loader.register((parser)=>{
      return new VRMLoaderPlugin(parser);
    });



    loader.load(
      "/avatar.vrm",
      (gltf)=>{

        const vrm =
          gltf.userData.vrm;


        if(!vrm || !group.current)
          return;



        VRMUtils.removeUnnecessaryVertices(
          gltf.scene
        );


        vrm.scene.rotation.y = Math.PI;


        group.current.add(
          vrm.scene
        );


        vrmRef.current = vrm;



        console.log("VRM loaded");

        console.log(
          "Expressions:",
          vrm.expressionManager.expressionMap
        );


      }
    );


  },[]);




  useFrame((state,delta)=>{


    const vrm =
      vrmRef.current;


    if(!vrm)
      return;



    vrm.update(delta);



    const time =
      state.clock.elapsedTime;




    /*
       HEAD IDLE
    */

    const head =
      vrm.humanoid
      ?.getNormalizedBoneNode(
        "head"
      );


    if(head){

      head.rotation.y =
        Math.sin(time*0.7)*0.04;


      head.rotation.x =
        Math.sin(time*0.5)*0.02;

    }




    /*
       REMOVE T POSE
    */


    const leftArm =
      vrm.humanoid
      ?.getNormalizedBoneNode(
        "leftUpperArm"
      );


    const rightArm =
      vrm.humanoid
      ?.getNormalizedBoneNode(
        "rightUpperArm"
      );



    if(leftArm && rightArm){

      leftArm.rotation.z =
        1.15;


      rightArm.rotation.z =
        -1.15;

    }




    /*
       BREATHING
    */


    const chest =
      vrm.humanoid
      ?.getNormalizedBoneNode(
        "chest"
      );


    if(chest){

      chest.rotation.x =
        Math.sin(time*1.5)*0.015;

    }





    /*
       LIP SYNC
    */


    if(vrm.expressionManager){


      const volume =
        (window as any).audioLevel || 0;



      vrm.expressionManager.setValue(
        "aa",
        volume
      );


      vrm.expressionManager.setValue(
        "oh",
        volume*0.4
      );


    }



  });



  return (
    <group ref={group}/>
  );

}
