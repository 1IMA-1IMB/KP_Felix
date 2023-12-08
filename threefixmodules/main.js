import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene()

function Window2(){
    const window2 = new THREE.Group()

    const windowcross1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.5, 5),
        new THREE.MeshBasicMaterial({ color: '#542222'})
    )
    window2.add(windowcross1)
    
    const windowcross2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.5, 5),
        new THREE.MeshBasicMaterial({ color: '#542222'})
    )

    windowcross2.rotateX(1.57079632679)
    window2.add(windowcross2)

    const windowframe1 = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.5, 5.2),
        new THREE.MeshBasicMaterial({ color: '#542222'})
    )

    windowframe1.position.y = 2.5
    windowframe1.position.x = -0.45
    window2.add(windowframe1)

    const windowframe2 = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.5, 5),
        new THREE.MeshBasicMaterial({ color: '#542222'})
    )

    windowframe2.position.y = -2.5
    windowframe2.position.x = -0.45 

    window2.add(windowframe2)

    const windowframe3 = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.5, 5.5),
        new THREE.MeshBasicMaterial({ color: '#542222'})
    )

    windowframe3.rotateX(1.57079632679)
    windowframe3.position.x = -0.45 
    windowframe3.position.z = 2.5
    windowframe3.position.y = 0

    window2.add(windowframe3)

    const windowframe4 = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.5, 5.5),
        new THREE.MeshBasicMaterial({ color: '#542222'})
    )

    windowframe4.rotateX(-1.57079632679)
    windowframe4.position.x = -0.45 
    windowframe4.position.z = -2.5
    windowframe4.position.y = 0

    window2.add(windowframe4)

    const windowbg = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 5, 5),
        new THREE.MeshBasicMaterial({ color: '#A3D3CB'})
    )

    window2.add(windowbg)


    return window2;
}

function Hut () {
    const hut = new THREE.Group()
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(20, 15, 20),
        new THREE.MeshBasicMaterial({ color: '#D51414'})
    )
    hut.add(box)

    const roofplater = new THREE.Mesh(
        new THREE.BoxGeometry(25, 2, 19),
        new THREE.MeshBasicMaterial({ color: '#542222', side: THREE.DoubleSide})
    )
    roofplater.rotateX(0.78539816339)
    roofplater.position.y = 11
    roofplater.position.z = 6
    hut.add(roofplater)

    const roofplatel = new THREE.Mesh(
        new THREE.BoxGeometry(25, 2, 19),
        new THREE.MeshBasicMaterial({ color: '#542222', side: THREE.DoubleSide})
    )
    roofplatel.rotateX(-0.78539816339)
    roofplatel.position.y = 11
    roofplatel.position.z = -6
    hut.add(roofplatel)

    const rooffill1 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 2, 16),
        new THREE.MeshBasicMaterial({ color: '#D51414'})
    )
    rooffill1.position.y = 8

    hut.add(rooffill1)

    const rooffill2 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 2, 14),
        new THREE.MeshBasicMaterial({ color: '#D51414'})
    )
    rooffill2.position.y = 10

    hut.add(rooffill2)

    const rooffill3 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 2, 10),
        new THREE.MeshBasicMaterial({ color: '#D51414'})
    )
    rooffill3.position.y = 12

    hut.add(rooffill3)

    const rooffill4 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 3, 5),
        new THREE.MeshBasicMaterial({ color: '#D51414'})
    )
    rooffill4.position.y = 14

    hut.add(rooffill4)

    const door1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 12, 7),
        new THREE.MeshBasicMaterial({ color: '#542222'})
    )
    door1.position.x = -10
    door1.position.y = -1
    door1.position.z = 4
    
    hut.add(door1)

    const handle = new THREE.Mesh(
        new THREE.BoxGeometry(1,0.5,0.5),
        new THREE.MeshBasicMaterial({ color: '#CBA50B'})
    )
    handle.position.x = -11
    handle.position.z = 6.5
    handle.position.y = -1

    hut.add(handle)

    const handle2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.5, 1.5),
        new THREE.MeshBasicMaterial({ color: '#CBA50B'})
    )
    handle2.position.x = -11.5
    handle2.position.y = -1
    handle2.position.z = 6

    
    hut.add(handle2)


    const window2 = Window2()
    window2.position.y = 0
    window2.position.x = -10
    window2.position.z = -5
    hut.add(window2)  

    const window3 = Window2()
    window3.rotateY(-1.57079632679)
    window3.position.z = -10
    window3.position.y = 0

    hut.add(window3)
    const window4 = Window2()
    window4.rotateY(1.57079632679)
    window4.position.z = 10
    window4.position.y = 0

    hut.add(window4)

    const window5 = Window2()
    window5.position.y = 9
    window5.position.x = -10
    window5.position.z = 0
    hut.add(window5)  
    return hut;
}

