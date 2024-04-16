import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ITodoDetails } from "../../constants/interface";
import { TodoStatus } from "../../constants/enum";
import {
  StyledActionButton,
  StyledGridItemCenterAll,
  StyledGirdItemJustifyRighted,
  StyledGridDetailsCardContainer,
} from "./NewCardCreator.style";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { DEFAULT_ADD } from "../../constants/const";

interface IProps {
  onClickAddButton: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    edittedData: ITodoDetails,
  ) => void;
  onClickCancelAddMode: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}
export default function NewCardCreator(props: IProps) {
  const {
    onClickAddButton: onClickAddButtonParentFn,
    onClickCancelAddMode: onClickCancelAddModeParentFn,
  } = props;

  const [details, setDetails] = useState<ITodoDetails>(DEFAULT_ADD);

  const onClickCancelButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClickCancelAddModeParentFn(e);
  };
  const onClickAddButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClickAddButtonParentFn(e, details);
  };

  const updateData = (props: {
    title?: string;
    content?: string;
    todoAt?: string;
    status?: TodoStatus;
  }) => {
    const copydata = { ...details, ...props };
    setDetails(copydata);
  };
  const onChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    updateData({ [name]: value });
  };
  const onChangeSelectStatus = (event: SelectChangeEvent) => {
    event.target.value !== undefined &&
      updateData({ status: +event.target.value });
  };

  const onChangeDatePicker = (newValue: Dayjs | null) => {
    if (newValue !== null)
      updateData({
        todoAt: newValue.format("YYYY/MM/DD"),
      });
  };

  function renderIfEditting() {
    return (
      <StyledGridDetailsCardContainer container>
        <Grid item xs={12}>
          <TextField
            variant="standard"
            fullWidth
            name="title"
            value={details.title}
            onChange={(e) => onChangeTextField(e)}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="standard"
            fullWidth
            multiline
            rows={7}
            name="content"
            defaultValue={details.content}
            onChange={(e) => onChangeTextField(e)}
          ></TextField>
        </Grid>
        <StyledGirdItemJustifyRighted item xs={12}>
          <DatePicker
            defaultValue={dayjs(details.todoAt)}
            onChange={(value) => onChangeDatePicker(value)}
          />
        </StyledGirdItemJustifyRighted>
        <StyledGirdItemJustifyRighted item xs={12}>
          <Select
            value={details.status}
            label="Status"
            onChange={onChangeSelectStatus}
          >
            <MenuItem value={TodoStatus.OPEN}>Open</MenuItem>
            <MenuItem value={TodoStatus.IN_PROGRESS}>In progress</MenuItem>
            <MenuItem value={TodoStatus.RESOLVED}>Resolved</MenuItem>
          </Select>
        </StyledGirdItemJustifyRighted>
        <StyledGridItemCenterAll item xs={12}>
          <StyledActionButton onClick={onClickAddButton}>
            Add
          </StyledActionButton>
          <StyledActionButton onClick={onClickCancelButton}>
            Cancel
          </StyledActionButton>
        </StyledGridItemCenterAll>
      </StyledGridDetailsCardContainer>
    );
  }

  return renderIfEditting();
}

function renderStatusText(status: TodoStatus) {
  switch (status) {
    case TodoStatus.OPEN:
      return "Open";
    case TodoStatus.IN_PROGRESS:
      return "In progress";
    case TodoStatus.RESOLVED:
      return "DONE";
    default:
      return "This status has not been named.";
  }
}
