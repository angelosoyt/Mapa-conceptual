import { motion } from "framer-motion"
import { ConceptLink, NodeLayout } from "@/lib/data"

interface ConnectionLinesProps {
  nodeLayouts: NodeLayout[]
  links: ConceptLink[]
}

function getBoundaryPoint(source: NodeLayout, target: NodeLayout) {
  const horizontalDelta = target.centerX - source.centerX
  const verticalDelta = target.centerY - source.centerY
  const safeHorizontalDelta = horizontalDelta === 0 ? 0.001 : horizontalDelta
  const safeVerticalDelta = verticalDelta === 0 ? 0.001 : verticalDelta
  const horizontalScale = source.width / 2 / Math.abs(safeHorizontalDelta)
  const verticalScale = source.height / 2 / Math.abs(safeVerticalDelta)
  const edgeScale = Math.min(horizontalScale, verticalScale)

  return {
    pointX: source.centerX + horizontalDelta * edgeScale,
    pointY: source.centerY + verticalDelta * edgeScale,
  }
}

export function ConnectionLines({ nodeLayouts, links }: ConnectionLinesProps) {
  const layoutById = new Map(nodeLayouts.map((nodeLayout) => [nodeLayout.id, nodeLayout]))

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <filter id="constellation-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="concept-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.88 0.10 306)" />
        </marker>
      </defs>

      {links.map((link, index) => {
        const sourceLayout = layoutById.get(link.from)
        const targetLayout = layoutById.get(link.to)

        if (!sourceLayout || !targetLayout) return null

        const startPoint = getBoundaryPoint(sourceLayout, targetLayout)
        const endPoint = getBoundaryPoint(targetLayout, sourceLayout)
        const labelCenterX = (startPoint.pointX + endPoint.pointX) / 2 + (link.labelOffsetX ?? 0)
        const labelCenterY = (startPoint.pointY + endPoint.pointY) / 2 + (link.labelOffsetY ?? 0)
        const labelWidth = Math.max(76, Math.min(154, link.label.length * 7 + 28))
        const labelHeight = 26
        const pathData = `M ${startPoint.pointX} ${startPoint.pointY} L ${endPoint.pointX} ${endPoint.pointY}`

        return (
          <g key={`${link.from}-${link.to}`}>
            <motion.path
              d={pathData}
              stroke="oklch(0.76 0.18 303)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              opacity="0.16"
              filter="url(#constellation-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: "easeInOut" }}
            />
            <motion.path
              d={pathData}
              stroke="oklch(0.88 0.10 306)"
              strokeWidth="2.4"
              strokeDasharray="4 10"
              strokeLinecap="round"
              fill="none"
              markerEnd="url(#concept-arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.84 }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: "easeInOut" }}
            />
            <motion.circle
              cx={startPoint.pointX}
              cy={startPoint.pointY}
              r="3.6"
              fill="#f5d0fe"
              filter="url(#constellation-glow)"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.25, delay: index * 0.06 + 0.08 }}
            />
            <motion.circle
              cx={endPoint.pointX}
              cy={endPoint.pointY}
              r="4.4"
              fill="#c4b5fd"
              filter="url(#constellation-glow)"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.95, scale: 1 }}
              transition={{ duration: 0.25, delay: index * 0.06 + 0.14 }}
            />
            <motion.g
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 + 0.2 }}
            >
              <rect
                x={labelCenterX - labelWidth / 2}
                y={labelCenterY - labelHeight / 2}
                width={labelWidth}
                height={labelHeight}
                rx="13"
                fill="oklch(0.055 0.02 295 / 0.94)"
                stroke="oklch(0.86 0.12 305 / 0.74)"
              />
              <text
                x={labelCenterX}
                y={labelCenterY + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="oklch(0.98 0.012 305)"
              >
                {link.label}
              </text>
            </motion.g>
          </g>
        )
      })}
    </svg>
  )
}
