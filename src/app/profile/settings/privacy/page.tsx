
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Lock, ArrowLeft, Eye, Share2, Search, MessageCircle, ShieldCheck, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser, useDoc, useFirestore } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function PrivacySettings() {
  const router = useRouter()
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  const { data: profile, loading: profileLoading } = useDoc(user && db ? `users/${user.uid}` : null)
  
  const [messagePrivacy, setMessagePrivacy] = useState<string>("everyone")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (profile?.messagePrivacy) {
      setMessagePrivacy(profile.messagePrivacy)
    }
  }, [profile])

  const handleSave = async () => {
    if (!user || !db) return
    setIsSaving(true)
    
    const userRef = doc(db, "users", user.uid)
    updateDoc(userRef, {
      messagePrivacy: messagePrivacy
    })
    .then(() => {
      toast({
        title: "Paramètres mis à jour",
        description: "Vos préférences de messagerie ont été enregistrées.",
      })
    })
    .catch(async (error) => {
      const permissionError = new FirestorePermissionError({
        path: userRef.path,
        operation: 'update',
        requestResourceData: { messagePrivacy }
      })
      errorEmitter.emit('permission-error', permissionError)
    })
    .finally(() => {
      setIsSaving(false)
    })
  }

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
          <CardHeader className="bg-accent text-accent-foreground py-10 px-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/20">
                <Lock className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-headline font-bold">Confidentialité</CardTitle>
                <CardDescription className="text-accent-foreground/90">
                  Contrôlez qui peut interagir avec vous à Toulouse.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-bold font-headline">Messagerie Privée</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Choisissez qui est autorisé à vous envoyer des messages directs. Les administrateurs et modérateurs pourront toujours vous contacter en cas de besoin.
                </p>
                
                <RadioGroup 
                  value={messagePrivacy} 
                  onValueChange={setMessagePrivacy}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="everyone" id="everyone" />
                    <Label htmlFor="everyone" className="flex-1 cursor-pointer font-bold">Tout le monde</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="friends" id="friends" />
                    <Label htmlFor="friends" className="flex-1 cursor-pointer font-bold">Seulement les amis</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="flex-1 cursor-pointer font-bold text-destructive">Personne (sauf Admin)</Label>
                  </div>
                </RadioGroup>
              </div>
            </section>

            <section className="space-y-6 pt-8 border-t">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold font-headline">Visibilité Globale</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-accent/5">
                  <div className="flex gap-4">
                    <div className="p-2 rounded-xl bg-accent/10 text-accent">
                      <Eye className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-base font-bold">Visibilité du profil</Label>
                      <p className="text-xs text-muted-foreground">Permettre aux non-membres de voir votre bio.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-accent/5">
                  <div className="flex gap-4">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <Search className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-base font-bold">Recherche publique</Label>
                      <p className="text-xs text-muted-foreground">Apparaître dans les résultats de recherche externe.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Button 
              className="w-full h-14 rounded-full font-bold bg-accent hover:bg-accent/90 text-lg shadow-lg"
              onClick={handleSave}
              disabled={isSaving || profileLoading}
            >
              {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
              Enregistrer mes réglages
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
