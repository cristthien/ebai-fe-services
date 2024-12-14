"use client";
// Import necessary libraries and external components

// Import internal components
// Import styles
// Fetch or get data

interface DesciptionRenderProps {
  className?: string;
  description: string;
}

const DesciptionRender: React.FC<DesciptionRenderProps> = ({
  className,
  description,
}) => {
  return <div className={className}>{description}</div>;
};

export default DesciptionRender;
