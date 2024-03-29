export default function ButtonGroup(props) {
  return (
    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
      <button
        type="button"
        disabled={!props.formValid}
        className="inline-flex disabled:cursor-not-allowed disabled:opacity-50 w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
        onClick={() => props.accept()}
      >
        {props.acceptLabel}
      </button>
      <button
        type="button"
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        onClick={props.reject()}
        ref={props.cancelButtonRef}
      >
        {props.rejectLabel}
      </button>
    </div>
  );
}
