import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function FormErrors() {
  const {
    formState: { errors },
  } = useFormContext();
  if (Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <Alert variant="destructive" className="bg-destructive/20">
        <AlertTitle>Form Errors</AlertTitle>
        {Object.entries(errors)
          .slice(0, 2)
          .map(([field, error]) => (
            <AlertDescription key={field}>
              <span className="font-medium">{field}: </span>
              {error?.message as string}
            </AlertDescription>
          ))}
      </Alert>
    </div>
  );
}
