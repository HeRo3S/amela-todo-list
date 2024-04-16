import {
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ITodoDetails } from "../../constants/interface";
import { TodoStatus } from "../../constants/enum";
import {
  StyledActionButton,
  StyledGridItemCenterAll,
  StyledGirdItemJustifyRighted,
  StyledGridDetailsCardContainer,
  StyledTypographyStatus,
} from "./DetailsCard.style";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { DEFAULT_DETAILS } from "../../constants/const";

interface IProps {
  todo: ITodoDetails | undefined;
  onClickSaveButton: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    edittedData: ITodoDetails,
  ) => void;
  onClickDeleteButton: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}
export default function DetailsCard(props: IProps) {
  const {
    todo,
    onClickSaveButton: onClickSaveButtonParentFn,
    onClickDeleteButton: onClickDeleteButtonParentFn,
  } = props;

  const [details, setDetails] = useState<ITodoDetails>(DEFAULT_DETAILS);
  const [isEditting, setEditting] = useState(false);

  useEffect(() => {
    todo ? setDetails(todo) : setDetails(DEFAULT_DETAILS);
  }, [todo]);

  const onClickEditButton = () => {
    setEditting(true);
  };
  const onClickSaveButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClickSaveButtonParentFn(e, details);
    setEditting(false);
  };
  const onClickDeleteButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClickDeleteButtonParentFn(e);
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
          <StyledActionButton onClick={onClickSaveButton}>
            Save
          </StyledActionButton>
          <StyledActionButton onClick={onClickDeleteButton}>
            Delete
          </StyledActionButton>
        </StyledGridItemCenterAll>
      </StyledGridDetailsCardContainer>
    );
  }

  function renderIfNotEditting() {
    return (
      <StyledGridDetailsCardContainer container>
        <Grid item xs={12}>
          <Typography variant="h4">{details.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{details.content}</Typography>
        </Grid>
        <StyledGirdItemJustifyRighted item xs={12}>
          <Typography variant="body1">
            {dayjs(details.todoAt).format("DD/MM/YYYY")}
          </Typography>
        </StyledGirdItemJustifyRighted>
        <StyledGirdItemJustifyRighted item xs={12}>
          <StyledTypographyStatus status={details.status} variant="body1">
            {renderStatusText(details.status)}
          </StyledTypographyStatus>
        </StyledGirdItemJustifyRighted>
        <StyledGridItemCenterAll item xs={12}>
          <StyledActionButton onClick={onClickEditButton}>
            Edit
          </StyledActionButton>
          <StyledActionButton onClick={onClickDeleteButton}>
            Delete
          </StyledActionButton>
        </StyledGridItemCenterAll>
      </StyledGridDetailsCardContainer>
    );
  }

  if (isEditting) return renderIfEditting();
  return renderIfNotEditting();
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
