import { useState, useEffect } from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
import { fetchDogBreeds, fetchDogDetails, searchDogs } from "../../apis";
import { Dog, SortOrder, SearchParams } from "../../types";
import { DogCard } from "../../components/dogs/DogCard";
import { Button } from "../../components/ui/Button";
import { SelectDropdown } from "../../components/ui/SelectDropDown";

interface SearchDogsProps {
  favoriteDogs: string[];
  toggleFavorite: (id: string) => void;
}

export const SearchDogs = ({
  favoriteDogs,
  toggleFavorite,
}: SearchDogsProps) => {
  const SORT_OPTIONS = [
    { label: "Breed (A-Z)", value: { field: "breed", order: "asc" } },
    { label: "Breed (Z-A)", value: { field: "breed", order: "desc" } },
    { label: "Name (A-Z)", value: { field: "name", order: "asc" } },
    { label: "Name (Z-A)", value: { field: "name", order: "desc" } },
    { label: "Age (Young-Old)", value: { field: "age", order: "asc" } },
    { label: "Age (Old-Young)", value: { field: "age", order: "desc" } },
  ];

  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortField, setSortField] = useState<"breed" | "name" | "age">("breed");
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  useEffect(() => {
    fetchDogBreeds()
      .then(setBreeds)
      .catch((error) => console.error("Error fetching breeds:", error));
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const params: SearchParams = {
          breeds: selectedBreed ? [selectedBreed] : undefined,
          size: 10,
          from: (page - 1) * 10,
          sortField,
          sortOrder,
        };

        const resultIds = await searchDogs(params);

        setTotalResults(resultIds.total);
        setDogs(
          resultIds.resultIds.length > 0
            ? await fetchDogDetails(resultIds.resultIds)
            : []
        );
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };

    fetchDogs();
  }, [selectedBreed, page, sortField, sortOrder]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Browse Available Dogs
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        alignItems="center"
        mb={3}
      >
        <SelectDropdown
          label="Breed"
          value={selectedBreed}
          options={breeds}
          onChange={setSelectedBreed}
        />
        <SelectDropdown
          label="Sort By"
          value={selectedSort.label}
          options={SORT_OPTIONS.map((option) => option.label)}
          onChange={(label) => {
            const selectedOption = SORT_OPTIONS.find(
              (option) => option.label === label
            );
            if (selectedOption) {
              setSelectedSort(selectedOption);
              setSortField(
                selectedOption.value.field as "breed" | "name" | "age"
              );
              setSortOrder(selectedOption.value.order as SortOrder);
            }
          }}
        />

        <Button
          label="Reset"
          onClick={() => {
            setSelectedBreed("");
            setPage(1);
            setSelectedSort(SORT_OPTIONS[0]);
            setSortField(
              SORT_OPTIONS[0].value.field as "breed" | "name" | "age"
            );
            setSortOrder(SORT_OPTIONS[0].value.order as SortOrder);
          }}
          variant="contained"
        />
      </Box>

      {totalResults > 0 && (
        <Typography variant="h6" mb={2}>
          Total: {totalResults}
        </Typography>
      )}

      <Grid container spacing={2}>
        {dogs.length > 0 ? (
          dogs.map((dog) => (
            <Grid item xs={12} sm={6} md={4} key={dog.id}>
              <DogCard
                dog={dog}
                isFavorited={favoriteDogs.includes(dog.id)}
                onToggleFavorite={() => toggleFavorite(dog.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" width="100%">
            No dogs found. Try a different search.
          </Typography>
        )}
      </Grid>

      {totalResults > 0 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalResults / 10)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      )}
    </Box>
  );
};
