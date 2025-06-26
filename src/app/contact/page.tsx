import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';

export default function Contact() {
    return (
        <>
            <Navbar/>
            <section className="w-[90vw] lg:max-w-7xl mx-auto">
                <h1 className="text-5xl text-center mb-8">Contact Us</h1>
                <div className="w-full p-4 bg-accent rounded">
                    <div className="w-full md:w-2/3 lg:w-1/2 md:mx-auto">
                        <div className="flex flex-col gap-y-4 md:flex-row md:justify-between">
                            <div className="md:w-1/3">
                                <Label htmlFor="first-name" className="mb-1">First Name</Label>
                                <Input type="text" id="first-name" placeholder="John"/>
                            </div>

                            <div className="md:w-1/3">
                                <Label htmlFor="last-name" className="mb-2">Last Name</Label>
                                <Input type="text" id="last-name" placeholder="your@email.com"/>
                            </div>
                        </div>

                        <div className="my-4">
                            <Label htmlFor="email" className="mb-1">Email</Label>
                            <Input type="email" id="email" placeholder="your@email.com"/>
                        </div>

                        <div>
                            <label htmlFor="contact-number" className="text-sm font-medium mb-4">
                                Contact Number
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                       className="w-4 h-4">
                                    <path clipRule="evenodd"
                                          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                          clipRule="evenodd"/>
                                  </svg>
                                </span>
                                <Input type="text"
                                       id="contact-number"
                                       placeholder="+351 123 456 789"
                                       className="pl-12"
                                />
                            </div>
                            <p className="mt-2 text-xs text-slate-400">
                                Include your country code for international numbers.
                            </p>
                        </div>

                        <Textarea className="mt-6 h-[250px]" placeholder="Type your message here"/>

                        <Button className="w-full mt-4 bg-primary">Submit</Button>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};
