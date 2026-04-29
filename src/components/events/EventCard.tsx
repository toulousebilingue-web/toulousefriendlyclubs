
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/app/lib/mock-data"

export function EventCard({ event }: { event: Event }) {
  const isFull = event.attendeeCount >= event.maxParticipants

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="flex flex-col md:flex-row overflow-hidden transition-all hover:shadow-xl border-primary/5 group bg-card h-full">
        <div className="relative h-48 md:h-auto md:w-56 shrink-0">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint="event cover"
          />
          {isFull && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="destructive" className="font-bold">Complet</Badge>
            </div>
          )}
          {event.ratingAverage && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-white/90 backdrop-blur text-primary border-none font-bold gap-1">
                <Star className="h-3 w-3 fill-primary" /> {event.ratingAverage}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-headline">
              {new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })}
            </span>
            <Badge variant="secondary" className="bg-primary/5 text-primary border-none">
              {event.attendeeCount}/{event.maxParticipants} inscrits
            </Badge>
          </div>
          <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
          <div className="mt-auto space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium">
              <div className="p-1.5 rounded-full bg-muted">
                <Calendar className="h-3.5 w-3.5 text-primary" />
              </div>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium">
              <div className="p-1.5 rounded-full bg-muted">
                <MapPin className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
