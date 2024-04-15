import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import todosMockdata from "./Home.mockdata";
import DetailsCard from "../../components/DetailsCard";
import MiniCard from "../../components/MiniCard";
import { useState } from "react";
import { StyledGridHomeContainer } from "./Home.style";
import { ITodoDetails } from "../../constants/interface";
import NewCardCreator from "../../components/NewCardCreator";

export default function Home() {
  const [data, setData] = useState(todosMockdata);
  const [selectingTodoID, setSelectingTodoID] = useState(0);
  const [isAddingCard, setAddingCard] = useState(false);

  function onClickMiniCard(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) {
    setSelectingTodoID(index);
    if (isAddingCard) setAddingCard(false);
  }

  function onClickAddNewCard(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    setAddingCard(true);
  }

  function onClickSaveButtonDetailsCard(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    edittedData: ITodoDetails,
  ): void {
    const copyData = [...data];
    copyData[selectingTodoID] = { ...edittedData };
    setData(copyData);
  }

  function onClickDeleteButtonDetailesCard(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    const newData = data.filter((e, i) => i !== selectingTodoID);
    if (selectingTodoID >= newData.length)
      setSelectingTodoID(newData.length - 1);
    setData(newData);
    console.log(data);
  }

  return (
    <StyledGridHomeContainer container>
      <Grid item xs={3}>
        <List>
          <ListItemIcon></ListItemIcon>
          <ListItemText>New Card</ListItemText>
        </List>
        <List>
          {data.length > 0 ? (
            data.map((t, i) => (
              <MiniCard key={i} info={t} index={i} onClick={onClickMiniCard} />
            ))
          ) : (
            <ListItem>
              <ListItemText>Nothing is here</ListItemText>
            </ListItem>
          )}
        </List>
      </Grid>
      <Grid item xs display="flex">
        {isAddingCard ? (
          <NewCardCreator />
        ) : (
          <DetailsCard
            todo={data[selectingTodoID]}
            onClickSaveButton={onClickSaveButtonDetailsCard}
            onClickDeleteButton={onClickDeleteButtonDetailesCard}
          />
        )}
      </Grid>
    </StyledGridHomeContainer>
  );
}
