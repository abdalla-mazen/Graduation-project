import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
    error?: boolean;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn("group flex", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          defaultCountry="EG"
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    placeholder="Phone number"
    className={cn(
      "dark:disabled:bg-zinc-800 dark:disabled:opacity-50 border border-s-0 border-zinc-300 dark:border-zinc-600 rounded-[0.625rem] rounded-s-none dark:disabled:text-zinc-600 placeholder:text-zinc-400 transition-colors",
      "group-hover:border-zinc-400 dark:group-hover:border-zinc-500 ",
      " group-focus-within:!border-blue-600 group-focus-within:ring-0 group-focus-within:ring-blue-600 dark:group-focus-within:!border-blue-400 dark:group-focus-within:ring-0 dark:group-focus-within:ring-blue-400 ",
      className
    )}
    {...props}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value?: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-2 disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:opacity-50 dark:disabled:opacity-50 px-3 py-1 border border-zinc-300 dark:border-zinc-600 border-r-0 rounded-e-none rounded-s-lg disabled:text-zinc-400 dark:disabled:text-zinc-600 transition-colors",
            "group-hover:border-zinc-400 ",
            "group-focus-within:!border-blue-600 group-focus-within:ring-0 group-focus-within:ring-blue-600"
          )}
        >
          <FlagComponent
            country={selectedCountry!}
            countryName={selectedCountry!}
          />
          <span className="min-w-[36px] font-medium text-sm">
            {selectedCountry
              ? `+${RPNInput.getCountryCallingCode(selectedCountry)}`
              : ""}
          </span>
          <ChevronsUpDown
            className={cn(
              "opacity-50 size-4",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="bg-white p-0 w-[300px]">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry!}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-foreground/50 text-sm">
        {`+${RPNInput.getCountryCallingCode(country)}`}
      </span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
