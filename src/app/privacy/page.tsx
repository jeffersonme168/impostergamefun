import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Imposter Word Game Online",
  description: "Read our privacy policy. We value your privacy and do not collect personal information from our users, including children.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <h1 className="text-5xl font-black tracking-tighter mb-12 text-center">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to ImposterGame.fun. Your privacy is critically important to us. This Privacy Policy document outlines the types of information that is NOT collected and recorded by ImposterGame.fun and how we maintain a safe environment for all our users.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
          <h2 className="text-2xl font-bold mb-4 text-primary">No Personal Data Collection</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong>ImposterGame.fun does not require any registration, login, or user accounts.</strong> We do not ask for, collect, or store any personally identifiable information (PII) such as your name, email address, physical address, or phone number.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Protecting the privacy of young children is especially important. Our game is designed for general audiences and does not knowingly collect any personal information from children under the age of 13. Since we do not collect any personal information at all, we are fully compliant with COPPA (Children's Online Privacy Protection Act).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Log Files & Analytics</h2>
          <p className="text-muted-foreground leading-relaxed">
            Like most websites, ImposterGame.fun may use standard log files. These files merely log visitors to the site—usually a standard procedure for hosting companies and a part of hosting services' analytics. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks. This information is used to analyze trends, administer the site, track users' movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Cookies and Web Beacons</h2>
          <p className="text-muted-foreground leading-relaxed">
            ImposterGame.fun uses 'cookies' to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Google DoubleClick DART Cookie</h2>
          <p className="text-muted-foreground leading-relaxed">
            Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Consent</h2>
          <p className="text-muted-foreground leading-relaxed">
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </section>

        <section className="pt-8 border-t border-border/40 text-sm text-muted-foreground">
          <p>Last updated: January 18, 2026</p>
        </section>
      </div>
    </div>
  );
}
