// Import necessary libraries and external components
// Import internal components
// Import styles
// Fetch or get data

import MainLayout from "@/app/layouts/main";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Offers from "@/app/myebai/bids-offers/components/Offers";
import Bids from "./components/Bids";

const page = () => {
  return (
    <MainLayout>
      <div className="container mx-auto m-4 px-4 max-w-4xl">
        <Card className="">
          <CardHeader>
            <CardTitle className=" text-xl">Bids And Offers</CardTitle>
            <CardDescription>Your Selling and Your Orders </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="offers" className="w-full ">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="offers">Offers</TabsTrigger>
                <TabsTrigger value="bids">Bids</TabsTrigger>
              </TabsList>
              <TabsContent className="w-full" value="offers">
                <Offers className="w-full" />
              </TabsContent>

              <TabsContent value="bids">
                <Bids className="w-full" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default page;
