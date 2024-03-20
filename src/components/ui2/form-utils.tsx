import { Checkbox } from "@/components/ui/checkbox";

export const FormCheckbox = (p: {
    label: string;
    checked?: boolean;
    onChange: (x: boolean) => void;
}) => {
    return (
        <div className="items-top mt-8 flex h-10 w-full items-center space-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <Checkbox id="terms1" checked={p.checked} onCheckedChange={p.onChange} />
            <label
                htmlFor="terms1"
                className="cursor-pointer text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {p.label}
            </label>
        </div>
    );
};
