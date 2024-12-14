"use client";
import { useState } from "react";
import { X } from "lucide-react"; // Import biểu tượng X từ Lucide
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Khai báo kiểu dữ liệu cho một trường key-value
interface Field {
  key: string;
  value: string;
}

export default function ProductForm() {
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

  // Hàm submit form
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(fields);
  };

  return (
    <div className="p-4">
      <form onSubmit={submitForm}>
        {fields.map((field, index) => (
          <div key={index} className="flex space-x-2 mb-4">
            <Input
              name="key"
              placeholder="Key"
              value={field.key}
              onChange={(e) => handleChange(index, e)}
              className="flex-1"
            />
            <Input
              name="value"
              placeholder="Value"
              value={field.value}
              onChange={(e) => handleChange(index, e)}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => removeField(index)}
              className="ml-2 bg-transparent text-red-500"
            >
              <X size={20} />
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addField} className="mb-4">
          Thêm Trường
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          Gửi
        </Button>
      </form>
    </div>
  );
}
