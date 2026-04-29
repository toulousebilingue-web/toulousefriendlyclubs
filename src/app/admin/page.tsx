
"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, Calendar, Flag, MoreVertical, Search, CheckCircle, XCircle, UserX, AlertTriangle } from "lucide-react"
import { useUser, useDoc, useFirestore, useCollection } from "@/firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [search, setSearch] = useState("")
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  
  const { data: userProfile } = useDoc(db && user ? `users/${user.uid}` : null)
  const isSuperAdmin = userProfile?.role === 'super_admin' || userProfile?.role === 'super_moderator'

  const handleGlobalBan = async (userId: string) => {
    if (!db || !isSuperAdmin) return
    const userRef = doc(db, "users", userId)
    updateDoc(userRef, { isBanned: true })
      .then(() => {
        toast({ title: "Utilisateur banni", description: "L'accès à l'application a été révoqué globalement." })
      })
  }

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="p-12 text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Accès Interdit</h1>
          <p className="text-muted-foreground mb-6">Seuls les Super Administrateurs peuvent accéder à ce panneau de contrôle global.</p>
          <Button variant="outline" onClick={() => window.history.back()}>Retour</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-headline mb-2 flex items-center gap-3 text-destructive">
              <Shield className="h-10 w-10" />
              Super Administration
            </h1>
            <p className="text-muted-foreground">Contrôle total sur tous les clubs et membres de ToulouseFriendlyClubs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Utilisateurs" value="1,248" icon={<Users className="h-6 w-6" />} color="bg-blue-500" />
          <StatCard title="Clubs Globaux" value="142" icon={<Users className="h-6 w-6" />} color="bg-primary" />
          <StatCard title="Événements Privés" value="56" icon={<Calendar className="h-6 w-6" />} color="bg-accent" />
          <StatCard title="Signalements" value="12" icon={<Flag className="h-6 w-6" />} color="bg-red-500" />
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-1/3 mb-8 h-12">
            <TabsTrigger value="users" className="font-bold">Utilisateurs</TabsTrigger>
            <TabsTrigger value="groups" className="font-bold">Tous les Clubs</TabsTrigger>
            <TabsTrigger value="reports" className="font-bold">Signalements</TabsTrigger>
          </TabsList>

          <Card className="border-none shadow-sm overflow-hidden">
            <TabsContent value="users" className="p-0 m-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Action Globale</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">Membre Test #452</TableCell>
                    <TableCell><Badge variant="outline">Membre</Badge></TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-700">Actif</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10" onClick={() => handleGlobalBan('test')}>
                        <UserX className="h-4 w-4 mr-2" /> Bannir de l'App
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="groups" className="p-0 m-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Nom du Club</TableHead>
                    <TableHead>Confidentialité</TableHead>
                    <TableHead>Membres</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3].map((i) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold">Club Toulousain {i}</TableCell>
                      <TableCell><Badge variant="secondary">Privé (Fermé)</Badge></TableCell>
                      <TableCell>12</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="flex items-center p-6 gap-4">
        <div className={`p-4 rounded-2xl text-white ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold font-headline">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
