import { ChangeEvent, forwardRef, useEffect, useState } from "react";

import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { IRole } from "../../interfaces";
import mongoose from "mongoose";

interface Props {
    roles: IRole[];
    permissions: string[];

    // Methods
    onCloseModal: () => void;
}

const RoleForm = forwardRef(({roles, permissions, onCloseModal}: Props, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [existingError, setExistingError] = useState(false);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setExistingError(roles.some(role => role.name === inputValue));
}, [inputValue, roles]);

  const onSubmitInput = () => {
    const readPermissions = permissions.filter(permission => permission.split(':')[1].includes('READ'));

    if (!existingError && inputValue.length > 0) {
        roles.push({
            id: new mongoose.Types.ObjectId().toString(),
            name: inputValue,
            permissions: readPermissions,
        })

        setInputValue('');
        onCloseModal();
    }
    return;
  };

  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        boxShadow: 24,
        borderRadius: "7px",
        p: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" display="flex" justifyContent="center">
        Nuevo Role
      </Typography>
      <Divider sx={{ mb: 2, backgroundColor: "lightblue" }} />
      <TextField
        variant="outlined"
        autoFocus
        fullWidth
        label="Nuevo Role"
        placeholder="Role"
        value={inputValue}
        onChange={onChangeHandler}
        helperText={existingError && 'Ya existe este Role'}
        sx={{ mb: 1 }}
      />
      <Button
        variant="contained"
        onClick={onSubmitInput}
        disabled={existingError}
        sx={{ display: "flex", justifyContent: "flex-end", ml: "87%", borderRadius: '2px' }}
      >
        OK
      </Button>
    </Box>
  );
});

export default RoleForm;
