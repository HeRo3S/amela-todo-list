import {
  Button,
  Grid,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";
import { TodoStatus } from "../../constants/enum";

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

interface IStyledTypographyStatusProps extends TypographyProps {
  status: TodoStatus;
}
function renderStatusColor(status: TodoStatus): string {
  console.log(status);
  switch (status) {
    case TodoStatus.OPEN:
      return "#a0d8b9";
    case TodoStatus.IN_PROGRESS:
      return "#c0e4f5";
    case TodoStatus.RESOLVED:
      return "8250df";
    default:
      return "This case has not choose color";
  }
}
export const StyledTypographyStatus = styled(
  Typography,
)<IStyledTypographyStatusProps>(({ status }) => ({
  padding: "20px 30px",
  border: "solid 1px",
  borderRadius: "4px",
  backgroundColor: renderStatusColor(status),
}));

export const StyledActionButton = styled(Button)({
  minWidth: "100px",
});
