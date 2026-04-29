
"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MessageSquare, Info, Plus, ShieldCheck, UserMinus, Clock } from "lucide-react"
import { useUser, useDoc, useCollection, useFirestore } from "@/firebase"
import { doc, setDoc, deleteDoc, updateDoc, serverTimestamp, collection, query, where } from "firebase/firestore"
import { EventCard } from "@/components/events/EventCard"
import { MOCK_EVENTS } from "@/app/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function GroupDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()

  const { data: group, loading: groupLoading } = useDoc(db && id ? `groups/${id}` : null)
  const { data: userProfile } = useDoc(db && user ? `users/${user.uid}` : null)
  const { data: membership, loading: membershipLoading } = useDoc(db && user && id ? `groups/${id}/members/${user.uid}` : null)
  const { data: members } = useCollection(db && id ? `groups/${id}/members` : null)

  const isSuperAdmin = userProfile?.role === 'super_admin' || userProfile?.role === 'super_moderator'
  const isAcceptedMember = membership?.status === 'accepted' || isSuperAdmin
  const isPendingMember = membership?.status === 'pending'
  const isGroupAdmin = membership?.role === 'admin' || membership?.role === 'moderator' || isSuperAdmin

  const groupEvents = useMemo(() => {
    // Dans une vraie app, on filtrerait ici via Firestore
    // Pour le prototype, on utilise les mocks mais on simule le filtrage de visibilité
    return MOCK_EVENTS.filter(e => {
      const isCorrectGroup = e.groupId === id
      if (!isCorrectGroup) return false
      
      // Si admin/super admin, on voit tout
      if (isGroupAdmin) return true
      
      // Si membre accepté, on voit tout du groupe
      if (isAcceptedMember) return true

      // Sinon (visiteur ou membre banni/attente), on ne voit que le Global
      return e.visibility !== 'group_only'
    })
  }, [id, isGroupAdmin, isAcceptedMember])

  const handleJoin = async () => {
    if (!user || !db || !id || !group) return

    const membershipRef = doc(db, "groups", id, "members", user.uid)
    const status = group.joinPolicy === 'open' ? 'accepted' : 'pending'

    const data = {
      userId: user.uid,
      groupId: id,
      status: status,
      role: 'member',
      joinedAt: serverTimestamp()
    }

    setDoc(membershipRef, data)
      .then(() => {
        toast({
          title: status === 'accepted' ? "Bienvenue dans le club !" : "Demande envoyée",
          description: status === 'accepted' ? "Vous pouvez maintenant participer." : "L'organisateur doit valider votre profil.",
        })
      })
      .catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: membershipRef.path, operation: 'create' }))
      })
  }

  const handleExclude = async (memberId: string) => {
    if (!db || !id) return
    const memberRef = doc(db, "groups", id, "members", memberId)
    
    // Au lieu de supprimer, on peut bannir ou supprimer la relation
    deleteDoc(memberRef)
      .then(() => {
        toast({ title: "Membre exclu", description: "L'accès au groupe a été retiré." })
      })
      .catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: memberRef.path, operation: 'delete' }))
      })
  }

  if (groupLoading) return <div className="p-20 text-center">Chargement du club...</div>

  return (
    <div className="min-h-screen bg-muted/10">
      <Navbar />
      
      <div className="relative h-[300px] md:h-[400px]">
        {group?.photoURL && (
          <Image src={group.photoURL} alt={group.title} fill className="object-cover brightness-75" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="container mx-auto px-4 absolute bottom-0 left-0 right-0 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
            <div>
              <Badge className="mb-4 bg-primary text-white border-none">
                {group?.visibility === 'private' ? 'Club Privé' : 'Club Public'} • {group?.joinPolicy === 'request' ? 'Sur validation' : 'Accès libre'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{group?.title}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 opacity-80" />
                  <span className="font-medium">{members?.length || group?.memberCount || 0} membres</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              {!membership && !isSuperAdmin && (
                <Button onClick={handleJoin} size="lg" className="rounded-full px-8 bg-accent text-white">
                  Rejoindre ce groupe
                </Button>
              )}
              {isPendingMember && (
                <Button disabled size="lg" variant="secondary" className="rounded-full px-8 opacity-70">
                  <Clock className="h-4 w-4 mr-2" /> En attente de validation
                </Button>
              )}
              {isAcceptedMember && !isSuperAdmin && (
                <Badge variant="outline" className="text-white border-white/40 h-10 px-6 rounded-full text-sm">Membre accepté</Badge>
              )}
              {isGroupAdmin && (
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Link href={`/groups/${id}/settings`}><ShieldCheck className="h-4 w-4 mr-2" /> Gérer</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none mb-8">
                <TabsTrigger value="events" className="px-6 py-4 rounded-none bg-transparent shadow-none font-bold text-lg">Événements</TabsTrigger>
                <TabsTrigger value="about" className="px-6 py-4 rounded-none bg-transparent shadow-none font-bold text-lg">À propos</TabsTrigger>
                <TabsTrigger value="members" className="px-6 py-4 rounded-none bg-transparent shadow-none font-bold text-lg">Membres</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold font-headline flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Agenda du groupe
                  </h3>
                  {isAcceptedMember && (
                    <Button asChild className="rounded-full gap-2" size="sm">
                      <Link href={`/groups/${id}/events/new`}>
                        <Plus className="h-4 w-4" /> Organiser une sortie
                      </Link>
                    </Button>
                  )}
                </div>
                
                {!isAcceptedMember && group?.visibility === 'private' ? (
                  <Card className="p-12 text-center border-dashed border-2">
                    <ShieldCheck className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Ce club est privé. Rejoignez-le pour voir les activités internes.</p>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {groupEvents.length > 0 ? (
                      groupEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))
                    ) : (
                      <p className="text-muted-foreground italic text-center py-12">Aucun événement visible pour le moment.</p>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="members" className="space-y-6">
                <h3 className="text-2xl font-bold font-headline mb-4">La communauté</h3>
                <div className="grid gap-4">
                  {members?.map((m: any) => (
                    <div key={m.id} className="flex items-center justify-between p-4 bg-card rounded-2xl border shadow-sm">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={`https://picsum.photos/seed/${m.userId}/100/100`} />
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">Membre #{m.userId.slice(0, 4)}</p>
                            {m.role === 'admin' && <Badge className="h-4 text-[8px]">Admin</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">Statut: {m.status}</p>
                        </div>
                      </div>
                      {isGroupAdmin && m.userId !== user?.uid && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleExclude(m.id)}
                        >
                          <UserMinus className="h-4 w-4 mr-1" /> Exclure
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card className="border-primary/10 p-6">
              <h4 className="font-bold text-lg mb-4">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{group?.description}</p>
            </Card>
            
            {isSuperAdmin && (
              <Card className="border-destructive/20 bg-destructive/5 p-6">
                <h4 className="font-bold text-destructive flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-4 w-4" /> Administration Globale
                </h4>
                <p className="text-xs mb-4">Vous avez accès à ce groupe en tant que Super Admin.</p>
                <Button variant="destructive" size="sm" className="w-full rounded-full">Désactiver le groupe</Button>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
