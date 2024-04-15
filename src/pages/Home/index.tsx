import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import todosMockdata from "./Home.mockdata";
import DetailsCard from "../../components/DetailsCard";
import MiniCard from "../../components/MiniCard";
import { useState } from "react";
import { StyledGridHomeContainer } from "./Home.style";
import { ITodoDetails } from "../../constants/interface";
import NewCardCreator from "../../components/NewCardCreator";
import { ListItemMiniCard } from "../../components/MiniCard/MiniCard.style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const [data, setData] = useState(todosMockdata);
  const [searchInputData, setSearchInputData] = useState("");
  const [selectingTodoID, setSelectingTodoID] = useState(0);
  const [isAddingCard, setAddingCard] = useState(false);

  function onClickMiniCard(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) {
    setSelectingTodoID(index);
    if (isAddingCard) setAddingCard(false);
  }

  function onClickAddNewCardListItem(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    setAddingCard(true);
  }

  function onChangeSearchBar(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputData(e.target.value);
  }

  function onClickCancelAddMode(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    setAddingCard(false);
  }

  function onClickAddButtonNewCardCreator(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    edittedData: ITodoDetails,
  ): void {
    const copyData = [...data, edittedData];
    setData(copyData);
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

  const renderMiniCards = () => {
    const renderData = data.filter((e) => e.title.includes(searchInputData));
    return renderData.length > 0 ? (
      renderData.map((t, i) => (
        <MiniCard key={i} info={t} index={i} onClick={onClickMiniCard} />
      ))
    ) : (
      <ListItem>
        <ListItemText>Nothing is here</ListItemText>
      </ListItem>
    );
  };

  return (
    <StyledGridHomeContainer container>
      <Grid item xs={3}>
        <List>
          <ListItemMiniCard onClick={onClickAddNewCardListItem}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText>New Card</ListItemText>
          </ListItemMiniCard>
          <ListItemMiniCard>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <TextField
              placeholder="Search..."
              onChange={(e) => onChangeSearchBar(e)}
            />
          </ListItemMiniCard>
          <Divider />
          {
            //     data.length > 0 ? (
            //   data.map((t, i) => (
            //     <MiniCard key={i} info={t} index={i} onClick={onClickMiniCard} />
            //   ))
            // ) : (
            //   <ListItem>
            //     <ListItemText>Nothing is here</ListItemText>
            //   </ListItem>
            // )
            renderMiniCards()
          }
        </List>
      </Grid>
      <Grid item xs display="flex">
        {isAddingCard ? (
          <NewCardCreator
            onClickAddButton={onClickAddButtonNewCardCreator}
            onClickCancelAddMode={onClickCancelAddMode}
          />
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
