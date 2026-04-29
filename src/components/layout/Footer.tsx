
"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Colonne 1: Logo et Description */}
          <div className="md:col-span-6 lg:col-span-5 space-y-6">
            <span className="font-headline text-3xl font-bold text-primary block">
              ToulouseFriendlyClubs
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              La plateforme de référence pour faire des rencontres et participer à des activités locales au cœur de Toulouse.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                <span className="font-bold text-sm">f</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                <span className="font-bold text-sm">t</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                <span className="font-bold text-sm">i</span>
              </div>
            </div>
          </div>
          
          {/* Colonne 2: Navigation */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="font-bold text-lg text-foreground">Navigation</h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
              <Link href="/groups" className="hover:text-primary transition-colors">Tous les groupes</Link>
              <Link href="/events" className="hover:text-primary transition-colors">Calendrier des événements</Link>
              <Link href="/about" className="hover:text-primary transition-colors">À propos</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Nous contacter</Link>
              <Link href="/profile/settings/notifications" className="hover:text-primary transition-colors">Notifications</Link>
            </div>
          </div>

          {/* Colonne 3: Légal */}
          <div className="md:col-span-3 lg:col-span-4 space-y-4">
            <h4 className="font-bold text-lg text-foreground">Légal</h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
              <Link href="/terms" className="hover:text-primary transition-colors">Conditions d'utilisation</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Confidentialité</Link>
              <Link href="/legal" className="hover:text-primary transition-colors">Mentions légales</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            &copy; 2026 Happy People 31. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}
