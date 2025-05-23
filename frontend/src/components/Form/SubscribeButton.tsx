import { useFormContext } from "./form-context";

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <div className="flex justify-center">
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <button className="btn btn-accent" disabled={isSubmitting}>
            {label}
          </button>
        )}
      </form.Subscribe>
    </div>
  );
}
