import { Button, Grid, styled } from "@mui/material";

export const StyledGridDetailsCardContainer = styled(Grid)({
  alignSelf: "center",
  height: "70%",
  maxHeight: "600px",
  margin: "0px 3rem",
  padding: "2rem 2rem",
  border: "solid 1px",
  borderRadius: "5px",
  display: "grid",
  gridTemplateRows: "3fr 5fr 1fr 1fr",
});

export const StyledGirdItemJustifyRighted = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
});

export const StyledGridItemCenterAll = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledActionButton = styled(Button)({
  minWidth: "100px",
});
