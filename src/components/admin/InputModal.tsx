import React, { forwardRef } from 'react';
import { Input } from 'react-daisyui';

interface InputModalProps {
  placeholder: string;
  type: string;
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  className?: React.ReactNode;
}

const InputModal = forwardRef<HTMLInputElement, InputModalProps>(
  ({ placeholder, type, value, name, onChange, multiple, className }, ref) => {
    return (
      <div className="mb-4 w-full border-b">
        <Input
          ref={ref}
          value={value}
          type={type}
          name={name}
          className={`w-full rounded-md border-none bg-white p-0 text-sm font-light text-black placeholder-black focus:outline-none dark:bg-transparent dark:text-white dark:placeholder-white ${className} `}
          placeholder={placeholder}
          onChange={onChange}
          style={{
            outline: 'none',
            boxShadow: 'none'
          }}
          multiple={multiple}
        />
      </div>
    );
  }
);

export default InputModal;
