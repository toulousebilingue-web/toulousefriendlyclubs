
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  ShieldAlert, 
  FileText, 
  Ban, 
  Flag, 
  Scale, 
  Euro, 
  ShieldCheck, 
  Info,
  CheckCircle2
} from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold font-headline mb-4 text-foreground">Règles de vie</h1>
          <p className="text-xl text-muted-foreground font-medium">Charte d'utilisation</p>
          <p className="mt-4 text-sm text-muted-foreground italic">
            Règles de bonne conduite et conditions d'utilisation de notre service.
          </p>
        </header>

        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-card mb-12">
          <CardHeader className="bg-primary/5 border-b p-8 text-center">
            <CardTitle className="text-2xl font-headline font-bold">Bienvenue sur Fais ta sortie à Toulouse !</CardTitle>
            <CardDescription className="text-base mt-2">
              Pour que notre communauté reste un espace convivial, sûr et respectueux, nous vous demandons de lire et d'accepter les règles suivantes.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12 space-y-10">
            
            {/* 1. Respect */}
            <section className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-primary">
                  <Heart className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <span className="text-primary/20">01.</span> Respect et bienveillance
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Chaque membre s'engage à faire preuve de courtoisie, de respect et de tolérance envers les autres utilisateurs. Les propos haineux, discriminatoires, injurieux, ou toute forme de harcèlement sont strictement interdits et entraîneront une suspension immédiate du compte.
                </p>
              </div>
            </section>

            {/* 2. Sécurité */}
            <section className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <ShieldAlert className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <span className="text-primary/20">02.</span> Sécurité et données personnelles
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ne partagez jamais d'informations personnelles sensibles (numéro de téléphone, adresse exacte, informations bancaires) dans les espaces publics de l'application. Utilisez la messagerie privée pour des échanges plus personnels, mais restez vigilant.
                </p>
              </div>
            </section>

            {/* 3. Contenu */}
            <section className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <span className="text-primary/20">03.</span> Contenu des publications
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Toute publication (annonces, discussions, événements) doit être légale et conforme aux bonnes mœurs. Les contenus à caractère pornographique, violent, illégal ou faisant l'apologie d'activités illicites sont proscrits.
                </p>
              </div>
            </section>

            {/* 4. Interdiction Rencontres Amoureuses - IMPORTANT */}
            <section className="flex gap-6 p-6 rounded-3xl bg-accent/5 border border-accent/10">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                  <Ban className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-headline text-accent flex items-center gap-2">
                  <span className="text-accent/30">04.</span> Interdiction des rencontres amoureuses
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p className="font-semibold text-foreground">
                    Étant donné les problèmes provoqués par les évènements de rencontre, les sorties de rencontre sont prohibées sur notre application.
                  </p>
                  <p>
                    Fais ta sortie à Toulouse est une plateforme dédiée aux sorties amicales et à l'entraide. Les événements organisés dans le but explicite de faire des rencontres amoureuses ou "dating" ne sont pas autorisés. Toute publication de ce type sera supprimée. Tout contrevenant pourra faire l'objet d'une suspension de son compte.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Signalements */}
            <section className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                  <Flag className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <span className="text-primary/20">05.</span> Signalements
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si vous constatez un comportement ou un contenu qui enfreint cette charte, utilisez les outils de signalement mis à votre disposition. Notre équipe de modération examinera chaque signalement avec attention.
                </p>
              </div>
            </section>

            {/* 6. Responsabilité */}
            <section className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Scale className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <span className="text-primary/20">06.</span> Responsabilité
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les organisateurs de sorties sont responsables du bon déroulement de leurs événements. Fais ta sortie à Toulouse agit comme une plateforme de mise en relation et ne peut être tenu responsable des incidents survenant lors des activités organisées par ses membres.
                </p>
              </div>
            </section>

            {/* 7. Sorties payantes */}
            <section className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                  <Euro className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <span className="text-primary/20">07.</span> Sorties payantes
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  En ce qui concerne les sorties payantes ou qui contiennent des activités payantes ou vente de produits à côté, elles doivent être signalées au moins dans la description de la sortie. La transparence est essentielle pour que les membres puissent participer en toute connaissance de cause.
                </p>
              </div>
            </section>

            {/* 8. Concurrence */}
            <section className="flex gap-6 border-b pb-8">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600">
                  <Info className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold font-headline flex items-center gap-2">
                  <span className="text-primary/20">08.</span> Concurrence
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'utilisation de cette application ne doit pas donner lieu à la promotion d'une autre application de même type que celle-ci.
                </p>
              </div>
            </section>

            {/* Acceptation */}
            <div className="bg-primary text-primary-foreground p-8 rounded-[2rem] text-center shadow-lg">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold font-headline mb-4">Acceptation</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                En vous inscrivant, vous confirmez avoir lu et accepté l'ensemble de cette charte. Merci de contribuer à faire de Fais ta sortie à Toulouse un espace positif et accueillant pour tous !
              </p>
            </div>

          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
