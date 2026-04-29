
"use client"

import { useState, useEffect, useMemo } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send, MoreVertical, Phone, Video, Info, Loader2, MessageSquare, ShieldAlert } from "lucide-react"
import { useUser, useFirestore, useCollection, useDoc } from "@/firebase"
import { collection, query, where, orderBy, addDoc, serverTimestamp, doc, updateDoc, Timestamp, or } from "firebase/firestore"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function MessagesPage() {
  const { user } = useUser()
  const db = useFirestore()
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")
  const [isSending, setIsSending] = useState(false)

  // Fetch all chat rooms where user is a participant
  const roomsQuery = useMemo(() => {
    if (!db || !user) return null
    return query(
      collection(db, "chatRooms"),
      where("participants", "array-contains", user.uid),
      orderBy("lastMessageAt", "desc")
    )
  }, [db, user])

  const { data: rawRooms, loading: roomsLoading } = useCollection(roomsQuery ? "chatRooms" : null)
  
  // Custom filter because Firestore array-contains query is limited
  const rooms = useMemo(() => {
    if (!rawRooms || !user) return []
    return rawRooms.filter(room => room.participants.includes(user.uid))
  }, [rawRooms, user])

  const { data: messages, loading: messagesLoading } = useCollection(
    selectedRoomId ? `chatRooms/${selectedRoomId}/messages` : null
  )

  const sortedMessages = useMemo(() => {
    if (!messages) return []
    return [...messages].sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0)
      const dateB = b.createdAt?.toDate?.() || new Date(0)
      return dateA.getTime() - dateB.getTime()
    })
  }, [messages])

  const activeRoom = useMemo(() => rooms.find(r => r.id === selectedRoomId), [rooms, selectedRoomId])
  const recipientId = useMemo(() => activeRoom?.participants.find((id: string) => id !== user?.uid), [activeRoom, user])
  const { data: recipientProfile } = useDoc(recipientId ? `users/${recipientId}` : null)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db || !user || !selectedRoomId || !messageText.trim()) return

    setIsSending(true)
    const text = messageText
    setMessageText("")

    const messagesRef = collection(db, "chatRooms", selectedRoomId, "messages")
    const roomRef = doc(db, "chatRooms", selectedRoomId)

    try {
      // Add message
      await addDoc(messagesRef, {
        senderId: user.uid,
        text,
        createdAt: serverTimestamp()
      })

      // Update room metadata
      await updateDoc(roomRef, {
        lastMessage: text,
        lastMessageAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      const permissionError = new FirestorePermissionError({
        path: messagesRef.path,
        operation: 'create',
        requestResourceData: { text }
      })
      errorEmitter.emit('permission-error', permissionError)
    } finally {
      setIsSending(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Card className="max-w-md mx-auto p-8 rounded-3xl shadow-sm">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h1 className="text-2xl font-bold mb-4">Messagerie</h1>
            <p className="text-muted-foreground mb-6">Connectez-vous pour échanger avec la communauté.</p>
            <Button asChild className="rounded-full w-full">
              <Link href="/login">Se connecter</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Navbar />
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r flex flex-col bg-muted/10">
          <div className="p-6 border-b bg-card">
            <h2 className="text-2xl font-bold font-headline mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            {roomsLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : rooms.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm italic">
                Aucune conversation active.
              </div>
            ) : (
              rooms.map((room) => (
                <ChatListItem 
                  key={room.id} 
                  room={room} 
                  currentUserId={user.uid} 
                  isSelected={selectedRoomId === room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-grow flex-col">
          {selectedRoomId ? (
            <>
              {/* Chat Header */}
              <div className="h-20 border-b flex items-center justify-between px-8 bg-card shadow-sm z-10">
                <div className="flex items-center gap-4">
                  <Avatar className="h-11 w-11 border-2 border-primary/10">
                    <AvatarImage src={recipientProfile?.photoURL || `https://picsum.photos/seed/${recipientId}/100/100`} />
                    <AvatarFallback>{recipientProfile?.name?.[0] || '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-base">{recipientProfile?.name || "Chargement..."}</h3>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                      {recipientProfile?.role === 'admin' ? 'Administrateur' : 'Membre'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Phone className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Video className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Info className="h-5 w-5" /></Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-8 space-y-4 bg-muted/5 scroll-smooth">
                {messagesLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
                  </div>
                ) : (
                  sortedMessages.map((msg, idx) => {
                    const isMe = msg.senderId === user.uid
                    const showDate = idx === 0 || 
                      (sortedMessages[idx-1].createdAt?.toDate?.().toLocaleDateString() !== msg.createdAt?.toDate?.().toLocaleDateString())

                    return (
                      <div key={msg.id} className="space-y-4">
                        {showDate && (
                          <div className="flex justify-center my-6">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 bg-muted/50 px-4 py-1.5 rounded-full">
                              {msg.createdAt?.toDate?.().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </span>
                          </div>
                        )}
                        <div className={`flex items-start gap-3 ${isMe ? 'justify-end' : ''}`}>
                          {!isMe && (
                            <Avatar className="h-8 w-8 shrink-0">
                              <AvatarImage src={recipientProfile?.photoURL || `https://picsum.photos/seed/${recipientId}/100/100`} />
                            </Avatar>
                          )}
                          <div className={`p-4 rounded-2xl max-w-[70%] shadow-sm ${
                            isMe 
                              ? 'bg-primary text-primary-foreground rounded-tr-none' 
                              : 'bg-card border border-primary/5 rounded-tl-none'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            <span className={`text-[9px] mt-2 block ${isMe ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground'}`}>
                              {msg.createdAt?.toDate?.().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t bg-card">
                <form onSubmit={handleSendMessage} className="flex items-center gap-4 max-w-5xl mx-auto">
                  <div className="flex-grow relative">
                    <Input
                      placeholder="Tapez votre message..."
                      className="rounded-full pl-6 pr-14 h-14 bg-muted/30 border-none focus-visible:ring-primary/20 text-base"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isSending || !messageText.trim()}
                      className="absolute right-1.5 top-1.5 rounded-full h-11 w-11 shadow-md hover:scale-105 transition-transform"
                    >
                      {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </Button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground p-12 text-center bg-muted/5">
              <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-8">
                <MessageSquare className="h-10 w-10 opacity-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-headline text-foreground mb-3">Vos conversations toulousaines</h3>
              <p className="max-w-md text-base leading-relaxed">
                Sélectionnez une discussion à gauche pour échanger avec d'autres membres ou organiser vos prochaines sorties.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ChatListItem({ room, currentUserId, isSelected, onClick }: any) {
  const recipientId = room.participants.find((id: string) => id !== currentUserId)
  const db = useFirestore()
  const { data: recipient } = useDoc(recipientId ? `users/${recipientId}` : null)

  const timeStr = useMemo(() => {
    if (!room.lastMessageAt) return ""
    const date = room.lastMessageAt.toDate()
    const now = new Date()
    if (date.toLocaleDateString() === now.toLocaleDateString()) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }, [room.lastMessageAt])

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-5 hover:bg-card cursor-pointer transition-all border-b ${
        isSelected ? 'bg-card border-r-4 border-r-primary shadow-sm' : ''
      }`}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 border-2 border-primary/5">
          <AvatarImage src={recipient?.photoURL || `https://picsum.photos/seed/${recipientId}/100/100`} />
          <AvatarFallback>{recipient?.name?.[0] || '?'}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-sm truncate text-foreground">{recipient?.name || "..."}</span>
          <span className="text-[10px] text-muted-foreground shrink-0 font-medium uppercase tracking-tighter">{timeStr}</span>
        </div>
        <p className={`text-xs truncate ${isSelected ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
          {room.lastMessage || "Nouvelle conversation"}
        </p>
      </div>
    </div>
  )
}
