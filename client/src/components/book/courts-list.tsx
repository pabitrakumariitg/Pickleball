"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Court } from "@/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/config";

export function CourtsList() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch(getApiUrl('api/v1/courts'));
        if (!response.ok) {
          throw new Error('Failed to fetch courts');
        }
        const data = await response.json();
        setCourts(data.data);
      } catch (err) {
        console.error('Error fetching courts:', err);
        setError('Failed to load courts');
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  // const cities = ["all", ...Array.from(new Set(courts.map(court => court.city)))];
  const cities = ["all"];
  const filteredCourts = selectedCity === "all" ? courts : courts.filter(court => court.city === selectedCity);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleBookCourt = (courtId: string) => {
    router.push(`/book/${courtId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">{error}</p>
      </div>
    );
  }

  return <section id="courts" className="py-20 bg-secondary" data-unique-id="5e30db63-bdd3-4cc3-9bbf-2827c4a7ff24" data-file-name="components/book/courts-list.tsx">
    <div className="container mx-auto px-6" data-unique-id="6fd83dd1-e9a7-41a1-b19e-b52cac3cd876" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true">
      <motion.div initial={{
        opacity: 0,
        y: -20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="mb-12 text-center" data-unique-id="0bdf6581-ebe5-4671-8e64-d3f4f64b3fcb" data-file-name="components/book/courts-list.tsx">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="d14a7b86-d247-4b30-b50a-5a804b8764e6" data-file-name="components/book/courts-list.tsx">
          <span className="editable-text" data-unique-id="87fcc53f-099f-4b18-833f-39c80c5851ef" data-file-name="components/book/courts-list.tsx">Our </span>
          <span className="text-primary" data-unique-id="a107bedc-0ec4-4831-9e7e-15c45e4cf843" data-file-name="components/book/courts-list.tsx"><span className="editable-text" data-unique-id="fa81f400-afaa-4ca3-9203-adfeaf57f93f" data-file-name="components/book/courts-list.tsx">Courts</span></span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="9d050597-7868-42df-9efb-1476c7ee9884" data-file-name="components/book/courts-list.tsx">
          <span className="editable-text" data-unique-id="ceec32a1-dafd-4fd0-8e7e-c45bb42644de" data-file-name="components/book/courts-list.tsx">
            Browse our pickleball courts across Nagaland. Filter by location to find
            the most convenient option for you.
          </span>
        </p>
      </motion.div>

      {/* City filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2" data-unique-id="3cffdd49-57fc-4201-99fb-be715c55c9b8" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true">
        {cities.map(city => <button key={city} onClick={() => setSelectedCity(city)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedCity === city ? "bg-primary text-primary-foreground" : "bg-card hover:bg-primary/10"}`} data-unique-id="4537dd86-fa42-4e4b-b380-8f7ec78d89b8" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true">
          {city === "all" ? "All Locations" : city}
        </button>)}
      </div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-2" data-unique-id="09f59de5-7673-4ecb-944d-75e670ebaeae" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true">
        {filteredCourts.map(court => <motion.div key={court._id} variants={itemVariants} data-unique-id="b99fef26-d43f-4236-8116-7cee45267ad8" data-file-name="components/book/courts-list.tsx">
          <div className="card card-hover overflow-hidden border border-border" data-unique-id="d78ccb3e-c552-416e-9092-ae8a5e6403b0" data-file-name="components/book/courts-list.tsx">
            <div className="relative h-48 w-full overflow-hidden" data-unique-id="bb0ca589-a649-4f6a-a54e-be295ae3c815" data-file-name="components/book/courts-list.tsx">
              <img src={court.image} alt={court.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-unique-id="54ee6057-039a-48f5-8af0-a9bd78836767" data-file-name="components/book/courts-list.tsx" />
              <div className="absolute top-4 right-4" data-unique-id="539a6db7-0a85-4647-af93-5d1e638136db" data-file-name="components/book/courts-list.tsx">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${court.isIndoor ? "bg-primary/80 text-primary-foreground" : "bg-accent/80 text-accent-foreground"}`} data-unique-id="c765c22f-f534-4993-8fe0-1fb6f9887ac0" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true">
                  {court.isIndoor ? "Indoor" : "Outdoor"}
                </span>
              </div>
            </div>

            <div className="p-6" data-unique-id="5eacb032-7c55-42be-9637-7065e37c8ea1" data-file-name="components/book/courts-list.tsx">
              <div className="mb-4 flex items-start justify-between" data-unique-id="3c66f79d-3964-4eee-9f7c-efa2e64c3b25" data-file-name="components/book/courts-list.tsx">
                <div data-unique-id="28666917-5d26-4be8-88c9-f55255d88498" data-file-name="components/book/courts-list.tsx">
                  <h3 className="text-xl font-semibold" data-unique-id="07ede1f5-be53-4847-b087-360f83d9bd04" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true">{court.name}</h3>
                  <div className="mt-1 flex items-center text-sm text-foreground/70" data-unique-id="de77484d-1888-4856-8454-edb5f4c86040" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true">
                    <MapPin className="mr-1 h-4 w-4" />
                    {court.venue}
              
                  </div>
                </div>
                <div className="text-right" data-unique-id="03c3fb94-ba2c-455a-a5c8-e5cf0bf27bb2" data-file-name="components/book/courts-list.tsx">
                  <div className="text-sm text-foreground/70" data-unique-id="9e426373-1c90-4da8-a2cb-03b2b41bba96" data-file-name="components/book/courts-list.tsx"><span className="editable-text" data-unique-id="c7044aea-6244-47c5-8c18-4bb14a3db575" data-file-name="components/book/courts-list.tsx">Per hour</span></div>
                  <div className="text-lg font-semibold" data-unique-id="734bc1d0-d40d-41bc-8cc2-5df4d49a3c44" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="8053a84c-0d68-4877-8f8c-154ceefdd129" data-file-name="components/book/courts-list.tsx">₹</span>{court.price / 100}</div>
                  <div className="text-xs text-primary" data-unique-id="8591ca0c-5821-4b10-9901-6e07750741f8" data-file-name="components/book/courts-list.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="b8539e36-5d77-46ad-b5b5-67cbdc2e9bb7" data-file-name="components/book/courts-list.tsx">Members: ₹</span>{court.memberPrice / 100}</div>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2" data-unique-id="738fcb4d-f909-4be3-9215-859423b8a701" data-file-name="components/book/courts-list.tsx">
                <div className="flex items-center rounded-full bg-secondary px-3 py-1 text-xs" data-unique-id="8ec11750-915a-4f3d-ae58-7cb000990cb6" data-file-name="components/book/courts-list.tsx">
                  <Clock className="mr-1 h-3 w-3" />
                  <span data-unique-id="c3b62936-e390-4d88-851c-b960f31a8e8c" data-file-name="components/book/courts-list.tsx"><span className="editable-text" data-unique-id="e71286e3-38e2-4af3-8271-cf6351d5b6ac" data-file-name="components/book/courts-list.tsx">9AM - 9PM</span></span>
                </div>
                <div className="flex items-center rounded-full bg-secondary px-3 py-1 text-xs" data-unique-id="da7a9016-d5bf-4b50-ad7f-375a45d665c1" data-file-name="components/book/courts-list.tsx">
                  <Users className="mr-1 h-3 w-3" />
                  <span data-unique-id="d74d959f-4701-4f0c-9e8a-d000f519da35" data-file-name="components/book/courts-list.tsx"><span className="editable-text" data-unique-id="87c0904f-b071-4765-80b9-db38a7ee3f04" data-file-name="components/book/courts-list.tsx">4 courts</span></span>
                </div>
                <div className="flex items-center rounded-full bg-secondary px-3 py-1 text-xs" data-unique-id="839cdd86-bdc1-4583-a282-147fc5848a7f" data-file-name="components/book/courts-list.tsx">
                  <Check className="mr-1 h-3 w-3" />
                  <span data-unique-id="1277ea80-b895-45e5-881f-bfd26b54e354" data-file-name="components/book/courts-list.tsx"><span className="editable-text" data-unique-id="b68c087f-3ef2-4033-8cba-46e7c0a1cec0" data-file-name="components/book/courts-list.tsx">Equipment rental</span></span>
                </div>
              </div>

              <Button variant="primary" className="w-full" onClick={() => handleBookCourt(court._id)} data-unique-id="6ff00be3-4750-41da-8702-eeb948148b63" data-file-name="components/book/courts-list.tsx">
                <span className="editable-text" data-unique-id="f4a6f11f-354f-42ce-912e-4136412f2fb1" data-file-name="components/book/courts-list.tsx">Book This Court</span>
              </Button>
            </div>
          </div>
        </motion.div>)}
      </motion.div>
    </div>
  </section>;
}