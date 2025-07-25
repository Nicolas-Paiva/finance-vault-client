import Image from 'next/image';
import Navbar from '@/components/ui/navbar';
import {features} from '@/lib/data/features';
import FeatureCard from '@/components/ui/feature-card';
import {ScrollArea} from '@/components/ui/scroll-area';
import React from 'react';

export default function About() {
    return (
        <>
            <Navbar/>
            <section>
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
                 border-2 border-accent rounded">Whether you&#39;re budgeting for the month,
                    keeping an eye on spending, or just curious about your financial habits,
                    Finance Vault is your personal, secure vault for everything finance-related.</p>
            </section>
        </>
    );
};
