import { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, Tag, ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
interface PageProps {
  params: {
    slug: string;
  };
}

// Sample news data (in a real app, this would come from an API or database)
const getNewsItem = (slug: string) => {
  const news = [{
    id: "1",
    title: "Pickleball Association Nagaland Expands to Five New Districts",
    excerpt: "PAN announces exciting expansion plans to bring pickleball courts to five additional districts across Nagaland.",
    content: `
        <p>In an exciting development for pickleball enthusiasts across Nagaland, the Pickleball Association Nagaland (PAN) has announced plans to expand its presence to five new districts in the coming months. This expansion will include the construction of new courts, training programs for local coaches, and community outreach initiatives to introduce the sport to new players. The move comes after a successful two-year period that saw membership increase by over 200%.</p>
        
        <p>"We're thrilled to bring pickleball to even more communities across Nagaland," said Kevi Meyase, President of PAN. "Our vision has always been to make this wonderful sport accessible to every corner of our state, and this expansion represents a significant step toward that goal."</p>
        
        <h3>New Districts Receiving Courts</h3>
        
        <p>The five districts included in this expansion phase are:</p>
        
        <ul>
          <li>Zunheboto</li>
          <li>Phek</li>
          <li>Longleng</li>
          <li>Kiphire</li>
          <li>Peren</li>
        </ul>
        
        <p>Each district will receive at least two dedicated pickleball courts, with local partnerships determining the exact locations. Construction is expected to begin next month, with the first courts ready for play by August 2025.</p>
        
        <h3>Community Impact</h3>
        
        <p>Beyond physical infrastructure, the expansion includes comprehensive programming designed to build sustainable pickleball communities:</p>
        
        <ul>
          <li>Free introductory clinics for new players</li>
          <li>Training workshops for physical education teachers</li>
          <li>Equipment grants for schools and community centers</li>
          <li>Junior development programs for youth players</li>
        </ul>
        
        <p>Local government officials have expressed strong support for the initiative, recognizing the sport's potential to promote physical activity, community building, and tourism opportunities.</p>
        
        <h3>Looking Forward</h3>
        
        <p>"This expansion is just the beginning," noted Arenla Jamir, Vice President of PAN. "Our five-year strategic plan includes bringing pickleball to every district in Nagaland and establishing a competition pathway from grassroots to national level representation."</p>
        
        <p>The association has launched a fundraising campaign to support this expansion, with opportunities for businesses and individuals to sponsor courts, programs, or equipment. Those interested in contributing or learning more about the expansion can contact PAN directly at expansion@pickleballnagaland.org.</p>
      `,
    date: "2025-05-20",
    author: "Kevishe Thong",
    category: "Announcements",
    image: "https://picsum.photos/200",
    slug: "pan-expands-to-five-new-districts"
  }, {
    id: "2",
    title: "National Pickleball Team to Represent Nagaland at Regional Championships",
    excerpt: "Selected players from PAN will compete at the upcoming Northeast India Regional Pickleball Championships.",
    content: `
        <p>A team of twelve talented pickleball players from across Nagaland has been selected to represent the state at the upcoming Northeast India Regional Pickleball Championships to be held in Guwahati next month. The team, comprising both veterans and rising stars, has been undergoing intensive training sessions at the Kohima Sports Complex under the guidance of Head Coach Imkong Tzudir.</p>
        
        <p>This marks the first time Nagaland will send a full delegation to this prestigious regional tournament, highlighting the rapid growth of pickleball in the state over the past few years.</p>
        
        <h3>Team Composition</h3>
        
        <p>The 12-member team includes six men and six women who will compete across multiple categories:</p>
        
        <ul>
          <li>Men's Singles: Neiketouzo Kire, Limanukshi Jamir</li>
          <li>Women's Singles: Kethosituo Solo, Abeni Lotha</li>
          <li>Men's Doubles: Akumtoshi Jamir/Yhunshalo Kemp, Imtisunep Longchar/Chumbemo Tsanglao</li>
          <li>Women's Doubles: Narola Ao/Thejangulie Rio, Asano Peseyie/Vitsino Kuotsu</li>
          <li>Mixed Doubles: Team selection to be finalized based on tournament performance</li>
        </ul>
        
        <h3>Rigorous Preparation</h3>
        
        <p>"The team has been training six days a week for the past two months," said Coach Tzudir. "We've focused on not just technical skills but also mental toughness and strategic gameplay, which will be crucial in a tournament of this caliber."</p>
        
        <p>Several of the team members have previously competed in national-level tournaments, but the regional championships represent a new challenge and opportunity to showcase Nagaland's emerging pickleball talent on a broader stage.</p>
        
        <h3>Growing Recognition</h3>
        
        <p>The Pickleball Association Nagaland has worked tirelessly to promote the sport throughout the state, an effort that's beginning to gain recognition beyond local borders.</p>
        
        <p>"Being invited to compete in this regional championship validates our efforts to develop pickleball in Nagaland," said Sashimenla Ao, Tournament Director at PAN. "Our players have shown tremendous dedication, and we're confident they'll make Nagaland proud."</p>
        
        <p>The Northeast India Regional Pickleball Championships will take place from June 10-12, 2025, featuring teams from Assam, Manipur, Meghalaya, Arunachal Pradesh, Tripura, Mizoram, and Sikkim, in addition to Nagaland.</p>
        
        <p>Pickleball enthusiasts are encouraged to show their support for Team Nagaland on social media using the hashtag #TeamNagalandPickleball.</p>
      `,
    date: "2025-05-15",
    author: "Arenla Jamir",
    category: "Competitions",
    image: "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    slug: "national-team-to-represent-nagaland"
  }, {
    id: "3",
    title: "New Youth Development Program Launched for Aspiring Pickleball Players",
    excerpt: "PAN introduces specialized training program for players aged 8-16 to develop the next generation of talent.",
    content: `
        <p>The Pickleball Association Nagaland is proud to announce the launch of its Youth Development Program, a comprehensive training initiative designed specifically for players between the ages of 8 and 16. The program aims to identify and nurture young talent, fostering not only technical skills but also sportsmanship, discipline, and a lifelong love for the sport.</p>
        
        <p>"Investing in youth development is essential for the long-term growth of pickleball in our region," explained Imkong Tzudir, Head Coach at PAN. "This structured program provides a clear pathway for young players to progress from beginners to competitive athletes."</p>
        
        <h3>Program Structure</h3>
        
        <p>The Youth Development Program is structured in three progressive tiers:</p>
        
        <ul>
          <li><strong>Foundation Level (ages 8-10):</strong> Focus on basic skills, coordination, and enjoyment of the game</li>
          <li><strong>Development Level (ages 11-13):</strong> Advancing technical skills, introduction to strategy, and friendly competition</li>
          <li><strong>Performance Level (ages 14-16):</strong> Advanced techniques, competitive play, and tournament preparation</li>
        </ul>
        
        <p>Each tier includes weekly training sessions led by certified coaches, periodic skills assessments, and appropriate competitive opportunities. Training will take place at dedicated youth sessions across PAN's facilities in Kohima, Dimapur, and Mokokchung.</p>
        
        <h3>Accessibility and Inclusion</h3>
        
        <p>A key focus of the program is making pickleball accessible to all young people, regardless of background or economic status.</p>
        
        <p>"We've established a scholarship fund to ensure that financial constraints don't prevent talented young players from participating," said Kevi Meyase, President of PAN. "Additionally, we're providing all necessary equipment during training sessions, removing another potential barrier to entry."</p>
        
        <p>The association has also developed modified training methods to accommodate children with different abilities, ensuring an inclusive environment for all participants.</p>
        
        <h3>Long-term Vision</h3>
        
        <p>Beyond developing athletic skills, the program emphasizes character development, teamwork, and healthy lifestyle habits.</p>
        
        <p>"While we certainly hope to develop future champions, our primary goal is to instill a lifelong love of physical activity and sport in these young people," noted Arenla Jamir, Vice President of PAN. "The skills and values they learn through pickleball will benefit them throughout their lives."</p>
        
        <p>Registration for the Youth Development Program is now open, with sessions beginning on June 1, 2025. Interested parents and young players can register online at the PAN website or in person at any PAN facility. An orientation session for parents will be held on May 25th at the Kohima Sports Complex.</p>
      `,
    date: "2025-05-08",
    author: "Sashimenla Ao",
    category: "Programs",
    image: "https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    slug: "youth-development-program-launched"
  }];
  return news.find(item => item.slug === slug);
};
export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const newsItem = getNewsItem(params.slug);
  if (!newsItem) {
    return {
      title: "News Article Not Found | Pickleball Association Nagaland",
      description: "The requested news article could not be found."
    };
  }
  return {
    title: `${newsItem.title} | News | Pickleball Association Nagaland`,
    description: newsItem.excerpt
  };
}
export default function NewsArticlePage({
  params
}: PageProps) {
  const newsItem = getNewsItem(params.slug);
  if (!newsItem) {
    return <div className="container mx-auto px-6 py-32 text-center" data-unique-id="1f7a73dd-643e-4386-8bb8-5892575128d4" data-file-name="app/updates/news/[slug]/page.tsx">
        <h1 className="text-3xl font-bold mb-4" data-unique-id="3e409cf2-79d5-4be8-afdb-93d863c3b029" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="00207e09-8858-48ac-9b71-0c715c86f073" data-file-name="app/updates/news/[slug]/page.tsx">News Article Not Found</span></h1>
        <p className="mb-8" data-unique-id="7ae237b2-5c47-472b-b813-44a25c49d44e" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="5f60662a-bc31-46ae-b0b7-3ed079e9d113" data-file-name="app/updates/news/[slug]/page.tsx">The article you're looking for could not be found.</span></p>
        <Link href="/updates" data-unique-id="eabd583b-bc27-4f6f-b6af-5687a2bab431" data-file-name="app/updates/news/[slug]/page.tsx">
          <Button variant="primary" data-unique-id="bc7d96f2-cd91-4de5-b200-0d90609bc57c" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="e3dfc4c8-0bd8-4ab9-bb83-dd6b4c5a359c" data-file-name="app/updates/news/[slug]/page.tsx">Return to News</span></Button>
        </Link>
      </div>;
  }
  return <div className="min-h-screen" data-unique-id="11b6c642-b4f8-4de1-a78b-b6a9dc265f03" data-file-name="app/updates/news/[slug]/page.tsx" data-dynamic-text="true">
      {/* Hero banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden" data-unique-id="e0208507-33b4-4a8d-abf2-f9eb2e06cd3d" data-file-name="app/updates/news/[slug]/page.tsx">
        <img src={newsItem.image} alt={newsItem.title} className="h-full w-full object-cover" data-unique-id="cb19d283-6af3-410e-90d5-183292b76f0b" data-file-name="app/updates/news/[slug]/page.tsx" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-12" data-unique-id="c05c3731-35fe-40ab-b890-1daa5fef747e" data-file-name="app/updates/news/[slug]/page.tsx">
          <div className="container mx-auto" data-unique-id="db09eb26-6e9f-4113-adf7-511e47a830f2" data-file-name="app/updates/news/[slug]/page.tsx">
            <Link href="/updates" className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors" data-unique-id="552ee72b-d915-41e2-a515-67a0825dd938" data-file-name="app/updates/news/[slug]/page.tsx">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span data-unique-id="615c44f6-b8c7-4fe8-9f95-743e9e180756" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="7075bae1-b050-4052-bdc4-0144692c82b6" data-file-name="app/updates/news/[slug]/page.tsx">Back to News</span></span>
            </Link>
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-white/80" data-unique-id="676b067f-6a76-4174-ad62-1a53b922770d" data-file-name="app/updates/news/[slug]/page.tsx">
              <div className="flex items-center" data-unique-id="6225cb94-c32d-46ed-88e4-c91e0069a8f7" data-file-name="app/updates/news/[slug]/page.tsx" data-dynamic-text="true">
                <Calendar className="mr-1 h-4 w-4" data-unique-id="6d1c5292-c2d5-4ab4-abdf-12cc88f2875f" data-file-name="app/updates/news/[slug]/page.tsx" />
                {formatDate(newsItem.date)}
              </div>
              <div className="flex items-center" data-unique-id="1be5759c-03bc-470a-90f0-392e2acb4c61" data-file-name="app/updates/news/[slug]/page.tsx" data-dynamic-text="true">
                <User className="mr-1 h-4 w-4" />
                {newsItem.author}
              </div>
              <div className="flex items-center" data-unique-id="118cd82e-b112-4ae1-b66b-f3b52a4c095a" data-file-name="app/updates/news/[slug]/page.tsx" data-dynamic-text="true">
                <Tag className="mr-1 h-4 w-4" />
                {newsItem.category}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" data-unique-id="57772132-0108-476b-ab5f-188763f0a7bb" data-file-name="app/updates/news/[slug]/page.tsx" data-dynamic-text="true">{newsItem.title}</h1>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-12" data-unique-id="cf0a2fdd-41bf-42d9-809b-f47df0a14baa" data-file-name="app/updates/news/[slug]/page.tsx">
        <div className="grid md:grid-cols-4 gap-10" data-unique-id="3f995b06-8690-4564-9f40-6794c559b676" data-file-name="app/updates/news/[slug]/page.tsx" data-dynamic-text="true">
          {/* Main content */}
          <div className="md:col-span-3" data-unique-id="56c2252e-b84d-489f-af88-d38e809c56e1" data-file-name="app/updates/news/[slug]/page.tsx">
            <p className="text-xl text-foreground/80 font-light mb-8 leading-relaxed" data-unique-id="0256e32e-e672-4819-a18d-1cfabd6ea707" data-file-name="app/updates/news/[slug]/page.tsx" data-dynamic-text="true">
              {newsItem.excerpt}
            </p>
            
            <div className="prose max-w-none mb-10" dangerouslySetInnerHTML={{
            __html: newsItem.content
          }} data-unique-id="29ee4428-1553-47ef-abf2-9b04627b0c67" data-file-name="app/updates/news/[slug]/page.tsx" data-dynamic-text="true" />
            
            <div className="flex items-center justify-between border-t border-border pt-8 mt-8" data-unique-id="e19f8870-984c-46c6-ba0b-1f74e1a4fca8" data-file-name="app/updates/news/[slug]/page.tsx">
              <div data-unique-id="9cdb5cfd-3b6f-4876-b7cf-3d7da05c2131" data-file-name="app/updates/news/[slug]/page.tsx">
                <p className="text-sm text-foreground/70" data-unique-id="d1550e78-2b2b-404c-b49a-be33826e7e4e" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="47409820-8a40-4ab3-ba5b-fcdf013cd63d" data-file-name="app/updates/news/[slug]/page.tsx">Share this article</span></p>
                <div className="flex gap-4 mt-2" data-unique-id="816d34b3-3f8e-44fa-8cfe-3ac868575a1d" data-file-name="app/updates/news/[slug]/page.tsx">
                  <Button variant="ghost" size="sm" className="p-2" data-unique-id="57014714-971c-4274-8fb0-218083bc6574" data-file-name="app/updates/news/[slug]/page.tsx">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Link href="/updates" data-unique-id="90d47542-0ce8-406c-823d-13aacab2c223" data-file-name="app/updates/news/[slug]/page.tsx">
                <Button variant="outline" data-unique-id="91693296-7415-442d-8f11-6ebf5cccd061" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="b1b45c38-3d7f-4272-a098-33a5464220f8" data-file-name="app/updates/news/[slug]/page.tsx">
                  Back to News
                </span></Button>
              </Link>
            </div>
          </div>
          
          {/* Sidebar */}
          <div data-unique-id="61ca5f01-5139-48f5-8351-f00cd1827329" data-file-name="app/updates/news/[slug]/page.tsx">
            <div className="card border border-border p-6 sticky top-24" data-unique-id="587067fd-1ab8-4990-b754-f38cee4ed740" data-file-name="app/updates/news/[slug]/page.tsx">
              <h3 className="text-xl font-semibold mb-6" data-unique-id="ab30deca-4fcd-45d0-8356-a0a0627aae06" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="05b584df-9a69-46d0-aa52-7911fefae9c6" data-file-name="app/updates/news/[slug]/page.tsx">Recent Articles</span></h3>
              
              <div className="space-y-6" data-unique-id="01d178ee-93a9-47fb-9303-197a380e1173" data-file-name="app/updates/news/[slug]/page.tsx">
                <Link href="/updates/news/national-team-to-represent-nagaland" className="group block" data-unique-id="caea8f67-40de-417e-a6a2-b25752406251" data-file-name="app/updates/news/[slug]/page.tsx">
                  <h4 className="font-medium group-hover:text-primary transition-colors" data-unique-id="75300e90-9301-472b-ae36-bf151f581a79" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="0af5fa75-8e8b-4c29-81fe-fbaa36d68525" data-file-name="app/updates/news/[slug]/page.tsx">
                    National Pickleball Team to Represent Nagaland at Regional Championships
                  </span></h4>
                  <p className="text-sm text-foreground/70 mt-1" data-unique-id="ee66469e-37c5-4351-aa96-7465c9c35b69" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="498c3288-6b10-4d36-a024-e12b2006d398" data-file-name="app/updates/news/[slug]/page.tsx">
                    May 15, 2025
                  </span></p>
                </Link>
                
                <Link href="/updates/news/youth-development-program-launched" className="group block" data-unique-id="99c0af2e-d736-4317-892b-11f000eba930" data-file-name="app/updates/news/[slug]/page.tsx">
                  <h4 className="font-medium group-hover:text-primary transition-colors" data-unique-id="66fc473a-6dcb-4c90-9501-5765d72064e0" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="7e16d39e-fdd6-48ee-afd2-e5ef1af9e489" data-file-name="app/updates/news/[slug]/page.tsx">
                    New Youth Development Program Launched for Aspiring Pickleball Players
                  </span></h4>
                  <p className="text-sm text-foreground/70 mt-1" data-unique-id="8a20316a-9ada-475f-9501-8f6338703c71" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="a2c3804f-8db7-40b6-82fa-f38177772bdc" data-file-name="app/updates/news/[slug]/page.tsx">
                    May 8, 2025
                  </span></p>
                </Link>
                
                <Link href="/updates/news/pan-expands-to-five-new-districts" className="group block" data-unique-id="fbea4a66-a890-4373-887e-7b9850da6553" data-file-name="app/updates/news/[slug]/page.tsx">
                  <h4 className="font-medium group-hover:text-primary transition-colors" data-unique-id="9344fcee-97e7-451e-8a58-5ae43bfda9ed" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="742aac60-87c9-4687-93cb-a8b1e1dc0432" data-file-name="app/updates/news/[slug]/page.tsx">
                    Pickleball Association Nagaland Expands to Five New Districts
                  </span></h4>
                  <p className="text-sm text-foreground/70 mt-1" data-unique-id="d814f9fe-eb53-4e1e-aa86-da546bde8454" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="dc3e5116-77d6-407e-9639-d3c3e9235259" data-file-name="app/updates/news/[slug]/page.tsx">
                    May 20, 2025
                  </span></p>
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border" data-unique-id="365be813-8bd5-486c-9d9a-2b3a090a7214" data-file-name="app/updates/news/[slug]/page.tsx">
                <h4 className="font-medium mb-4" data-unique-id="dcb4fea0-ac11-4d20-bca8-a1b8a9792e09" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="a5b88321-b0bc-44cf-aaf6-7b8e94e8dac0" data-file-name="app/updates/news/[slug]/page.tsx">Categories</span></h4>
                <div className="flex flex-wrap gap-2" data-unique-id="77edab4f-98f2-48f8-aa11-6f93b8bc4308" data-file-name="app/updates/news/[slug]/page.tsx">
                  <span className="px-3 py-1 bg-secondary text-xs rounded-full" data-unique-id="4ff9a051-2c85-4326-b9f7-83f202b02e35" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="93aefbf5-9dd4-45fa-8767-af31676599a8" data-file-name="app/updates/news/[slug]/page.tsx">Announcements</span></span>
                  <span className="px-3 py-1 bg-secondary text-xs rounded-full" data-unique-id="b68c2444-6f74-4383-baea-fad14d7a1269" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="21f80d29-f81a-4027-a1c7-cb5b2f3d4bfe" data-file-name="app/updates/news/[slug]/page.tsx">Competitions</span></span>
                  <span className="px-3 py-1 bg-secondary text-xs rounded-full" data-unique-id="97fb4cb7-c02a-41d3-8889-5bcb4934e947" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="252c6301-5a84-4ea2-96c2-49ded5eba7e2" data-file-name="app/updates/news/[slug]/page.tsx">Programs</span></span>
                  <span className="px-3 py-1 bg-secondary text-xs rounded-full" data-unique-id="877f65d2-e8d1-4393-8476-04659b6fbbb7" data-file-name="app/updates/news/[slug]/page.tsx"><span className="editable-text" data-unique-id="c4526efc-ff29-4937-80f3-02a8a6f6a8f5" data-file-name="app/updates/news/[slug]/page.tsx">Community</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}