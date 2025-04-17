import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import type { CollectionEntry } from "astro:content"
import { Link } from "./link"
interface Props {
  item: CollectionEntry<"teamMember">[];
}
export function GmailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );
}
// Keep GmailIcon as is, but fix the other icons:

export function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}
  export default function TeamPage({ item }: Props) {
    const years = item.map(({data})=>data.angkatan.getFullYear());
    const yearsUnique = [...new Set(years)].sort((a, b) => b - a); // Urutkan tahun dari yang terbesar ke terkecil
    return (
      <div>
        <div className="space-y-4 text-center mb-10">
          <h1 className="text-4xl font-bold">Our Team</h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Meet the brilliant minds behind our robotics innovations
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {item
          .filter(({data}) => data.angkatan.getFullYear()===year)
          .map(({id, data}) => (
            <Card key={id} className="overflow-hidden py-0">
              <div className="relative aspect-square">
                <img src={data.image} alt={data.name} /*fill*/ className="object-cover bg-gray-200" />
                <div className="absolute top-2 right-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    data.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-red-800"
                  }`}
                >
                  {data.status}
                </span>
                </div>
              </div>  
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{data.name}</h3>
                <p className="text-sm text-black-500 mb-2">{data.nim}</p>
                <p className="text-sm text-amber-500 mb-2">{data.prodi}</p>
                <p className="text-sm text-gray-500 mb-2">{data.role} | {year.toString()}</p>
                <Badge variant="secondary" className="mb-3 font-bold text-s">
                 {data.division.toString()}
                </Badge>
                <p className="text-sm text-black-500 mb-2">{data.nim}</p> 
                <p className="text-sm text-gray-600 line-clamp-3">{data.bio}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                
                  <Link variant={ "outline" } href={`/team/${id}`}>View Profile</Link>
                  <div className="flex space-x-2">
                        {
                            data.contact.email ? (
                                <Link
                                    href={data.contact.email!}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <GmailIcon className="h-4 w-4" />
                                    <span className="sr-only">Email</span>
                                </Link>
                            ) : (
                                <div />
                            )
                        }
                        {
                            data.contact.linkedin ? (
                                <Link
                                    href={data.contact.linkedin}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <LinkedInIcon className="h-4 w-4" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                            ) : (
                                <div />
                            )
                        }
                        {
                            data.contact.instagram ? (
                                <Link
                                    href={data.contact.instagram}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <InstagramIcon className="h-4 w-4" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                            ) : (
                                <div />
                            )
                        }
                        {
                            data.contact.github ? (
                                <Link
                                    href={data.contact.github}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <GitHubIcon className="h-4 w-4" />
                                    <span className="sr-only">Github</span>
                                </Link>
                            ) : (
                                <div />
                            )
                        }
                    </div>
                  
                
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      ))}
      </Tabs>
      </div>
    )
  }