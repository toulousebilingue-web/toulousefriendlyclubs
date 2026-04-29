"use client"

import { useUser, useDoc, useCollection, useFirestore } from "@/firebase"
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Plus, ArrowRight, Clock, Star, MapPin } from "lucide-react"
import Link from "next/link"
import { MOCK_GROUPS, MOCK_EVENTS } from "@/app/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  const { user, loading: userLoading } = useUser()
  const db = useFirestore()
  
  const { data: profile } = useDoc(user && db ? `users/${user.uid}` : null)
  const { data: joinedGroups } = useCollection(user && db ? `users/${user.uid}/groupsJoined` : null)
  const { data: joinedEvents } = useCollection(user && db ? `users/${user.uid}/eventsJoined` : null)

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Card className="max-w-md mx-auto p-8 rounded-3xl">
            <h1 className="text-2xl font-bold mb-4">Accès réservé</h1>
            <p className="text-muted-foreground mb-6">Veuillez vous connecter pour voir votre tableau de bord.</p>
            <Button asChild className="rounded-full w-full">
              <Link href="/login">Se connecter</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const displayName = profile?.name || user.displayName || "Ami Toulousain"

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold font-headline mb-2">Salut, {displayName} ! 👋</h1>
          <p className="text-muted-foreground">Voici ce qu'il se passe dans tes clubs à Toulouse.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Stats Overview */}
          <Card className="bg-primary text-primary-foreground border-none shadow-xl rounded-3xl">
            <CardContent className="p-6 flex flex-col justify-between h-full min-h-[160px]">
              <div className="flex justify-between items-start">
                <Calendar className="h-8 w-8 opacity-80" />
                <Badge variant="outline" className="text-white border-white/20">Semaine active</Badge>
              </div>
              <div>
                <p className="text-4xl font-bold font-headline">{joinedEvents?.length || 0}</p>
                <p className="text-sm opacity-80">Événements prévus</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent text-accent-foreground border-none shadow-xl rounded-3xl">
            <CardContent className="p-6 flex flex-col justify-between h-full min-h-[160px]">
              <div className="flex justify-between items-start">
                <Users className="h-8 w-8 opacity-80" />
                <Badge variant="outline" className="text-white border-white/20">Mes Clubs</Badge>
              </div>
              <div>
                <p className="text-4xl font-bold font-headline">{joinedGroups?.length || 0}</p>
                <p className="text-sm opacity-80">Groupes rejoints</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/5 shadow-md rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Action Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full rounded-full gap-2" variant="outline">
                <Link href="/groups/new">
                  <Plus className="h-4 w-4" /> Créer un groupe
                </Link>
              </Button>
              <Button asChild className="w-full rounded-full gap-2" variant="secondary">
                <Link href="/groups">
                  Trouver un club <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-headline">Tes prochains rendez-vous</h2>
                <Link href="/events" className="text-primary text-sm font-bold hover:underline">Voir tout le calendrier</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {joinedEvents && joinedEvents.length > 0 ? (
                  joinedEvents.map((joined: any) => {
                    const event = MOCK_EVENTS.find(e => e.id === joined.eventId)
                    if (!event) return null
                    return (
                      <Card key={joined.id} className="overflow-hidden hover:shadow-lg transition-all border-primary/5">
                        <div className="relative h-32">
                          <img src={event.coverImage} className="w-full h-full object-cover" alt="" />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-white/90 text-primary border-none font-bold">
                              {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-2 truncate">{event.title}</h3>
                          <div className="space-y-1.5 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5 text-primary" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                          <Button asChild size="sm" className="w-full mt-4 rounded-full" variant="outline">
                            <Link href={`/events/${event.id}`}>Voir les détails</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })
                ) : (
                  <Card className="col-span-full border-dashed border-2 p-12 text-center bg-transparent">
                    <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium mb-4">Tu n'as pas encore d'événements prévus.</p>
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href="/events">Explorer les sorties</Link>
                    </Button>
                  </Card>
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-headline">Tes clubs favoris</h2>
                <Link href="/groups" className="text-primary text-sm font-bold hover:underline">Voir tous tes groupes</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {joinedGroups && joinedGroups.length > 0 ? (
                  joinedGroups.map((joined: any) => {
                    const group = MOCK_GROUPS.find(g => g.id === joined.groupId)
                    if (!group) return null
                    return (
                      <Link key={joined.id} href={`/groups/${group.id}`}>
                        <Card className="hover:border-primary/20 transition-all cursor-pointer overflow-hidden h-full group">
                          <CardContent className="p-4 text-center">
                            <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-primary/10 p-0.5 group-hover:border-primary/30 transition-all">
                              <AvatarImage src={group.coverImage} />
                              <AvatarFallback>{group.title[0]}</AvatarFallback>
                            </Avatar>
                            <h4 className="font-bold text-sm truncate mb-1">{group.title}</h4>
                            <p className="text-[10px] text-muted-foreground">{group.memberCount} membres</p>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })
                ) : (
                  <p className="text-muted-foreground italic text-sm">Tu n'as rejoint aucun groupe pour le moment.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Suggestions */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  Suggestions pour toi
                </CardTitle>
                <CardDescription>Basé sur tes intérêts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {MOCK_GROUPS.slice(0, 2).map(g => (
                  <div key={g.id} className="flex items-center gap-4">
                    <img src={g.coverImage} className="h-12 w-12 rounded-xl object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-bold truncate">{g.title}</h5>
                      <p className="text-[10px] text-muted-foreground">{g.memberCount} membres</p>
                    </div>
                    <Button size="icon" variant="ghost" className="rounded-full text-primary h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl p-6 bg-gradient-to-br from-primary/10 to-accent/10">
              <h3 className="font-bold mb-2">Besoin d'aide ?</h3>
              <p className="text-xs text-muted-foreground mb-4">Consulte nos guides pour organiser ton premier événement à Toulouse.</p>
              <Button size="sm" variant="link" className="p-0 text-primary font-bold">Lire les guides →</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
