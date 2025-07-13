import { Leaf, Search, Sparkles, Shield, Zap, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: "Plant Disease Detection",
    description: "Upload photos of your plants to identify diseases with our advanced AI-powered detection system."
  },
  {
    icon: Sparkles,
    title: "Treatment Recommendations",
    description: "Get personalized treatment plans and organic solutions to combat plant diseases effectively."
  },
  {
    icon: Search,
    title: "Healthy Food Database",
    description: "Search our extensive database of healthy foods and learn about their nutritional benefits."
  },
  {
    icon: Shield,
    title: "Preventive Care Tips",
    description: "Access expert advice on preventive measures to keep your plants disease-free year-round."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Receive disease identification and treatment recommendations in seconds, not days."
  },
  {
    icon: BookOpen,
    title: "Educational Resources",
    description: "Browse our library of articles and guides about plant health, diseases, and organic gardening."
  }
];

const FeatureSection = () => {
  return (
    <section className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Key Features</h2>
        <p className="text-muted-foreground">
          AyarCare offers comprehensive tools to identify plant diseases and promote plant health through advanced technology and expert recommendations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="group flex flex-col p-6 border rounded-lg bg-card hover:shadow-md transition-all">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureSection;