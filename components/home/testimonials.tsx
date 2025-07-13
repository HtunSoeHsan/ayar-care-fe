import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Gardener",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    testimonial: "AyarCare saved my tomato plants! I was about to give up when I discovered this app. It identified the early blight disease and gave me specific treatment recommendations that worked perfectly."
  },
  {
    name: "Michael Chen",
    role: "Urban Farmer",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    testimonial: "As an urban farmer, plant diseases can be devastating to my small operation. AyarCare has become an essential tool in my daily routine. The accuracy and speed of disease detection is impressive."
  },
  {
    name: "Emily Rodriguez",
    role: "Botanist",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    testimonial: "I recommend AyarCare to all my students. It's not only practical for identifying plant diseases but also educational, providing detailed information about causes and prevention methods."
  }
];

const Testimonials = () => {
  return (
    <section className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Users Say</h2>
        <p className="text-muted-foreground">
          Discover how AyarCare has helped gardeners, farmers, and plant enthusiasts keep their plants healthy.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.testimonial}"</p>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;