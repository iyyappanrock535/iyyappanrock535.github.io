import { useRef } from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useInView } from '@/hooks/use-in-view';

type Testimonial = {
  name: string;
  username: string;
  location: string;
  flag: string;
  title: string;
  review: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: 'So K.',
    username: 'vw7401283vw',
    location: 'Hong Kong',
    flag: '🇭🇰',
    title: 'React.js Project Work',
    review:
      'Very professional and fast, highly recommended. This is the third time hiring Iyyappan — great thanks for your help! Highly recommended for React Native issues.',
    rating: 5,
  },
  {
    name: 'Jasper C.',
    username: 'codingjasper',
    location: 'Netherlands',
    flag: '🇳🇱',
    title: 'Expo React Native — API to SectionList',
    review:
      'Very quick and good work. Truly swift response and amazing result. It was a pleasure to work with Iyyappan.',
    rating: 5,
  },
  {
    name: 'Matthew M.',
    username: 'Pattilient',
    location: 'Toronto, Canada',
    flag: '🇨🇦',
    title: 'Modify React Native Project',
    review:
      'Fantastic work. Very detailed and thorough. Kept working hard until the problem was solved. Made sure to fix every issue when found and did revisions until the project was perfect.',
    rating: 5,
  },
  {
    name: 'Vignesh P.',
    username: 'doersvignesh',
    location: 'Coimbatore, India',
    flag: '🇮🇳',
    title: 'Bug Fixing & Enhancements — React Native',
    review:
      'Very knowledgeable with a quick turnaround. No communication gap and deliveries were on time. Very honest about scope and understanding requirements. I can vouch that anyone can hire him without any doubts.',
    rating: 5,
  },
  {
    name: 'Bai T.',
    username: 'bairavip20',
    location: 'Colombo, Sri Lanka',
    flag: '🇱🇰',
    title: 'Google Sign-in — Node.js / React.js',
    review: 'Excellent skills to work with! We are already discussing a new project with him.',
    rating: 5,
  },
  {
    name: 'Horita D.',
    username: 'cleanlake',
    location: 'Japan',
    flag: '🇯🇵',
    title: 'connect-es in React Native App',
    review:
      'I was able to fix a complex issue on my React Native app with his help. I appreciate his problem-solving skill. Thank you, Iyyappan.',
    rating: 5,
  },
  {
    name: 'Stelios A.',
    username: 'steliscript',
    location: 'Cyprus',
    flag: '🇨🇾',
    title: 'Expo SDK Upgrade 40 → 48',
    review:
      'Resolved all dependency conflicts in the application. Put a great amount of effort into making sure he delivers a fully functional app. Happy with the results.',
    rating: 5,
  },
  {
    name: 'Alain R.',
    username: 'ark2784',
    location: 'Mexico',
    flag: '🇲🇽',
    title: 'React Native Expo — Real Estate App',
    review:
      'Everything was perfect! Iyyappan did great work and all implementations are working well. For sure the best choice for the project.',
    rating: 5,
  },
  {
    name: 'Lauro S.',
    username: 'las1485',
    location: 'Rio de Janeiro, Brazil',
    flag: '🇧🇷',
    title: 'Video Player — React Native iOS',
    review:
      'Delivered everything we needed. Very polite and fast to respond. Will hire again.',
    rating: 5,
  },
  {
    name: 'Sathish Kumar V.',
    username: 'sathishkv2024',
    location: 'United States',
    flag: '🇺🇸',
    title: 'React.js, Redux, MUI & Axios',
    review:
      'Professionalism, expertise, and dedication to meeting deadlines exceeded my expectations. Delivered high-quality work that perfectly matched our project requirements.',
    rating: 5,
  },
  {
    name: 'Phan P.',
    username: 'sangpdev94',
    location: 'Vietnam',
    flag: '🇻🇳',
    title: 'React Native Expert — Existing Codebase',
    review:
      'I assigned this task to ten developers, but it was Iyyappan who successfully completed it. I truly appreciate his exceptional skills and dedication.',
    rating: 5,
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const plugin = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: carouselRef, inView: carouselIn } = useInView(0.1);

  return (
    <section id="testimonials" className="py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <p className={`text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`}>
            Social proof
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold text-white mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`} style={{ animationDelay: '80ms' }}>
                What clients say
              </h2>
              <div className={`w-16 h-1 bg-blue-600 rounded-full ${headerIn ? 'anim-scale' : 'reveal'}`} style={{ animationDelay: '160ms' }} />
            </div>

            {/* Platform badge + link */}
            <div className={`flex flex-wrap items-center gap-3 ${headerIn ? 'anim-fade-right' : 'reveal'}`} style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700">
                <Stars count={5} />
                <span className="text-white text-sm font-semibold ml-1">5.0</span>
                <span className="text-slate-400 text-xs">on Freelancer.com</span>
              </div>
              <a
                href="https://www.freelancer.in/u/iyyappanrock0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              >
                View Profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Countries strip */}
          <div className={`flex flex-wrap gap-2 mt-6 ${headerIn ? 'anim-fade-up' : 'reveal'}`} style={{ animationDelay: '280ms' }}>
            {testimonials.map((t) => (
              <span
                key={t.username}
                className="text-sm px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500 transition-colors duration-200"
                title={t.location}
              >
                {t.flag} {t.location}
              </span>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className={carouselIn ? 'anim-fade-up' : 'reveal'} style={{ animationDelay: '100ms' }}>
          <Carousel
            plugins={[plugin.current]}
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full flex flex-col bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1">
                    <Quote className="w-6 h-6 text-blue-500/40 mb-4 flex-shrink-0" />
                    <p className="text-slate-300 text-sm leading-relaxed flex-grow mb-6">
                      "{t.review}"
                    </p>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white text-sm font-semibold leading-tight">{t.name}</div>
                            <div className="text-slate-500 text-xs">{t.flag} {t.location}</div>
                          </div>
                        </div>
                        <Stars count={t.rating} />
                      </div>
                      <p className="text-slate-500 text-xs italic mt-1 line-clamp-1">{t.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="static translate-y-0 h-9 w-9 rounded-lg bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600" />
              <CarouselNext className="static translate-y-0 h-9 w-9 rounded-lg bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600" />
            </div>
          </Carousel>
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-14 p-8 rounded-2xl bg-gradient-to-br from-blue-600/15 to-indigo-600/15 border border-blue-500/20 text-center ${carouselIn ? 'anim-fade-up' : 'reveal'}`}
          style={{ animationDelay: '200ms' }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            11 clients across 10 countries. All repeat or referral.
          </h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm">
            If your project requires someone who ships on time, communicates clearly, and solves the hard problems — let's talk.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-sm hover:-translate-y-0.5"
          >
            Start a conversation
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
