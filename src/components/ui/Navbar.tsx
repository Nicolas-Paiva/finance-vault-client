"use client"

import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {ThemeToggle} from '@/components/ui/ThemeToggle';
import {useTheme} from 'next-themes';
import Link from 'next/link';

export default function Navbar() {

    const {theme} = useTheme();

    return <nav className="h-[75px] w-[90vw] lg:max-w-7xl mx-auto flex justify-between items-center">
        <Image src={theme === "light" ? "/images/logo-light.png" : "/images/logo-dark.png"}
               width={75}
               height={75}
               alt="Finance Vault"
        />

        <div className="hidden lg:w-[25%] md:flex md:justify-between">
            <Button variant="link" className="text-foreground"><Link href="/about">About Us</Link></Button>
            <Button variant="link" className="text-foreground">Contact Us</Button>
        </div>

        <div className="flex justify-between sm:w-[45%] md:w-[30%] lg:w-[25%]">
            <ThemeToggle/>
            <Button className="mr-2 ml-2">Sign up</Button>
            <Button variant="secondary">Log in</Button>
        </div>
    </nav>;
};
