"use client"

import { useRef } from "react"

export function PartnersSlider() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Partners data
  const partners = [
    { image: "polibatam.png", url: "https://www.polibatam.ac.id", name: "Politeknik Negeri Batam" },
    { image: "brail.png", url: "https://www.instagram.com/brailpolibatam/", name: "Barelang Robotics And Artificial Intelligence Lab" },
    { image: "bfc.png", url: "https://www.instagram.com/barelangfc.polibatam/", name: "Barelang FC" },
    { image: "barelang7.png", url: "https://www.instagram.com/barelang7.polibatam/", name: "Barelang 7" },
    { image: "barelang1.png", url: "https://www.instagram.com/barelangf1/", name: "Barelang 1" },
    { image: "barelang5.png", url: "https://www.instagram.com/barelangv_polibatam/", name: "Barelang 5" },
    { image: "barelang63.png", url: "https://www.instagram.com/barelang63/", name: "Barelang 63" },
    { image: "barelangmarine.png", url: "https://www.instagram.com/barelang_mrt/", name: "Barelang Marine" },
    { image: "barelangsky.png", url: "https://www.instagram.com/barelang_skyforce/", name: "Barelang Sky" }
  ]

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h3 className="font-medium text-white mb-6 text-center">Our Partners</h3>

      <div className="relative overflow-hidden w-full">
        {/* First set of logos that continuously slides */}
        <div
          ref={containerRef}
          className="flex gap-15 animate-marquee"
          style={{
            animation: "marquee 30s linear infinite",
          }}
        >
          {partners.map((partner) => (
            <div
              key={partner.image}
              className="bg-transparent p-3 rounded-lg h-22 w-34 flex-shrink-0 flex items-center justify-center"
            >
              <a href={partner.url} target="_blank" rel="noopener noreferrer" title={`Visit ${partner.name}`}>
                <img src={`/${partner.image}?height=40&width=80`} alt={partner.name} width={80} height={40} />
              </a>
            </div>
          ))}

          {/* Duplicate logos to create a seamless loop */}
          {partners.map((partner) => (
            <div
              key={`duplicate-${partner.image}`}
              className="bg-transparent p-3 rounded-lg h-22 w-34 flex-shrink-0 flex items-center justify-center"
            >
              <a href={partner.url} target="_blank" rel="noopener noreferrer" title={`Visit ${partner.name}`}>
                <img src={`/${partner.image}?height=40&width=80`} alt={partner.name} width={80} height={40} />
              </a>
            </div>
          ))}

           {/* Additional duplicates to ensure smoother loop */}
           {partners.map((partner) => (
            <div
              key={`duplicate-2-${partner.image}`}
              className="bg-transparent p-3 rounded-lg h-22 w-34 flex-shrink-0 flex items-center justify-center"
            >
              <a href={partner.url} target="_blank" rel="noopener noreferrer" title={`Visit ${partner.name}`}>
                <img src={`/${partner.image}?height=40&width=80`} alt={partner.name} width={80} height={40} />
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-200%);
          }     
        }
      `}</style>
    </div>
  )
}

