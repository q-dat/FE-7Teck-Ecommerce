import React from 'react';
import Select, { components } from 'react-select';
import { useController, Control } from 'react-hook-form';
import { IoCaretDownSharp } from 'react-icons/io5';

interface Option {
  value: string;
  label: string;
}

interface ReactSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
  onChange?: (value: string | string[] | Option | Option[]) => void;
}

const ReactSelect: React.FC<ReactSelectProps> = ({
  name,
  control,
  options,
  placeholder = '',
  isMulti = false,
  className = '',
  onChange
}) => {
  const {
    field: { onChange: hookOnChange, value, ref }
  } = useController({
    name,
    control,
    defaultValue: isMulti ? [] : '' // Initial default value for multi-select or single-select
  });

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      backgroundColor: 'transparent',
      minHeight: '46px',
      fontSize: '14px',
      boxShadow: 'none',
      borderRadius: '0'
    }),
    option: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      color: '#000',
      fontSize: '14px',
      cursor: 'pointer'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      whiteSpace: 'nowrap',
      color: '#a92d30',
      fontWeight: 'bold',
      cursor: 'pointer'
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? 'white' : 'black',
      whiteSpace: 'nowrap',
      flexGrow: 1
    })
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <IoCaretDownSharp className="text-primary" />
      </components.DropdownIndicator>
    );
  };

  // Handle value changes
  const handleChange = (val: any) => {
    if (isMulti) {
      hookOnChange(val ? (val as Option[]).map(option => option.value) : []);
      if (onChange) onChange(val ? (val as Option[]) : []);
    } else {
      const selectedValue = (val as Option)?.value ?? null;
      hookOnChange(selectedValue);
      if (onChange) onChange(selectedValue);
    }
  };

  return (
    <Select
      ref={ref}
      value={
        isMulti
          ? options.filter(option => (value as string[]).includes(option.value))
          : options.find(option => option.value === value) || null
      }
      onChange={handleChange}
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
      className={`my-2 w-full rounded-md border border-gray-50 bg-white text-black hover:border-gray-900 hover:border-opacity-50 focus:border-primary focus:outline-none ${className}`}
      styles={customStyles}
      components={{ DropdownIndicator }}
    />
  );
};

export default ReactSelect;
