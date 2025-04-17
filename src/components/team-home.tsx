import type { CollectionEntry } from "astro:content";
import { Users } from "lucide-react";
import { Link } from "./link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  item: CollectionEntry<"teamMember">[];
}
export default function TeamSection({ item }: Props) {
    const years = item.map(({data})=>data.angkatan.getFullYear());
    const yearsUnique = [...new Set(years)].sort((a, b) => b - a); // Urutkan tahun dari yang terbesar ke terkecil
    return (
        <section className="w-full py-12 md:py-24 bg-gray-50">
			<div className="container px-4 md:px-6">
			  <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
				<div className="flex items-center gap-2">
				  <Users className="h-6 w-6 text-amber-600" />
				  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Team</h2>
				</div>
				<p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
				  The talented individuals behind our robotics innovations
				</p>
			  </div>
              <Tabs defaultValue="2025" className="w-full">
                {yearsUnique.map((year) => (
                    <TabsContent key={year} value={year.toString()} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {item
                          .filter((member) => member.data.angkatan.getFullYear() === year)
                          .slice(0,4)
                          .map((member, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                            >
                              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200">
                                <img src={member.data.image} alt={member.data.name} className="object-cover" />
                              </div>
                              <h3 className="text-lg font-bold">{member.data.name}</h3>
                              <p className="text-amber-600">{member.data.role}</p>
                              <p className="text-gray-500 text-sm">{member.data.division}</p>
                            </div>
                          ))}
                    </div>
                    </TabsContent>
                ))}
                </Tabs>
                <div className="flex justify-center mt-8">
                    <Link variant="outline" href="/team">View All Team Members</Link>
                </div>
                </div>
		</section>
    )
}