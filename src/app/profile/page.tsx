
"use client"

import { useUser, useDoc, useCollection, useFirestore, useAuth } from "@/firebase"
import { Navbar } from "@/components/layout/Navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, MapPin, Edit, Settings, LogOut, Mail, User as UserIcon, Shield, Bell, HelpCircle, Lock } from "lucide-react"
import Link from "next/link"
import { MOCK_GROUPS, MOCK_EVENTS } from "@/app/lib/mock-data"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser()
  const db = useFirestore()
  const auth = useAuth()
  const router = useRouter()
  
  const { data: profile } = useDoc(user && db ? `users/${user.uid}` : null)
  const { data: joinedGroups } = useCollection(user && db ? `users/${user.uid}/groupsJoined` : null)
  const { data: joinedEvents } = useCollection(user && db ? `users/${user.uid}/eventsJoined` : null)

  const handleLogout = async () => {
    if (!auth) return
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Erreur déconnexion:", error)
    }
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium text-muted-foreground">Chargement de votre profil...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto bg-card p-8 rounded-3xl shadow-sm border border-primary/5">
            <UserIcon className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h1 className="text-3xl font-bold font-headline mb-4">Connectez-vous</h1>
            <p className="text-muted-foreground mb-8">Vous devez être connecté pour accéder à votre profil et gérer vos activités.</p>
            <Button asChild className="rounded-full px-8 w-full h-12 text-lg">
              <Link href="/login">Se connecter</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const displayName = profile?.name || user.displayName || "Utilisateur Toulousain"
  const email = profile?.email || user.email
  const photoURL = profile?.photoURL || user.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`
  const bio = profile?.bio || "Passionné par la Ville Rose et ses activités conviviales. Toujours prêt pour une nouvelle aventure !"

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-lg overflow-hidden rounded-3xl">
              <div className="h-32 bg-primary"></div>
              <CardContent className="pt-0 -mt-16 text-center pb-8 px-6">
                <Avatar className="w-32 h-32 border-8 border-background mx-auto mb-4 shadow-xl">
                  <AvatarImage src={photoURL} />
                  <AvatarFallback className="text-3xl bg-muted">{displayName[0]}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold font-headline mb-1 text-foreground leading-tight">{displayName}</h2>
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mb-6">
                  <Mail className="h-3.5 w-3.5" /> 
                  <span className="truncate max-w-[180px]">{email}</span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold">Membre</Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-none font-bold">Toulousain</Badge>
                </div>

                <div className="space-y-3">
                  <Button asChild variant="outline" className="w-full rounded-full gap-2 border-primary/20 text-primary hover:bg-primary/5 h-11">
                    <Link href="/profile/edit">
                      <Edit className="h-4 w-4" /> Modifier le profil
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-full gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 h-11"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" /> Déconnexion
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="bg-muted/50 border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2 font-headline">
                  <Settings className="h-5 w-5 text-primary" />
                  Paramètres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 p-2">
                <Link href="/profile/settings/notifications" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
                  <Bell className="h-4 w-4" /> Notifications
                </Link>
                <Link href="/profile/settings/privacy" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
                  <Lock className="h-4 w-4" /> Confidentialité
                </Link>
                <Link href="/profile/settings/security" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
                  <Shield className="h-4 w-4" /> Sécurité
                </Link>
                <Link href="/profile/settings/help" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/5 hover:text-primary transition-colors text-muted-foreground">
                  <HelpCircle className="h-4 w-4" /> Aide & Support
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <Card className="border-none shadow-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
                <span className="h-8 w-1.5 bg-primary rounded-full"></span>
                À propos de moi
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {bio}
              </p>
            </Card>

            <Tabs defaultValue="events" className="w-full">
              <TabsList className="bg-muted/50 border p-1 rounded-2xl w-full sm:w-auto h-auto mb-8">
                <TabsTrigger 
                  value="events" 
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary font-bold transition-all"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Mes Sorties
                </TabsTrigger>
                <TabsTrigger 
                  value="groups" 
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary font-bold transition-all"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Mes Groupes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {joinedEvents && joinedEvents.length > 0 ? (
                    joinedEvents.map((evt: any) => {
                      const eventDetails = MOCK_EVENTS.find(e => e.id === evt.eventId)
                      return eventDetails ? (
                        <MiniCard key={evt.id} type="event" data={eventDetails} />
                      ) : null
                    })
                  ) : (
                    <div className="col-span-full py-20 text-center bg-card rounded-3xl border-2 border-dashed border-primary/10">
                      <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar className="h-10 w-10 text-muted-foreground opacity-30" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Aucun événement rejoint</h4>
                      <p className="text-muted-foreground mb-8 max-w-xs mx-auto">Explorez le calendrier pour trouver votre prochaine sortie toulousaine !</p>
                      <Button asChild variant="outline" className="rounded-full px-8 border-primary/20 text-primary hover:bg-primary/5">
                        <Link href="/events">Découvrir les événements</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="groups" className="animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {joinedGroups && joinedGroups.length > 0 ? (
                    joinedGroups.map((grp: any) => {
                      const groupDetails = MOCK_GROUPS.find(g => g.id === grp.groupId)
                      return groupDetails ? (
                        <MiniCard key={grp.id} type="group" data={groupDetails} />
                      ) : null
                    })
                  ) : (
                    <div className="col-span-full py-20 text-center bg-card rounded-3xl border-2 border-dashed border-primary/10">
                      <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="h-10 w-10 text-muted-foreground opacity-30" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Pas encore de club ?</h4>
                      <p className="text-muted-foreground mb-8 max-w-xs mx-auto">Rejoignez une communauté de passionnés pour ne rien manquer.</p>
                      <Button asChild variant="outline" className="rounded-full px-8 border-primary/20 text-primary hover:bg-primary/5">
                        <Link href="/groups">Explorer les clubs</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniCard({ data, type }: { data: any, type: 'event' | 'group' }) {
  const isEvent = type === 'event'
  const href = isEvent ? `/events/${data.id}` : `/groups/${data.id}`

  return (
    <Link href={href}>
      <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-primary/5 bg-card">
        <div className="flex items-stretch gap-4 p-4">
          <div className="relative h-24 w-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
            <img src={data.coverImage} alt={data.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors font-headline">{data.title}</h4>
            
            {isEvent ? (
              <div className="space-y-1 mt-2">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-primary" /> {new Date(data.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {data.location}
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2 font-medium">
                <Users className="h-3.5 w-3.5 text-primary" /> {data.memberCount} Toulousains
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
