import {
  Stack,
  Typography,
  Button,
  Divider,
  TextField,
  OutlinedInput,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import { categories, languages, ages, genders } from "../../../fields/filters";
import { RiArrowDownSLine } from "@remixicon/react";
import { useSearchContext } from "../../../contexts/searchContext";
import { useState, useMemo } from "react";
import { type Category, type Skill } from "../../../types/Search";

const FilterSideBar = () => {
  const { filters, updateFilter, clearAllFilter } = useSearchContext();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const selectedCategorieIds = useMemo(
    () => selectedCategories.map((itm) => itm.id),
    [selectedCategories]
  );
  const skillOptions = selectedCategorieIds.reduce((memo, id): any => {
    let skillsFound: any = categories.find((cate) => cate.id === id)?.skills;
    return [...memo, ...skillsFound];
  }, []);

  const handleCheckbox = (event: any) => {
    const { name, value } = event.target;
    let languageSet = new Set(filters?.languages);
    if (languageSet.has(value)) {
      languageSet.delete(value);
    } else {
      languageSet.add(value);
    }
    updateFilter(name, [...languageSet]);
  };

  const renderLanguage = () => {
    return languages?.map((lang) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "#0278b8",
                "&.Mui-checked": {
                  color: "#0278b8",
                },
              }}
              name={`languages`}
              value={lang.locale}
              checked={filters?.languages?.includes(lang.locale)}
              onChange={handleCheckbox}
            />
          }
          label={lang.lang}
          key={lang.locale}
          sx={{
            ".MuiFormControlLabel-label": {
              fontSize: "13px",
            },
          }}
        />
      );
    });
  };

  const renderAgeRange = () => {
    return ages.map((range) => {
      return (
        <FormControlLabel
          key={range.id}
          value={range.id}
          control={<Radio />}
          label={range.range}
        />
      );
    });
  };

  const renderGender = () => {
    return genders.map((gender) => {
      return (
        <FormControlLabel
          key={gender.id}
          control={<Radio />}
          label={gender.text}
          value={gender.id}
        />
      );
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    updateFilter(name, value);
  };

  return (
    <Stack
      sx={{
        width: "300px",
        bgcolor: "#f3f5f9",
        borderRadius: "8px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
      direction="column"
      alignItems="flex-start"
      gap={1}
      p={2}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="w-full"
      >
        <Typography>Search</Typography>
        <Button size="small" variant="outlined" onClick={clearAllFilter}>
          Clear All
        </Button>
      </Stack>
      {/* dropdown */}
      <Stack direction="column" className="w-full">
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="#1d7da8"
          mb={2}
          mt={2}
        >
          Categories
        </Typography>
        <Stack>
          <Autocomplete
            multiple
            id="tags-outlined"
            value={selectedCategories}
            onChange={(event, newValue) => {
              setSelectedCategories([...newValue]);
              const ids = newValue.map((cate) => cate.id);
              updateFilter("categories", ids);
            }}
            options={categories}
            getOptionLabel={(option) => option.category}
            defaultValue={[categories[0]]}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
            sx={{
              ".MuiOutlinedInput-root": {
                padding: "4px 8px !important",
              },
            }}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 8],
                    },
                  },
                ],
                sx: {
                  "& .MuiAutocomplete-option": {
                    fontSize: "13px",
                  },
                },
              },
            }}
          />
        </Stack>
      </Stack>
      {/* skill */}
      <Stack direction="column" className="w-full" mb={2}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="#1d7da8"
          mb={2}
          mt={2}
        >
          Skills by Category
        </Typography>
        <Stack>
          <Autocomplete
            multiple
            options={skillOptions}
            groupBy={(option) => {
              return option?.categoryId;
            }}
            getOptionLabel={(option) => {
              return option?.text;
            }}
            onChange={(event, newValue) => {
              const ids = newValue.map((cate) => cate.id);
              updateFilter("skills", ids);
            }}
            renderInput={(params) => <TextField {...params} />}
            sx={{
              ".MuiOutlinedInput-root": {
                padding: "4px 8px !important",
              },
            }}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 8],
                    },
                  },
                ],
                sx: {
                  "& .MuiAutocomplete-option": {
                    fontSize: "13px",
                  },
                },
              },
            }}
          />
        </Stack>
      </Stack>
      {/* keyword search */}
      <Stack direction="column" className="w-full" mb={2}>
        <Stack>
          <OutlinedInput
            name="keywordSearch"
            value={filters?.keywordSearch}
            onChange={handleChange}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
              padding: "8px",
            }}
            sx={{
              ".MuiOutlinedInput-input": {
                padding: "10px 14px",
                fontSize: "13px",
              },
            }}
            placeholder="Search name, skill, location ..."
          />
        </Stack>
      </Stack>
      <Divider className="w-full" />
      <Stack direction="column" className="w-full">
        <Accordion
          sx={{
            backgroundColor: "unset",
            boxShadow: "unset",
          }}
        >
          <AccordionSummary
            expandIcon={<RiArrowDownSLine />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="#1d7da8">
              Language
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <FormGroup>{renderLanguage()}</FormGroup>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Divider className="w-full" />

      <Stack direction="column" className="w-full">
        <Accordion
          sx={{
            backgroundColor: "unset",
            boxShadow: "unset",
          }}
        >
          <AccordionSummary
            expandIcon={<RiArrowDownSLine />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="#1d7da8">
              Age
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <FormControl
              sx={{
                ".MuiFormGroup-root": {
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="all-age"
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: "13px",
                  },
                }}
                name="age"
                value={filters?.age}
                onChange={handleChange}
              >
                {renderAgeRange()}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Divider className="w-full" />
      <Stack direction="column" className="w-full">
        <Accordion
          sx={{
            backgroundColor: "unset",
            boxShadow: "unset",
          }}
        >
          <AccordionSummary
            expandIcon={<RiArrowDownSLine />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="#1d7da8">
              Gender
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="all"
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: "13px",
                  },
                }}
                name="gender"
                value={filters?.gender}
                onChange={handleChange}
              >
                {renderGender()}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Divider className="w-full" />
    </Stack>
  );
};

export default FilterSideBar;
