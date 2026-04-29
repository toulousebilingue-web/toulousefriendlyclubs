"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Camera, ArrowLeft, Loader2 } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { generateGroupDescription } from "@/ai/flows/generate-group-description-flow"
import { useToast } from "@/hooks/use-toast"

export default function NewGroupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    targetAudience: "",
    description: "",
  })

  const handleAiDescription = async () => {
    if (!formData.purpose || !formData.targetAudience) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir le but et l'audience cible pour l'IA.",
        variant: "destructive",
      })
      return
    }

    setAiLoading(true)
    try {
      const result = await generateGroupDescription({
        purpose: formData.purpose,
        targetAudience: formData.targetAudience,
      })
      setFormData({ ...formData, description: result.description })
    } catch (error) {
      toast({
        title: "Erreur IA",
        description: "Impossible de générer la description pour le moment.",
        variant: "destructive",
      })
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Groupe créé !",
        description: "Votre groupe a été créé avec succès.",
      })
      router.push("/groups")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>

        <Card className="shadow-lg border-primary/5">
          <CardHeader className="text-center pb-8 border-b bg-card">
            <CardTitle className="text-3xl font-headline font-bold text-primary">Créer un nouveau groupe</CardTitle>
            <CardDescription className="text-base">
              Rassemblez les Toulousains autour d'un projet commun.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="title" className="text-lg font-bold">Nom du groupe</Label>
                <Input
                  id="title"
                  placeholder="Ex: Passion Cassoulet & Co"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="h-12 text-lg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="purpose" className="text-base font-bold">But du groupe</Label>
                  <Input
                    id="purpose"
                    placeholder="Ex: Sorties culturelles"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="target" className="text-base font-bold">Public ciblé</Label>
                  <Input
                    id="target"
                    placeholder="Ex: Étudiants à Toulouse"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description" className="text-lg font-bold">Description</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 text-primary border-primary/20 hover:bg-primary/5"
                    onClick={handleAiDescription}
                    disabled={aiLoading}
                  >
                    {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Générer par IA
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Racontez-nous l'histoire de ce groupe..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[200px] text-base leading-relaxed"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-bold">Image de couverture</Label>
                <div className="border-2 border-dashed rounded-xl p-12 text-center bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer border-primary/10">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium">Cliquez pour ajouter une photo</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG jusqu'à 10MB</p>
                </div>
              </div>

              <div className="pt-6 border-t flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  className="flex-1 h-12 text-lg font-bold rounded-full"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  Créer mon groupe
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="sm:w-32 h-12 rounded-full"
                  onClick={() => router.back()}
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
