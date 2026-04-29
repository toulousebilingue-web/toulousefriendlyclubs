
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Scale, Building2, User, Mail, Globe, Server, ShieldCheck, Info } from "lucide-react"

export default function LegalMentionsPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <Scale className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold font-headline mb-4 text-foreground">Informations Légales</h1>
          <p className="text-xl text-muted-foreground font-medium">Mentions Légales</p>
          <p className="mt-4 text-sm text-muted-foreground italic">
            Conformément aux dispositions de l'article 6-III-1 de la Loi n°2004-575 du 21 juin 2004.
          </p>
        </header>

        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-card">
          <CardHeader className="bg-primary/5 border-b p-8">
            <CardTitle className="text-2xl font-headline font-bold">Informations légales concernant Tolosa</CardTitle>
            <CardDescription className="text-base">
              Tout ce que vous devez savoir sur l'édition et l'hébergement de notre service.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12 space-y-12">
            
            {/* Éditeur */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <Building2 className="h-6 w-6" />
                Éditeur du site
              </h2>
              <div className="bg-muted/50 p-6 rounded-2xl border border-primary/5">
                <p className="font-bold text-lg text-foreground mb-1">Association Happy People 31</p>
                <p className="text-muted-foreground">13, Bd. Lascrosses</p>
                <p className="text-muted-foreground">31000 Toulouse</p>
                <p className="text-muted-foreground">France</p>
              </div>
            </section>

            {/* Direction et Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-headline text-primary flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Directeur de la publication
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le représentant légal de l'association Happy People 31.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold font-headline text-primary flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pour toute question, veuillez envoyer un mail à :<br />
                  <a href="mailto:appli-tolosa31@free.fr" className="font-bold text-primary hover:underline">appli-tolosa31@free.fr</a>
                </p>
              </section>
            </div>

            {/* Hébergement */}
            <section className="space-y-6 pt-6 border-t">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <Globe className="h-6 w-6" />
                Hébergeur et Infrastructure
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Hébergement Principal et Déploiement
                  </h3>
                  <div className="prose prose-stone text-sm text-muted-foreground">
                    <p>L'hébergement et le déploiement du site (Frontend et API Routes) sont assurés par :</p>
                    <address className="not-italic font-medium text-foreground">
                      Vercel Inc.<br />
                      340 S Lemon Ave #4133<br />
                      Walnut, CA 91789, États-Unis
                    </address>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-muted/30 border border-primary/5 text-sm">
                    <h4 className="font-bold mb-2">Code Source (GitHub)</h4>
                    <p className="text-muted-foreground">GitHub, Inc. 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-muted/30 border border-primary/5 text-sm">
                    <h4 className="font-bold mb-2">Services Cloud & API</h4>
                    <p className="text-muted-foreground">Google LLC / Firebase 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Note Discord */}
            <section className="p-8 rounded-3xl bg-accent/5 border border-accent/20">
              <h2 className="text-xl font-bold font-headline text-accent mb-4 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Note sur le Service et la Communauté
              </h2>
              <div className="text-sm text-muted-foreground space-y-4">
                <p className="font-bold text-foreground">
                  IMPORTANT : Le site sert de portail d'accès et de tableau de bord pour la communauté.
                </p>
                <p>
                  L'organisation des sorties, les discussions en temps réel et la modération de la communauté sont gérées exclusivement sur notre serveur Discord. Les utilisateurs sont soumis aux conditions générales d'utilisation et à la politique de confidentialité de Discord pour toutes les activités menées sur ce serveur.
                </p>
              </div>
            </section>

            {/* Propriété Intellectuelle */}
            <section className="space-y-4 pt-6 border-t">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <ShieldCheck className="h-6 w-6" />
                Propriété intellectuelle
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            {/* Données Personnelles */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold font-headline text-foreground">Données personnelles</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion des comptes utilisateurs et à la mise en relation des membres. Conformément à la loi "informatique et libertés" du 6 janvier 1978 modifiée, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en nous contactant à l'adresse email mentionnée ci-dessus.
              </p>
            </section>

            {/* Responsabilité */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold font-headline text-foreground">Responsabilité</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tolosa Amical met tout en œuvre pour offrir aux utilisateurs des informations et/ou des outils disponibles et vérifiés mais ne saurait être tenu pour responsable des erreurs, d'une absence de disponibilité des fonctionnalités ou de la présence de virus sur son site. Les événements et annonces sont publiés sous la seule responsabilité de leurs auteurs.
              </p>
            </section>

          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
