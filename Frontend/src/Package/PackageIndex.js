import axios from "axios";
import { useState, useEffect } from "react";
import { AddPackageDialog } from "./AddPackageDialog";
import { EditPackageDialog } from "./EditPackageDialog";
import DeletePackageDialog from "./DeletePackageDialog";
import PackageCard from "./PackageCard";
export default function PackageIndex() {
  const [editPackageDialogVisible, setEditPackageDialogVisible] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState();
  const [removeId, setRemoveId] = useState(null);

  const [packageList, setPackageList] = useState(null);
  const [AddPackageDialogVisible, setAddPackageDialogVisible] = useState(false);

  const getPackageList = async () => {
    try {
      const requestData = {
        tables: ["package"],
        joins: [],
        conditions: [],
        selectedColumns: ["*"],
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/getJoinedData`,
        requestData
      );
    
      setPackageList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removePackage = async () => {
    const deleteConditions = [{ PackageId: removeId }];

    const logicalOperator = "AND";

    const requestBody = {
      tableName: "package",
      conditions: deleteConditions,
      logicalOperator: logicalOperator,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/deleteItems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("result", result);
        const updateList = packageList.filter(
          (item) => item.PackageId !== removeId
        );
        setPackageList(updateList);
        //  setData(result);
      } else {
        console.error("Hiba történt a szerverrel való kommunikáció során.");
      }
    } catch (error) {
      console.error("Hiba történt:", error);
    }

    setShowDeleteDialog(false);
  };

  useEffect(() => {
    getPackageList();
  }, []);

  return (
    <div className="h-screen">
      <div className="py-3 px-3 ">
        <button
          type="button"
          onClick={() => setAddPackageDialogVisible(true)}
          className="rounded-md disabled:cursor-not-allowed disabled:opacity-50 bg-indigo-600 px-4 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <div className="flex items-center align-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="-ml-0.5 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Csomagtípus hozzáadása
          </div>
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
        {packageList?.map((item) => (
          <PackageCard
            package={item}
            setShowDeleteDialog={setShowDeleteDialog}
            setRemoveId={setRemoveId}
            setSelectedPackage={setSelectedPackage}
            setEditPackageDialogVisible={setEditPackageDialogVisible}
          />
        ))}
      </ul>
      
      <AddPackageDialog
        show={AddPackageDialogVisible}
        setShow={() => setAddPackageDialogVisible(false)}
        getPackageList={getPackageList}
      />
      <EditPackageDialog
        show={editPackageDialogVisible}
        setShow={() => setEditPackageDialogVisible(false)}
        selectedPackage={selectedPackage}
        getPackageList={getPackageList}
      />
      <DeletePackageDialog
        removePackage={removePackage}
        open={showDeleteDialog}
        setOpen={() => setShowDeleteDialog(false)}
      />
    </div>
  );
}
