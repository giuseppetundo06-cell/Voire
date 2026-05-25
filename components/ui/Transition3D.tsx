'use client'
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'

export interface Transition3DHandle {
  playArchitettura: (onComplete: () => void) => void
  playAutomotive: (onComplete: () => void) => void
  playGioielleria: (onComplete: () => void) => void
}

const Transition3D = forwardRef<Transition3DHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 1)
    rendererRef.current = renderer

    return () => {
      cancelAnimationFrame(animRef.current)
      renderer.dispose()
    }
  }, [])

  const show = () => {
    const canvas = canvasRef.current!
    canvas.style.opacity = '1'
    canvas.style.pointerEvents = 'all'
  }

  const hide = () => {
    const canvas = canvasRef.current!
    canvas.style.opacity = '0'
    canvas.style.pointerEvents = 'none'
    cancelAnimationFrame(animRef.current)
  }

  useImperativeHandle(ref, () => ({

    playArchitettura: (onComplete) => {
      const renderer = rendererRef.current!
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5
      scene.background = new THREE.Color(0x000000)

      const loader = new THREE.TextureLoader()
      loader.crossOrigin = 'anonymous'
      loader.load(
        'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
        (texture) => {
          const geo = new THREE.PlaneGeometry(18, 10)
          const mat = new THREE.MeshBasicMaterial({ map: texture })
          const plane = new THREE.Mesh(geo, mat)
          plane.position.z = -2
          scene.add(plane)

          show()
          let t = 0

          const loop = () => {
            t += 0.016
            const ease = t < 1 ? t * t * t : 1

            camera.position.z = 5 - ease * 13
            camera.fov = 75 + ease * 35
            camera.updateProjectionMatrix()

            if (t > 0.75) {
              const fade = Math.min((t - 0.75) / 0.25, 1)
              scene.background = new THREE.Color(fade * 0.05, fade * 0.15, fade * 0.1)
            }

            renderer.render(scene, camera)

            if (t < 1.0) {
              animRef.current = requestAnimationFrame(loop)
            } else {
              hide()
              onComplete()
            }
          }
          animRef.current = requestAnimationFrame(loop)
        },
        undefined,
        () => {
          // Se fallisce il caricamento naviga comunque
          hide()
          onComplete()
        }
      )
    },

    playAutomotive: (onComplete) => {
      const renderer = rendererRef.current!
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 1, 6)
      camera.lookAt(0, 0, 0)
      scene.background = new THREE.Color(0x050505)

      // Luci
      scene.add(new THREE.AmbientLight(0x333333, 2))
      const dirLight = new THREE.DirectionalLight(0xffffff, 3)
      dirLight.position.set(5, 5, 5)
      scene.add(dirLight)
      const redLight = new THREE.PointLight(0x8B3A3A, 5, 8)
      redLight.position.set(-3, 0.5, 1)
      scene.add(redLight)

      // Gruppo macchina
      const car = new THREE.Group()

      // Corpo
      const bodyGeo = new THREE.BoxGeometry(4, 0.7, 1.8)
      const bodyMat = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, shininess: 300 })
      car.add(new THREE.Mesh(bodyGeo, bodyMat))

      // Tetto
      const roofGeo = new THREE.BoxGeometry(2.2, 0.55, 1.6)
      const roofMat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 200 })
      const roof = new THREE.Mesh(roofGeo, roofMat)
      roof.position.set(-0.3, 0.62, 0)
      car.add(roof)

      // Parabrezza
      const windshieldGeo = new THREE.PlaneGeometry(0.8, 0.5)
      const windshieldMat = new THREE.MeshPhongMaterial({ color: 0x88aaff, transparent: true, opacity: 0.3, shininess: 500 })
      const windshield = new THREE.Mesh(windshieldGeo, windshieldMat)
      windshield.position.set(0.7, 0.55, 0)
      windshield.rotation.y = Math.PI / 2
      car.add(windshield)

      // Ruote
      const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 24)
      const wheelMat = new THREE.MeshPhongMaterial({ color: 0x0a0a0a, shininess: 100 })
      const rimGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.26, 12)
      const rimMat = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 400 })
      const wheelPositions = [[-1.4, -0.4, 1.0], [1.4, -0.4, 1.0], [-1.4, -0.4, -1.0], [1.4, -0.4, -1.0]]
      const wheels: THREE.Mesh[] = []
      wheelPositions.forEach(([x, y, z]) => {
        const w = new THREE.Mesh(wheelGeo, wheelMat)
        w.rotation.x = Math.PI / 2
        w.position.set(x, y, z)
        car.add(w)
        wheels.push(w)
        const rim = new THREE.Mesh(rimGeo, rimMat)
        rim.rotation.x = Math.PI / 2
        rim.position.set(x, y, z)
        car.add(rim)
      })

      // Fari posteriori rossi
      const rearLightGeo = new THREE.BoxGeometry(0.1, 0.15, 0.4)
      const rearLightMat = new THREE.MeshBasicMaterial({ color: 0x8B3A3A })
      const rearL = new THREE.Mesh(rearLightGeo, rearLightMat)
      rearL.position.set(-2.05, 0.1, 0.6)
      car.add(rearL)
      const rearR = new THREE.Mesh(rearLightGeo, rearLightMat)
      rearR.position.set(-2.05, 0.1, -0.6)
      car.add(rearR)

      // Pavimento
      const floorGeo = new THREE.PlaneGeometry(60, 20)
      const floorMat = new THREE.MeshPhongMaterial({ color: 0x0a0a0a, shininess: 200 })
      const floor = new THREE.Mesh(floorGeo, floorMat)
      floor.rotation.x = -Math.PI / 2
      floor.position.y = -0.76
      scene.add(floor)

      car.position.set(20, 0, 0)
      car.rotation.y = -Math.PI / 10
      scene.add(car)

      show()
      let t = 0

      const loop = () => {
        t += 0.014
        wheels.forEach(w => { w.rotation.z -= 0.2 })

        // Fase 1: entra da destra (0 → 0.35)
        if (t < 0.35) {
          const p = t / 0.35
          const ease = 1 - Math.pow(1 - p, 4)
          car.position.x = 20 - 20 * ease
          car.rotation.y = -Math.PI / 10 + (Math.PI / 10) * ease
          redLight.intensity = 5 + ease * 3
        }
        // Fase 2: camera gira intorno (0.35 → 0.65)
        else if (t < 0.65) {
          const p = (t - 0.35) / 0.30
          car.position.x = 0
          car.rotation.y = 0
          camera.position.x = Math.sin(p * Math.PI) * 5
          camera.position.z = 6 - p * 2
          camera.position.y = 1 + p * 0.5
          camera.lookAt(car.position)
          redLight.intensity = 8 + Math.sin(p * Math.PI * 3) * 3
        }
        // Fase 3: sfreccia via a sinistra (0.65 → 1.0)
        else if (t < 1.0) {
          const p = (t - 0.65) / 0.35
          const ease = p * p * p
          car.position.x = -ease * 25
          car.rotation.y = -ease * Math.PI / 6
          camera.position.set(0, 1, 6)
          camera.lookAt(0, 0, 0)
          redLight.intensity = 8 + ease * 15
          redLight.position.x = -3 + ease * -5
          scene.background = new THREE.Color(ease * 0.3, 0, 0)
        }

        renderer.render(scene, camera)

        if (t < 1.0) {
          animRef.current = requestAnimationFrame(loop)
        } else {
          hide()
          onComplete()
        }
      }
      animRef.current = requestAnimationFrame(loop)
    },

    playGioielleria: (onComplete) => {
      const renderer = rendererRef.current!
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 6
      scene.background = new THREE.Color(0x050400)

      // Luci
      scene.add(new THREE.AmbientLight(0x221100, 2))
      const light1 = new THREE.PointLight(0xC9A227, 6, 15)
      light1.position.set(3, 3, 3)
      scene.add(light1)
      const light2 = new THREE.PointLight(0xE8D48A, 4, 12)
      light2.position.set(-3, -3, 2)
      scene.add(light2)
      const light3 = new THREE.PointLight(0xffffff, 3, 10)
      light3.position.set(0, 5, 1)
      scene.add(light3)

      // Gioiello: diamante stilizzato
      const group = new THREE.Group()

      // Forma principale
      const topGeo = new THREE.ConeGeometry(1.2, 1.0, 8)
      const topMat = new THREE.MeshPhongMaterial({
        color: 0xC9A227,
        emissive: 0x8B7020,
        emissiveIntensity: 0.4,
        shininess: 800,
        transparent: true,
        opacity: 0.9,
      })
      const top = new THREE.Mesh(topGeo, topMat)
      top.position.y = 0.2
      group.add(top)

      const botGeo = new THREE.ConeGeometry(1.2, 1.8, 8)
      const botMat = new THREE.MeshPhongMaterial({
        color: 0xB8920F,
        emissive: 0x6B5010,
        emissiveIntensity: 0.3,
        shininess: 600,
        transparent: true,
        opacity: 0.85,
      })
      const bot = new THREE.Mesh(botGeo, botMat)
      bot.rotation.x = Math.PI
      bot.position.y = -0.7
      group.add(bot)

      // Wireframe
      const wireTop = new THREE.Mesh(topGeo, new THREE.MeshBasicMaterial({ color: 0xE8D48A, wireframe: true, transparent: true, opacity: 0.2 }))
      wireTop.position.y = 0.2
      group.add(wireTop)
      const wireBot = new THREE.Mesh(botGeo, new THREE.MeshBasicMaterial({ color: 0xE8D48A, wireframe: true, transparent: true, opacity: 0.2 }))
      wireBot.rotation.x = Math.PI
      wireBot.position.y = -0.7
      group.add(wireBot)

      // Catena
      const chainGeo = new THREE.CylinderGeometry(0.03, 0.03, 3, 8)
      const chainMat = new THREE.MeshPhongMaterial({ color: 0xC9A227, shininess: 400 })
      const chain = new THREE.Mesh(chainGeo, chainMat)
      chain.position.y = 1.7
      group.add(chain)

      scene.add(group)

      // Particelle dorate
      const pGeo = new THREE.BufferGeometry()
      const pCount = 300
      const pPos = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 12
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 12
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 8
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      const pMat = new THREE.PointsMaterial({ color: 0xC9A227, size: 0.06, transparent: true, opacity: 0.7 })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      show()
      let t = 0
      const pivotY = 3

      const loop = () => {
        t += 0.013

        // Pendolo fisico realistico
        const damping = Math.exp(-t * 1.2)
        const swing = Math.sin(t * 3.5) * damping * 0.6
        group.rotation.z = swing

        // Ancoraggio in alto (effetto pendolo)
        group.position.x = Math.sin(swing) * pivotY
        group.position.y = -Math.cos(swing) * pivotY + pivotY - 1.5

        // Rotazione lenta Y
        group.rotation.y += 0.008

        // Particelle
        particles.rotation.y += 0.003
        particles.rotation.x += 0.001

        // Luci pulsanti
        light1.intensity = 6 + Math.sin(t * 4) * 2
        light2.intensity = 4 + Math.cos(t * 3) * 1.5

        // Fase espansione (0.7 → 1.0)
        if (t > 0.7) {
          const p = (t - 0.7) / 0.3
          const ease = p * p
          group.scale.setScalar(1 + ease * 5)
          camera.position.z = 6 - ease * 4
          light1.intensity = 6 + ease * 30
          light3.intensity = 3 + ease * 20
          scene.background = new THREE.Color(
            0.05 + ease * 0.7,
            0.04 + ease * 0.6,
            0 + ease * 0.1
          )
        }

        renderer.render(scene, camera)

        if (t < 1.0) {
          animRef.current = requestAnimationFrame(loop)
        } else {
          hide()
          onComplete()
        }
      }
      animRef.current = requestAnimationFrame(loop)
    }
  }))

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        opacity: 0,
        pointerEvents: 'none',
        display: 'block',
        transition: 'none',
      }}
    />
  )
})

Transition3D.displayName = 'Transition3D'
export default Transition3D