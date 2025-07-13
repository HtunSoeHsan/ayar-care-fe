import FoodSearch from '@/components/search/food-search';
import { Card, CardContent } from '@/components/ui/card';
import PopularHealthyFoods from '@/components/search/popular-healthy-foods';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Healthy Food Search</h1>
        <p className="text-muted-foreground">
          Discover nutrient-rich foods and learn about their health benefits and disease prevention properties.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <FoodSearch />
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12">
        <Tabs defaultValue="popular">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="popular">Popular Foods</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="pt-6">
            <PopularHealthyFoods />
          </TabsContent>
          
          <TabsContent value="seasonal" className="pt-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Seasonal Foods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Spring</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Asparagus
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Peas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Radishes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Spinach
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Strawberries
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Rhubarb
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Summer</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Tomatoes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Peppers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Cucumbers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Corn
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Berries
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Watermelon
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Fall</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Apples
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Pumpkins
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Sweet Potatoes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Brussels Sprouts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Cranberries
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Grapes
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Winter</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Citrus Fruits
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Kale
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Carrots
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Winter Squash
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Potatoes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Pomegranates
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="pt-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Food Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Fruits", count: 45 },
                { name: "Vegetables", count: 62 },
                { name: "Grains", count: 18 },
                { name: "Legumes", count: 24 },
                { name: "Nuts & Seeds", count: 15 },
                { name: "Herbs & Spices", count: 30 },
                { name: "Berries", count: 12 },
                { name: "Leafy Greens", count: 20 },
                { name: "Root Vegetables", count: 14 }
              ].map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}