function Tree1 () {

    const tree1 = new THREE.Group()

    const treestomp = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2, 15, 100),
        new THREE.MeshBasicMaterial({ color: '#50301E'})
    )
    tree1.position.y = 7.6
    tree1.add(treestomp)

    const leafs = new THREE.Mesh(
        new THREE.ConeGeometry(10, 50, 100),
        new THREE.MeshBasicMaterial({ color: '#006408'})
    )
    leafs.position.y = 30
    tree1.add(leafs)

    return tree1
}

function Flowers() {
    const flowers = new THREE.Group()

    const flowerscolor = ['#FD0000', '#0064FD', '#C300FD', '#DFDFDF', '#E598CB']

    const flowernumber = Math.floor(Math.random() * flowerscolor.length)

    const root = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 1, 0.2),
        new THREE.MeshBasicMaterial({ color: '#11E027'})
    )
    root.position.y = 0.5
    flowers.add(root)

    const pedalcenter = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.1, 64),
        new THREE.MeshBasicMaterial({ color: '#FFF000', side: THREE.DoubleSide})
    )
    pedalcenter.position.y = 1
    flowers.add(pedalcenter)

    const pedalcolor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 0.1, 64),
        new THREE.MeshBasicMaterial({ color: flowerscolor[flowernumber], side: THREE.DoubleSide})
    )
    pedalcolor.position.y = 0.9
    flowers.add(pedalcolor)

    return flowers
}
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 2000, 2000),
    new THREE.MeshBasicMaterial({ color: '#178815', side: THREE.DoubleSide})
)

for( let i = 0; i < 50; i++){

    let randomX = Math.floor(Math.random()* 500) - 250
    let randomZ = Math.floor(Math.random()* 500) - 250
    if( randomX > 25 || randomX < -25 && randomZ > 25 || randomZ < -25){
    
        let tree = Tree1()
        tree.position.z = randomZ
        tree.position.x = randomX
        scene.add(tree)
    }
}

const loader = new GLTFLoader().setPath('./models/sign.glb')

loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene
    mesh.position.set(-20, 0, 0)
    scene.add(mesh)
})

for( let i = 0; i < 1000; i++){

    let randomX = Math.floor(Math.random()* 500) - 250
    let randomZ = Math.floor(Math.random()* 500) - 250
    
        let flower = Flowers()
        flower.position.z = randomZ
        flower.position.x = randomX
        scene.add(flower)
}


const hut = Hut()
hut.position.z = 0
hut.position.x = 0
hut.position.y = 7


scene.add(hut)

plane.rotateX(1.57079632679)
scene.add(plane)



const texture = new THREE.TextureLoader().load( "textures/water.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

scene.background = new THREE.Color('#6A6A6A')

const light = new THREE.AmbientLight('#000000', 0.5)
light.position.y = 60
light.position.z = 60
light.castShadow = true

scene.add(light)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
    window.innerHeight, 1, 1000)
// camera.position.x = -100
// camera.position.y = 60
// camera.position.z = 5

console.log(
    hut.position.x,
    hut.position.z
)


const renderer = new THREE.WebGLRenderer({ antialias: true})
renderer.setSize( window.innerWidth, window.innerHeight)
document.body.appendChild( renderer.domElement )

const boom = new THREE.Group()

boom.add(camera)
scene.add(boom)
camera.position.set(-100, 60, 5)
camera.lookAt(0, 0, 0)


function animate() {
    requestAnimationFrame( animate )
    boom.rotation.y += 0.001

    renderer.render(scene, camera)
}

animate()
