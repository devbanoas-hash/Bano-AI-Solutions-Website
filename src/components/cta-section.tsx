import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { Button } from "./button";
import { scrollToTop } from "../utils/scroll-helper";
import { Link } from "wouter";

const CTASection = ({ title, description, buttonText, buttonLink }: { title: string, description: string, buttonText: string, buttonLink: string }) => {
    return (
        <section className="py-16 sm:py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-bano-green/10 to-transparent" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
                            <p className="text-muted-foreground mx-auto mb-8 text-base">
                                {description}
                            </p>
                            <Link className="w-fit" onClick={scrollToTop} href={buttonLink}>
                                <Button variant="primary" size="sm" className="cursor-pointer">
                                    {buttonText}
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
 
export default CTASection;