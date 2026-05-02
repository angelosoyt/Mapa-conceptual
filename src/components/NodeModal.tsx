import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { NodeData } from "@/lib/data"

interface NodeModalProps {
  node: NodeData | null
  isOpen: boolean
  onClose: () => void
}

export function NodeModal({ node, isOpen, onClose }: NodeModalProps) {
  if (!node) return null

  const Icon = node.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
                <div className={`bg-gradient-to-r ${node.color} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        {node.title}
                      </h2>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="max-h-[60vh]">
                  <div className="p-8 space-y-6">
                    <div>
                      <p className="text-slate-300 leading-relaxed text-base">
                        {node.description}
                      </p>
                    </div>

                    <Separator className="bg-slate-700" />

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                        Puntos Clave
                      </h3>
                      <ul className="space-y-3">
                        {node.keyPoints.map((point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 text-slate-300"
                          >
                            <span className="text-cyan-400 mt-1 flex-shrink-0">
                              •
                            </span>
                            <span className="text-sm leading-relaxed">
                              {point}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <Separator className="bg-slate-700" />

                    <div className="bg-gradient-to-br from-cyan-950/50 to-purple-950/50 border border-cyan-500/30 rounded-lg p-5">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 mt-1">
                          Dato Importante
                        </Badge>
                      </div>
                      <p className="text-slate-200 mt-3 leading-relaxed text-sm">
                        {node.keyData}
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
