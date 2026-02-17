import { FRAMEWORK_PROMPTS } from "@/data/marketing-framework";
import SitemapVisualizer from "@/components/framework/SitemapVisualizer";

export default function FrameworkStepLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation Header */}
            <div className="bg-background border-b border-white/10">
                <SitemapVisualizer
                    prompts={FRAMEWORK_PROMPTS}
                    enableNavigation={true}
                />
            </div>

            {/* Page Content */}
            <main>
                {children}
            </main>
        </div>
    );
}
