
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, Key, Smartphone, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SecuritySettings() {
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
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-headline font-bold">Sécurité</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Protégez votre compte ToulouseFriendly.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            <section className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Changer le mot de passe
              </h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-pass">Mot de passe actuel</Label>
                  <Input id="current-pass" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass">Nouveau mot de passe</Label>
                  <Input id="new-pass" type="password" />
                </div>
                <Button variant="outline" className="rounded-full w-full">Mettre à jour le mot de passe</Button>
              </div>
            </section>

            <section className="space-y-4 border-t pt-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Double Authentification (2FA)
              </h3>
              <p className="text-sm text-muted-foreground">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
              <Button variant="outline" className="rounded-full w-full">Configurer la 2FA</Button>
            </section>

            <section className="space-y-4 border-t pt-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <LogOut className="h-5 w-5 text-destructive" />
                Sessions actives
              </h3>
              <div className="p-4 rounded-2xl bg-muted/30 border text-sm flex justify-between items-center">
                <div>
                  <p className="font-bold">MacBook Pro - Toulouse, FR</p>
                  <p className="text-xs text-muted-foreground">Session actuelle</p>
                </div>
                <Badge>Actif</Badge>
              </div>
              <Button variant="ghost" className="rounded-full w-full text-destructive hover:bg-destructive/5">Déconnecter tous les autres appareils</Button>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
