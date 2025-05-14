import { Stack, Typography } from "@mui/material";
import AccountSettings from "../users/AccountSettings";

const Header = () => {
  const categories = [
    { id: 1, text: "Home", link: "" },
    { id: 2, text: "How it works", link: "" },
    { id: 3, text: "About us", link: "" },
    { id: 4, text: "Contact", link: "" },
  ];

  const renderCategories = () => {
    return categories.map((cate) => {
      return (
        <Typography key={cate.id} variant="subtitle1" sx={{ cursor: "pointer" }}>
          {cate.text}
        </Typography>
      );
    });
  };

  return (
    <header
      className="py-2 px-10 text-center flex items-center justify-between"
      style={{
        background: "#F4F4F4",
        borderBottom: '1px solid #e4eaec',
      }}
    >
      <Typography
      fontWeight="bold"
        variant="h5"
        sx={{
          color: "#2f7da7",
        }}
      >
        SkillSwap
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={5}
      >
        {renderCategories()}
      </Stack>
      <AccountSettings />
    </header>
  );
};

export default Header;
