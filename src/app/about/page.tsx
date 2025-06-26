import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import {features} from '@/lib/data/features';
import FeatureCard from '@/components/ui/FeatureCard';

export default function About() {
    return (
        <>
            <Navbar/>
            <section className="w-[90vw] h-[100vh] lg:max-w-7xl mx-auto">
                <h1 className="text-center text-xl bold">About Us</h1>
                <p className="text-center w-2/3 mx-auto mt-8 p-4 border-2 border-accent rounded">Finance Vault is a modern personal finance management
                    platform,
                    built with a focus on security and simplicity</p>
                <div className="h-82 w-70 rounded flex my-12">
                    <div className="relative rounded w-full h-[100%]">
                        <Image
                            src="/images/svg1.svg"
                            className="object-cover rounded"
                            alt="Banking"
                            fill
                        />
                    </div>
                </div>
                {features.map((feature) =>
                    <FeatureCard key={feature.icon} title={feature.title} description={feature.description} icon={feature.icon}/>)}
            </section>
        </>
    );
};
