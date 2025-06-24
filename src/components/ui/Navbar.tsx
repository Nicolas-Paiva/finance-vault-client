import Image from 'next/image';
import {Button} from '@/components/ui/button';

export default function Navbar() {
    return <nav className="h-[75px] w-[90vw] lg:max-w-7xl mx-auto flex justify-between items-center max-width">
        <Image src="/images/logo-dark.png"
               width={75}
               height={75}
               alt="Finance Vault"
        />

        <div className="flex justify-between w-[250px]">
            <Button variant="link" className="text-foreground">About Us</Button>
            <Button variant="link" className="text-foreground">Contact Us</Button>
        </div>

        <div className="flex">
            <Button className="mr-4">Sign up</Button>
            <Button variant="secondary">Log in</Button>
        </div>
    </nav>;
};
