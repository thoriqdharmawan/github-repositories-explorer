"use client";

import { Github } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Github className="text-primary h-6 w-6" />
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold tracking-tight md:text-lg">
                GitHub Repositories Explorer
              </h1>
              <p className="text-muted-foreground hidden text-xs sm:block">
                Discover and explore GitHub users and their repositories
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
