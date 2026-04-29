
"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Sparkles, Calendar as CalendarIcon, Clock, MapPin, ArrowLeft, Loader2, Shield, Eye, Users } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { generateEventContent } from "@/ai/flows/generate-event-content-flow"
import { useToast } from "@/hooks/use-toast"
import { useUser, useDoc, useFirestore } from "@/firebase"
import { MOCK_GROUPS } from "@/app/lib/mock-data"

export default function NewEventPage() {
  const router = useRouter()
  const { id: groupId } = useParams()
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  
  const { data: group } = useDoc(db && groupId ? `groups/${groupId}` : null)
  const { data: membership } = useDoc(db && user && groupId ? `groups/${groupId}/members/${user.uid}` : null)
  const { data: userProfile } = useDoc(db && user ? `users/${user.uid}` : null)

  const isSuperAdmin = userProfile?.role === 'super_admin' || userProfile?.role === 'super_moderator'
  const isGroupAdmin = membership?.role === 'admin' || membership?.role === 'moderator' || isSuperAdmin
  const isAcceptedMember = membership?.status === 'accepted' || isSuperAdmin

  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    themes: "",
    visibility: "global" // 'global' ou 'group_only'
  })

  const handleAiInspiration = async () => {
    if (!formData.themes) {
      toast({
        title: "Thèmes requis",
        description: "Veuillez entrer quelques thèmes ou mots-clés.",
        variant: "destructive",
      })
      return
    }

    setAiLoading(true)
    try {
      const themesArray = formData.themes.split(',').map(t => t.trim())
      const result = await generateEventContent({ themes: themesArray, numIdeas: 1 })
      if (result.eventIdeas.length > 0) {
        const idea = result.eventIdeas[0]
        setFormData({ ...formData, title: idea.title, description: idea.description })
        toast({ title: "Inspiration générée !" })
      }
    } catch (error) {
      toast({ title: "Erreur IA", variant: "destructive" })
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAcceptedMember) {
      toast({ title: "Accès refusé", description: "Vous devez être membre accepté pour publier.", variant: "destructive" })
      return
    }
    
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: "Événement créé !", description: "Publié avec succès." })
      router.push(`/groups/${groupId}`)
    }, 1500)
  }

  if (!isAcceptedMember && !loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Card className="max-w-md mx-auto p-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-destructive opacity-20" />
            <h1 className="text-xl font-bold mb-4">Accès réservé</h1>
            <p className="text-muted-foreground mb-6">Seuls les membres acceptés de ce club peuvent proposer des événements.</p>
            <Button onClick={() => router.back()} variant="outline" className="rounded-full">Retour</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" /> Retour au club
        </Button>

        <Card className="shadow-lg">
          <CardHeader className="border-b bg-card">
            <CardTitle className="text-2xl font-bold text-primary">Créer un événement</CardTitle>
            <CardDescription>Organisez une activité pour {group?.title || "ce club"}</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Visibilité - Uniquement pour les admins du groupe */}
              {isGroupAdmin && (
                <div className="space-y-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <Label className="text-base font-bold flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" /> Contrôle de visibilité (Admin)
                  </Label>
                  <RadioGroup 
                    value={formData.visibility} 
                    onValueChange={(v) => setFormData({ ...formData, visibility: v })}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-xl border bg-card cursor-pointer">
                      <RadioGroupItem value="global" id="v-global" />
                      <Label htmlFor="v-global" className="flex-1 cursor-pointer">
                        <span className="font-bold block">Global</span>
                        <span className="text-[10px] text-muted-foreground">Visible par tout Toulouse</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-xl border bg-card cursor-pointer">
                      <RadioGroupItem value="group_only" id="v-group" />
                      <Label htmlFor="v-group" className="flex-1 cursor-pointer">
                        <span className="font-bold block">Interne</span>
                        <span className="text-[10px] text-muted-foreground">Seulement pour les membres</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div className="space-y-4 p-6 bg-accent/5 rounded-2xl border border-accent/10">
                <div className="flex items-center justify-between">
                  <Label htmlFor="themes" className="text-sm font-bold uppercase text-accent">Aide IA</Label>
                  <Button type="button" variant="outline" size="sm" className="gap-2" onClick={handleAiInspiration} disabled={aiLoading}>
                    {aiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />} M'inspirer
                  </Button>
                </div>
                <Input
                  id="themes"
                  placeholder="Ex: Pique-nique, jeux de société..."
                  value={formData.themes}
                  onChange={(e) => setFormData({ ...formData, themes: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="title" className="text-lg font-bold">Titre de l'événement</Label>
                <Input
                  id="title"
                  placeholder="Titre accrocheur"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                <Input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
              </div>

              <Input placeholder="Lieu exact à Toulouse" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />

              <Textarea
                placeholder="Décrivez l'activité..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[150px]"
                required
              />

              <Button type="submit" className="w-full h-12 text-lg font-bold rounded-full" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                Publier l'événement
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
