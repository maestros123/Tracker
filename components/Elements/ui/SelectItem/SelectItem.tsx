import React from 'react';
import Select, { StylesConfig, OnChangeValue } from "react-select";


interface OptionType  {
    value: string;
    label: string;
}
interface SelectProps {
    options: OptionType[];
    selectedOption: OnChangeValue<OptionType, false>;
    setSelectedOption: (option: OnChangeValue<OptionType, false>) => void;
}

const SelectItem: React.FC<SelectProps> = ({options, selectedOption, setSelectedOption}) => {

    const customStyles: StylesConfig<any, false> = {
        container: (base) => ({
            ...base,
            width: '100%',
            height: '100%',
            display: 'flex'
        }),
        control: (provided, state) => ({
            ...provided,
            border: "none",
            background: 'inherit',
            overflow: 'hidden',
            outline: 'none',
            width: '100%',
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none'
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: '0'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#000'
        }),
        menu: (provided, state) => ({
            ...provided,
            width: '100%'
        }),
        singleValue: (provided, state) => ({
            ...provided,
            width: '100%',
            color: '#000'


        }),
        placeholder: (provided, state) => ({
            ...provided,
            color : '#ffffff'
        })
    };


    return (
        <Select
            id="my-custom-id"
            styles={customStyles}
            classNamePrefix="select"
            value={selectedOption}
            onChange={setSelectedOption}
            name="button"
            options={options}
            placeholder={selectedOption?.label}
        />
    );
};

export default SelectItem;