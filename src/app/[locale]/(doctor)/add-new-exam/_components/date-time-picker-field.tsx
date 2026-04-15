"use client";

import { format, isValid, parseISO, set, startOfDay } from "date-fns";
import { CalendarDays, ChevronDown, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, index) => index);
const MINUTES = Array.from({ length: 60 }, (_, index) => index);

type DateTimePickerFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  defaultHour?: number;
  defaultMinute?: number;
  minDateTime?: string;
};

function parseDateTime(value: string) {
  if (!value) {
    return undefined;
  }

  const parsedDate = parseISO(value);
  return isValid(parsedDate) ? parsedDate : undefined;
}

function formatDateTimeValue(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
}

function padValue(value: number) {
  return value.toString().padStart(2, "0");
}

export default function DateTimePickerField({
  id,
  label,
  value,
  onChange,
  placeholder = "Pick a date and time",
  helperText,
  defaultHour = 9,
  defaultMinute = 0,
  minDateTime,
}: DateTimePickerFieldProps) {
  const selectedDate = parseDateTime(value);
  const minimumDate = parseDateTime(minDateTime ?? "");

  const baseDate = selectedDate
    ? selectedDate
    : set(new Date(), {
        hours: defaultHour,
        minutes: defaultMinute,
        seconds: 0,
        milliseconds: 0,
      });

  const hourValue = padValue(selectedDate?.getHours() ?? defaultHour);
  const minuteValue = padValue(selectedDate?.getMinutes() ?? defaultMinute);

  const applyNextValue = (nextDate: Date) => {
    const normalizedDate =
      minimumDate && nextDate < minimumDate ? minimumDate : nextDate;

    onChange(formatDateTimeValue(normalizedDate));
  };

  const handleDateSelect = (date?: Date) => {
    if (!date) {
      return;
    }

    applyNextValue(
      set(date, {
        hours: baseDate.getHours(),
        minutes: baseDate.getMinutes(),
        seconds: 0,
        milliseconds: 0,
      })
    );
  };

  const handleHourChange = (hour: string) => {
    applyNextValue(
      set(baseDate, {
        hours: Number(hour),
        seconds: 0,
        milliseconds: 0,
      })
    );
  };

  const handleMinuteChange = (minute: string) => {
    applyNextValue(
      set(baseDate, {
        minutes: Number(minute),
        seconds: 0,
        milliseconds: 0,
      })
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-zinc-800">
        {label}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            className={cn(
              "h-auto min-h-12 justify-between rounded-xl border-zinc-200 bg-white px-4 py-3 text-left hover:bg-zinc-50",
              selectedDate ? "text-zinc-900" : "text-zinc-500"
            )}
          >
            <CalendarDays className="h-4 w-4 shrink-0 text-zinc-400" />
            <span className="flex min-w-0 flex-1 flex-col items-start text-left">
              <span className="truncate text-sm font-medium">
                {selectedDate ? format(selectedDate, "PPP") : placeholder}
              </span>
              <span className="text-xs text-zinc-500">
                {selectedDate ? format(selectedDate, "HH:mm") : "Select date then time"}
              </span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[360px] rounded-2xl border-zinc-200 p-0 shadow-xl"
        >
          <div className="border-b border-zinc-100 px-4 py-3">
            <p className="text-sm font-semibold text-zinc-900">{label}</p>
            <p className="mt-1 text-xs text-zinc-500">
              Choose the day first, then fine-tune the exact time.
            </p>
          </div>

          <div className="p-3">
            <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={minimumDate ? { before: startOfDay(minimumDate) } : undefined}
                className="mx-auto"
              />
            </div>
          </div>

          <div className="grid gap-3 border-t border-zinc-100 p-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                <Clock3 className="h-3.5 w-3.5" />
                Hour
              </Label>
              <Select value={hourValue} onValueChange={handleHourChange}>
                <SelectTrigger className="h-11 rounded-xl border-zinc-200 bg-white">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {HOURS.map((hour) => (
                    <SelectItem key={hour} value={padValue(hour)}>
                      {padValue(hour)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Minute
              </Label>
              <Select value={minuteValue} onValueChange={handleMinuteChange}>
                <SelectTrigger className="h-11 rounded-xl border-zinc-200 bg-white">
                  <SelectValue placeholder="Minute" />
                </SelectTrigger>
                <SelectContent>
                  {MINUTES.map((minute) => (
                    <SelectItem key={minute} value={padValue(minute)}>
                      {padValue(minute)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {helperText ? <p className="text-sm text-zinc-500">{helperText}</p> : null}
    </div>
  );
}
