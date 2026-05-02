import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface NodeCardProps {
  title: string
  icon: LucideIcon
  color: string
  onClick: () => void
  index: number
}

export function NodeCard({ title, icon: Icon, color, onClick, index }: NodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        onClick={onClick}
        className={`relative overflow-hidden cursor-pointer p-6 bg-gradient-to-br ${color} backdrop-blur-sm border-2 border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 group`}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3">
          <div className="p-4 bg-white/10 rounded-full backdrop-blur-md group-hover:bg-white/20 transition-all duration-300">
            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <h3 className="font-bold text-white text-lg leading-tight">
            {title}
          </h3>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      </Card>
    </motion.div>
  )
}
