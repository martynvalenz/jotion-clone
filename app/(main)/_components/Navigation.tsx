'use client'

import { cn } from "@/lib/utils"
import { ChevronsLeft, MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { type ElementRef, useEffect, useRef, useState, type MouseEvent } from "react"
import { useMediaQuery } from "usehooks-ts"

const Navigation = () => {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const isRezisingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)

  useEffect(() => {
    if(isMobile) {
      collapse()
    }
    else {
      resetWidth()
    }
  }, [isMobile])

  useEffect(() => {
    if(isMobile) {
      collapse()
    }
  }, [pathname, isMobile])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    isRezisingRef.current = true
    document.addEventListener("mousemove", handleMouseMove as unknown as EventListener)
    document.addEventListener("mouseup", handleMouseUp as unknown as EventListener)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if(!isRezisingRef.current) return
    let newWidth = e.clientX

    if(newWidth < 240) newWidth = 240
    if(newWidth > 480) newWidth = 480

    if(sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }

  const handleMouseUp = () => {
    isRezisingRef.current = false
    document.removeEventListener("mousemove", handleMouseMove as unknown as EventListener)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const resetWidth = () => {
    if(sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? "0" : "calc(100% - 240px)"
      )
      navbarRef.current.style.setProperty(
        'left',
        isMobile ? "100%" : "240px"
      )

      setTimeout(() => {
        setIsResetting(false)
      }, 300)
    }
  }

  const collapse = () => {
    if(sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("left", "0")
      navbarRef.current.style.setProperty("width", "100%")

      setTimeout(() => {
        setIsResetting(false)
      }, 300)
    }
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn('group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999]',
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div 
          role="button" 
          onClick={collapse}
          className={cn("size-6 text-muted-foreground rounded-sm hover:bg-neutral-300 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
          isMobile && "opacity-100"
        )}>
          <ChevronsLeft className="size-6 text-muted-foreground" />
        </div>
        <div>
          <p>Action items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div 
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
          onMouseDown={(e: MouseEvent<HTMLDivElement>) => handleMouseDown(e)}
          onMouseUp={handleMouseUp}
          onClick={resetWidth}
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {
            isCollapsed && (
              <MenuIcon 
                role="button" 
                className="size-6 text-muted-foreground" 
                onClick={resetWidth}
              />
            )
          }
        </nav>
      </div>
    </>
  )
}

export default Navigation