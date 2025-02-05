import {
  Card as MUICard,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

interface CardProps {
  image: string;
  title: string;
  details: { label: string; value: string | number }[];
}

export const Card = ({ image, title, details }: CardProps) => {
  return (
    <MUICard>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {details.map((detail) => (
          <Typography key={detail.label}>
            <strong>{detail.label}:</strong> {detail.value}
          </Typography>
        ))}
      </CardContent>
    </MUICard>
  );
};
