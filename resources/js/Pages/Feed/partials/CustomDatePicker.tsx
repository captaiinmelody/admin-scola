import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
    DateValidationError,
    PickerChangeHandlerContext,
} from "@mui/x-date-pickers";

const CustomDatePicker = ({
    label,
    value = dayjs(),
    onChange,
}: {
    label: string;
    value: Dayjs | null;
    onChange:
        | ((
              value: dayjs.Dayjs | null,
              context: PickerChangeHandlerContext<DateValidationError>
          ) => void)
        | undefined;
}) => {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label={label} value={value} onChange={onChange} />
            </LocalizationProvider>
        </div>
    );
};

export default CustomDatePicker;
