"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
const navItems = [{
  name: "Home",
  href: "/"
}, {
  name: "Book a Court",
  href: "/book"
}, {
  name: "Updates",
  href: "/updates"
}, {
  name: "Membership",
  href: "/membership"
}, {
  name: "How to Play",
  href: "/how-to-play"
}, {
  name: "About",
  href: "/about"
}, {
  name: "Contact",
  href: "/contact"
}];
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    theme,
    setTheme
  } = useTheme();
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return <header className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`} data-unique-id="80375470-70f1-48cf-b703-09ea8d986f0f" data-file-name="components/layout/navbar.tsx" data-dynamic-text="true">
      <div className="container mx-auto px-4 sm:px-6" data-unique-id="9bc8d5a9-c2c1-46c8-9682-fe464c2b8364" data-file-name="components/layout/navbar.tsx">
        <div className="flex h-16 items-center justify-between" data-unique-id="ea0c0d14-3e26-439e-87a6-62c7414bdb32" data-file-name="components/layout/navbar.tsx" data-dynamic-text="true">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-unique-id="0dbacbfc-ef93-4739-8aa6-48f9f99742d6" data-file-name="components/layout/navbar.tsx">
            <motion.div initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} data-unique-id="902009da-38b1-4bb5-a46d-dc34a4814ae7" data-file-name="components/layout/navbar.tsx">
              <h1 className="text-2xl font-bold text-primary" data-unique-id="08067a52-b706-490d-8182-0e4783b6055a" data-file-name="components/layout/navbar.tsx">
                <span className="text-accent" data-unique-id="a56f3aac-f47b-4e79-a314-b83c71bf7c67" data-file-name="components/layout/navbar.tsx"><span className="editable-text" data-unique-id="ae9dc40e-8d3d-45b4-9b29-af44c86debd0" data-file-name="components/layout/navbar.tsx">P</span></span><span className="editable-text" data-unique-id="8cbc9611-45fc-4247-8210-7a2992966692" data-file-name="components/layout/navbar.tsx">AN
              </span></h1>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1" data-unique-id="66e45dcc-1311-4836-91f9-6fe3ecff62bf" data-file-name="components/layout/navbar.tsx">
            <AnimatePresence>
              {navItems.map(item => <motion.div key={item.name} initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} transition={{
              duration: 0.3
            }} data-unique-id="5831e638-a498-420f-9d1d-a7440d72957a" data-file-name="components/layout/navbar.tsx">
                  <Link href={item.href} className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-foreground/90"}`} data-unique-id="cf126594-690c-415b-83c3-477c9cfa8543" data-file-name="components/layout/navbar.tsx" data-dynamic-text="true">
                    {item.name}
                    {pathname === item.href && <motion.span className="absolute inset-x-1 -bottom-px h-0.5 bg-primary" layoutId="navbar-active-indicator" transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }} data-unique-id="5c29542b-4df3-4c34-a6f4-81f432eaf512" data-file-name="components/layout/navbar.tsx" />}
                  </Link>
                </motion.div>)}
            </AnimatePresence>

            <button onClick={toggleTheme} className="ml-2 rounded-full p-2 transition-colors hover:bg-secondary" aria-label="Toggle theme" data-unique-id="1108012e-821a-4369-bce4-55509c78137f" data-file-name="components/layout/navbar.tsx" data-dynamic-text="true">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link href="/book" data-unique-id="6312a20c-57f7-4118-bbc2-14d29765ce04" data-file-name="components/layout/navbar.tsx">
              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="ml-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover" data-unique-id="5fbc1edd-dbaf-4c02-8599-b9c92f6b6bc0" data-file-name="components/layout/navbar.tsx"><span className="editable-text" data-unique-id="b3fcffe0-be33-4ec3-8dd7-78fc3aa2f9cb" data-file-name="components/layout/navbar.tsx">
                Book a Court
              </span></motion.button>
            </Link>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="flex md:hidden" data-unique-id="4c0051ab-8c50-4df6-81d4-8f1205558e90" data-file-name="components/layout/navbar.tsx">
            <button onClick={toggleTheme} className="mr-2 rounded-full p-2 transition-colors hover:bg-secondary" aria-label="Toggle theme" data-unique-id="7ac0266f-0906-4c58-bda2-5b0d1aa04b77" data-file-name="components/layout/navbar.tsx" data-dynamic-text="true">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary hover:text-primary focus:outline-none" aria-label="Toggle menu" data-unique-id="f63333ff-6b82-4e01-859f-d3c2f47d9da8" data-file-name="components/layout/navbar.tsx" data-dynamic-text="true">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="md:hidden" data-unique-id="fde6fa62-8440-44dd-952f-0cdbe5040b70" data-file-name="components/layout/navbar.tsx">
            <div className="bg-background/95 backdrop-blur-md px-4 pt-2 pb-4 shadow-md" data-unique-id="a5000700-de55-4e4b-9641-04a39d517e8a" data-file-name="components/layout/navbar.tsx" data-dynamic-text="true">
              {navItems.map(item => <Link key={item.name} href={item.href} className={`block py-3 text-base font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-foreground/90"}`} data-unique-id="f2c5345e-df8a-4fdb-8248-5c81cb6461cd" data-file-name="components/layout/navbar.tsx" data-dynamic-text="true">
                  {item.name}
                </Link>)}
              <Link href="/book" data-unique-id="1cf52be6-73d0-4416-8198-61cd70d79c7f" data-file-name="components/layout/navbar.tsx">
                <button className="mt-3 w-full rounded-full bg-primary px-4 py-2 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover" data-unique-id="65468ebc-c9f8-4e9c-9175-f196f2199daf" data-file-name="components/layout/navbar.tsx"><span className="editable-text" data-unique-id="32cdaa22-dd60-4d43-a21a-a1380a32c354" data-file-name="components/layout/navbar.tsx">
                  Book a Court
                </span></button>
              </Link>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}