'use client';

import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import Link from 'next/link';

export type NavbarProps = {
    showSignup?: boolean;
    showLogin?: boolean;
}

export default function Navbar({showSignup = true, showLogin = true}: NavbarProps) {

    return <nav className="h-[75px] flex justify-between items-center">
        <div>
            <Link href="/">
                <Image src={'/images/navbar-img.png'}
                       height={50}
                       width={50}
                       alt="Finance Vault"
                />
            </Link>
        </div>

        <div className="hidden lg:w-full md:flex md:justify-center md:items-center md:space-x-12 md:pl-32">
            <Button variant="link" className="text-foreground text-xl"><Link href="/about">About Us</Link></Button>
            <Button variant="link" className="text-foreground text-xl lg:ml-40"><Link
                href="/contact">Contact</Link></Button>
        </div>

        <div className="flex justify-around sm:w-[45%] md:w-[25%] lg:w-[15%]">
            <ThemeToggle/>
            {showSignup &&
                <Link href={'/signup'}>
                    <Button className="mr-2 ml-2 hover:cursor-pointer">Sign up</Button>
                </Link>
            }

            {showLogin &&
                <Link href={'/login'}>
                    <Button variant="secondary" className="hover:cursor-pointer">Log in</Button>
                </Link>
            }
        </div>
    </nav>;
};
