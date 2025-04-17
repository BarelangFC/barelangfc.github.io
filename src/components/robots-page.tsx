import type { CollectionEntry } from "astro:content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
interface Props {
  item: CollectionEntry<"robot">[];
}

export default function RobotsPage({ item }: Props) {
	const years = item.map(({data})=>data.date.getFullYear());
  const yearsUnique = [...new Set(years)].sort((a, b) => b - a); 
return (
    <div className="container py-12 md:py-16">
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Our Robots</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
        Discover the evolution of our robots from 2016 to present, showcasing their growth and innovations through time
        </p>
      </div>

      <Tabs defaultValue={yearsUnique[0]?.toString()} className="w-full">
          <div className="flex justify-center mb-8">
          <TabsList className="flex space-x-4 overflow-x-auto">
            {yearsUnique.map((year) => (
              <TabsTrigger key={year} value={year.toString()} className="text-sm">
               {year}
              </TabsTrigger>
            ))}
          </TabsList>
          </div>

        {yearsUnique.map((year) => (
          <TabsContent key={year} value={year.toString()} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item
                .filter(({data}) => data.date.getFullYear()===year)
                .map((robot, index) => (
                  <div key={index} className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="relative aspect-square">
                      <img
                        src={robot.data.image}
                        alt={robot.data.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            robot.data.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {robot.data.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col p-6 flex-grow">
                      <div className="flex-grow">
                        <span className="text-sm text-amber-600 mb-2">{year.toString()}</span>
                        <h3 className="text-xl font-bold mb-2">{robot.data.name}</h3>
                        <p className="text-gray-500">{robot.data.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

