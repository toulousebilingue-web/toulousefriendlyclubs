
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser, useDoc, useFirestore } from "@/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, Camera, Save, Mail } from "lucide-react"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors"

export default function EditProfilePage() {
  const { user, loading: userLoading } = useUser()
  const db = useFirestore()
  const router = useRouter()
  const { toast } = useToast()
  
  const { data: profile, loading: profileLoading } = useDoc(user && db ? `users/${user.uid}` : null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    photoURL: ""
  })
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (profile && !hasInitialized) {
      setFormData({
        name: profile.name || "",
        bio: profile.bio || "",
        photoURL: profile.photoURL || ""
      })
      setHasInitialized(true)
    }
  }, [profile, hasInitialized])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !db) return
    
    setIsSubmitting(true)
    const userRef = doc(db, "users", user.uid)
    
    // On prépare les données selon le schéma requis
    const updateData = {
      name: formData.name,
      bio: formData.bio,
      photoURL: formData.photoURL,
      // On ne change pas l'email et createdAt ici car ils sont gérés à l'inscription
      updatedAt: serverTimestamp()
    }

    setDoc(userRef, updateData, { merge: true })
      .then(() => {
        toast({
          title: "Profil enregistré !",
          description: "Vos modifications ont été sauvegardées avec succès.",
        })
        router.push("/profile")
      })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: userRef.path,
          operation: 'write',
          requestResourceData: updateData,
        } satisfies SecurityRuleContext);

        errorEmitter.emit('permission-error', permissionError);
        setIsSubmitting(false)
      })
  }

  if (userLoading || (profileLoading && !hasInitialized)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
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
          <CardHeader className="bg-primary text-primary-foreground pb-16 pt-12 text-center relative">
            <div className="absolute top-4 right-6 opacity-20">
              <Save className="h-24 w-24" />
            </div>
            <CardTitle className="text-4xl font-headline font-bold mb-2">Modifier mon Profil</CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg">
              Personnalisez votre présence à Toulouse
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 -mt-10 px-8 pb-10">
            <div className="flex justify-center mb-10">
              <div className="relative group">
                <Avatar className="w-36 h-36 border-8 border-background shadow-2xl transition-transform group-hover:scale-105 duration-300">
                  <AvatarImage src={formData.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`} />
                  <AvatarFallback className="text-4xl font-bold bg-muted text-primary">
                    {formData.name?.[0] || user.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-2 right-2 bg-primary text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-all border-4 border-background">
                  <Camera className="h-6 w-6" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Nom complet</Label>
                <Input
                  id="name"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-2xl h-14 text-lg border-muted-foreground/10 bg-muted/20 focus:bg-background transition-all"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Email (non modifiable)</Label>
                <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-muted/30 border border-muted-foreground/5 text-muted-foreground">
                  <Mail className="h-5 w-5 opacity-50" />
                  <span className="text-sm font-medium">{profile?.email || user.email}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="photoURL" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">URL de votre photo</Label>
                <Input
                  id="photoURL"
                  placeholder="https://..."
                  value={formData.photoURL}
                  onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                  className="rounded-2xl h-14 border-muted-foreground/10 bg-muted/20 focus:bg-background transition-all"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Biographie</Label>
                <Textarea
                  id="bio"
                  placeholder="Dites-nous ce que vous aimez à Toulouse, vos quartiers préférés, vos passions..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="min-h-[150px] rounded-2xl resize-none leading-relaxed border-muted-foreground/10 bg-muted/20 focus:bg-background transition-all p-4"
                />
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  className="flex-1 h-14 rounded-full font-bold text-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : <Save className="h-6 w-6 mr-2" />}
                  Enregistrer les modifications
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="sm:w-32 h-14 rounded-full text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
