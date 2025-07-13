"use client";

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate is the plant disease detection?",
    answer: "Our AI model has been trained on thousands of images and can identify over 50 common plant diseases with 95% accuracy. The system is continuously improving as it learns from new data."
  },
  {
    question: "What types of plants and diseases can AyarCare identify?",
    answer: "AyarCare can identify diseases in a wide range of plants including vegetables, fruits, ornamental plants, and common houseplants. The system can detect fungal, bacterial, viral diseases, and nutrient deficiencies."
  },
  {
    question: "How should I take photos for the best results?",
    answer: "For optimal results, take clear, well-lit photos of the affected plant parts. Capture multiple angles of the symptoms, and ensure the diseased areas are in focus. Avoid shadows or glare in the images."
  },
  {
    question: "Are the treatment recommendations organic or chemical-based?",
    answer: "AyarCare provides both organic and conventional treatment options. We prioritize organic and environmentally friendly solutions when possible, but also include conventional treatments when necessary for severe infestations."
  },
  {
    question: "Is my data secure when I upload plant images?",
    answer: "Yes, we take data privacy seriously. All uploaded images are processed securely, and we do not share your personal information with third parties. Images may be anonymized and used to improve the AI model's accuracy."
  },
  {
    question: "Can I use AyarCare without an internet connection?",
    answer: "Currently, AyarCare requires an internet connection to analyze images and provide disease identification, as the processing happens on our servers. We're exploring offline capabilities for a future update."
  }
];

const FaqSection = () => {
  return (
    <section className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Get answers to common questions about AyarCare's plant disease detection and treatment recommendations.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;