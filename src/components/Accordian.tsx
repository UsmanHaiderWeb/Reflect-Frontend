import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { faqs, faqsType } from "@/data/faqs";

const Accordian = () => {
  return (
    <Accordion type="single" collapsible className="w-full mx-auto">
      {faqs.map((faq: faqsType, index: number) => (
        <AccordionItem key={index} value={faq.a}>
          <AccordionTrigger className="text-orange-900 text-lg">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-orange-700">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordian