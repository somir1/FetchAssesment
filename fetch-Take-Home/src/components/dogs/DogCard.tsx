import { Card } from "../ui/Card";
import { Dog } from "../../types";
import { IconButton, Box } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface DogCardProps {
  dog: Dog;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export const DogCard = ({
  dog,
  isFavorited,
  onToggleFavorite,
}: DogCardProps) => {
  return (
    <Box position="relative">
      <Card
        image={dog.img}
        title={dog.name}
        details={[
          { label: "Breed", value: dog.breed },
          { label: "Age", value: dog.age },
          { label: "Zip Code", value: dog.zip_code },
        ]}
      />
      <IconButton
        onClick={onToggleFavorite}
        color="error"
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        {isFavorited ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Box>
  );
};
