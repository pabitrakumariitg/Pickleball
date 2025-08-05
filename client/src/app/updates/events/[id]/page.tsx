import { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
interface PageProps {
  params: {
    id: string;
  };
}

// Sample event data (in a real app, this would come from an API or database)
const getEvent = (id: string) => {
  const events = [{
    id: "1",
    title: "Kohima Open Tournament",
    date: "June 15-16, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "City Sports Complex, Kohima",
    description: "Annual open tournament with categories for all skill levels. Join us for a weekend of competitive play and community building.",
    fullDescription: "The Kohima Open Tournament is one of NPA's flagship events, bringing together players from across Nagaland and neighboring states. With divisions for all skill levels from beginner to advanced, this tournament offers something for everyone. Singles matches will be held on Saturday, with doubles and mixed doubles on Sunday. Entry fees include a tournament t-shirt, lunch both days, and eligibility for door prizes. Register early as spots fill quickly!",
    participants: "120+ expected",
    entryFee: "₹1,000 per player",
    prizes: "Trophies and cash prizes for each division",
    registrationDeadline: "June 5, 2025",
    image: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Nagaland Pickleball Association",
    contact: "tournaments@pickleballnagaland.org"
  }, {
    id: "2",
    title: "Beginner's Clinic",
    date: "June 22, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "NPA Training Center, Dimapur",
    description: "Learn the basics of pickleball in this 3-hour instructional clinic. Equipment provided. Perfect for those new to the sport.",
    fullDescription: "This comprehensive clinic is designed for those who have little to no experience with pickleball. Our trained coaches will guide you through the basics of the game, including rules, scoring, basic strokes, and strategy. The small group format ensures plenty of individual attention. All equipment will be provided, just bring comfortable athletic clothing, court shoes, and water. By the end of the clinic, you'll be ready to join our beginner open play sessions!",
    participants: "Maximum 16",
    entryFee: "₹500 per person",
    prizes: "Participation certificate and discount coupon for equipment",
    registrationDeadline: "June 20, 2025",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "NPA Training Division",
    contact: "training@pickleballnagaland.org"
  }, {
    id: "3",
    title: "Mixed Doubles Night",
    date: "July 1, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Indoor Courts, Mokokchung",
    description: "Social play and friendly competition for mixed doubles teams. All skill levels welcome. Refreshments provided.",
    fullDescription: "Join us for an evening of fun and friendly competition at our monthly Mixed Doubles Night! Players will rotate partners throughout the evening, giving everyone a chance to play with different teammates. This is a social event designed to build community and improve your doubles skills in a relaxed atmosphere. Light refreshments will be provided, and there will be door prizes drawn throughout the evening. Pre-registration is encouraged but walk-ins are welcome if space permits.",
    participants: "32 players (16 teams)",
    entryFee: "₹300 per player",
    prizes: "Door prizes throughout the evening",
    registrationDeadline: "June 28, 2025",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Mokokchung Pickleball Club",
    contact: "events@pickleballnagaland.org"
  }, {
    id: "4",
    title: "Youth Summer Camp",
    date: "July 10-15, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Community Center, Wokha",
    description: "Five-day camp for young players ages 8-16. Learn skills, strategy, and sportsmanship in a fun, supportive environment.",
    fullDescription: "Our Youth Summer Camp offers a fun and educational introduction to pickleball for young players ages 8-16. Over five days, participants will learn pickleball fundamentals, strategy, and sportsmanship in a supportive environment. Each day includes skills training, games, and friendly competition. The camp concludes with a youth tournament where participants can showcase their new skills. All equipment is provided. Daily snacks and a camp t-shirt are included in the registration fee.",
    participants: "24 youth players",
    entryFee: "₹1,500 per participant (scholarships available)",
    prizes: "Medals for all participants, trophies for tournament winners",
    registrationDeadline: "July 1, 2025",
    image: "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "NPA Youth Development Program",
    contact: "youth@pickleballnagaland.org"
  }, {
    id: "5",
    title: "Seniors Tournament",
    date: "July 20, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Kohima Sports Complex",
    description: "Special tournament for players 55+. Singles and doubles divisions available. Experience the joy of competition with your peers.",
    fullDescription: "The Seniors Tournament celebrates the growing community of pickleball players aged 55 and over. This one-day event features singles and doubles divisions with skill level categories to ensure competitive matches for all participants. The tournament emphasizes both competition and camaraderie, with plenty of breaks between matches and a catered lunch included in the registration fee. Medical personnel will be on site throughout the event. Come enjoy a day of pickleball with your peers!",
    participants: "48+ players",
    entryFee: "₹800 per player",
    prizes: "Medals for winners and runners-up in each division",
    registrationDeadline: "July 12, 2025",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Nagaland Pickleball Association",
    contact: "seniors@pickleballnagaland.org"
  }, {
    id: "6",
    title: "Nagaland State Championships",
    date: "August 15-17, 2025",
    time: "8:00 AM - 7:00 PM",
    location: "State Indoor Stadium, Dimapur",
    description: "The premier pickleball event in Nagaland. Three days of competition across all divisions. Registration required by August 1.",
    fullDescription: "The Nagaland State Championships is the premier pickleball event in the region, bringing together the best players from across the state for three days of intense competition. The tournament features Men's Singles, Women's Singles, Men's Doubles, Mixed Doubles divisions, each with multiple skill level brackets. Players can enter up to three events. Registration includes a tournament t-shirt, player welcome bag, and admission to the Saturday evening players' banquet. Spectators are welcome free of charge.",
    participants: "150+ players expected",
    entryFee: "₹1,500 per player (₹500 per additional event)",
    prizes: "Trophies and cash prizes totaling over ₹100,000",
    registrationDeadline: "August 1, 2025",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Nagaland Pickleball Association",
    contact: "championships@pickleballnagaland.org"
  }];
  return events.find(event => event.id === id);
};
export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const event = getEvent(params.id);
  if (!event) {
    return {
      title: "Event Not Found | Nagaland Pickleball Association",
      description: "The requested event could not be found."
    };
  }
  return {
    title: `${event.title} | Events | Nagaland Pickleball Association`,
    description: event.description
  };
}
export default function EventPage({
  params
}: PageProps) {
  const event = getEvent(params.id);
  if (!event) {
    return <div className="container mx-auto px-6 py-32 text-center" data-unique-id="d41d972c-b13d-4af6-b070-4aebaad571bf" data-file-name="app/updates/events/[id]/page.tsx">
        <h1 className="text-3xl font-bold mb-4" data-unique-id="e1de2ded-df3a-4077-a3c5-30622f0e37d0" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="e025aa7b-00e8-4c73-848a-5af9d3ba20c7" data-file-name="app/updates/events/[id]/page.tsx">Event Not Found</span></h1>
        <p className="mb-8" data-unique-id="c4fe8953-9e36-47c3-b35c-5b160ece8a97" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="ca9cf432-cf27-4361-9b17-e6f237ccfa2e" data-file-name="app/updates/events/[id]/page.tsx">The event you're looking for could not be found.</span></p>
        <Link href="/updates" data-unique-id="c3147461-eaad-4db3-9f5d-39030cde518f" data-file-name="app/updates/events/[id]/page.tsx">
          <Button variant="primary" data-unique-id="17f796d8-d4da-4a68-b274-b9ad37b48a6b" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="755c06ed-babb-4781-9767-b4b3b7c5655e" data-file-name="app/updates/events/[id]/page.tsx">Return to Events</span></Button>
        </Link>
      </div>;
  }
  return <div className="min-h-screen" data-unique-id="cedd16a6-10f9-4464-9aa4-38b72cb677d5" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">
      {/* Hero banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden" data-unique-id="45780ff2-20d9-46a2-91da-b0e17cafc70d" data-file-name="app/updates/events/[id]/page.tsx">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" data-unique-id="10939c80-1ede-43aa-ab5c-72fd1a06e586" data-file-name="app/updates/events/[id]/page.tsx" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-12" data-unique-id="57a766fe-cab5-42e0-81b7-b6dba918b413" data-file-name="app/updates/events/[id]/page.tsx">
          <div className="container mx-auto" data-unique-id="99115fe3-70ba-4524-964e-5c93e8247f58" data-file-name="app/updates/events/[id]/page.tsx">
            <Link href="/updates" className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors" data-unique-id="13b0c826-81f7-49fc-bfad-464a4dd296bc" data-file-name="app/updates/events/[id]/page.tsx">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span data-unique-id="83769723-bf20-47aa-8536-b36b76a9590a" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="d2646841-347b-429f-a76a-4e4a59f08bfc" data-file-name="app/updates/events/[id]/page.tsx">Back to Events</span></span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2" data-unique-id="41449121-2992-4853-b122-bc1549fdc6df" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">{event.title}</h1>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-12" data-unique-id="6f049bbb-0efc-4163-a8a2-48fbbd7634f8" data-file-name="app/updates/events/[id]/page.tsx">
        <div className="grid md:grid-cols-3 gap-10" data-unique-id="7f6d28dc-dae8-4265-820a-8f4e67bda32e" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">
          {/* Main content */}
          <div className="md:col-span-2" data-unique-id="f31aa077-bbc9-422e-a005-d2903a86b495" data-file-name="app/updates/events/[id]/page.tsx">
            <div className="prose max-w-none" data-unique-id="9fd59b63-3176-402d-a4c1-37eae8f52fe1" data-file-name="app/updates/events/[id]/page.tsx">
              <h2 className="text-2xl font-semibold mb-4" data-unique-id="b4f9cdf3-2962-46bc-8b2a-2efd180c4274" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="984f31e3-7d10-4906-a8b8-1ef03f090d7c" data-file-name="app/updates/events/[id]/page.tsx">About This Event</span></h2>
              <p className="mb-6 text-foreground/80" data-unique-id="6e698662-8d7c-4ba9-9665-a7029a5806c5" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">{event.fullDescription}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3" data-unique-id="b6b17c4a-d1cb-4a3e-b796-7916b3570fae" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="c2d31cda-4b39-40d9-900e-1814ceb34b48" data-file-name="app/updates/events/[id]/page.tsx">Registration Information</span></h3>
              <ul className="space-y-2 text-foreground/80" data-unique-id="86a51054-706f-4816-b1c8-87098c7e5ac7" data-file-name="app/updates/events/[id]/page.tsx">
                <li data-unique-id="2967e8a7-17ab-4147-a9d0-4c80b3a4f104" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true"><strong data-unique-id="889fb115-3bda-49f7-890a-4d7c02122a7b" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="15ea4cf8-bf2b-4666-9dc6-9f1c6a116bee" data-file-name="app/updates/events/[id]/page.tsx">Entry Fee:</span></strong> {event.entryFee}</li>
                <li data-unique-id="e8807652-be10-4442-b900-7805281ca18f" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true"><strong data-unique-id="7db8fe09-aa51-4d0f-8b13-342cdb2ff263" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="52252e97-4885-408e-b670-310954ff55e5" data-file-name="app/updates/events/[id]/page.tsx">Registration Deadline:</span></strong> {event.registrationDeadline}</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-3" data-unique-id="7720ae87-909a-4a02-b4cb-8808d5aee420" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="a3e30263-fd92-4943-9222-942880d13d23" data-file-name="app/updates/events/[id]/page.tsx">Prizes</span></h3>
              <p className="text-foreground/80" data-unique-id="93cbacef-17d5-4238-a49b-1d19f9e01dd4" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">{event.prizes}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3" data-unique-id="6d610c4f-1402-46cc-8416-65da68735274" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="8a11f222-0754-4e1f-a590-3326d9eeba36" data-file-name="app/updates/events/[id]/page.tsx">Contact</span></h3>
              <p className="text-foreground/80" data-unique-id="190a0b7c-d578-402d-9ae1-ba350509576b" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="14ead018-8e7c-4214-8340-050647ac37f3" data-file-name="app/updates/events/[id]/page.tsx">
                For more information, contact the event organizer at:</span>{" "}
                <a href={`mailto:${event.contact}`} className="text-primary hover:underline" data-unique-id="927ac490-c3b3-4662-b996-66c7a9f41278" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">
                  {event.contact}
                </a>
              </p>
            </div>
            
            <div className="mt-10 flex gap-4" data-unique-id="6f2e4dd3-1560-43c5-a596-51d3274a8e6a" data-file-name="app/updates/events/[id]/page.tsx">
              <Link href={`/updates/events/register?eventId=${params.id}&eventName=${encodeURIComponent(event.title)}&eventDate=${encodeURIComponent(event.date)}&eventLocation=${encodeURIComponent(event.location)}`}>
                <Button variant="primary" size="lg" data-unique-id="d26c27f4-8902-4987-8ad2-cfcbfc1de6e3" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="46a4a398-a7b0-4225-ac88-76732253fe63" data-file-name="app/updates/events/[id]/page.tsx">Register Now</span></Button>
              </Link>
              <Button variant="outline" size="lg" data-unique-id="e3d3de51-e383-4b63-9215-51145e0efc08" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="4e91d35e-2486-451c-b1cf-64da2151d662" data-file-name="app/updates/events/[id]/page.tsx">Share Event</span></Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div data-unique-id="8049b567-5a8d-44cb-8eb3-b85bfdaa2a83" data-file-name="app/updates/events/[id]/page.tsx">
            <div className="card border border-border p-6 sticky top-24" data-unique-id="f57d56d1-5213-4c8b-9be3-b4d3891c0fce" data-file-name="app/updates/events/[id]/page.tsx">
              <h3 className="text-xl font-semibold mb-6" data-unique-id="864eb30f-8d4f-4b70-af5e-be353dbe2643" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="068ab04d-6a26-42af-af43-685651ee6373" data-file-name="app/updates/events/[id]/page.tsx">Event Details</span></h3>
              
              <div className="space-y-6" data-unique-id="cba7bdca-9d1a-4dfc-acba-f771b72757e5" data-file-name="app/updates/events/[id]/page.tsx">
                <div className="flex items-start gap-3" data-unique-id="42b46ef8-5267-4209-ae8e-ac610ae137ba" data-file-name="app/updates/events/[id]/page.tsx">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-1" data-unique-id="48fcd887-3226-4dec-a255-d022743f8eb6" data-file-name="app/updates/events/[id]/page.tsx" />
                  <div data-unique-id="a4da7d55-684a-435b-931d-7194399eb3cf" data-file-name="app/updates/events/[id]/page.tsx">
                    <p className="font-medium" data-unique-id="d27372a0-2b99-4156-861b-df88ed7fee7d" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="7d6f0de5-bb3e-4c8b-a219-91e7ff49c6cb" data-file-name="app/updates/events/[id]/page.tsx">Date</span></p>
                    <p className="text-foreground/70" data-unique-id="6139e014-c353-47af-993b-4444c0dbe8e8" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3" data-unique-id="95aae902-a789-4e23-8200-be9b42941f3a" data-file-name="app/updates/events/[id]/page.tsx">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div data-unique-id="179f5d75-f453-4f7b-987f-99776a07cc31" data-file-name="app/updates/events/[id]/page.tsx">
                    <p className="font-medium" data-unique-id="00044c8b-2d68-492f-ba1d-874d3cbe672c" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="bab6754b-522f-4739-8d51-e8e427f9c611" data-file-name="app/updates/events/[id]/page.tsx">Time</span></p>
                    <p className="text-foreground/70" data-unique-id="2d8a1a80-a782-49ee-bbd5-d35cc0b725f1" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3" data-unique-id="e2861c47-341e-46c5-8d3f-48347f736848" data-file-name="app/updates/events/[id]/page.tsx">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div data-unique-id="017d6dca-9ad7-4558-8c7c-105c3c2b86f4" data-file-name="app/updates/events/[id]/page.tsx">
                    <p className="font-medium" data-unique-id="5cbd18d2-7ffd-44b8-a273-bcd06c101e93" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="947b8a1e-3dad-4934-a7ba-b269cbba41a1" data-file-name="app/updates/events/[id]/page.tsx">Location</span></p>
                    <p className="text-foreground/70" data-unique-id="9f9e3913-8b41-48b2-925e-f33861dda5ca" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">{event.location}</p>
                    <a href="#" className="text-sm text-primary hover:underline mt-1 inline-block" data-unique-id="ccf97ed0-a3be-48a1-8558-3a07aa130fc9" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="7a6fdfde-49e0-4eac-84d8-f70575ef69bd" data-file-name="app/updates/events/[id]/page.tsx">
                      View on Map
                    </span></a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3" data-unique-id="d5e2505a-481d-44cc-b505-9fd1ec8b38ea" data-file-name="app/updates/events/[id]/page.tsx">
                  <Users className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div data-unique-id="681eec4c-b6d7-4898-b2a6-511bfa9077d5" data-file-name="app/updates/events/[id]/page.tsx">
                    <p className="font-medium" data-unique-id="0c725587-5a73-49f4-926e-b494e3c3f94c" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="55e101d2-b136-4e0e-9337-5a57f6693332" data-file-name="app/updates/events/[id]/page.tsx">Participants</span></p>
                    <p className="text-foreground/70" data-unique-id="4fb463c1-f82a-4063-84cd-a8703912f8f8" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">{event.participants}</p>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6" data-unique-id="69190bfd-144d-43d0-8d90-d57cdaba3208" data-file-name="app/updates/events/[id]/page.tsx">
                  <p className="font-medium" data-unique-id="c382d4c2-3d46-4a52-8ecd-1c0a2b7bbb82" data-file-name="app/updates/events/[id]/page.tsx"><span className="editable-text" data-unique-id="33d55eb4-6269-46a0-90a6-382974bd434d" data-file-name="app/updates/events/[id]/page.tsx">Organized by</span></p>
                  <p className="text-foreground/70" data-unique-id="7e52a24d-4f40-4ff0-8baa-57c3b165bcdc" data-file-name="app/updates/events/[id]/page.tsx" data-dynamic-text="true">{event.organizer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related events section could go here */}
    </div>;
}