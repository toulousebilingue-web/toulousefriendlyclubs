"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Share2, Flag, ArrowLeft, Info, Star } from "lucide-react"
import { MOCK_EVENTS, MOCK_GROUPS } from "@/app/lib/mock-data"
import { EventRegistration } from "@/components/events/EventRegistration"

export default function EventDetailsPage() {
  const { id } = useParams()
  const event = MOCK_EVENTS.find(e => e.id === id) || MOCK_EVENTS[0]
  const group = MOCK_GROUPS.find(g => g.id === event.groupId) || MOCK_GROUPS[0]

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link href={`/groups/${group.id}`}>
          <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Retour au groupe {group.title}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-6 left-6">
                <Badge className="bg-white/90 backdrop-blur text-primary hover:bg-white text-sm px-4 py-2 border-none font-bold">
                  {new Date(event.date).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' })}
                </Badge>
              </div>
            </div>

            <div className="bg-card p-8 rounded-3xl shadow-sm border border-primary/5">
              <h1 className="text-4xl font-bold font-headline mb-6 text-foreground leading-tight">{event.title}</h1>
              
              <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground border-b pb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-primary/5 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Date</p>
                    <p className="text-sm font-semibold text-foreground">{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-primary/5 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Heure</p>
                    <p className="text-sm font-semibold text-foreground">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-primary/5 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Lieu</p>
                    <p className="text-sm font-semibold text-foreground truncate max-w-[200px]">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Détails de l'événement
                </h3>
                <div className="prose prose-stone max-w-none text-muted-foreground leading-relaxed">
                  <p>{event.description}</p>
                  <p>Venez passer un moment convivial et faire de nouvelles connaissances dans un cadre détendu. N'oubliez pas d'apporter votre bonne humeur !</p>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="rounded-full gap-2 text-xs font-bold h-9">
                    <Share2 className="h-3.5 w-3.5" /> Partager
                  </Button>
                  <Button variant="ghost" className="rounded-full gap-2 text-xs font-bold h-9 text-muted-foreground">
                    <Flag className="h-3.5 w-3.5" /> Signaler
                  </Button>
                </div>
              </div>
            </div>

            {/* Post-Event Ratings Mock */}
            <div className="bg-card p-8 rounded-3xl shadow-sm border border-primary/5">
              <h3 className="text-2xl font-bold font-headline mb-6">Avis & Commentaires</h3>
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-muted/50">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/user8/100/100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm">Julien D.</span>
                      <div className="flex text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Super moment ! L'organisateur était au top.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <EventRegistration event={event} />

            <Card className="border-primary/10 overflow-hidden shadow-sm">
              <div className="relative h-24 w-full">
                <Image src={group.coverImage} alt={group.title} fill className="object-cover blur-[2px] brightness-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h4 className="text-white font-bold font-headline text-center px-4">Organisé par {group.title}</h4>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {group.description}
                </p>
                <Link href={`/groups/${group.id}`}>
                  <Button variant="outline" className="w-full rounded-full font-bold border-primary/20 text-primary hover:bg-primary/5">
                    Voir le groupe
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm p-6 text-center">
              <h4 className="font-bold font-headline mb-4">L'organisateur</h4>
              <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-primary/20 p-1">
                <AvatarImage src="https://picsum.photos/seed/organizer/150/150" />
              </Avatar>
              <h5 className="font-bold">Olivier P.</h5>
              <p className="text-xs text-muted-foreground mb-4 italic">"Toujours prêt pour une nouvelle aventure toulousaine !"</p>
              <div className="flex justify-center gap-1 text-amber-400 mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/5 font-bold">Voir le profil</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
