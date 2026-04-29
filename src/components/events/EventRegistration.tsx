"use client"

import { useState } from "react"
import { Check, UserPlus, Users, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function EventRegistration({ event }: { event: any }) {
  const [isRegistered, setIsRegistered] = useState(false)
  const { toast } = useToast()
  const isFull = event.attendeeCount >= event.attendeeLimit

  const handleToggleRegistration = () => {
    if (isFull && !isRegistered) {
      toast({
        title: "Événement complet",
        description: "Désolé, il n'y a plus de places disponibles.",
        variant: "destructive",
      })
      return
    }

    setIsRegistered(!isRegistered)
    toast({
      title: isRegistered ? "Désinscription réussie" : "Inscription réussie !",
      description: isRegistered 
        ? "Votre place a été libérée." 
        : "Vous avez été ajouté à la liste des participants.",
    })
  }

  return (
    <Card className="border-primary/10 shadow-lg overflow-hidden">
      <div className="bg-primary/5 p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-bold">{event.attendeeCount + (isRegistered ? 1 : 0)} / {event.attendeeLimit}</span>
        </div>
        <Badge variant={isFull && !isRegistered ? "destructive" : "secondary"} className="rounded-full">
          {isFull && !isRegistered ? "Complet" : `${event.attendeeLimit - (event.attendeeCount + (isRegistered ? 1 : 0))} places restantes`}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          {isRegistered ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-start gap-3">
              <Check className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Vous êtes inscrit !</p>
                <p className="text-xs">Nous avons hâte de vous voir à cet événement.</p>
              </div>
            </div>
          ) : isFull ? (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Événement complet</p>
                <p className="text-xs">Inscrivez-vous sur liste d'attente pour être prévenu si une place se libère.</p>
              </div>
            </div>
          ) : null}

          <Button 
            className={`w-full h-12 rounded-full font-bold transition-all ${isRegistered ? 'bg-muted hover:bg-muted/80 text-foreground border' : 'bg-primary hover:bg-primary/90'}`}
            onClick={handleToggleRegistration}
          >
            {isRegistered ? (
              <>Annuler mon inscription</>
            ) : isFull ? (
              <>Liste d'attente</>
            ) : (
              <><UserPlus className="h-4 w-4 mr-2" /> M'inscrire à l'événement</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
