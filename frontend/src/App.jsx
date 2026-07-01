import { useState, useEffect, useRef } from 'react'
import { Sparkles, ShoppingCart, Clock, Flame, Activity, Sun, Moon, Menu, X, Mic, MicOff, Loader2, UtensilsCrossed, Globe, Wrench } from 'lucide-react'
import axios from 'axios'
import blinkitLogo from './logo/images.png'
import zeptoLogo from './logo/idm2wBp3DO_logos.png'
import swiggyLogo from './logo/id8bItcgXR_1782472547886.png'

// Translations
const translations = {
  en: {
    appName: 'Elric',
    home: 'Home',
    features: 'Features',
    howItWorks: 'How It Works',
    getStarted: 'Get Started',
    newRecipe: 'New Project',
    heroTitle: 'Build Anything',
    heroSubtitle: 'With What You Have',
    heroDescription: 'Enter what you have, get personalized guides, step-by-step instructions, nutrition info for food projects, and instant shopping links for missing supplies!',
    ingredientsPlaceholder: 'What you have: Paint, wood, pasta, tools...',
    servingsPlaceholder: 'Details: 2 people, 1 canvas, etc.',
    findMyRecipe: 'Create My Project',
    cookingUpRecipe: 'Generating Your Guide...',
    featuresTitle: 'Everything You Need to Build Better',
    featuresSubtitle: 'Simple, powerful tools for any project',
    smartRecipes: 'Smart Guides',
    smartRecipesDesc: 'Get perfect guides for your materials',
    instantShopping: 'Instant Shopping',
    instantShoppingDesc: 'Buy missing supplies in one click',
    stepByStep: 'Step-by-Step',
    stepByStepDesc: 'Easy-to-follow instructions for any project',
    nutritionInfo: 'Nutrition Info',
    nutritionInfoDesc: 'Stay informed about what you eat',
    howItWorksTitle: 'How It Works',
    step1Title: 'Tell Us What You Have',
    step1Desc: 'List the materials or ingredients you have',
    step2Title: 'Discover Your Guide',
    step2Desc: 'We create the perfect project for you',
    step3Title: 'Build & Enjoy',
    step3Desc: 'Follow the steps and create something amazing',
    forPeople: 'For {count} people',
    ingredientsTitle: 'Materials',
    instructionsTitle: 'Instructions',
    nutritionTitle: 'Nutrition',
    findAnotherRecipe: 'Create Another Project',
    buy: 'Buy',
    contactUs: 'Contact Us',
    footerText: '© Elric. All rights reserved. Cook delicious meals, shop smart. '
  },
  hi: {
    appName: 'Elric',
    home: 'होम',
    features: 'विशेषताएँ',
    howItWorks: 'कैसे काम करता है',
    getStarted: 'शुरू करें',
    newRecipe: 'नया प्रोजेक्ट',
    heroTitle: 'कुछ भी बनाएँ',
    heroSubtitle: 'जो कुछ आपके पास है उससे',
    heroDescription: 'अपने पास क्या है दर्ज करें, व्यक्तिगत गाइड, चरण-दर-चरण निर्देश, भोजन परियोजनाओं के लिए पोषण जानकारी, और लापता सामग्री के लिए तुरंत खरीदारी लिंक पाएँ!',
    ingredientsPlaceholder: 'आपके पास क्या है: पेंट, लकड़ी, पास्ता, उपकरण...',
    servingsPlaceholder: 'विवरण: 2 लोग, 1 कैनवास, आदि।',
    findMyRecipe: 'मेरा प्रोजेक्ट बनाएँ',
    cookingUpRecipe: 'आपका गाइड तैयार हो रहा है...',
    featuresTitle: 'बेहतर बनाने के लिए सब कुछ',
    featuresSubtitle: 'किसी भी परियोजना के लिए सरल, शक्तिशाली उपकरण',
    smartRecipes: 'स्मार्ट गाइड्स',
    smartRecipesDesc: 'अपनी सामग्री के लिए परफेक्ट गाइड पाएँ',
    instantShopping: 'तुरंत खरीदारी',
    instantShoppingDesc: 'एक क्लिक में लापता सामग्री खरीदें',
    stepByStep: 'चरण-दर-चरण',
    stepByStepDesc: 'किसी भी परियोजना के लिए आसान-से-पालन योग्य निर्देश',
    nutritionInfo: 'पोषण जानकारी',
    nutritionInfoDesc: 'आप क्या खा रहे हैं इसके बारे में जानकारी रखें',
    howItWorksTitle: 'कैसे काम करता है',
    step1Title: 'हमें बताएँ कि आपके पास क्या है',
    step1Desc: 'अपने पास मौजूद सामग्री या सामग्री सूचीबद्ध करें',
    step2Title: 'अपना गाइड खोजें',
    step2Desc: 'हम आपके लिए परफेक्ट प्रोजेक्ट बनाते हैं',
    step3Title: 'बनाएँ और आनंद लें',
    step3Desc: 'चरणों का पालन करें और कुछ अद्भुत बनाएँ',
    forPeople: '{count} लोगों के लिए',
    ingredientsTitle: 'सामग्री',
    instructionsTitle: 'निर्देश',
    nutritionTitle: 'पोषण',
    findAnotherRecipe: 'एक और प्रोजेक्ट बनाएँ',
    buy: 'खरीदें',
    contactUs: 'हमसे संपर्क करें',
    footerText: '© Elric. All rights reserved. Build anything, shop smart. '
  }
}

