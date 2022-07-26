import React from 'react'
import { Autocomplete, TextField, Chip } from "@mui/material";

function MultiTagInput({ setter, values }) {

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
          label="Whitelisted Users"
          placeholder="Add a UUID"
        />
      )}
    />
  );
}

export default MultiTagInput