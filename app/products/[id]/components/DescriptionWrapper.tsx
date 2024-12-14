// Import necessary libraries and external components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import internal components
// Import styles
// Fetch or get data

interface DescriptionWrapperProps {
  className?: string;
  description: string;
}

const DescriptionWrapper: React.FC<DescriptionWrapperProps> = ({
  className,
  description,
}) => {
  return (
    <Dialog>
      <DialogTrigger className={`${className}`}>
        <span className="line-clamp-2 text-left">{description}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Description</DialogTitle>
          <DialogDescription className="border border-white rounded-full">
            <p>{description}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionWrapper;
