import { NodeData } from "@/lib/data"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface DetailPanelProps {
  node: NodeData | null
  isOpen: boolean
  onClose: () => void
}

export function DetailPanel({ node, isOpen, onClose }: DetailPanelProps) {
  if (!node) return null

  const Icon = node.icon

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full max-w-[100vw] gap-0 border-violet-300/20 bg-black/88 p-0 text-violet-50 backdrop-blur-xl sm:max-w-[520px]">
        <div className="flex flex-col h-full">
          <SheetHeader className="border-b border-violet-300/15 p-4 pr-14 sm:p-6 sm:pr-14">
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-violet-400/15 p-2">
                <Icon size={28} weight="bold" className="text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl leading-tight sm:text-2xl">{node.title}</SheetTitle>
                <SheetDescription className="sr-only">
                  Información detallada sobre {node.title}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4 py-4 sm:px-6">
            <div className="space-y-5 pb-6">
              <div>
                <h3 className="text-sm font-semibold text-violet-200/70 uppercase tracking-wide mb-2">
                  Descripción
                </h3>
                <p className="text-base leading-relaxed">{node.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold text-violet-200/70 uppercase tracking-wide mb-3">
                  Puntos Clave
                </h3>
                <ul className="space-y-2">
                  {node.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 font-bold">•</span>
                      <span className="text-sm leading-relaxed flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="rounded-md border border-violet-300/15 bg-violet-400/10 p-4">
                <h3 className="text-sm font-semibold text-violet-200/70 uppercase tracking-wide mb-2">
                  Dato destacado
                </h3>
                <p className="text-sm leading-relaxed font-medium">{node.keyData}</p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
