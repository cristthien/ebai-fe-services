"use client";
import { useState } from "react";
import { X, Plus } from "lucide-react"; // Thêm biểu tượng Plus cho nút Thêm Trường
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Khai báo kiểu dữ liệu cho một trường key-value
interface Field {
  key: string;
  value: string;
}

export default function SpecificationInput({
  className,
}: {
  className?: string;
}) {
  // Khai báo state fields là mảng các đối tượng Field
  const [fields, setFields] = useState<Field[]>([{ key: "", value: "" }]);

  // Hàm thay đổi giá trị cho key hoặc value tại chỉ số index
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target; // Destructure name và value từ sự kiện
    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index], // Copy đối tượng hiện tại
      [name]: value, // Cập nhật trường key hoặc value
    };
    setFields(newFields);
  };

  // Hàm thêm một trường mới vào mảng fields
  const addField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  // Hàm xoá trường tại chỉ số index
  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">Specification</h2>
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 mb-4 p-4 border rounded-lg shadow-sm"
        >
          <div className="flex-1">
            <Input
              name="key"
              placeholder="Key"
              value={field.key}
              onChange={(e) => handleChange(index, e)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <Input
              name="value"
              placeholder="Value"
              value={field.value}
              onChange={(e) => handleChange(index, e)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          <Button
            type="button"
            onClick={() => removeField(index)}
            className="ml-2 bg-transparent text-red-500 hover:bg-red-200 p-2 rounded-full"
          >
            <X size={20} />
          </Button>
        </div>
      ))}

      {/* Nút thêm trường với biểu tượng dấu cộng */}
      <Button
        type="button"
        onClick={addField}
        className="flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-full shadow-md"
      >
        <Plus size={20} className="mr-2" />
        Thêm Trường
      </Button>
    </div>
  );
}
