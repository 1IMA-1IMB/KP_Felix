import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()

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
        new THREE.ConeGeometry(5, 25, 100),
        new THREE.MeshBasicMaterial({ color: '#006408'})
    )
    leafs.position.y = 7.6
    tree1.add(leafs)

    return tree1
}

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 500, 800),
    new THREE.MeshBasicMaterial({ color: '#68FF00', side: THREE.DoubleSide})
)

for( let i = 0; i < 100; i++){

    let randomX = Math.floor(Math.random()* 500) - 250
    let randomZ = Math.floor(Math.random()* 800) - 400

    let varname = `tree${i}`

    let tree = Tree1()
    tree.position.z = randomZ
    tree.position.x = randomX
    scene.add(tree)
}

const hut = Hut()
hut.position.z = -20
hut.position.x = -100
hut.position.y = 10


scene.add(hut)

plane.rotateX(1.57079632679)
scene.add(plane)

scene.background = new THREE.Color('#3892AD')

const light = new THREE.AmbientLight('#FFFFFF', 0.6)
light.position.y = 60
light.position.z = 60

const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
    window.innerHeight, 1, 1000)
camera.position.x = -200
camera.position.y = 30
camera.position.z = -15
camera.lookAt('0, 0, 0')


const renderer = new THREE.WebGLRenderer({ antialias: true})
renderer.setSize( window.innerWidth, window.innerHeight)
document.body.appendChild( renderer.domElement )

const controls = new OrbitControls( camera, renderer.domElement );


function animate() {
    requestAnimationFrame( animate )

    renderer.render(scene, camera)
}

animate()
