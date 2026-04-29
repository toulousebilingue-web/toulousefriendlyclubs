
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, MapPin, Sparkles, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles className="w-96 h-96" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge variant="outline" className="mb-6 border-white/30 text-white px-4 py-1 text-sm font-bold uppercase tracking-widest">
              Notre Mission
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-headline mb-8">Connecter la Ville Rose</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              ToulouseFriendlyClubs est une plateforme dédiée aux particuliers et organismes souhaitant créer des communautés vibrantes autour de leurs passions.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/toulouse-social/800/1000"
                  alt="Convivialité à Toulouse"
                  fill
                  className="object-cover"
                  data-ai-hint="Toulouse social gathering"
                />
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl font-bold font-headline text-primary">Plus qu'un simple site de rencontres</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    L'objectif de ToulouseFriendlyClubs est d'offrir un espace où chaque Toulousain peut trouver sa place. Que vous soyez un organisme culturel ou un particulier passionné, notre plateforme vous permet de créer des groupes thématiques pour rassembler des gens qui vous ressemblent.
                  </p>
                  <p>
                    À travers l'organisation d'activités et d'événements, nous favorisons les rencontres réelles, le partage de savoir-faire et la convivialité au cœur de la Ville Rose.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <FeatureBadge icon={<Users className="h-5 w-5" />} label="Groupes thématiques" />
                  <FeatureBadge icon={<Calendar className="h-5 w-5" />} label="Événements réels" />
                  <FeatureBadge icon={<MapPin className="h-5 w-5" />} label="Rencontre à Toulouse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <Heart className="h-12 w-12 text-accent mx-auto mb-8 animate-pulse" />
              <blockquote className="text-3xl md:text-5xl font-headline font-bold text-foreground italic leading-tight">
                "Le lien social est l'âme de Toulouse."
              </blockquote>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-headline mb-4">Comment ça marche ?</h2>
              <p className="text-muted-foreground text-lg">Trois étapes simples pour transformer votre passion en communauté.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Step 
                number="01" 
                title="Créez votre groupe" 
                description="Choisissez un thème qui vous tient à cœur : sport, tech, cuisine, art ou simple balade."
              />
              <Step 
                number="02" 
                title="Organisez des événements" 
                description="Fixez une date, un lieu à Toulouse et invitez les membres à se retrouver."
              />
              <Step 
                number="03" 
                title="Rencontrez du monde" 
                description="Partagez des moments uniques et créez des amitiés durables dans la Ville Rose."
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 container mx-auto px-4">
          <Card className="bg-card border-none shadow-2xl rounded-[3rem] overflow-hidden text-center p-12 md:p-20 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">Prêt à animer la vie locale ?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Que vous soyez un particulier ou une association, lancez votre premier club aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg font-bold">
                <Link href="/groups/new">Lancer un groupe</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-bold border-primary/20 text-primary hover:bg-primary/5">
                <Link href="/groups">Explorer les clubs <ArrowRight className="h-5 w-5 ml-2" /></Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted/50 border border-muted-foreground/5 text-center transition-transform hover:scale-105">
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
  )
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="relative p-8 rounded-3xl bg-card border border-primary/5 shadow-sm hover:shadow-xl transition-all group">
      <div className="text-6xl font-headline font-bold text-primary/10 absolute -top-4 -left-2 group-hover:text-primary/20 transition-colors">
        {number}
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold font-headline mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
