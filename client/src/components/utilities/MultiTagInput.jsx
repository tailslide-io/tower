import React from 'react'
import { Autocomplete, TextField, Chip } from "@mui/material";

function MultiTagInput({ title, innerText, setter, values }) {

  console.log(values)

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={[]}
      value={values}
      freeSolo
      onChange={(e, value) => setter((state) => value)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          if (option.length === 0) {
            return null
          }

          return (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label={title}
          placeholder={innerText}
        />
      )}
    />
  );
}

export default MultiTagInput