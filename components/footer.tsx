import Link from 'next/link';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-bold">AyarCare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Identify plant diseases and get treatment recommendations to keep your plants healthy.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/scan" className="text-sm text-muted-foreground hover:text-primary">Scan Plant</Link></li>
              <li><Link href="/search" className="text-sm text-muted-foreground hover:text-primary">Healthy Foods</Link></li>
              <li><Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/diseases" className="text-sm text-muted-foreground hover:text-primary">Disease Database</Link></li>
              <li><Link href="/treatments" className="text-sm text-muted-foreground hover:text-primary">Treatment Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">support@ayarcare.com</li>
              <li className="text-sm text-muted-foreground">+1 (555) 123-4567</li>
              <li className="text-sm text-muted-foreground">123 Green Street, Plant City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AyarCare. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;