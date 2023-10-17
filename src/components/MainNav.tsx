import { useState } from "react"
import MobileNav from "@/components/MobileNav"
import { siteConfig } from "@/config/site"
import { MainNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Link, useLocation } from "react-router-dom"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export default function MainNav({ items, children }: MainNavProps) {
  const location = useLocation()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo size={36} />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              to={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${location.pathname}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close size={32} /> : <Icons.logo size={36} />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children} </MobileNav>
      )}
    </div>
  )
}