function App() {
  const [isDark, setIsDark] = useState(false)
  const [language, setLanguage] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [ingredients, setIngredients] = useState('')
  const [servings, setServings] = useState('')
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [activeTab, setActiveTab] = useState('ingredients')
  const [listeningToIngredients, setListeningToIngredients] = useState(false)
  const [listeningToServings, setListeningToServings] = useState(false)
  const recognitionRef = useRef(null)

  const t = translations[language]

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US'
      recognitionRef.current = recognition
    }
  }, [language])

  const handleVoiceInput = (field) => {
    if (!recognitionRef.current) return

    const setListening = field === 'ingredients' ? setListeningToIngredients : setListeningToServings
    const setValue = field === 'ingredients' ? setIngredients : setServings

    setListening(true)

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setValue(transcript)
      setListening(false)
    }

    recognitionRef.current.onerror = () => {
      setListening(false)
    }

    recognitionRef.current.onend = () => {
      setListening(false)
    }

    recognitionRef.current.start()
  }

  const handleGenerate = async () => {
    if (!ingredients.trim()) return

    setLoading(true)
    setRecipe(null)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://elric.onrender.com'
      const response = await axios.post(`${API_URL}/api/recipe`, {
        query: ingredients,
        servings: servings || undefined,
        language: language
      })
      setRecipe(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setRecipe(null)
    setIngredients('')
    setServings('')
  }

  const generateShoppingLink = (materialName, platform) => {
    const encodedName = encodeURIComponent(materialName)
    switch (platform) {
      case 'blinkit':
        return `https://blinkit.com/s/?q=${encodedName}`
      case 'zepto':
        return `https://www.zeptonow.com/search?query=${encodedName}`
      case 'instamart':
        return `https://www.swiggy.com/instamart/search?q=${encodedName}`
      default:
        return '#'
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-blue-100'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={handleReset} className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl ${isDark ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-indigo-500'}`}>
                <UtensilsCrossed className="w-7 h-7 text-white" />
              </div>
              <span className={`text-2xl font-black font-poppins bg-gradient-to-r ${isDark ? 'from-blue-400 to-indigo-400' : 'from-blue-600 to-indigo-600'} bg-clip-text text-transparent`}>{t.appName}</span>
            </button>

            {!recipe && (
              <div className="hidden md:flex items-center gap-8">
                <a href="#home" className={`hover:text-blue-500 transition-colors font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.home}</a>
                <a href="#features" className={`hover:text-blue-500 transition-colors font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.features}</a>
                <a href="#how-it-works" className={`hover:text-blue-500 transition-colors font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.howItWorks}</a>
              </div>
            )}

            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className={`p-2 rounded-lg transition-all hover:scale-110 flex items-center gap-2 ${isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-blue-50 text-slate-700'}`}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">{language === 'en' ? 'EN' : 'HI'}</span>
              </button>

              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-all hover:scale-110 ${isDark ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-blue-50 text-blue-600'}`}
              >
                {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>

              <button
                onClick={handleReset}
                className={`px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'}`}
              >
                {recipe ? t.newRecipe : t.getStarted}
              </button>

              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && !recipe && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#home" className={`block py-2 hover:text-blue-500 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.home}</a>
              <a href="#features" className={`block py-2 hover:text-blue-500 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.features}</a>
              <a href="#how-it-works" className={`block py-2 hover:text-blue-500 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.howItWorks}</a>
            </div>
          )}
        </div>
      </nav>

      {!recipe ? (
        <main className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <section id="home" className="py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8">
                <Sparkles className={`w-20 h-20 mx-auto mb-4 drop-shadow-lg ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>

              <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.heroTitle}
                <span className={`block mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{t.heroSubtitle}</span>
              </h1>

              <p className={`text-lg md:text-xl mb-10 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.heroDescription}
              </p>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t.ingredientsPlaceholder}
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      className={`w-full px-5 py-4 pr-14 rounded-2xl border shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-200 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' : 'bg-white border-blue-100 text-slate-900 placeholder-slate-400 focus:border-blue-400'}`}
                    />
                    <button
                      onClick={() => handleVoiceInput('ingredients')}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all hover:scale-110 ${listeningToIngredients ? 'bg-red-500 animate-pulse text-white' : isDark ? 'hover:bg-slate-700 text-blue-400' : 'hover:bg-blue-100 text-blue-500'}`}
                    >
                      {listeningToIngredients ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t.servingsPlaceholder}
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                      className={`w-full px-5 py-4 pr-14 rounded-2xl border shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-200 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' : 'bg-white border-blue-100 text-slate-900 placeholder-slate-400 focus:border-blue-400'}`}
                    />
                    <button
                      onClick={() => handleVoiceInput('servings')}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all hover:scale-110 ${listeningToServings ? 'bg-red-500 animate-pulse text-white' : isDark ? 'hover:bg-slate-700 text-blue-400' : 'hover:bg-blue-100 text-blue-500'}`}
                    >
                      {listeningToServings ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className={`px-10 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto ${isDark ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-7 h-7 animate-spin" />
                      {t.cookingUpRecipe}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-7 h-7" />
                      {t.findMyRecipe}
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.featuresTitle}</h2>
              <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.featuresSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: UtensilsCrossed, title: t.smartRecipes, desc: t.smartRecipesDesc },
                { icon: ShoppingCart, title: t.instantShopping, desc: t.instantShoppingDesc },
                { icon: Clock, title: t.stepByStep, desc: t.stepByStepDesc },
                { icon: Activity, title: t.nutritionInfo, desc: t.nutritionInfoDesc },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2 ${isDark ? 'bg-slate-800 border-slate-700 hover:border-blue-500/50' : 'bg-white border-blue-100 hover:border-blue-200'}`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md ${isDark ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20 text-blue-400' : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600'}`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h3>
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-16 md:py-24">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.howItWorksTitle}</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                { step: 1, title: t.step1Title, desc: t.step1Desc },
                { step: 2, title: t.step2Title, desc: t.step2Desc },
                { step: 3, title: t.step3Title, desc: t.step3Desc },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 mb-10 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-lg ${isDark ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'}`}>
                      {item.step}
                    </div>
                    {idx < 2 && <div className={`w-1 flex-1 mt-2 ${isDark ? 'bg-gradient-to-b from-blue-500/50 to-transparent' : 'bg-gradient-to-b from-blue-400/50 to-transparent'}`} />}
                  </div>
                  <div className="pt-1 pb-8">
                    <h3 className={`text-xl font-bold mb-2 font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                    <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className={`p-8 rounded-3xl border shadow-2xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-100'}`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className={`text-3xl font-bold mb-2 font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>{recipe.title}</h2>
                {recipe.servings && (
                  <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.forPeople.replace('{count}', recipe.servings)}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
                    activeTab === 'ingredients'
                      ? isDark ? 'bg-slate-700 text-white border border-b-0 border-slate-600' : 'bg-blue-100 text-blue-700 border border-b-0 border-blue-200'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    {t.ingredientsTitle}
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
                    activeTab === 'instructions'
                      ? isDark ? 'bg-slate-700 text-white border border-b-0 border-slate-600' : 'bg-blue-100 text-blue-700 border border-b-0 border-blue-200'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {t.instructionsTitle}
                  </div>
                </button>
                {recipe.nutrition && (
                  <button
                    onClick={() => setActiveTab('nutrition')}
                    className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
                      activeTab === 'nutrition'
                        ? isDark ? 'bg-slate-700 text-white border border-b-0 border-slate-600' : 'bg-blue-100 text-blue-700 border border-b-0 border-blue-200'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      {t.nutritionTitle}
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="min-h-[300px]">
              {activeTab === 'ingredients' && (
                <ul className="space-y-4">
                  {recipe.materials.map((item, idx) => (
                    <li key={idx} className={`p-5 rounded-2xl ${isDark ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
                      <div className="mb-3">
                        <span className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</span>
                        {item.quantity && (
                          <span className={`ml-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {' '}- {item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        <a
                          href={generateShoppingLink(item.name, 'blinkit')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 transition-all hover:scale-105 shadow-md"
                        >
                          <img src={blinkitLogo} alt="Blinkit" className="h-5 w-auto" />
                          <span className="text-sm font-bold text-black">{t.buy}</span>
                        </a>
                        <a
                          href={generateShoppingLink(item.name, 'zepto')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all hover:scale-105 shadow-md"
                        >
                          <img src={zeptoLogo} alt="Zepto" className="h-5 w-auto" />
                          <span className="text-sm font-bold text-white">{t.buy}</span>
                        </a>
                        <a
                          href={generateShoppingLink(item.name, 'instamart')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 transition-all hover:scale-105 shadow-md"
                        >
                          <img src={swiggyLogo} alt="Swiggy Instamart" className="h-5 w-auto" />
                          <span className="text-sm font-bold text-white">{t.buy}</span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'instructions' && (
                <ol className="space-y-5">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-5">
                      <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md ${isDark ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'}`}>
                        {idx + 1}
                      </span>
                      <p className={`pt-1.5 text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{step}</p>
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'nutrition' && recipe.nutrition && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30' : 'bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200'}`}>
                    <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>{recipe.nutrition.calories}</div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Calories</div>
                  </div>
                  <div className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30' : 'bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200'}`}>
                    <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>{recipe.nutrition.protein}g</div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Protein</div>
                  </div>
                  <div className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30' : 'bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-200'}`}>
                    <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>{recipe.nutrition.carbs}g</div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Carbs</div>
                  </div>
                  <div className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30' : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200'}`}>
                    <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{recipe.nutrition.fat}g</div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Fat</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={handleReset} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'}`}>
                <Sparkles className="w-5 h-5" />
                {t.findAnotherRecipe}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      {!recipe && (
        <footer className={`mt-24 border-t py-12 ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-blue-100 bg-blue-50/50'}`}>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl ${isDark ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-indigo-500'}`}>
                  <UtensilsCrossed className="w-7 h-7 text-white" />
                </div>
                <span className={`text-2xl font-black font-poppins bg-gradient-to-r ${isDark ? 'from-blue-400 to-indigo-400' : 'from-blue-600 to-indigo-600'} bg-clip-text text-transparent`}>{t.appName}</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="mailto:contact@cookcart.com" className={`text-sm font-medium hover:text-blue-500 transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>{t.contactUs}</a>
              </div>
              <p className={`${isDark ? 'text-slate-500' : 'text-slate-600'}`}>{t.footerText}</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App