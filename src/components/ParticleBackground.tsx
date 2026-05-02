import { useEffect, useRef } from "react"
import * as THREE from "three"

const palette = [0xb78cff, 0x8b5cf6, 0xe879f9, 0x6d28d9, 0xc4b5fd]

function getParticleCount(width: number) {
  if (width < 640) return 360
  if (width < 1024) return 620
  return 920
}

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: 0, y: 0, active: false, lastMove: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.className = "h-full w-full"
    container.appendChild(renderer.domElement)

    const particleCount = getParticleCount(window.innerWidth)
    const basePositions = new Float32Array(particleCount * 3)
    const currentPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const seeds = new Float32Array(particleCount)
    const color = new THREE.Color()

    for (let index = 0; index < particleCount; index += 1) {
      const positionIndex = index * 3
      const radius = 2.4 + Math.random() * 4.8
      const angle = Math.random() * Math.PI * 2
      const depth = (Math.random() - 0.5) * 3.4

      basePositions[positionIndex] = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2
      basePositions[positionIndex + 1] = Math.sin(angle) * radius * 0.56 + (Math.random() - 0.5) * 1.1
      basePositions[positionIndex + 2] = depth
      currentPositions[positionIndex] = basePositions[positionIndex]
      currentPositions[positionIndex + 1] = basePositions[positionIndex + 1]
      currentPositions[positionIndex + 2] = basePositions[positionIndex + 2]
      seeds[index] = Math.random() * Math.PI * 2

      color.setHex(palette[index % palette.length])
      colors[positionIndex] = color.r
      colors[positionIndex + 1] = color.g
      colors[positionIndex + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.058,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const clock = new THREE.Clock()
    let animationFrameId = 0

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
        active: true,
        lastMove: performance.now(),
      }
    }

    const softenPointer = () => {
      pointerRef.current.active = false
      pointerRef.current.lastMove = performance.now()
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const positionAttribute = geometry.getAttribute("position") as { needsUpdate: boolean }
      const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * camera.position.z
      const visibleWidth = visibleHeight * camera.aspect
      const pointer = pointerRef.current
      const pointerAge = performance.now() - pointer.lastMove
      const pointerStrength = pointer.active ? Math.max(0, 1 - pointerAge / 1100) : Math.max(0, 0.28 - pointerAge / 1600)
      const pointerX = pointer.x * visibleWidth * 0.5
      const pointerY = pointer.y * visibleHeight * 0.5

      for (let index = 0; index < particleCount; index += 1) {
        const positionIndex = index * 3
        const baseX = basePositions[positionIndex]
        const baseY = basePositions[positionIndex + 1]
        const baseZ = basePositions[positionIndex + 2]
        let targetX = baseX + Math.sin(elapsed * 0.38 + seeds[index]) * 0.035
        let targetY = baseY + Math.cos(elapsed * 0.34 + seeds[index]) * 0.035
        let targetZ = baseZ + Math.sin(elapsed * 0.22 + seeds[index]) * 0.06

        if (pointerStrength > 0) {
          const deltaX = targetX - pointerX
          const deltaY = targetY - pointerY
          const distance = Math.hypot(deltaX, deltaY)
          const influenceRadius = 1.75

          if (distance < influenceRadius) {
            const directionX = distance > 0.001 ? deltaX / distance : 1
            const directionY = distance > 0.001 ? deltaY / distance : 0
            const force = ((influenceRadius - distance) / influenceRadius) ** 2 * pointerStrength * 1.45

            targetX += directionX * force
            targetY += directionY * force
            targetZ += force * 0.85
          }
        }

        currentPositions[positionIndex] += (targetX - currentPositions[positionIndex]) * 0.085
        currentPositions[positionIndex + 1] += (targetY - currentPositions[positionIndex + 1]) * 0.085
        currentPositions[positionIndex + 2] += (targetZ - currentPositions[positionIndex + 2]) * 0.085
      }

      positionAttribute.needsUpdate = true
      particles.rotation.y = Math.sin(elapsed * 0.14) * 0.04
      particles.rotation.x = Math.cos(elapsed * 0.12) * 0.025
      renderer.render(scene, camera)
      animationFrameId = window.requestAnimationFrame(animate)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", softenPointer)
    window.addEventListener("blur", softenPointer)
    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", softenPointer)
      window.removeEventListener("blur", softenPointer)
      window.removeEventListener("resize", handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_18%_12%,oklch(0.34_0.16_303_/_0.55),transparent_34%),radial-gradient(circle_at_82%_18%,oklch(0.27_0.13_325_/_0.46),transparent_30%),radial-gradient(circle_at_52%_88%,oklch(0.25_0.12_270_/_0.52),transparent_42%),linear-gradient(135deg,oklch(0.055_0.02_292),oklch(0.12_0.07_296)_48%,oklch(0.035_0.015_292))]"
      data-particle-background
    />
  )
}
