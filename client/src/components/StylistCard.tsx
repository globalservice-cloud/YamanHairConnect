import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface StylistCardProps {
  name: string;
  specialty: string;
  experience: string;
  image: string;
}

export default function StylistCard({ name, specialty, experience, image }: StylistCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="bg-gradient-to-b from-primary/5 to-primary/10 py-8 px-6">
        <Avatar className="w-32 h-32 mx-auto border-4 border-background shadow-lg">
          <AvatarImage src={image} alt={name} className="object-cover" />
          <AvatarFallback className="text-2xl bg-background">{name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-serif font-semibold mb-2">{name}</h3>
        <p className="text-primary text-sm font-medium mb-2">{specialty}</p>
        <p className="text-muted-foreground text-sm">{experience}</p>
      </CardContent>
    </Card>
  );
}
