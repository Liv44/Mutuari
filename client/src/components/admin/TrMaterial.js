import {
  Box,
  Textarea,
  Tr,
  Td,
  Button,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import axios from "axios";

export const TrMaterial = ({ material }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [modification, setModification] = useState(false);
  const [materialName, setMaterialName] = useState(material.name);
  const [materialDescription, setMaterialDescription] = useState(
    material.description
  );
  const modify = () => {
    setModification(true);
  };
  const validate = () => {
    axios
      .put("/api/materials/modify/" + material.id, {
        name: materialName,
        description: materialDescription,
      })
      .then((res) => {});
    setModification(false);
  };
  const deleteMaterial = () => {
    axios.delete("/api/materials/delete/" + material.id).then((res) => {
      if (res.data.deleted === true) {
        onClose();
      }
    });
  };
  return (
    <Tr>
      {!modification ? (
        <Td fontWeight="semibold">{material.name}</Td>
      ) : (
        <Td>
          <Input
            placeholder="name"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
          ></Input>
        </Td>
      )}
      {!modification ? (
        <Td date fontWeight="semibold">
          {material.description}
        </Td>
      ) : (
        <Td>
          <Textarea
            placeholder="description"
            value={materialDescription}
            onChange={(e) => setMaterialDescription(e.target.value)}
          ></Textarea>
        </Td>
      )}

      <Td>
        {!modification ? (
          <Button
            onClick={() => {
              modify(material.id);
            }}
            backgroundColor="purple"
            color="white"
          >
            Modifier
          </Button>
        ) : (
          <Box>
            <Button onClick={validate}>Valider</Button>
            <Button
              onClick={() => {
                setModification(false);
              }}
            >
              Annuler
            </Button>
          </Box>
        )}
      </Td>
      <Td>
        <Button backgroundColor="red" color="white" onClick={onOpen}>
          Supprimer
        </Button>
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Supprimer le matériel
              </AlertDialogHeader>

              <AlertDialogBody>
                Êtes-vous sûr de supprimer ce matériel ?{" "}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose} ref={cancelRef}>
                  Fermer
                </Button>
                <Button
                  backgroundColor="red"
                  onClick={(onClose, deleteMaterial)}
                  ml={3}
                  color="white"
                >
                  Supprimer
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Td>
    </Tr>
  );
};
