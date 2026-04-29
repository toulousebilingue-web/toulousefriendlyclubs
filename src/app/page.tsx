import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Users, Calendar, Sparkles } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { GroupCard } from "@/components/groups/GroupCard"
import { EventCard } from "@/components/events/EventCard"
import { MOCK_GROUPS, MOCK_EVENTS } from "@/app/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://picsum.photos/seed/toulouse-hero/1920/1080"
              alt="Toulouse"
              fill
              priority
              className="object-cover brightness-[0.4]"
              data-ai-hint="Toulouse city"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl text-white">
              <Badge className="mb-4 bg-accent hover:bg-accent/90 border-none text-white px-3 py-1">
                <Sparkles className="h-3 w-3 mr-2" />
                La Ville Rose vous attend
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6 leading-tight">
                Rencontrez du monde à <span className="text-primary">Toulouse</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 font-body max-w-xl">
                Rejoignez des milliers de Toulousains pour partager vos passions : randonnée, tech, cuisine, sport ou culture.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-4">
                  <Button asChild size="lg" className="rounded-full px-8 h-12 text-lg">
                    <Link href="/login">Rejoindre maintenant</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 text-lg bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20">
                    <Link href="/events">Découvrir les événements</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discovery Tools */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-card p-6 rounded-2xl shadow-sm border border-primary/5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold font-headline">Événements à venir</h4>
                  <p className="text-sm text-muted-foreground">34 événements cette semaine</p>
                </div>
              </div>
              <div className="h-px md:h-12 w-full md:w-px bg-border"></div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold font-headline">Groupes actifs</h4>
                  <p className="text-sm text-muted-foreground">150+ communautés locales</p>
                </div>
              </div>
              <div className="h-px md:h-12 w-full md:w-px bg-border"></div>
              <div className="flex-1 w-full md:w-auto">
                <Link href="/events">
                  <Button className="w-full rounded-full gap-2">
                    Explorer tout <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Groups */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-2">Groupes Populaires</h2>
                <p className="text-muted-foreground">Rejoignez une communauté qui vous ressemble.</p>
              </div>
              <Link href="/groups" className="text-primary font-semibold flex items-center gap-1 hover:underline">
                Voir tous les groupes <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_GROUPS.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold font-headline mb-2">Événements Prochains</h2>
                <p className="text-muted-foreground">Ne manquez pas les meilleures sorties toulousaines.</p>
              </div>
              <Link href="/events" className="text-primary font-semibold flex items-center gap-1 hover:underline">
                Voir le calendrier <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {MOCK_EVENTS.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-3xl p-12 text-center text-primary-foreground relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <MapPin className="w-64 h-64" />
              </div>
              <h2 className="text-4xl font-bold font-headline mb-6 relative z-10">Prêt à créer votre propre groupe ?</h2>
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto relative z-10">
                Vous avez une passion à partager ? Devenez organisateur et animez la vie locale à Toulouse dès aujourd'hui.
              </p>
              <div className="flex justify-center gap-4 relative z-10">
                <Link href="/groups/new">
                  <Button size="lg" variant="secondary" className="rounded-full font-bold">
                    Lancer un groupe
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
