export default function PackageCard(props) {
  return (
    <div
      key={props.package.PackageId}
      className="relative overflow-hidden rounded-lg shadow-md bg-white transition duration-300 transform hover:scale-105"
    >
      <div
        onClick={() => {
          props.setEditPackageDialogVisible(true);
          props.setSelectedPackage(props.package);
        }}
        className="p-6 cursor-pointer bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-t-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16 h-16 mx-auto mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
      

        <h3 className="text-lg font-semibold italic mb-2">
          {props.package.PackageName}
        </h3>
        <p className="text-sm font-semibold italic">
          {props.package.Width}x{props.package.Height}x{props.package.Depth} mm
        </p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-red-500"
        onClick={(e) => {
          props.setShowDeleteDialog(true);
          props.setRemoveId(props.package.PackageId);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
