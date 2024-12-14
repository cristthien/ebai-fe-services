"use client"; // Chỉ ra rằng đây là phần client-side của React

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dot } from "lucide-react";
import io, { Socket } from "socket.io-client";
import { isClient } from "@/lib/http";
import { BidListType } from "@/schemaValidations/bids.schema";
import { useToast } from "@/hooks/use-toast";

interface BiddingComponentProps {
  className?: string;
  productSlug: string;
  end_date: Date;
}

const BiddingComponent: React.FC<BiddingComponentProps> = ({
  className,
  productSlug: slug,
  end_date,
}) => {
  const { toast } = useToast();
  const [bids, setBids] = useState<BidListType | null>(null);
  let storedToken = null;
  if (isClient()) {
    storedToken = localStorage.getItem("access_token");
  }
  const isDisabled = new Date(end_date) < new Date();
  const [socket, setSocket] = useState<Socket | null>(null);
  // Đặt giá thầu ban đầu là giá trị highest_bid
  const [bidAmount, setBidAmount] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<string>("");
  useEffect(() => {
    // Kết nối đến server Socket.io
    const socketConnection = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
      transports: ["websocket"], // Đảm bảo sử dụng WebSocket
      query: {
        token: storedToken, // Đính kèm token trong query string
      },
    });

    setSocket(socketConnection);

    socketConnection.emit("joinAuction", slug);
    socketConnection.on("initalizeBid", (bidList) => {
      setBids(bidList);
    });
    socketConnection.on("updateBid", (newBid) => {
      const { highestBid, highestBidder, createdAt } = newBid;
      setBids((prevBids) => {
        // Sao chép danh sách bids cũ
        const updatedBids = prevBids ? [...prevBids.bids] : [];

        // Thêm bid mới vào đầu danh sách
        updatedBids.unshift({
          createdAt: createdAt,
          amount: highestBid,
          username: highestBidder,
        });

        return {
          highest_bid: highestBid,
          numOfBid: updatedBids.length,
          bids: updatedBids,
        };
      });
    });
    socketConnection.on("timeleft", (data) => {
      setTimeLeft(data.timeleft);
    });
    socketConnection.on("bidFailed", (data) => {
      toast({
        variant: "destructive",
        title: ` Have problem on bidding`,
        description: data.message,
      });
    });

    // Cleanup khi component bị unmount
    return () => {
      socketConnection.disconnect();
    };
  }, [storedToken]);

  // Hàm thay đổi giá trị input
  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Kiểm tra nếu người dùng nhập giá trị hợp lệ
    if (value === "" || !isNaN(Number(value))) {
      setBidAmount(value);
    }
  };

  // Hàm khi người dùng nhấn "Place bid"
  const handlePlaceBid = () => {
    const bid = Number(bidAmount);
    const highest_bid = bids ? bids.highest_bid : 0;
    if (bid > highest_bid) {
      socket?.emit("placeBid", {
        slug,
        bidAmount: bid,
        accessToken: storedToken,
      });
      setBidAmount(""); // Cập nhật highest_bid với giá trị bid mới
    }
  };

  return (
    <div className={`${className}`}>
      <h2 className="font-bold text-3xl mt-6">
        <span className="mr-2">US</span>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(bids?.highest_bid ?? 0)}{" "}
      </h2>
      <div className="flex flex-row text-sm text-gray-600 mt-1">
        <p className=""> {bids?.numOfBid} Bids</p>
        <Dot />
        <p className="">
          {"Time left:"} {timeLeft}{" "}
        </p>
      </div>
      <div className="border mt-4 rounded-lg h-[220px] overflow-y-auto">
        <h2 className="text-[18px] font-semibold px-3 py-4 sticky top-0 bg-white z-10 ">
          Bidding Progress
        </h2>
        <div className="px-7">
          {bids &&
            bids.bids.map((bid, index) => (
              <div key={index} className="grid grid-cols-10 gap-4 mt-5">
                <div className="col-span-6 flex flex-col items-start">
                  <h3 className="text-xl font-semibold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(bid.amount)}
                  </h3>
                  <p className="text-sm">{bid.createdAt}</p>
                </div>
                <div className="col-span-4 flex items-center">
                  <p className="text-base font-semibold">{bid.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="block lg:flex lg:flex-row mt-5">
        <Input
          className="appearance-none my-[6px] w-full lg:text-base font-semibold py-6 px-6 rounded-full lg:mr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // p-3 cho padding, appearance-none để không hiển thị spinner
          type="number"
          value={bidAmount}
          onChange={handleBidChange}
          placeholder="Enter your bid"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePlaceBid(); // Gọi hàm handleBid khi nhấn Enter
            }
          }}
          min={bids ? bids.highest_bid + 1 : 0} // Không cho phép giá nhỏ hơn highest_bid
          style={{
            appearance: "none",
            MozAppearance: "textfield",
            WebkitAppearance: "none",
          }}
          disabled={isDisabled}
        />

        <Button
          className="block w-full bg-[#3665F3] my-[6px] rounded-full font-semibold text-base capitalize hover:opacity-80 hover:bg-[#3665F3]"
          size={"xl"}
          onClick={handlePlaceBid}
          disabled={isDisabled}
        >
          Place bid
        </Button>
      </div>

      <Button
        className="block w-full border-[#3665F3] text-[#3665F3] my-[6px] rounded-full font-semibold text-base hover:text-[#3665F3] hover:bg-gray-50"
        size={"xl"}
        variant={"outline"}
        disabled={isDisabled}
      >
        Add To Favorites
      </Button>
    </div>
  );
};

export default BiddingComponent;
