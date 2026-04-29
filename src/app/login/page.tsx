
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useAuth, useFirestore } from "@/firebase"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { LogIn, UserPlus, Chrome, Loader2, Beaker } from "lucide-react"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  
  const auth = useAuth()
  const db = useFirestore()
  const router = useRouter()
  const { toast } = useToast()

  const createUserProfile = async (uid: string, data: any) => {
    if (!db) return
    const userRef = doc(db, "users", uid)
    setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
    }, { merge: true })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: userRef.path,
          operation: 'create',
          requestResourceData: data,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) return
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({ title: "Connexion réussie", description: "Bon retour parmi nous !" })
      router.push("/profile")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth || !db) return
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      const userData = {
        name: name || "Nouvel Utilisateur",
        email: user.email,
        bio: "Nouveau membre de la communauté ToulouseFriendlyClubs !",
        photoURL: `https://picsum.photos/seed/${user.uid}/200/200`
      }

      await createUserProfile(user.uid, userData)
      toast({ title: "Compte créé !", description: "Bienvenue à Toulouse !" })
      router.push("/profile")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Impossible de créer le compte.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTestAccount = async () => {
    if (!auth || !db) return
    setLoading(true)
    const testEmail = "test31@example.com"
    const testPassword = "test123456789"
    const testName = "Test31"

    try {
      await signInWithEmailAndPassword(auth, testEmail, testPassword)
      toast({ title: "Connecté au compte test", description: "Accès réussi." })
      router.push("/profile")
    } catch (loginError: any) {
      if (loginError.code === 'auth/user-not-found' || loginError.code === 'auth/invalid-credential' || loginError.code === 'auth/wrong-password') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword)
          const user = userCredential.user
          
          const userData = {
            name: testName,
            email: testEmail,
            bio: "Compte de test pour ToulouseFriendlyClubs.",
            photoURL: `https://picsum.photos/seed/${user.uid}/200/200`
          }

          await createUserProfile(user.uid, userData)
          toast({ title: "Compte test créé", description: "Bienvenue sur le compte de démonstration." })
          router.push("/profile")
        } catch (signUpError: any) {
          toast({
            variant: "destructive",
            title: "Erreur compte test",
            description: signUpError.message,
          })
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erreur connexion test",
          description: loginError.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!auth || !db) return
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      const userData = {
        name: user.displayName || "Utilisateur Google",
        email: user.email,
        photoURL: user.photoURL,
      }

      await createUserProfile(user.uid, userData)
      router.push("/profile")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur Google",
        description: "La connexion via Google a échoué.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-none rounded-[2rem] overflow-hidden">
          <CardHeader className="space-y-1 bg-primary text-primary-foreground pb-10 pt-10 px-8">
            <CardTitle className="text-4xl font-bold font-headline text-center">ToulouseFriendly</CardTitle>
            <CardDescription className="text-primary-foreground/90 text-center text-lg">
              Rejoignez la Ville Rose
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 px-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1.5 rounded-2xl">
                <TabsTrigger value="login" className="rounded-xl font-bold py-3 data-[state=active]:bg-background data-[state=active]:text-primary shadow-sm">Connexion</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-xl font-bold py-3 data-[state=active]:bg-background data-[state=active]:text-primary shadow-sm">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 animate-in fade-in duration-300">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="votre@email.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link href="#" className="text-xs text-primary hover:underline font-medium">Oublié ?</Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl h-12"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-full h-12 font-bold text-lg mt-2" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <LogIn className="h-5 w-5 mr-2" />}
                    Se connecter
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 animate-in fade-in duration-300">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nom complet</Label>
                    <Input 
                      id="signup-name" 
                      placeholder="Jean Dupont" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="votre@email.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl h-12"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-full h-12 font-bold text-lg mt-2" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <UserPlus className="h-5 w-5 mr-2" />}
                    Créer mon compte
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-background px-4 text-muted-foreground font-bold">Ou utiliser</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
              <Button 
                variant="outline" 
                className="rounded-full h-12 border-primary/20 text-primary hover:bg-primary/5 font-bold transition-all" 
                onClick={handleTestAccount}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Beaker className="h-5 w-5 mr-2" />}
                Compte de test (test31)
              </Button>
              <Button variant="ghost" className="rounded-full h-12 hover:bg-muted/30 font-medium transition-all" onClick={handleGoogleLogin}>
                <Chrome className="h-5 w-5 mr-2" />
                Continuer avec Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 p-6 flex flex-col items-center gap-2">
            <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold">
              test31@example.com / test123456789
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
