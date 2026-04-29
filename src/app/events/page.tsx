
"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { EventCard } from "@/components/events/EventCard"
import { MOCK_EVENTS } from "@/app/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Search, SlidersHorizontal, MapPin, Plus, ShieldCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useUser, useDoc, useFirestore, useCollection } from "@/firebase"

export default function EventsPage() {
  const [search, setSearch] = useState("")
  const { user } = useUser()
  const db = useFirestore()
  const { data: userProfile } = useDoc(db && user ? `users/${user.uid}` : null)
  
  // Dans une vraie app, on utiliserait une collectionGroup ou un filtrage complexe
  // Pour le prototype, on simule le filtrage de visibilité par rapport à l'utilisateur
  const isSuperAdmin = userProfile?.role === 'super_admin' || userProfile?.role === 'super_moderator'

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      // 1. Filtrage par recherche
      const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                           event.location.toLowerCase().includes(search.toLowerCase())
      if (!matchesSearch) return false

      // 2. Filtrage par visibilité
      // Si Super Admin, on voit TOUT
      if (isSuperAdmin) return true

      // Si l'événement est 'global', tout le monde le voit
      if (event.visibility === 'global' || !event.visibility) return true

      // Si l'événement est 'group_only', l'utilisateur doit être membre accepté de ce groupe
      // Note: Ici on simule car on n'a pas toutes les adhésions en live dans un seul tableau
      // Dans le prototype, on laisse passer pour montrer l'UI, mais la logique est là
      return true 
    })
  }, [search, isSuperAdmin])

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Événements à Toulouse</h1>
            <p className="text-lg opacity-90">
              Découvrez les activités de la Ville Rose. Les membres Super Admin voient tous les événements privés.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="rounded-full font-bold h-12 px-8 shadow-lg">
            <Link href="/events/new">
              <Plus className="h-5 w-5 mr-2" /> Créer un événement
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-8">
        {isSuperAdmin && (
          <div className="mb-6 bg-accent/10 border border-accent/20 p-4 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <p className="text-sm font-bold text-accent">Mode Super Admin : Affichage de tous les événements, y compris privés.</p>
          </div>
        )}

        <div className="bg-card rounded-3xl shadow-xl p-6 mb-12 border border-primary/5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un événement, un lieu..." 
                className="pl-10 h-12 rounded-2xl border-muted bg-muted/20 focus:bg-background transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <TabsList className="bg-muted/50 p-1 rounded-2xl h-auto">
              <TabsTrigger value="upcoming" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-background data-[state=active]:text-primary shadow-none transition-all">À venir</TabsTrigger>
              <TabsTrigger value="popular" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-background data-[state=active]:text-primary shadow-none transition-all">Populaires</TabsTrigger>
            </TabsList>
            
            <p className="text-sm text-muted-foreground font-medium">
              {filteredEvents.length} événements trouvés
            </p>
          </div>

          <TabsContent value="upcoming" className="mt-0 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-card rounded-3xl border-2 border-dashed border-muted/50">
                  <p className="text-muted-foreground">Aucun événement ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
