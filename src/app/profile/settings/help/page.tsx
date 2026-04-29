
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, ArrowLeft, Mail, MessageCircle, FileText, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HelpSettings() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2 hover:bg-white/50 rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Retour au profil
        </Button>

        <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground py-10 px-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/20">
                <HelpCircle className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-headline font-bold">Aide & Support</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Nous sommes là pour vous aider à profiter de Toulouse.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-bold font-headline">Questions fréquentes</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Comment rejoindre un groupe ?</AccordionTrigger>
                  <AccordionContent>
                    Il suffit de vous rendre sur la page du groupe et de cliquer sur le bouton "Rejoindre ce groupe". Certains groupes privés peuvent nécessiter une validation de l'organisateur.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Puis-je créer mon propre événement ?</AccordionTrigger>
                  <AccordionContent>
                    Oui ! Si vous êtes membre d'un groupe, vous pouvez proposer un événement en cliquant sur "Organiser" dans l'onglet Événements du groupe.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Comment contacter un organisateur ?</AccordionTrigger>
                  <AccordionContent>
                    Vous pouvez utiliser la messagerie interne pour envoyer un message direct à n'importe quel membre ou organisateur.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-8">
              <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-primary/10 hover:bg-primary/5">
                <Mail className="h-6 w-6 text-primary" />
                <span>Nous contacter par email</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-primary/10 hover:bg-primary/5">
                <MessageCircle className="h-6 w-6 text-primary" />
                <span>Chat en direct</span>
              </Button>
            </section>

            <div className="flex justify-center gap-6 text-xs text-muted-foreground uppercase font-bold tracking-widest pt-4">
              <Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-1">
                <FileText className="h-3 w-3" /> Conditions
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-1">
                <Lock className="h-3 w-3" /> Confidentialité
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
