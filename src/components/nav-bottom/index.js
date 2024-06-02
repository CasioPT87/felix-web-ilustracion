import React, { useEffect, useState } from "react";
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders/OBJ';
import { useLocation } from "wouter";
import "./nav-bottom.css";

const NavBottom = () => {

  const [show, setShow] = useState(false)
  const [location, setLocation] = useLocation()

  useEffect(() => {
    // Obtener el canvas
    var canvas = document.getElementById("renderCanvas");

    // Crear el motor de Babylon.js
    var engine = new BABYLON.Engine(canvas, true);

    // Escena de prueba
    var createScene = function () {
      var scene = new BABYLON.Scene(engine);

      var camera = new BABYLON.ArcRotateCamera(
        "camera",
        0.0,
        Math.PI / 2.3,
        75,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.lowerBetaLimit = Math.PI / 2.4;
      camera.upperBetaLimit = Math.PI / 2.4;
      camera.lowerRadiusLimit = 50;
      camera.upperRadiusLimit = 75;
      camera.fov = 0.2;
      camera.attachControl(canvas, true);

      //Color del fondo
      scene.clearColor = new BABYLON.Color4(0.88, 0.85, 1, 1);

      // Ground

      var disco = BABYLON.MeshBuilder.CreateCylinder(
        "disco",
        { height: 0.5, diameter: 40, tessellation: 100 },
        scene
      );
      disco.position = new BABYLON.Vector3(15, -2, 0);
      disco.scaling = new BABYLON.Vector3(0.8, 1, 0.8);
      disco.receiveShadows = true;

      const disco2 = BABYLON.MeshBuilder.CreateCylinder(
        "disco2",
        { height: 0.5, diameter: 40, tessellation: 100 },
        scene
      );
      disco2.position = new BABYLON.Vector3(-50, -2, 40);
      disco2.receiveShadows = true;

      const disco3 = disco.clone("disco3");
      disco3.position = new BABYLON.Vector3(-40, -2, -30);
      disco3.scaling = new BABYLON.Vector3(0.7, 1, 0.7);
      disco3.receiveShadows = true;

      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      const ambiente = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(-20, 100, 0),
        scene
      );
      ambiente.intensity = 0.1;
      // ambiente.diffuse = new BABYLON.Color3(0.9, 0.87, 1);
      const ambiente2 = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, -20, 0),
        scene
      );
      ambiente2.intensity = 0.1;

      // Posición inicial de la cámara enfocando al cubo

      var targetPosition0 = disco.position.clone(); // Clonamos la posición actual del objeto

      // Ajustamos la posición hacia arriba en el eje Y
      targetPosition0.y += 0;

      // Establecemos el nuevo objetivo de la cámara
      camera.setTarget(targetPosition0);

      // Cargar el archivo obj utilizando ImportMesh con animación
      // Load the airplane model
      BABYLON.SceneLoader.ImportMesh(
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "avion.obj",
        scene,
        function (meshes) {
          var airplane = meshes[0];
          airplane.scaling = new BABYLON.Vector3(0.08, 0.08, 0.08);
          airplane.position = new BABYLON.Vector3(-36, 0, -40);
          airplane.rotate(BABYLON.Axis.Y, 1, BABYLON.Space.LOCAL);
          const material = new BABYLON.StandardMaterial("celeste", scene);
          // Al hacer clic en el microscopio, mostrar imagen en la parte superior
          airplane.actionManager = new BABYLON.ActionManager(scene);
          airplane.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/videos/animacion3d") // esto es el video de 4 minutos
              }
            )
          );
          // Asignar el color del material
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 2;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          airplane.material = material;

          const sphere = BABYLON.MeshBuilder.CreateSphere(
            "sphere",
            { diameter: 1, segments: 2 },
            scene
          );
          sphere.position = new BABYLON.Vector3(0.1, 3.7, 50);
          sphere.parent = airplane;
          // Añadir sombras a las mallas cargadas
          shadowGenerator00.addShadowCaster(airplane);

          // Load the propeller model
          BABYLON.SceneLoader.ImportMesh(
            "",
            "models/",
            "helice.obj",
            scene,
            function (meshes) {
              var propeller = meshes[0];
              propeller.position = new BABYLON.Vector3(0, -0.5, 48.5);
              propeller.parent = airplane;
              propeller.material = material;
              propeller.material.alpha = 1;

              // Ajustar el pivote de la hélice
              var pivotMatrix = BABYLON.Matrix.Translation(-0.08, -3.72, 0); // Ajusta la posición del pivote según lo necesario
              propeller.setPivotMatrix(pivotMatrix);

              // Animation for airplane swaying (en la demo funcionaba)
              var airplaneSway = new BABYLON.Animation(
                "airplaneSway",
                "rotation.z",
                30,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
              );
              var swayKeys = [];
              swayKeys.push({ frame: 0, value: 0 });
              swayKeys.push({ frame: 50, value: Math.PI / 40 });
              swayKeys.push({ frame: 80, value: Math.PI / -60 });
              swayKeys.push({ frame: 120, value: 0 });
              airplaneSway.setKeys(swayKeys);

              // Animación de subida y bajada
              const keys = [];

              // Definir los keyframes de la animación para el movimiento suave del avión
              keys.push({ frame: 0, value: 0 });
              keys.push({ frame: 60, value: 2 });
              keys.push({ frame: 120, value: 0 });

              const animation = new BABYLON.Animation(
                "animation",
                "position.y",
                30,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
              );
              animation.setKeys(keys);

              const easingFunction = new BABYLON.SineEase();
              easingFunction.setEasingMode(
                BABYLON.EasingFunction.EASINGMODE_EASEINOUT
              );
              animation.setEasingFunction(easingFunction);
              airplaneSway.setEasingFunction(easingFunction);

              airplane.animations.push(animation);
              airplane.animations.push(airplaneSway);

              // Animation for propeller rotation
              var propellerRotation = new BABYLON.Animation(
                "propellerRotation",
                "rotation.z",
                30,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
              );
              var rotationKeys = [];
              rotationKeys.push({ frame: 0, value: 0 });
              rotationKeys.push({ frame: 10, value: Math.PI * 2 });
              propellerRotation.setKeys(rotationKeys);
              propeller.animations.push(propellerRotation);

              // Run the animations
              scene.beginAnimation(airplane, 0, 120, true);
              scene.beginAnimation(propeller, 0, 10, true);
            }
          );
        }
      );
      // Cargar objetos .obj
      var assetsManager = new BABYLON.AssetsManager(scene);

      var meshVolver = assetsManager.addMeshTask(
        "volver",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "volver.obj"
      );
      var meshVolver2 = assetsManager.addMeshTask(
        "volver2",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "volver2.obj"
      );

      var meshMicro = assetsManager.addMeshTask(
        "microscopio",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "microscopio.obj"
      );
      var meshTelefono = assetsManager.addMeshTask(
        "telefono",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "telefono.obj"
      );
      var meshCurro = assetsManager.addMeshTask(
        "currando",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "currando.obj"
      );
      var meshCaba = assetsManager.addMeshTask(
        "caballete",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "caballete.obj"
      );
      var meshCaseta = assetsManager.addMeshTask(
        "caseta",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "caseta.obj"
      );
      var meshCama = assetsManager.addMeshTask(
        "camara",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "camara.obj"
      );
      var meshMonta = assetsManager.addMeshTask(
        "montana",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "montana.obj"
      );
      var meshInfor = assetsManager.addMeshTask(
        "informatica",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "informa.obj"
      );
      var meshMeta = assetsManager.addMeshTask(
        "fisica",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "metano.obj"
      );
      var meshTecno = assetsManager.addMeshTask(
        "tecnologia",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "engranajes.obj"
      );
      var meshTemplo = assetsManager.addMeshTask(
        "Historia",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "templo.obj"
      );
      var meshEdicion = assetsManager.addMeshTask(
        "Edicion",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "edicion.obj"
      );
      var meshOtros = assetsManager.addMeshTask(
        "otros",
        "",
        `${process.env.PUBLIC_URL}/models/`,
        "pinturas.obj"
      );
      meshVolver.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el primer objeto cargado
          mesh.position = new BABYLON.Vector3(-40, 0, 32);
          mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
          mesh.rotate(BABYLON.Axis.X, -1.6, BABYLON.Space.LOCAL);
          mesh.rotate(BABYLON.Axis.Z, 0.6, BABYLON.Space.LOCAL);

          const material = new BABYLON.StandardMaterial("material", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 2;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;
          shadowGenerator00.addShadowCaster(mesh);

          let position;

          // Evento click sobre el .obj
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/")
                moveCameraSmoothly(
                  camera,
                  //disco.position,
                  (position = new BABYLON.Vector3(15, -2.5, 0)),
                  new BABYLON.Vector3(80, 20, 0)
                );
                //disco.visibility = 0;
                //disco.visibility = 0;
              }
            )
          );
        });
      };

      meshVolver2.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el primer objeto cargado
          mesh.position = new BABYLON.Vector3(-34, 0, -26);
          mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
          //mesh.rotate(BABYLON.Axis.X, -1.6, BABYLON.Space.LOCAL);
          mesh.rotate(BABYLON.Axis.Y, -0.6, BABYLON.Space.LOCAL);

          const material = new BABYLON.StandardMaterial("material", scene);
          // Asignar el color del material
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 2;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;
          shadowGenerator00.addShadowCaster(mesh);

          let position;

          // Evento click sobre el .obj
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/")
                moveCameraSmoothly(
                  camera,
                  //disco.position,
                  (position = new BABYLON.Vector3(15, -2.5, 0)),
                  new BABYLON.Vector3(80, 20, 0)
                );
              }
            )
          );
        });
      };

      meshTelefono.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el segundo objeto cargado
          mesh.position = new BABYLON.Vector3(2, 0, -1);
          mesh.scaling = new BABYLON.Vector3(0.26, 0.26, 0.26);
          mesh.rotate(BABYLON.Axis.Y, 0.8, BABYLON.Space.LOCAL);
     
          //material
          const material = new BABYLON.StandardMaterial("micro", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;
          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/contacto")
              }
            )
          );
        });
      };

      meshCurro.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
             // Hacer algo con el tercer objeto cargado
          mesh.position = new BABYLON.Vector3(26, 1, 7);
          mesh.scaling = new BABYLON.Vector3(-0.06, 0.06, 0.06);

          // mesh.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.LOCAL);
          //material
          const material = new BABYLON.StandardMaterial("micro", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;

          shadowGenerator00.addShadowCaster(mesh);
          // Al hacer clic, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/perfil")
              }
            )
          );
        });
      };
      meshCaba.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          //material
          const material = new BABYLON.StandardMaterial("micro", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          material.backFaceCulling = false;
          // Asignar el material al objeto
          mesh.material = material;

          // Aplicar posición
          mesh.position = new BABYLON.Vector3(14, -1.5, 12); // Ejemplo de posición (0, 0, 0)

          // Aplicar escala
          mesh.scaling = new BABYLON.Vector3(0.027, 0.024, 0.027); // Ejemplo de escala (1, 1, 1);

          mesh.rotate(BABYLON.Axis.Y, 1.2, BABYLON.Space.LOCAL);
          // Añadir sombras a las mallas cargadas
          shadowGenerator00.addShadowCaster(mesh);

          // Evento click sobre el .obj
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/ilustracion")
                // Mover la cámara para enfocar la esfera con transición suave
                moveCameraSmoothly(
                  camera,
                  disco2.position,
                  new BABYLON.Vector3(30, 25, 30)
                );
              }
            )
          );
        });
      };
      meshCaseta.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          //material
          const material = new BABYLON.StandardMaterial("micro", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          material.backFaceCulling = false;
          // Asignar el material al objeto
          mesh.material = material;

          // Aplicar posición
          mesh.position = new BABYLON.Vector3(24, -0, -7); // Ejemplo de posición (0, 0, 0)

          // Aplicar escala
          mesh.scaling = new BABYLON.Vector3(0.09, 0.09, 0.09); // Ejemplo de escala (1, 1, 1);

          mesh.rotate(BABYLON.Axis.Y, 0.8, BABYLON.Space.LOCAL);
          // Añadir sombras a las mallas cargadas
          shadowGenerator00.addShadowCaster(mesh);

          // Evento click sobre el .obj
          // Al hacer clic, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/")
              }
            )
          );
        });
      };
      meshCama.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el cuarto objeto cargado
          mesh.position = new BABYLON.Vector3(12, -0.7, -11);
          mesh.scaling = new BABYLON.Vector3(0.06, 0.06, 0.06);
          mesh.rotate(BABYLON.Axis.Y, 0.5, BABYLON.Space.LOCAL);
          shadowGenerator00.addShadowCaster(mesh);
          // mesh.rotate(BABYLON.Axis.X, 0.3, BABYLON.Space.LOCAL);
          //material
          const material = new BABYLON.StandardMaterial("micro", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 5;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          material.backFaceCulling = false;
          // Asignar el material al objeto
          mesh.material = material;

          // Evento click sobre el .obj
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/videos")
                // Mover la cámara para enfocar la esfera con transición suave
                moveCameraSmoothly(
                  camera,
                  disco3.position,
                  new BABYLON.Vector3(30, 25, -30)
                );
              }
            )
          );
        });
      };

      meshEdicion.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el cuarto objeto cargado
          mesh.position = new BABYLON.Vector3(-43, 0, -19);
          mesh.scaling = new BABYLON.Vector3(-0.04, 0.04, 0.04);
          mesh.rotate(BABYLON.Axis.Y, Math.PI / 1.5, BABYLON.Space.LOCAL);
          mesh.rotate(BABYLON.Axis.X, Math.PI / 5.5, BABYLON.Space.LOCAL);

          //material
          const material = new BABYLON.StandardMaterial("amarillento", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 2;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );

          // Asignar el material al objeto
          mesh.material = material;

          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic en el montaña, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation('/videos/edicion') // no me los ha mandado aun
              }
            )
          );
        });
      };
      meshMicro.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el primer objeto cargado
          mesh.position = new BABYLON.Vector3(-35, -1, 40);
          mesh.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
          const material = new BABYLON.StandardMaterial("material", scene);
          // Asignar el color del material
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;
          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic en el microscopio, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/ilustracion/biologia")
              }
            )
          );
        });
      };
      meshMonta.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el cuarto objeto cargado
          mesh.position = new BABYLON.Vector3(-40, 0.8, 51);
          mesh.scaling = new BABYLON.Vector3(0.08, 0.16, 0.08);
          mesh.rotate(BABYLON.Axis.Y, Math.PI / -1.5, BABYLON.Space.LOCAL);

          //material
          const material = new BABYLON.StandardMaterial("naranja", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;

          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic en el montaña, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/ilustracion/geologia")
              }
            )
          );
        });
      };
      meshMeta.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el cuarto objeto cargado
          mesh.position = new BABYLON.Vector3(-51, 1.5, 54);
          mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
          mesh.rotate(BABYLON.Axis.Y, Math.PI / 0.5, BABYLON.Space.LOCAL);

          //material
          const material = new BABYLON.StandardMaterial("morado", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;

          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic en el montaña, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/ilustracion/fisicayquimica")
              }
            )
          );
        });
      };
      meshTemplo.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el cuarto objeto cargado
          mesh.position = new BABYLON.Vector3(-53, 0.5, 35);
          mesh.scaling = new BABYLON.Vector3(0.04, 0.04, 0.04);
          mesh.rotate(BABYLON.Axis.Y, Math.PI / 1.2, BABYLON.Space.LOCAL);

          //material
          const material = new BABYLON.StandardMaterial("amarillento", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );

          // Asignar el material al objeto
          mesh.material = material;

          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic en el montaña, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/ilustracion/geografiaehistoria")
              }
            )
          );
        });
      };
      meshInfor.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el cuarto objeto cargado
          mesh.position = new BABYLON.Vector3(-67, 0.8, 36);
          mesh.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);
          mesh.rotate(BABYLON.Axis.Y, Math.PI / 0.5, BABYLON.Space.LOCAL);

          //material
          const material = new BABYLON.StandardMaterial("rojizo", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;

          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic en el montaña, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/ilustracion/informatica")
              }
            )
          );
        });
      };

      meshTecno.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el cuarto objeto cargado
          mesh.position = new BABYLON.Vector3(-56, 1.5, 25);
          mesh.scaling = new BABYLON.Vector3(0.015, 0.015, 0.03);
          mesh.rotate(BABYLON.Axis.Y, Math.PI / 1.2, BABYLON.Space.LOCAL);

          //material
          const material = new BABYLON.StandardMaterial("azul", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );
          // Asignar el material al objeto
          mesh.material = material;

          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic en el montaña, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/ilustracion/tecnologia")
              }
            )
          );
        });
      };
      meshOtros.onSuccess = function (task) {
        task.loadedMeshes.forEach(function (mesh) {
          // Hacer algo con el cuarto objeto cargado
          mesh.position = new BABYLON.Vector3(-47, -1, 26);
          mesh.scaling = new BABYLON.Vector3(-0.04, 0.04, 0.04);

          //material
          const material = new BABYLON.StandardMaterial("amarillento", scene);
          material.diffuseColor = new BABYLON.Color3(0.9, 0.88, 1);
          material.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
          material.specularPower = 0;
          // Fresnel
          material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
          material.emissiveFresnelParameters.power = 4;
          material.emissiveFresnelParameters.bias = 0.2;
          material.emissiveFresnelParameters.leftColor = new BABYLON.Color3(
            0.89,
            0.86,
            0.86
          );
          material.emissiveFresnelParameters.rightColor = new BABYLON.Color3(
            0.38,
            0.35,
            0.5
          );

          // Asignar el material al objeto
          mesh.material = material;

          shadowGenerator00.addShadowCaster(mesh);

          // Al hacer clic en el montaña, mostrar imagen en la parte superior
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                setLocation("/ilustracion/otros")
              }
            )
          );
        });
      };

      // Cargar los objetos
      assetsManager.load();

      // Shadows

      //versión luz direccional
      //   var light00 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-100, -120, 0), scene);
      // light00.position = new BABYLON.Vector3(75, 300, 0);

      //versión spotlight
      //light00.diffuse = new BABYLON.Color3(0.9, 0.87, 1);
      var light00 = new BABYLON.SpotLight(
        "*spot00",
        new BABYLON.Vector3(75, 300, 0), //Vector3(100, 300, 0)
        new BABYLON.Vector3(-60, -120, 0), //Vector3(-60, -120, 0)
        1.7,
        20,
        scene
      );
      light00.intensity = 0.2;

      var shadowGenerator00 = new BABYLON.ShadowGenerator(1250, light00);
      //shadowGenerator00.usePercentageCloserFiltering = true;
      shadowGenerator00.useBlurExponentialShadowMap = true;
      shadowGenerator00.blurBoxOffset = 1;

      // Manejador para el evento onPointerDown
      const onPointerDown = function (evt, pickResult) {
        // Obtenemos las coordenadas donde se ha hecho clic
        var pickedPoint = pickResult.pickedPoint;

        // Crear una animación para mover la cámara hacia las coordenadas del punto seleccionado
        var animation = new BABYLON.Animation(
          "animacionCamera",
          "position",
          60,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        // Definimos los fotogramas de la animación
        var keys = [];
        keys.push({
          frame: 0,
          value: camera.position.clone(), // La posición actual de la cámara
        });
        keys.push({
          frame: 100, // Duración de la animación en fotogramas (ajústalo según desees)
          value: pickedPoint, // La posición donde se ha hecho clic
        });

        // Asignamos las claves de la animación
        animation.setKeys(keys);

        // Aplicamos la animación a la posición de la cámara
        camera.animations = [animation];

        // Reproducimos la animación
        scene.beginAnimation(camera, 0, 100, false);
      };

      return scene;
    };

    var scene = createScene();

    // Ejecutar el render loop
    engine.runRenderLoop(function () {
      scene.render();
    });

    // Manejar el redimensionamiento de la ventana
    window.addEventListener("resize", function () {
      engine.resize();
    });
    // esta parte final mov cámara suave
    function moveCameraSmoothly(camera, targetPosition, cameraPosition) {
      var animCamTarget = new BABYLON.Animation(
        "animCamTarget",
        "target",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );

      var keysTarget = [];
      keysTarget.push({
        frame: 0,
        value: camera.target.clone(),
      });
      keysTarget.push({
        frame: 100,
        value: targetPosition.clone(),
      });

      animCamTarget.setKeys(keysTarget);

      var animCamPosition = new BABYLON.Animation(
        "animCamPosition",
        "position",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );

      var keysPosition = [];
      keysPosition.push({
        frame: 0,
        value: camera.position.clone(),
      });
      keysPosition.push({
        frame: 100,
        value: cameraPosition.clone(),
      });

      animCamPosition.setKeys(keysPosition);

      var easingFunction = new BABYLON.QuadraticEase();
      easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

      animCamTarget.setEasingFunction(easingFunction);
      animCamPosition.setEasingFunction(easingFunction);

      camera.animations.push(animCamTarget);
      camera.animations.push(animCamPosition);

      scene.beginAnimation(camera, 0, 100, false);
    }

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
  }, []);
  return (
    <div id="bottomPanel" className={show ? 'show' : ''}>
      <button id="toggleButton" onClick={() => setShow(!show)}>NAVEGACIÓN</button>
      <canvas id="renderCanvas"></canvas>
    </div>
  );
};

export default NavBottom;
