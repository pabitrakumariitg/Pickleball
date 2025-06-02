import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JoinMembership() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How to Join
        </h2>
        <ul className="mb-8 space-y-5 text-left">
          <li className="flex items-start gap-3">
            <CheckCircle className="text-primary w-6 h-6 mt-1" />
            <span className="text-lg">Fill out the online membership form.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-primary w-6 h-6 mt-1" />
            <span className="text-lg">Choose your plan and complete payment.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-primary w-6 h-6 mt-1" />
            <span className="text-lg">Receive your membership ID and start enjoying benefits immediately.</span>
          </li>
        </ul>
        <p className="mb-6 text-foreground/80 text-lg">
          Join today and be part of Nagaland’s growing pickleball community!
        </p>
        <Link href="/membership/signup">
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-lg font-semibold shadow hover:bg-primary/90 transition">
            Sign Up Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </section>
  );
}
