import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import InputField from "../ui/inputField";
import ButtonGroup from "../ui/ButtonGroup";

export function AddPackageDialog(props) {
  const cancelButtonRef = useRef(null);

  const [formData, setFormData] = useState({
    packageName: "",
    width: "",
    height: "",
    depth: "",
  });

  const [formValidity, setFormValidity] = useState({
    packageName: false,
    width: false,
    height: false,
    depth: false,
  });

  const { packageName, width, height, depth } = formData;
  const {
    packageName: packageNameValid,
    width: widthValid,
    height: heightValid,
    depth: depthValid,
  } = formValidity;

  const formValid = packageNameValid && widthValid && heightValid && depthValid;

  const handleInputChange = (fieldName, value, isValid) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    setFormValidity((prevValidity) => ({
      ...prevValidity,
      [fieldName]: isValid,
    }));
  };

  const insertData = async () => {
    try {
      const tableName = "package";
      const id = "PackageId";

      const insertObj = {
        PackageName: packageName,
        Width: width,
        Height: height,
        Depth: depth,
      };

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/addItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tableName, id, data: insertObj }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        alert(`Sikeresen rögzítette '${packageName}' méretű csomagot!`);

        setFormData({
          packageName: "",
          width: "",
          height: "",
          depth: "",
        });
        setFormValidity({
          packageName: false,
          width: false,
          height: false,
          depth: false,
        });

        props.getPackageList();
        props.setShow();
      } else {
        console.error("Hiba történt a szerverrel való kommunikáció során.");
      }
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  useEffect(() => {
    setFormData({
      packageName: "",
      width: "",
      height: "",
      depth: "",
    });
    setFormValidity({
      packageName: false,
      width: false,
      height: false,
      depth: false,
    });
  }, []);

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setShow}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Csomag hozzáadása
                  </Dialog.Title>
                  <div>
                    <div className="flex  flex-col  gap-6  border-t border-gray-200 px-3 py-9">
                      <div className="grid grid-cols-2 gap-2">
                        <InputField
                          id="packageName"
                          label="Csomagnév"
                          type="text"
                          disabled={false}
                          value={packageName}
                          additionalQuantity="mm"
                          placeholder="Csomagnév"
                          onChange={(e) => {
                            handleInputChange(
                              "packageName",
                              e.target.value,
                              e.target.validity.valid
                            );
                          }}
                        />

                        <InputField
                          id="width"
                          label="Szélesség"
                          type="number"
                          min={10}
                          max={1000000}
                          disabled={false}
                          value={width}
                          additionalQuantity="mm"
                          placeholder="Szélesség"
                          onChange={(e) => {
                            handleInputChange(
                              "width",
                              e.target.value,
                              e.target.validity.valid
                            );
                          }}
                        />

                        <InputField
                          id="height"
                          label="Magasság"
                          type="number"
                          min={10}
                          max={1000000}
                          disabled={false}
                          value={height}
                          additionalQuantity="mm"
                          placeholder="Magasság"
                          onChange={(e) => {
                            handleInputChange(
                              "height",
                              e.target.value,
                              e.target.validity.valid
                            );
                          }}
                        />

                        <InputField
                          id="depth"
                          label="Mélység"
                          type="number"
                          min={10}
                          max={1000000}
                          disabled={false}
                          value={depth}
                          additionalQuantity="mm"
                          placeholder="Mélység"
                          onChange={(e) => {
                            handleInputChange(
                              "depth",
                              e.target.value,
                              e.target.validity.valid
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <ButtonGroup
                  accept={insertData}
                  reject={() => props.setShow}
                  formValid={formValid}
                  acceptLabel="Hozzáadás"
                  rejectLabel="Mégsem"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
