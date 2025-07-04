import Navbar from '@/components/ui/navbar';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Navbar/>
            <div className="w-[90vw] lg:max-w-7xl mx-auto text-center py-20">
                <h1 className="text-4xl font-bold">Finance Vault</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Manage your expenses, track your income, and stay in control.
                </p>
                <div className="mt-6 flex flex-col justify-center items-center gap-4">
                    <div className="relative w-[350px] h-[350px] md:w-[550px] md:h-[550px]">
                        <Image src="/images/vault.jpg"
                               className="object-cover rounded"
                               fill
                               alt="Banking">
                        </Image>
                    </div>
                    <div className="flex flex-row justify-between mt-6 w-[80%] md:w-60">
                       <Link href="/signup"><Button className="hover:cursor-pointer">Get Started</Button></Link>
                       <Link href="/about"><Button variant="outline" className="hover:cursor-pointer">Learn More</Button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
