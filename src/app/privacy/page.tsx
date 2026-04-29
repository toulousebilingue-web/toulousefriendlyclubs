
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Shield, Lock, Eye, Mail, Clock, MapPin } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold font-headline mb-4 text-foreground">Protection des données</h1>
          <p className="text-xl text-muted-foreground font-medium">Politique de Confidentialité</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Dernière mise à jour : 12 novembre 2025</span>
          </div>
        </header>

        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-card">
          <CardHeader className="bg-primary/5 border-b p-8">
            <CardTitle className="text-2xl font-headline font-bold">Informations sur la collecte et l'utilisation de vos données</CardTitle>
            <CardDescription className="text-base">
              Votre confiance est notre priorité. Voici comment nous protégeons votre vie privée à Toulouse.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12 space-y-12">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm">1</span>
                Introduction
              </h2>
              <div className="prose prose-stone max-w-none text-muted-foreground leading-relaxed">
                <p>
                  <strong>Fais ta sortie à Toulouse</strong> (ci-après « l'Application » ou « Nous »), éditée par l'association <strong>Happy People 31</strong>, basée au <span className="flex inline-flex items-center gap-1 font-medium text-foreground"><MapPin className="h-3 w-3" /> 13, Bd. Lascrosses à Toulouse</span>, s'engage à protéger la confidentialité des utilisateurs. Cette politique de confidentialité détaille les types d'informations que nous collectons via l'Application, la manière dont nous les utilisons et les droits des utilisateurs concernant ces informations.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm">2</span>
                Données Collectées
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-muted/50 border border-primary/5">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" /> Informations Fournies
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li><strong>Données d'identité :</strong> Nom d'utilisateur, e-mail, mot de passe chiffré.</li>
                    <li><strong>Contenu Utilisateur :</strong> Textes, photos, messages, commentaires, descriptions de clubs.</li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-2xl bg-muted/50 border border-primary/5">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" /> Collectées Automatiquement
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li><strong>Données d'utilisation :</strong> Pages vues, fonctionnalités utilisées.</li>
                    <li><strong>Données techniques :</strong> Adresse IP, type d'appareil.</li>
                    <li><strong>Localisation :</strong> Géographie (avec votre consentement).</li>
                    <li><strong>Cookies :</strong> Amélioration de l'expérience.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm">3</span>
                Utilisation des Données
              </h2>
              <div className="prose prose-stone max-w-none text-muted-foreground leading-relaxed">
                <p>Nous utilisons les données collectées pour :</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 font-medium text-foreground italic">
                  <li className="flex items-center gap-2">• Fourniture de Services</li>
                  <li className="flex items-center gap-2">• Communication (support, alertes)</li>
                  <li className="flex items-center gap-2">• Analyse de performance</li>
                  <li className="flex items-center gap-2">• Sécurité et Conformité Légale</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm">4</span>
                Partage des Données
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos informations avec nos prestataires tiers (hébergement, analyse) ou si nous y sommes contraints par la loi.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm">5</span>
                Durée de Conservation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous conservons vos informations personnelles aussi longtemps que nécessaire pour vous fournir le service et pour nous conformer à nos obligations légales.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm">6</span>
                Vos Droits d'Utilisateur
              </h2>
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <p className="text-muted-foreground mb-4 font-medium">Conformément au RGPD, vous disposez des droits suivants :</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-full bg-white border text-sm font-bold">Accès & Rectification</span>
                  <span className="px-4 py-2 rounded-full bg-white border text-sm font-bold">Effacement</span>
                  <span className="px-4 py-2 rounded-full bg-white border text-sm font-bold">Opposition</span>
                </div>
              </div>
            </section>

            <section className="space-y-4 text-center py-8 border-t border-b border-dashed">
              <h2 className="text-2xl font-bold font-headline text-primary flex items-center justify-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm">7</span>
                Nous Contacter
              </h2>
              <p className="text-muted-foreground mb-6">Si vous avez des questions concernant vos données, contactez-nous directement :</p>
              <a 
                href="mailto:appli-tolosa31@free.fr" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
                <Mail className="h-5 w-5" />
                appli-tolosa31@free.fr
              </a>
            </section>

            <section className="text-center opacity-60 italic text-sm pt-4">
              <p>Happy People 31 - Association Loi 1901 - Toulouse</p>
            </section>

          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
