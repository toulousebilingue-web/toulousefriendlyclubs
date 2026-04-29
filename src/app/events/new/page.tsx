
"use client"

import { useUser, useCollection, useFirestore } from "@/firebase"
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, ArrowRight, Users, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"
import { MOCK_GROUPS } from "@/app/lib/mock-data"

export default function CreateEventSelectGroupPage() {
  const { user, loading: userLoading } = useUser()
  const db = useFirestore()
  const { data: userGroups } = useCollection(user && db ? `users/${user.uid}/groupsJoined` : null)

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Card className="max-w-md mx-auto p-8 rounded-3xl">
            <h1 className="text-2xl font-bold mb-4">Connexion requise</h1>
            <p className="text-muted-foreground mb-6">Vous devez être connecté pour créer un événement.</p>
            <Button asChild className="rounded-full w-full">
              <Link href="/login">Se connecter</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold font-headline mb-4">Organiser un événement</h1>
            <p className="text-muted-foreground text-lg">
              Choisissez le club toulousain dans lequel vous souhaitez créer votre activité.
            </p>
          </header>

          <div className="grid gap-6">
            <Card className="border-primary/5 shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Vos clubs
                </CardTitle>
                <CardDescription>Clubs dont vous êtes membre ou organisateur</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {userGroups && userGroups.length > 0 ? (
                  <div className="divide-y">
                    {userGroups.map((joined: any) => {
                      const group = MOCK_GROUPS.find(g => g.id === joined.groupId)
                      if (!group) return null
                      return (
                        <Link 
                          key={group.id} 
                          href={`/groups/${group.id}/events/new`}
                          className="flex items-center justify-between p-6 hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                              <AvatarImage src={group.photoURL} />
                              <AvatarFallback>{group.title[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold group-hover:text-primary transition-colors">{group.title}</h3>
                              <p className="text-xs text-muted-foreground">{group.memberCount} membres</p>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-muted-foreground opacity-30" />
                    </div>
                    <p className="text-muted-foreground mb-6">Vous ne faites partie d'aucun club pour le moment.</p>
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href="/groups">Explorer les clubs</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-muted/30 px-4 text-muted-foreground font-semibold">Ou</span>
              </div>
            </div>

            <Card className="border-dashed border-2 border-primary/20 bg-transparent rounded-3xl">
              <CardContent className="p-10 text-center">
                <h3 className="text-xl font-bold mb-2">Pas encore de club adapté ?</h3>
                <p className="text-muted-foreground mb-6">Créez votre propre communauté toulousaine pour organiser vos événements.</p>
                <Button asChild className="rounded-full gap-2 px-8">
                  <Link href="/groups/new">
                    <Plus className="h-4 w-4" /> Créer mon propre club
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
