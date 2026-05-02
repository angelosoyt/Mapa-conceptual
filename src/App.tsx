import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type WheelEvent,
} from "react"
import { ArrowCounterClockwise, MagnifyingGlassMinus, MagnifyingGlassPlus } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { MapNode } from "@/components/MapNode"
import { ConnectionLines } from "@/components/ConnectionLines"
import { DetailPanel } from "@/components/DetailPanel"
import { ParticleBackground } from "@/components/ParticleBackground"
import { CelestialBackdrop } from "@/components/CelestialBackdrop"
import {
  conceptCanvas,
  conceptLinks,
  conceptNodeLayouts,
  nodesData,
  type NodeData,
} from "@/lib/data"

const minimumZoom = 0.25
const maximumZoom = 2.2

type ViewportPoint = {
  viewportX: number
  viewportY: number
}

type MapTransform = {
  scale: number
  offsetX: number
  offsetY: number
}

type PanGesture = {
  mode: "pan"
  startPointer: ViewportPoint
  startTransform: MapTransform
}

type PinchGesture = {
  mode: "pinch"
  startDistance: number
  startScale: number
  focusContentX: number
  focusContentY: number
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

function getDistance(firstPoint: ViewportPoint, secondPoint: ViewportPoint) {
  return Math.hypot(
    secondPoint.viewportX - firstPoint.viewportX,
    secondPoint.viewportY - firstPoint.viewportY
  )
}

function getMidpoint(firstPoint: ViewportPoint, secondPoint: ViewportPoint) {
  return {
    viewportX: (firstPoint.viewportX + secondPoint.viewportX) / 2,
    viewportY: (firstPoint.viewportY + secondPoint.viewportY) / 2,
  }
}

function getViewportPoint(event: PointerEvent<HTMLDivElement> | WheelEvent<HTMLDivElement>) {
  const bounds = event.currentTarget.getBoundingClientRect()

  return {
    viewportX: event.clientX - bounds.left,
    viewportY: event.clientY - bounds.top,
  }
}

function App() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [mapTransform, setMapTransform] = useState<MapTransform>({
    scale: 0.72,
    offsetX: 0,
    offsetY: 0,
  })
  const viewportRef = useRef<HTMLDivElement>(null)
  const mapCanvasRef = useRef<HTMLDivElement>(null)
  const activePointersRef = useRef<Map<number, ViewportPoint>>(new Map())
  const gestureRef = useRef<PanGesture | PinchGesture | null>(null)
  const mapTransformRef = useRef(mapTransform)
  const hasInteractedRef = useRef(false)

  const nodeById = useMemo(() => new Map(nodesData.map((node) => [node.id, node])), [])

  useEffect(() => {
    mapTransformRef.current = mapTransform
  }, [mapTransform])

  useLayoutEffect(() => {
    const mapCanvas = mapCanvasRef.current
    if (!mapCanvas) return

    mapCanvas.style.transform = `translate3d(${mapTransform.offsetX}px, ${mapTransform.offsetY}px, 0) scale(${mapTransform.scale})`
  }, [mapTransform])

  const fitMapToViewport = useCallback(() => {
    const viewport = viewportRef.current

    if (!viewport) return

    const horizontalPadding = viewport.clientWidth < 640 ? 28 : 96
    const verticalPadding = viewport.clientHeight < 620 ? 28 : 80
    const availableWidth = Math.max(viewport.clientWidth - horizontalPadding, 320)
    const availableHeight = Math.max(viewport.clientHeight - verticalPadding, 320)
    const fittedScale = clamp(
      Math.min(availableWidth / conceptCanvas.width, availableHeight / conceptCanvas.height, 1),
      minimumZoom,
      1
    )

    setMapTransform({
      scale: fittedScale,
      offsetX: (viewport.clientWidth - conceptCanvas.width * fittedScale) / 2,
      offsetY: Math.max(12, (viewport.clientHeight - conceptCanvas.height * fittedScale) / 2),
    })
  }, [])

  useEffect(() => {
    fitMapToViewport()

    const viewport = viewportRef.current
    if (!viewport) return

    const observer = new ResizeObserver(() => {
      if (!hasInteractedRef.current) {
        fitMapToViewport()
      }
    })

    observer.observe(viewport)
    return () => observer.disconnect()
  }, [fitMapToViewport])

  const beginPanGesture = useCallback((startPointer: ViewportPoint) => {
    gestureRef.current = {
      mode: "pan",
      startPointer,
      startTransform: mapTransformRef.current,
    }
  }, [])

  const beginPinchGesture = useCallback(() => {
    const activePointers = Array.from(activePointersRef.current.values())
    if (activePointers.length < 2) return

    const firstPoint = activePointers[0]
    const secondPoint = activePointers[1]
    const midpoint = getMidpoint(firstPoint, secondPoint)
    const currentTransform = mapTransformRef.current

    gestureRef.current = {
      mode: "pinch",
      startDistance: Math.max(getDistance(firstPoint, secondPoint), 1),
      startScale: currentTransform.scale,
      focusContentX: (midpoint.viewportX - currentTransform.offsetX) / currentTransform.scale,
      focusContentY: (midpoint.viewportY - currentTransform.offsetY) / currentTransform.scale,
    }
  }, [])

  const zoomAroundPoint = useCallback((viewportPoint: ViewportPoint, zoomFactor: number) => {
    const currentTransform = mapTransformRef.current
    const nextScale = clamp(currentTransform.scale * zoomFactor, minimumZoom, maximumZoom)
    const focusContentX = (viewportPoint.viewportX - currentTransform.offsetX) / currentTransform.scale
    const focusContentY = (viewportPoint.viewportY - currentTransform.offsetY) / currentTransform.scale

    hasInteractedRef.current = true
    setMapTransform({
      scale: nextScale,
      offsetX: viewportPoint.viewportX - focusContentX * nextScale,
      offsetY: viewportPoint.viewportY - focusContentY * nextScale,
    })
  }, [])

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setTimeout(() => setSelectedNode(null), 300)
  }

  const handleReset = () => {
    setIsPanelOpen(false)
    setSelectedNode(null)
    hasInteractedRef.current = false
    fitMapToViewport()
  }

  const handleZoomIn = () => {
    const viewport = viewportRef.current
    if (!viewport) return

    zoomAroundPoint(
      { viewportX: viewport.clientWidth / 2, viewportY: viewport.clientHeight / 2 },
      1.16
    )
  }

  const handleZoomOut = () => {
    const viewport = viewportRef.current
    if (!viewport) return

    zoomAroundPoint(
      { viewportX: viewport.clientWidth / 2, viewportY: viewport.clientHeight / 2 },
      0.86
    )
  }

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId)
      activePointersRef.current.set(event.pointerId, getViewportPoint(event))
      hasInteractedRef.current = true

      if (activePointersRef.current.size === 1) {
        beginPanGesture(getViewportPoint(event))
        return
      }

      beginPinchGesture()
    },
    [beginPanGesture, beginPinchGesture]
  )

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!activePointersRef.current.has(event.pointerId)) return

    activePointersRef.current.set(event.pointerId, getViewportPoint(event))
    const activePointers = Array.from(activePointersRef.current.values())
    const gesture = gestureRef.current

    if (activePointers.length >= 2 && gesture?.mode === "pinch") {
      const firstPoint = activePointers[0]
      const secondPoint = activePointers[1]
      const midpoint = getMidpoint(firstPoint, secondPoint)
      const nextScale = clamp(
        gesture.startScale * (getDistance(firstPoint, secondPoint) / gesture.startDistance),
        minimumZoom,
        maximumZoom
      )

      setMapTransform({
        scale: nextScale,
        offsetX: midpoint.viewportX - gesture.focusContentX * nextScale,
        offsetY: midpoint.viewportY - gesture.focusContentY * nextScale,
      })
      return
    }

    if (activePointers.length === 1 && gesture?.mode === "pan") {
      const currentPointer = activePointers[0]

      setMapTransform({
        scale: gesture.startTransform.scale,
        offsetX:
          gesture.startTransform.offsetX + currentPointer.viewportX - gesture.startPointer.viewportX,
        offsetY:
          gesture.startTransform.offsetY + currentPointer.viewportY - gesture.startPointer.viewportY,
      })
    }
  }, [])

  const handlePointerEnd = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      activePointersRef.current.delete(event.pointerId)

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }

      const activePointers = Array.from(activePointersRef.current.values())

      if (activePointers.length === 1) {
        beginPanGesture(activePointers[0])
        return
      }

      if (activePointers.length >= 2) {
        beginPinchGesture()
        return
      }

      gestureRef.current = null
    },
    [beginPanGesture, beginPinchGesture]
  )

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      zoomAroundPoint(getViewportPoint(event), event.deltaY > 0 ? 0.92 : 1.08)
    },
    [zoomAroundPoint]
  )

  const displayedZoom = Math.round(mapTransform.scale * 100)

  const renderedNodes = conceptNodeLayouts.map((nodeLayout) => ({
    nodeLayout,
    node: nodeById.get(nodeLayout.id),
  }))

  return (
    <div className="relative isolate flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <ParticleBackground />

      <header className="relative z-10 shrink-0 border-b border-white/10 bg-black/45 shadow-[0_10px_35px_rgba(15,5,30,0.35)] backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-3 py-3 sm:px-4 sm:py-5">
          <div className="text-center space-y-1 sm:space-y-2">
            <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
              Mapa Conceptual IDAP-2024-246
            </h1>
            <p className="mx-auto max-w-3xl text-sm text-violet-100/75 md:text-base">
              Ingeniería en Desarrollo de Aplicaciones | TecNM Campus Chetumal
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:mt-5">
            <Button onClick={handleZoomOut} variant="outline" size="icon" title="Alejar" aria-label="Alejar">
              <MagnifyingGlassMinus size={18} weight="bold" />
            </Button>
            <div className="min-w-14 rounded-md border border-violet-300/25 bg-black/40 px-3 py-2 text-center text-sm font-semibold text-violet-100/80">
              {displayedZoom}%
            </div>
            <Button onClick={handleZoomIn} variant="outline" size="icon" title="Acercar" aria-label="Acercar">
              <MagnifyingGlassPlus size={18} weight="bold" />
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-2 px-3"
            >
              <ArrowCounterClockwise size={18} weight="bold" />
              <span className="hidden sm:inline">Reiniciar vista</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 min-h-0 flex-1 overflow-hidden bg-[linear-gradient(180deg,rgba(8,3,18,0.18),rgba(20,6,45,0.42))] backdrop-blur-[1px]">
        <div
          ref={viewportRef}
          className="relative h-full w-full touch-none select-none overflow-hidden overscroll-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={handlePointerEnd}
          onWheel={handleWheel}
        >
          <div
            ref={mapCanvasRef}
            className="absolute left-0 top-0 h-[1040px] w-[1180px] origin-top-left"
          >
            <CelestialBackdrop nodeLayouts={conceptNodeLayouts} />
            <ConnectionLines
              nodeLayouts={conceptNodeLayouts}
              links={conceptLinks}
            />

            {renderedNodes.map(({ nodeLayout, node }, index) =>
              node ? (
                <MapNode
                  key={node.id}
                  node={node}
                  centerX={nodeLayout.centerX}
                  centerY={nodeLayout.centerY}
                  width={nodeLayout.width}
                  height={nodeLayout.height}
                  isSelected={selectedNode?.id === node.id}
                  onClick={() => handleNodeClick(node)}
                  index={index}
                />
              ) : null
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 hidden shrink-0 border-t border-white/10 bg-black/45 py-3 backdrop-blur-md md:block">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-violet-100/70">
            TecNM Campus Chetumal - Ingeniería en Desarrollo de Aplicaciones
          </p>
        </div>
      </footer>

      <DetailPanel
        node={selectedNode}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  )
}

export default App