import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactCard() {
  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl shadow-md border border-border bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-primary">
          Liên hệ với tôi
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Kết nối để cùng hợp tác và trao đổi!
        </p>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          <a href="mailto:example@gmail.com" className="hover:underline">
            example@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary" />
          <a href="tel:+84901234567" className="hover:underline">
            +84 90 123 4567
          </a>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Hà Nội, Việt Nam</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center gap-3">
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer">
            <Linkedin className="w-5 h-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer">
            <Github className="w-5 h-5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
