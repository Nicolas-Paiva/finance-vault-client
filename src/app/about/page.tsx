import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import {features} from '@/lib/data/features';
import FeatureCard from '@/components/ui/FeatureCard';
import {ScrollArea} from '@/components/ui/scroll-area';
import React from 'react';
import FooterComponent from '@/components/ui/Footer';

export default function About() {
    const tags = Array.from({length: 50}).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    );

    return (
        <>
            <Navbar/>
            <section className="w-[90vw] lg:max-w-7xl mx-auto">
                <h1 className="text-center text-xl bold">About Us</h1>
                <p className="text-center mx-auto mt-8 p-4
                 border-2 border-accent rounded">Finance Vault is a
                    modern personal finance management
                    platform,
                    built with a focus on security and simplicity</p>
                <div className="h-82 w-70 md:h-124 md:w-106 mx-auto rounded flex my-12">
                    <div className="relative rounded w-full h-[100%]">
                        <Image
                            src="/images/svg1.svg"
                            className="object-cover rounded"
                            alt="Banking"
                            fill
                        />
                    </div>
                </div>
                <h2 className="text-xl text-center mb-4 bold underline">What we offer</h2>
                <ScrollArea className="h-86 rounded-md border">
                    <div className="p-4">
                        {features.map((feature) =>
                            <FeatureCard key={feature.icon}
                                         title={feature.title}
                                         description={feature.description}
                                         icon={feature.icon}/>)}
                    </div>
                </ScrollArea>
                <p className="text-center mx-auto mt-8 p-4
                 border-2 border-accent rounded">Whether you're budgeting for the month,
                    keeping an eye on spending, or just curious about your financial habits,
                    Finance Vault is your personal, secure vault for everything finance-related.</p>
            </section>
            <FooterComponent/>
        </>
    );
};
