"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { GroupCard } from "@/components/groups/GroupCard"
import { MOCK_GROUPS } from "@/app/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Users as UsersIcon } from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  const [search, setSearch] = useState("")

  const filteredGroups = MOCK_GROUPS.filter(group => 
    group.title.toLowerCase().includes(search.toLowerCase()) || 
    group.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navbar />
      
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Clubs Toulousains</h1>
              <p className="text-lg opacity-90">
                Rejoignez des communautés locales pour partager vos passions. Sport, culture, tech ou gastronomie, trouvez votre tribu dans la Ville Rose.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="rounded-full font-bold h-12 px-8 shadow-lg">
              <Link href="/groups/new">
                <Plus className="h-5 w-5 mr-2" /> Créer un club
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-8 flex-grow mb-20">
        <div className="bg-card rounded-3xl shadow-xl p-6 mb-12 border border-primary/5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un club par nom ou description..." 
                className="pl-10 h-12 rounded-2xl border-muted bg-muted/20 focus:bg-background transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full gap-2 h-12 px-6">
                <Filter className="h-4 w-4" /> Catégories
              </Button>
              <Button variant="outline" className="rounded-full gap-2 h-12 px-6">
                <UsersIcon className="h-4 w-4" /> Plus actifs
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-headline">Tous les clubs ({filteredGroups.length})</h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="rounded-full px-4 py-1">Publics</Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1">Privés</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-card rounded-3xl border-2 border-dashed border-muted/50">
              <UsersIcon className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Aucun club ne correspond à votre recherche.</p>
              <Button variant="link" onClick={() => setSearch("")} className="text-primary mt-2">
                Effacer la recherche
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
