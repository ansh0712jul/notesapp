import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import {  Instagram,  Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const features = [
  {
    title: "Create",
    description: "Generate compelling Twitter threads that engage your audience and boost your reach.",
    icon: Twitter,
  },
  {
    title: "Saves Images",
    description: "Create catchy captions for your Instagram posts that increase engagement and followers.",
    icon: Instagram,
  },
  {
    title: "Add Audio",
    description: "Craft professional content for your LinkedIn network to establish thought leadership.",
    icon: Linkedin,
  },
]

const platforms = [
  { name: "Instagram", logo: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" },
  { name: "Twitter", logo: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZWJvb2slMjBsb2dvfGVufDB8fDB8fHww" },
]

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)


  // to handle the scroll effect

  useEffect(() =>{
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  })
  console.log(isScrolled)

  // to hanlde the responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsDarkTheme(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // to change the theme for mobile and laptop 
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkTheme])


  return (
    <>
      <header className={` fixed w-full  z-50 ${isScrolled ? "bg-gray-900/80 backdrop-blur-lg"   : "bg-transparent"} transition-all duration-300 h-24  `}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16">
          <div className="flex mt-9">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-purple-600 dark:text-blue-400">Media Muse</span>
            </Link>
          </div>
          <div className="flex items-center mt-9">
            <Button variant="ghost" className="mr-2 dark:text-gray-300">
              Features
            </Button>
            <Button variant="ghost" className="mr-2 dark:text-gray-300">
              <Link to={"/pricing-page"}>Pricing</Link>
            </Button>
            <Button variant="ghost" className="mr-2 dark:text-gray-300">
              <Link to={"/dashboard"}>Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
        <main
        className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gradient-to-b from-gray-50 to-white"}`}
        >
        <section className="py-20 px-4 text-center">
            <h1
            className={`text-4xl md:text-6xl font-bold mb-6 ${ "bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"}`}
            >
            Welcome to Media Muse
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Create, delte and update your notes  content effortlessly with Media Muse.
            </p>
            <Button
            size="lg"
            className={isDarkTheme ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"}
            >
            <Link to="/sign-in">Getting Started </Link>
            </Button>
        </section>

        <section className={`py-20 px-4 ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Media Muse?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
                <Card
                key={index}
                className={`transition-all hover:shadow-lg ${isDarkTheme ? "bg-gray-700 text-white" : ""}`}
                >
                <CardHeader>

                    <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className={isDarkTheme ? "text-gray-300" : ""}>{feature.description}</CardDescription>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>

      

        <section className={`py-20 px-4 ${isDarkTheme ? "bg-blue-900" : "bg-purple-600"} text-white text-center`}>
            <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Social Media Game?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Media Muse today and start saving captivating content.
            </p>
            <Button
            size="lg"
            variant="secondary"
            className={
                isDarkTheme ? "bg-white text-blue-900 hover:bg-gray-100" : "bg-white text-purple-600 hover:bg-gray-100"
            }
            >
            <Link to="/sign-up">Sign Up Now</Link>
            </Button>
        </section>
        </main>

        {/* footer */}

        <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-semibold text-purple-600 dark:text-blue-400">Media Muse</span>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-blue-400">
              About
            </Link>
            <Link href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-blue-400">
              Privacy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-blue-400">
              Terms
            </Link>
            <Link to="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-blue-400">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Media Muse. All rights reserved.
        </div>
      </div>
    </footer>
    </>
  )
}

