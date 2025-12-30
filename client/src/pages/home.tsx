import { Navbar } from "@/components/navbar";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product-card";
import { MapPin, Phone, Mail, Award, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { insertInquirySchema } from "@shared/schema";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Home() {
  const { data: products, isLoading: isLoadingProducts } = useProducts();
  const { mutate: createInquiry, isPending: isSubmitting } = useCreateInquiry();

  const form = useForm<z.infer<typeof insertInquirySchema>>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof insertInquirySchema>) => {
    createInquiry(data, {
      onSuccess: () => form.reset(),
    });
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash image of red chillies/spices */}
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
            alt="Red Chilli Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              The Essence of <br />
              <span className="text-secondary">Indian Spice</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              India’s trusted <span className="text-secondary font-medium">Mirchi of Bediya</span>. 
              Premium quality wholesale red chilli suppliers for businesses nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={scrollToProducts}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg shadow-xl shadow-primary/30 hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                Explore Products
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm rounded-full px-8 py-6 text-lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <Section id="about" className="bg-background">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary/10 rounded-3xl transform -rotate-3" />
            {/* Unsplash image of market/trader */}
            <img 
              src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1000&auto=format&fit=crop"
              alt="Kuber Traders Warehouse"
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
          <div>
            <SectionHeader title="About Kuber Traders" subtitle="Rooted in Tradition, Delivering Excellence." />
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Located in the heart of <strong>Bediya Mirchi Mandi</strong>, Kuber Traders has established itself as a premier name in the wholesale red chilli market. We are not just suppliers; we are connoisseurs of spice.
              </p>
              <p>
                Our expertise lies in sourcing the finest varieties of red chillies directly from the best farms. While we are purely a trading house, our rigorous quality checks ensure that only the best produce reaches our B2B partners across India.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">15+</span>
                  <span className="text-sm">Years Experience</span>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">100%</span>
                  <span className="text-sm">Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PRODUCTS SECTION */}
      <Section id="products" className="bg-muted/30">
        <SectionHeader 
          title="Premium Red Chillies" 
          subtitle="Discover our range of hand-picked, high-quality red chillies suitable for powders, oleoresins, and culinary delights."
          centered 
        />
        
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card h-96 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
            {/* Fallback if no products in DB yet */}
            {(!products || products.length === 0) && (
               <div className="col-span-full text-center py-20 text-muted-foreground">
                 <p>Our premium catalogue is being updated. Check back soon!</p>
               </div>
            )}
          </div>
        )}
      </Section>

      {/* WHY CHOOSE US */}
      <Section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {[
            { 
              icon: ShieldCheck, 
              title: "Trusted Quality", 
              desc: "Every batch undergoes strict physical inspection at the Mandi." 
            },
            { 
              icon: Truck, 
              title: "Pan India Supply", 
              desc: "Robust logistics network ensuring timely delivery to any state." 
            },
            { 
              icon: Award, 
              title: "Market Expertise", 
              desc: "Deep knowledge of price trends and variety characteristics." 
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className="bg-primary-foreground/5 p-8 rounded-2xl border border-white/10 hover:bg-primary-foreground/10 transition-colors text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <feature.icon className="w-12 h-12 mx-auto mb-6 text-secondary" />
              <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* NETWORK / SUPPLY */}
      <Section id="network">
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-primary mb-6">Supplying Across India</h2>
              <p className="text-muted-foreground text-lg mb-8">
                From the fertile lands of Madhya Pradesh to manufacturers and wholesalers in Gujarat, Maharashtra, South India, and beyond. We bridge the gap between farm and factory.
              </p>
              <ul className="space-y-4">
                {["Direct Mandi Sourcing", "Bulk Order Capability", "Transparent Pricing"].map((item, i) => (
                  <li key={i} className="flex items-center text-foreground font-medium">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                      <ArrowRight className="w-3 h-3 text-secondary-foreground" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative bg-muted/50 rounded-2xl min-h-[300px] flex items-center justify-center p-8">
              {/* Graphic representation of India Map */}
              <div className="text-center">
                 <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/India_%28orthographic_projection%29.svg/1200px-India_%28orthographic_projection%29.svg.png"
                   alt="India Map"
                   className="w-full max-w-xs mx-auto opacity-20"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-background/90 backdrop-blur shadow-lg p-6 rounded-xl border border-border max-w-xs">
                     <p className="font-bold text-primary text-xl mb-1">Pan-India Network</p>
                     <p className="text-sm text-muted-foreground">Serving 500+ satisfied B2B clients</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section id="contact" className="bg-muted/20">
        <SectionHeader title="Get in Touch" subtitle="Ready to place an order or need a quote? Contact us today." centered />
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
             <div className="flex items-start gap-4">
               <div className="bg-white p-3 rounded-lg shadow-sm border border-border">
                 <MapPin className="w-6 h-6 text-primary" />
               </div>
               <div>
                 <h4 className="font-bold text-lg text-foreground mb-1">Visit Us</h4>
                 <p className="text-muted-foreground">Khargone Road,<br/>Bediya Mirchi Mandi – 451113,<br/>Madhya Pradesh, India</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="bg-white p-3 rounded-lg shadow-sm border border-border">
                 <Phone className="w-6 h-6 text-primary" />
               </div>
               <div>
                 <h4 className="font-bold text-lg text-foreground mb-1">Call Us</h4>
                 <p className="text-muted-foreground font-mono text-lg">+91 99268 67455</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="bg-white p-3 rounded-lg shadow-sm border border-border">
                 <Mail className="w-6 h-6 text-primary" />
               </div>
               <div>
                 <h4 className="font-bold text-lg text-foreground mb-1">Email</h4>
                 <p className="text-muted-foreground">
                   <a href={`mailto:${import.meta.env.VITE_COMPANY_EMAIL}`} className="hover:underline">
                     {import.meta.env.VITE_COMPANY_EMAIL || 'kubertradersbediya@gmail.com'}
                   </a>
                 </p>
               </div>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name / Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} className="h-12 rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91..." {...field} className="h-12 rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirement Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your requirement (Quantity, Variety, Destination)..." 
                          className="min-h-[120px] rounded-lg resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-12 border-t border-white/10">
        <div className="container px-4 text-center">
           <div className="font-display font-bold text-3xl mb-4">
             Kuber<span className="text-secondary">Traders</span>
           </div>
           <p className="text-white/60 mb-8 max-w-md mx-auto">
             India’s trusted source for premium quality red chillies from the heart of Bediya.
           </p>
           <div className="h-px w-24 bg-white/20 mx-auto mb-8" />
           <p className="text-sm text-white/40">
             © {new Date().getFullYear()} Kuber Traders Bediya. All rights reserved.
           </p>
        </div>
      </footer>
    </div>
  );
}
