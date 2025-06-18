import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface JoinMembershipProps {
  hasActiveMembership?: boolean;
}

export default function JoinMembership({ hasActiveMembership = false }: JoinMembershipProps) {
  if (hasActiveMembership) {
    return (
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome Back!
          </h2>
          <p className="mb-6 text-foreground/80 text-lg">
            You already have an active membership. Enjoy all the benefits and keep playing!
          </p>
          <Link href="/profile">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-lg font-semibold shadow hover:bg-primary/90 transition">
              View My Profile
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    );
  }

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
          Join today and be part of Nagaland's growing pickleball community!
        </p>
        <Link href="/register">
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-lg font-semibold shadow hover:bg-primary/90 transition">
            Sign Up Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </section>
  );
}
