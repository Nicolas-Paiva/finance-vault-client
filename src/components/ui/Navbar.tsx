"use client"

import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {ThemeToggle} from '@/components/ui/ThemeToggle';
import {useTheme} from 'next-themes';
import Link from 'next/link';

export default function Navbar() {

    const {theme} = useTheme();

    return <nav className="h-[75px] w-[90vw] lg:max-w-7xl mx-auto flex justify-between items-center">
        <div className="sm:w-[45%] md:w-[30%] lg:w-[25%]">
            <Image src={theme === "light" ? "/images/logo-light.png" : "/images/logo-dark.png"}
                   width={75}
                   height={75}
                   alt="Finance Vault"
            />
        </div>

        <div className="hidden lg:w-[35%] md:flex md:justify-between">
            <Button variant="link" className="text-foreground"><Link href="/about">About Us</Link></Button>
            <Button variant="link" className="text-foreground"><Link href="/contact">Contact</Link></Button>
        </div>

        <div className="flex justify-between sm:w-[45%] md:w-[30%] lg:w-[25%]">
            <ThemeToggle/>
            <Button className="mr-2 ml-2 hover:cursor-pointer">Sign up</Button>
            <Button variant="secondary" className="hover:cursor-pointer">Log in</Button>
        </div>
    </nav>;
};
