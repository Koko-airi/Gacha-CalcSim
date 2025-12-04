import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ResultDialog({
  pullResults,
  clearResults,
}: {
  pullResults: RewardItem[];
  clearResults: () => void;
}) {
  return (
    <Dialog open={pullResults.length > 0}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center">Your pull results</DialogTitle>
          <DialogDescription className="text-center">
            Here are the rewards you obtained from your pulls!
          </DialogDescription>
        </DialogHeader>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {pullResults.map((reward, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader className="text-2xl text-center">
                      {reward.rarity === 3
                        ? "★★★"
                        : reward.rarity === 4
                        ? "★★★★"
                        : "★★★★★"}
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-4 text-center text-3xl">
                      {reward.name}
                    </CardContent>
                    <CardFooter className="text-sm text-gray-700 text-center mx-auto">
                      {reward.type.charAt(0).toUpperCase() +
                        reward.type.slice(1)}
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="mx-auto px-8 font-medium cursor-pointer"
              onClick={clearResults}
            >
              Claim rewards
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
