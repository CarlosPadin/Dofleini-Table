import { useEffect, ChangeEvent, useState, forwardRef } from "react";

import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { destruct } from "../../utils";

interface Props {
  permissions: string[];

  // Methods
  onCloseModal: () => void;
}

const PermissionForm = forwardRef(
  ({ permissions, onCloseModal }: Props, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [writingError, setWritingError] = useState(false);
    const [existingError, setExistingError] = useState(false);
    const [errorName, setErrorName] = useState("");

    const onChangeHandler = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setInputValue(event.target.value);
    };

    useEffect(() => {
      const regex = /^[a-zA-Z_]+:[a-zA-Z_]+$/;
      setWritingError(!regex.test(inputValue));
    }, [inputValue]);

    useEffect(() => {
      setExistingError(permissions.includes(inputValue.toUpperCase()));
    }, [inputValue, permissions]);

    useEffect(() => {
      if (existingError) {
        setErrorName("La entidad y el permiso ya existen");
      } else if (writingError) {
        setErrorName('Solo debe usar letras, ":" ó "_"');
      } else if (!existingError && !writingError) {
        setErrorName("");
      }
    }, [existingError, writingError]);

    const onSubmitInput = () => {
      if (!writingError && !existingError) {
        const { entity: inputEntity } = destruct(inputValue.toUpperCase());

        let lastExistingPermissionIndex = -1;
        for (let i = 0; i < permissions.length; i++) {
          const { entity } = destruct(permissions[i]);
          if (entity === inputEntity) {
            lastExistingPermissionIndex = i;
          }
        }

        if (lastExistingPermissionIndex !== -1) {
          permissions.splice(
            lastExistingPermissionIndex + 1,
            0,
            inputValue.toUpperCase()
          );
        } else {
          permissions.push(inputValue.toUpperCase());
        }

        setInputValue("");
        onCloseModal();
      }
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
          Nuevo Permiso
        </Typography>
        <Divider sx={{ mb: 2, backgroundColor: "lightblue" }} />
        <TextField
          variant="outlined"
          autoFocus
          fullWidth
          label="Nuevo Permiso"
          placeholder="ENTIDAD:PERMISO"
          value={inputValue}
          onChange={onChangeHandler}
          helperText={errorName}
          sx={{ mb: 1 }}
        />
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Button
            variant="outlined"
            onClick={onCloseModal}
            disabled={existingError}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSubmitInput}
            disabled={writingError || existingError}
          >
            OK
          </Button>
        </Box>
      </Box>
    );
  }
);

export default PermissionForm;
