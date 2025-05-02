import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { themes } from '../components/themes';

export default function LandingPage() {
  const { token, theme } = useAuth(); // Destructure theme from useAuth
  const currentTheme = themes[theme];

  const features = [
    {
      icon: "🌍",
      title: "Country Explorer",
      description: "Discover fascinating facts about every country - flags, capitals, languages, and more!"
    },
    {
      icon: "🔊",
      title: "Read Aloud",
      description: "Our speech feature reads facts aloud - perfect for young readers!"
    },
    {
      icon: "🏁",
      title: "Flag Quiz",
      description: "Test your knowledge with our fun flag identification game!"
    },
    {
      icon: "🧠",
      title: "Memory Game",
      description: "Match country flags in this classic memory challenge!"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.bg }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block">Explore the World with</span>
                  <span 
                    className="block"
                    style={{ color: currentTheme.primary }}
                  >
                    Country Explorer!
                  </span>
                </h1>
                <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  A fun way for kids to learn about countries, their flags, languages, and cultures through interactive games and colorful exploration!
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to={token ? "/" : "/login"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10"
                      style={{ 
                        backgroundColor: currentTheme.primary,
                        '--tw-ring-color': currentTheme.buttonHover
                      }}
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/games"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10"
                      style={{ 
                        color: currentTheme.primary,
                        backgroundColor: `${currentTheme.primary}20`,
                        '--tw-ring-color': `${currentTheme.primary}30`
                      }}
                    >
                      Play Games
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={theme === 'boys' 
                ? "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                : "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              alt="World map with colorful pins"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-r"
              style={{
                backgroundColor: currentTheme.bg,
                opacity: 0.8
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 
              className="text-base font-semibold tracking-wide uppercase"
              style={{ color: currentTheme.primary }}
            >
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
              Learn About the World in a Fun Way
            </p>
            <p className="mt-4 max-w-2xl text-xl lg:mx-auto">
              Our interactive tools make geography exciting for kids of all ages
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div 
                    className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium">{feature.title}</h3>
                    <p className="mt-2 text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16" style={{ backgroundColor: `${currentTheme.primary}10` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 
              className="text-base font-semibold tracking-wide uppercase"
              style={{ color: currentTheme.primary }}
            >
              What Kids Say
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
              Our Young Explorers Love It!
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg shadow-md"
                style={{ backgroundColor: currentTheme.cardBg }}
              >
                <div className="flex items-center">
                  <div className="text-yellow-400 text-2xl">⭐️⭐️⭐️⭐️⭐️</div>
                </div>
                <blockquote className="mt-4">
                  <p className="text-lg">
                    {[
                      "I learned all the flags in Europe! The games are so fun!",
                      "I love hearing about different countries. The voice is funny!",
                      "My favorite is the memory game. I can beat my dad now!"
                    ][index]}
                  </p>
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${currentTheme.primary}20` }}
                    >
                      <span className="text-xl">{index === 1 ? "👧" : "👦"}</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      {["Ethan, 8", "Sophia, 7", "Liam, 9"][index]}
                    </p>
                    <p className="text-sm">
                      {["Young Explorer", "Geography Fan", "Memory Champion"][index]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ backgroundColor: currentTheme.primary }}>
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to explore the world?</span>
            <span className="block">Start your adventure today!</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white text-opacity-80">
            Join thousands of young explorers learning about our amazing planet.
          </p>
          <Link
            to={token ? "/" : "/register"}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}