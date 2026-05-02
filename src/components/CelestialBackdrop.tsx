import { conceptCanvas, type NodeLayout } from "@/lib/data"

interface CelestialBackdropProps {
  nodeLayouts: NodeLayout[]
}

const orbitBands = [
  { centerY: 220, radiusX: 520, radiusY: 86, opacity: 0.34 },
  { centerY: 410, radiusX: 510, radiusY: 92, opacity: 0.28 },
  { centerY: 650, radiusX: 330, radiusY: 92, opacity: 0.25 },
  { centerY: 875, radiusX: 220, radiusY: 66, opacity: 0.22 },
]

export function CelestialBackdrop({ nodeLayouts }: CelestialBackdropProps) {
  const centerLayout = nodeLayouts.find((nodeLayout) => nodeLayout.id === "center")

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox={`0 0 ${conceptCanvas.width} ${conceptCanvas.height}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5d0fe" stopOpacity="0.54" />
          <stop offset="38%" stopColor="#c084fc" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <filter id="orbit-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#orbit-glow)">
        {orbitBands.map((orbit) => (
          <ellipse
            key={orbit.centerY}
            cx={conceptCanvas.width / 2}
            cy={orbit.centerY}
            rx={orbit.radiusX}
            ry={orbit.radiusY}
            fill="none"
            stroke="#c4b5fd"
            strokeDasharray="8 18"
            strokeLinecap="round"
            strokeWidth="1.6"
            opacity={orbit.opacity}
          />
        ))}
      </g>

      {centerLayout ? (
        <g filter="url(#orbit-glow)">
          <circle cx={centerLayout.centerX} cy={centerLayout.centerY} r="116" fill="url(#sun-halo)" />
          <circle
            cx={centerLayout.centerX}
            cy={centerLayout.centerY}
            r="82"
            fill="none"
            stroke="#f0abfc"
            strokeWidth="1.5"
            opacity="0.42"
          />
          <circle
            cx={centerLayout.centerX}
            cy={centerLayout.centerY}
            r="126"
            fill="none"
            stroke="#a78bfa"
            strokeDasharray="5 16"
            strokeLinecap="round"
            strokeWidth="1.3"
            opacity="0.34"
          />
        </g>
      ) : null}

      {nodeLayouts.map((nodeLayout, index) =>
        nodeLayout.id === "center" ? null : (
          <g key={`halo-${nodeLayout.id}`} filter="url(#orbit-glow)">
            <ellipse
              cx={nodeLayout.centerX}
              cy={nodeLayout.centerY}
              rx={nodeLayout.width * 0.58}
              ry={nodeLayout.height * 0.58}
              fill="#7c3aed"
              opacity="0.08"
            />
            <ellipse
              cx={nodeLayout.centerX}
              cy={nodeLayout.centerY}
              rx={nodeLayout.width * 0.61}
              ry={nodeLayout.height * 0.42}
              fill="none"
              stroke="#ddd6fe"
              strokeWidth="1"
              strokeDasharray="3 10"
              strokeLinecap="round"
              opacity="0.22"
              transform={`rotate(${index % 2 === 0 ? -8 : 8} ${nodeLayout.centerX} ${nodeLayout.centerY})`}
            />
          </g>
        )
      )}
    </svg>
  )
}