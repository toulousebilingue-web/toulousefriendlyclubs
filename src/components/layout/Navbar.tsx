"use client"

import Link from "next/link"
import { Search, User, LogOut, Plus, MessageCircle, ShieldCheck, LogIn, LayoutDashboard, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser, useAuth } from "@/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, loading } = useUser()
  const auth = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    if (!auth) return
    await signOut(auth)
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-headline text-2xl font-bold text-primary tracking-tight">ToulouseFriendly</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/groups" className="text-sm font-medium hover:text-primary transition-colors">Groupes</Link>
            <Link href="/events" className="text-sm font-medium hover:text-primary transition-colors">Événements</Link>
            
            {/* Google Translate Element - Positionné après Événements */}
            <div className="hidden lg:flex items-center gap-2 ml-2 bg-muted/30 px-3 py-1 rounded-full border border-primary/5">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <div id="google_translate_element"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative w-40 md:w-48 xl:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full rounded-full border bg-muted pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {loading ? (
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/messages" className="hidden xs:block">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} alt="Avatar" />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.displayName?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 mt-2 shadow-xl border-primary/5">
                  <DropdownMenuLabel className="px-3 py-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-sm truncate">{user.displayName || "Mon Compte"}</span>
                      <span className="text-[10px] text-muted-foreground font-medium truncate">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-3 rounded-xl cursor-pointer py-2.5">
                      <User className="h-4 w-4 text-primary" /> 
                      <span className="font-medium">Mon Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-3 rounded-xl cursor-pointer py-2.5">
                      <LayoutDashboard className="h-4 w-4 text-primary" /> 
                      <span className="font-medium">Tableau de bord</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/events/new" className="flex items-center gap-3 rounded-xl cursor-pointer py-2.5">
                      <Plus className="h-4 w-4 text-primary" /> 
                      <span className="font-medium">Créer une sortie</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-3 text-muted-foreground hover:text-primary rounded-xl cursor-pointer py-2.5">
                      <ShieldCheck className="h-4 w-4" /> 
                      <span className="font-medium">Administration</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/5 flex items-center gap-3 rounded-xl cursor-pointer py-2.5">
                    <LogOut className="h-4 w-4" /> 
                    <span className="font-bold">Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/login">
              <Button className="rounded-full gap-2 px-6 font-bold shadow-md transition-transform hover:scale-105 active:scale-95">
                <LogIn className="h-4 w-4" /> Connexion
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
