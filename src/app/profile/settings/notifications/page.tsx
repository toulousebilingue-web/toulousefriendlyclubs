
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, ArrowLeft, Mail, Smartphone, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotificationsSettings() {
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
                <Bell className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-headline font-bold">Notifications</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Gérez comment vous restez informé des activités.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-primary/5">
                <div className="flex gap-4">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <Label className="text-base font-bold">Emails de rappel</Label>
                    <p className="text-xs text-muted-foreground">Recevez un rappel 24h avant vos événements.</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-primary/5">
                <div className="flex gap-4">
                  <div className="p-2 rounded-xl bg-accent/10 text-accent">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <Label className="text-base font-bold">Notifications Push</Label>
                    <p className="text-xs text-muted-foreground">Alertes sur votre téléphone pour les messages urgents.</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-primary/5">
                <div className="flex gap-4">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <Label className="text-base font-bold">Discussions de groupe</Label>
                    <p className="text-xs text-muted-foreground">Alertes pour les nouveaux messages sur le forum.</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>

            <Button className="w-full h-12 rounded-full font-bold">Enregistrer les préférences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
