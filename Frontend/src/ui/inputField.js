
export default function InputField(props) {
  return (
    <div className="col relative basis-64">
      <label
        htmlFor={props.id}
        className="absolute -top-2 left-2 inline-block max-w-full truncate bg-white px-1 text-xs font-medium text-gray-900"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        min={props?.min}
        max={props?.max}
        step={props?.step}
        disabled={props.disabled}
        required
        name={props.id}
        id={props.id}
        placeholder={props?.placeholder}
        value={props.value}
        onChange={props.onChange}
        //setItemNameValid(e.target.validity.valid)
        className="block w-full rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-400 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 [appearance:textfield] placeholder:text-gray-400 invalid:ring-red-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:invalid:ring-red-500 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:opacity-50 sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-describedby="gross-weight-unit"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="text-sm text-gray-500" id={props.id}>
          {props.additionalQuantity}
        </span>
      </div>
    </div>
  );
}
