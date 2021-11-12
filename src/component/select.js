import React, { useState } from 'react';
import Select from 'react-select';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const options = [
    { value: 'Entrées', label: 'Entrées' },
    { value: 'Repas', label: 'Repas' },
    { value: 'Boissons', label: 'Boissons' },
    { value: 'Desserts', label: 'Desserts' },
  ];

const HandleSelect = (props)=> {
  const {selectedOption, setSelectedOption} = props;

    return(
        <div className="App">
        <Select
          defaultValue={'Boissons' ?? selectedOption.value}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
    )
}
export default HandleSelect;

