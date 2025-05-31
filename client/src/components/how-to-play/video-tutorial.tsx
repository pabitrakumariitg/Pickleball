"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
export function VideoTutorial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // State for showing video player
  const [showVideo, setShowVideo] = useState(false);
  return <section ref={sectionRef} className="py-20 bg-background" data-unique-id="f732b1ad-9acb-4c31-98bc-906a971b05e4" data-file-name="components/how-to-play/video-tutorial.tsx">
      <div className="container mx-auto px-6" data-unique-id="bba19cf5-de74-4869-98c1-3e70e3d9e0c2" data-file-name="components/how-to-play/video-tutorial.tsx">
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
      }} className="mb-12 text-center" data-unique-id="b92e5957-1fa8-47a6-88e0-456bb3bb43c9" data-file-name="components/how-to-play/video-tutorial.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="f7e2f243-fe1c-421f-8956-c06a56b788a0" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="9fb8cdd2-e8f6-4dba-a309-f7fefd296f20" data-file-name="components/how-to-play/video-tutorial.tsx">
            Video </span><span className="text-primary" data-unique-id="ca8223aa-8482-47c5-a3a6-47fb271c6f98" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="27a4c7de-772d-4bed-9931-7a1e6d4d888e" data-file-name="components/how-to-play/video-tutorial.tsx">Tutorial</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="c0a7ca16-9da6-4e98-9802-07d39077ea57" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="3bc359d3-4577-4d66-9bf3-4e69ac666ad8" data-file-name="components/how-to-play/video-tutorial.tsx">
            Watch this comprehensive guide to learn the fundamentals of pickleball.
          </span></p>
        </motion.div>

        <motion.div ref={videoRef} style={{
        scale,
        opacity
      }} className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-xl" data-unique-id="4d556cef-03a3-4230-b9ae-b0215a9d6fd9" data-file-name="components/how-to-play/video-tutorial.tsx" data-dynamic-text="true">
          {!showVideo ? <div className="relative" data-unique-id="47cba993-096b-43c5-8884-7389f3fcaf1b" data-file-name="components/how-to-play/video-tutorial.tsx">
              <img src="https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Pickleball Tutorial Video" className="w-full aspect-video object-cover" data-unique-id="d6d5a764-cb1c-4e96-95a7-eefb666b2654" data-file-name="components/how-to-play/video-tutorial.tsx" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center" data-unique-id="ebd2d0ec-8f7f-4976-b996-f4d21d68b2c6" data-file-name="components/how-to-play/video-tutorial.tsx">
                <motion.button whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }} onClick={() => setShowVideo(true)} className="h-20 w-20 rounded-full bg-primary text-white flex items-center justify-center" aria-label="Play video" data-unique-id="065d3545-0f60-4f0c-ab2c-9ecc5bfa9797" data-file-name="components/how-to-play/video-tutorial.tsx">
                  <Play className="h-10 w-10" />
                </motion.button>
              </div>
            </div> : <div className="aspect-video" data-unique-id="2429f71b-e1ce-4475-9b6b-659785641d35" data-file-name="components/how-to-play/video-tutorial.tsx">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/kqLRRNOpe8U?autoplay=1" title="Pickleball Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen data-unique-id="0b55eadb-00bd-4fb6-aadb-8bde313dc00c" data-file-name="components/how-to-play/video-tutorial.tsx"></iframe>
            </div>}
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }} className="mt-10 mx-auto max-w-3xl" data-unique-id="36a39221-6b8c-4418-a946-c7f627952d6c" data-file-name="components/how-to-play/video-tutorial.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="3516264c-9ee4-43f6-a64b-3a1b26c77621" data-file-name="components/how-to-play/video-tutorial.tsx">
            <div className="p-4 rounded-lg bg-muted text-center" data-unique-id="3cf6254e-fe21-41e1-87ae-91f45f015ef1" data-file-name="components/how-to-play/video-tutorial.tsx">
              <h4 className="font-medium mb-2" data-unique-id="4fb3240a-a9fe-4937-aac9-291b528d502c" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="8aca0b1e-ccee-476f-880b-64ded406ea05" data-file-name="components/how-to-play/video-tutorial.tsx">Video Length</span></h4>
              <p data-unique-id="e1ef71cf-1f67-44d8-b621-cd37dd424964" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="32cbdb72-4a32-4ce6-bf21-5b3cdae14b05" data-file-name="components/how-to-play/video-tutorial.tsx">10 minutes</span></p>
            </div>
            <div className="p-4 rounded-lg bg-muted text-center" data-unique-id="8cc42ba2-71cc-43a4-89ac-b6e034b1a768" data-file-name="components/how-to-play/video-tutorial.tsx">
              <h4 className="font-medium mb-2" data-unique-id="b2f0f7f7-add4-4b91-a508-b61d2130f95d" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="307966db-e206-463e-b65f-994a9fadf2a4" data-file-name="components/how-to-play/video-tutorial.tsx">Difficulty Level</span></h4>
              <p data-unique-id="e0530d1a-8cb2-46a1-93b0-24e8638c4a35" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="c0f74bb2-c64f-4aef-b48f-022252a660ae" data-file-name="components/how-to-play/video-tutorial.tsx">Beginner</span></p>
            </div>
            <div className="p-4 rounded-lg bg-muted text-center" data-unique-id="f5795a7e-c7ca-4291-824a-f902e243bd07" data-file-name="components/how-to-play/video-tutorial.tsx">
              <h4 className="font-medium mb-2" data-unique-id="4a4219b1-2dd0-4d7c-bab5-2bc666e62f63" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="0908ed14-6b0e-478a-878a-816cc1fb888b" data-file-name="components/how-to-play/video-tutorial.tsx">Topics Covered</span></h4>
              <p data-unique-id="285cc770-f635-4706-af10-211fa27522b6" data-file-name="components/how-to-play/video-tutorial.tsx"><span className="editable-text" data-unique-id="fe8dc7ac-42cc-41ef-9932-1d68f4cf9dc1" data-file-name="components/how-to-play/video-tutorial.tsx">Rules, Serving, Strategy</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
}