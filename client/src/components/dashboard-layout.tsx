"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, MapPin, Calendar, DollarSign, Settings, Bell, LogOut, User, Menu, ChevronLeft, ChevronRight } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/business/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Court Management",
    url: "/business/dashboard/courts",
    icon: MapPin,
  },
  {
    title: "Booking Management",
    url: "/business/dashboard/bookings",
    icon: Calendar,
  },
  {
    title: "Payouts",
    url: "/business/dashboard/payouts",
    icon: DollarSign,
  },
  {
    title: "Settings",
    url: "/business/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [businessName, setBusinessName] = useState("")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const storedBusinessName = localStorage.getItem("businessName")

    if (!isAuthenticated) {
      console.log("Not authenticated")
      router.push("/business/auth/login")
    } else {
      setBusinessName(storedBusinessName || "Business")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("businessName")
    router.push("/business/auth/login")
  }

  // Sidebar always expanded
  const open = true;
  const setOpen = () => {};

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="w-64 min-w-[16rem] bg-white border-r transition-all duration-200">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <h1 className="text-2xl font-bold">Business Panel</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url} className={pathname === item.url ? "bg-green-100 text-green-700" : ""}>
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{businessName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{businessName}</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 ml-64 transition-all duration-200">
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 ml-64 transition-all duration-200">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
