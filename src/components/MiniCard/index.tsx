import { ListItemText } from "@mui/material";
import { ITodoDetails } from "../../constants/interface";
import { ListItemMiniCard } from "./MiniCard.style";

interface IProps {
  info: ITodoDetails;
  index: number;
  onClick: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => void;
}
function MiniCard(props: IProps) {
  const { info, index, onClick } = props;
  const { title, todoAt } = info;


  return (
    <ListItemMiniCard onClick={(e) => onClick(e, index)}>
      <ListItemText
        primary={title}
        secondary={`Deadline: ${todoAt}`}
      ></ListItemText>
    </ListItemMiniCard>
  );
}

export default MiniCard;
