import { motion } from "framer-motion"
import { NodeData } from "@/lib/data"
import { cn } from "@/lib/utils"

interface MapNodeProps {
  node: NodeData
  centerX: number
  centerY: number
  width: number
  height: number
  isSelected: boolean
  onClick: () => void
  index: number
}

const colorMap = {
  primary: "border-violet-100/85 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,.58),rgba(240,171,252,.42)_16%,rgba(126,34,206,.82)_48%,rgba(24,6,62,.99)_100%)] text-white shadow-[0_0_38px_rgba(192,132,252,0.46)]",
  coral: "border-node-coral bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,.32),rgba(236,72,153,.24)_18%,rgba(91,33,182,.82)_58%,rgba(5,2,14,.98)_100%)] text-violet-50 shadow-[0_0_30px_rgba(217,70,239,0.32)] backdrop-blur-md",
  purple: "border-node-purple bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,.30),rgba(192,132,252,.26)_18%,rgba(76,29,149,.86)_58%,rgba(5,2,16,.98)_100%)] text-violet-50 shadow-[0_0_30px_rgba(168,85,247,0.34)] backdrop-blur-md",
  green: "border-node-green bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,.28),rgba(129,140,248,.24)_18%,rgba(67,56,202,.82)_58%,rgba(4,3,17,.98)_100%)] text-violet-50 shadow-[0_0_30px_rgba(129,140,248,0.30)] backdrop-blur-md",
  blue: "border-node-blue bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,.30),rgba(216,180,254,.24)_18%,rgba(107,33,168,.84)_58%,rgba(5,2,14,.98)_100%)] text-violet-50 shadow-[0_0_30px_rgba(196,181,253,0.30)] backdrop-blur-md",
}

const iconColorMap = {
  primary: "bg-black/22 text-white ring-1 ring-white/28",
  coral: "bg-black/42 text-node-coral ring-1 ring-node-coral/36",
  purple: "bg-black/42 text-node-purple ring-1 ring-node-purple/36",
  green: "bg-black/42 text-node-green ring-1 ring-node-green/36",
  blue: "bg-black/42 text-node-blue ring-1 ring-node-blue/36",
}

export function MapNode({
  node,
  centerX,
  centerY,
  width,
  height,
  isSelected,
  onClick,
  index,
}: MapNodeProps) {
  const Icon = node.icon
  const iconSize = node.isCenter ? 30 : 24
  const colorKey = node.color as keyof typeof colorMap

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.035, 0.28), duration: 0.22 }}
      style={{
        position: "absolute",
        left: centerX - width / 2,
        top: centerY - height / 2,
        width,
        height,
      }}
    >
      <motion.button
        type="button"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group relative h-full w-full cursor-pointer overflow-hidden rounded-full border-2 px-5 py-4 text-center shadow-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "flex flex-col items-center justify-center gap-2",
          colorMap[colorKey],
          isSelected && "ring-4 ring-accent ring-offset-2 ring-offset-background"
        )}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={onClick}
        aria-pressed={isSelected}
        aria-label={`Abrir ${node.title}`}
      >
        <span className="pointer-events-none absolute inset-[16%] rounded-full bg-black/24 blur-md" />
        <span className="pointer-events-none absolute inset-1 rounded-full border border-white/10 opacity-80" />
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[112%] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] rounded-full border border-violet-100/18 opacity-70 transition group-hover:border-violet-100/36" />
        <span className="pointer-events-none absolute right-[16%] top-[18%] h-2 w-2 rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.85)]" />

        <div className="relative z-10 flex items-center justify-center gap-2">
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10",
              iconColorMap[colorKey]
            )}
          >
            <Icon size={iconSize} weight="bold" />
          </span>
          <span
            className={cn(
              "rounded-full border border-white/10 bg-black/36 px-2 py-0.5 text-[0.66rem] font-bold uppercase tracking-wide shadow-[0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-[2px]",
              node.isCenter ? "text-white/92" : "text-violet-50/88"
            )}
          >
            {node.isCenter ? "Estrella central" : "Planeta conceptual"}
          </span>
        </div>

        <span
          className={cn(
            "relative z-10 block max-w-[92%] rounded-full border border-white/12 bg-black/58 px-3 py-1.5 text-balance font-extrabold leading-tight text-white shadow-[inset_0_0_18px_rgba(15,3,35,0.72),0_4px_18px_rgba(0,0,0,0.56)] backdrop-blur-[2px] [text-shadow:0_2px_8px_rgba(0,0,0,1),0_0_14px_rgba(255,255,255,0.3)]",
            node.isCenter ? "text-xl sm:text-2xl" : "text-[1.05rem]"
          )}
        >
          {node.title}
        </span>
      </motion.button>
    </motion.div>
  )
}
