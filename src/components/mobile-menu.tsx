import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link } from "./link";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8 p-6">
          <a href="/" className="text-sm font-medium hover:text-amber-600">
            Home
          </a>
          <a href="/robots" className="text-sm font-medium hover:text-amber-600">
            Robots
          </a>
          <a href="/divisions" className="text-sm font-medium hover:text-amber-600">
            Divisions
          </a>
          <a href="/team" className="text-sm font-medium hover:text-amber-600">
            Team
          </a>
          <a href="/achievements" className="text-sm font-medium hover:text-amber-600">
            Achievements
          </a>
          <a href="/publications" className="text-sm font-medium hover:text-amber-600">
            Publications
          </a>
            <Link href="/contact" className="mt-4 bg-amber-600 hover:bg-amber-500">Contact Us</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}