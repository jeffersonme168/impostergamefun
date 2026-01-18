import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Imposter Word Game Online",
  description: "Our Terms of Service govern your use of the Imposter Word Game website and services.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <h1 className="text-5xl font-black tracking-tighter mb-12 text-center">Terms of Service</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using ImposterGame.fun, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            ImposterGame.fun is a free online game provided for entertainment purposes. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. No User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not offer user accounts or save user progress on our servers. Any game state is stored locally on your device via browser storage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws. You may not reproduce, download, transmit or re-use any of the content without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground leading-relaxed">
            The website is provided "as is" and "as available" without any representation or endorsement made and without warranty of any kind whether express or implied.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            ImposterGame.fun will not be liable for any indirect or consequential loss or damage whatever arising out of or in connection with the use of the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Your continued use of the site following any changes shall be deemed to be your acceptance of such change.
          </p>
        </section>

        <section className="pt-8 border-t border-border/40 text-sm text-muted-foreground">
          <p>Last updated: January 18, 2026</p>
        </section>
      </div>
    </div>
  );
}
