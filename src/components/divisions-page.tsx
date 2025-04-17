import type {CollectionEntry} from "astro:content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
interface Props {
    item: CollectionEntry<"division">;
}

export default function DivisionsPage({ item }: Props) {
  
    return (
      <Accordion type="single" collapsible className="mb-6">
                  <AccordionItem value="projects">
                    <AccordionTrigger>Key Projects</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.data.projects.map((project, i) => (
                          <li key={i}>{project}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="technologies">
                    <AccordionTrigger>Technologies</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.data.technologies.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
          )
  }
  
  