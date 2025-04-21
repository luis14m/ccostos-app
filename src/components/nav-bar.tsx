"use client";

import { ListFilter, PlusCircle, User2, Menu } from 'lucide-react';
import { Button } from "./ui/button";
import { signOutAction } from "@/app/actions";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const NavItems = () => (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/ccostos"
          className={navigationMenuTriggerStyle()}
        >
          <span className="flex items-center">
            <ListFilter className="w-4 h-4 mr-2" />
            Ver CCostos
          </span>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          href="/create"
          className={navigationMenuTriggerStyle()}
        >
          <span className="flex items-center">
            <PlusCircle className="w-4 h-4 mr-2" />
            Crear CCostos
          </span>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          href="/cuenta"
          className={navigationMenuTriggerStyle()}
        >
          <span className="flex items-center">
            <User2 className="w-4 h-4 mr-2" />
            <span className="text-sm">Cuenta</span>
          </span>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <form action={signOutAction}>
          <Button type="submit" variant="outline" size="sm">
            Cerrar sesion
          </Button>
        </form>
      </NavigationMenuItem>
    </>
  );

  const MobileNavItems = () => (
    <div className="flex flex-col space-y-4">
      <Link href="/ccostos" className="flex items-center space-x-2">
        <ListFilter className="w-4 h-4" />
        <span>Ver CCostos</span>
      </Link>
      <Link href="/create" className="flex items-center space-x-2">
        <PlusCircle className="w-4 h-4" />
        <span>Crear CCostos</span>
      </Link>
      <Link href="/cuenta" className="flex items-center space-x-2">
        <User2 className="w-4 h-4" />
        <span>Cuenta</span>
      </Link>
      <form action={signOutAction}>
        <Button type="submit" variant="outline" size="sm" className="w-full">
          Cerrar sesion
        </Button>
      </form>
    </div>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 pl-4 pr-4">
          <div className="flex items-center">
            <Image
              src="https://tlvuxyxktqqzvynbhhtu.supabase.co/storage/v1/object/public/NukleoPublico/UsoPublicoGeneral/Logo.png"
              alt="KLV Ingeniería y Construcción"
              width={64}
              height={64}
              className="h-16 w-auto"
              priority
            />
            <h1 className="text-2xl font-bold text-gray-900 ml-4">
              CCostos-App
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavItems />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu de Navegación</SheetTitle>
                </SheetHeader>
                <MobileNavItems />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}




