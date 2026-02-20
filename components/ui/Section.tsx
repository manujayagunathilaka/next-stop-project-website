
import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className, id }: SectionProps) {
    return (
        <section id={id} className={cn("py-20 px-4 md:px-8 max-w-7xl 2xl:max-w-[1800px] mx-auto", className)}>
            {children}
        </section>
    );
}
