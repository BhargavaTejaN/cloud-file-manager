import React, { useContext } from "react";
import { useFireBaseContext } from "../../customHooks/useFireBaseContext";
import { ParentFolderIdContext } from "../../context/ParentFolderId";
import { ShowToastContext } from "../../context/ShowTost";

const UploadFileModel = ({ closeModal }) => {
  const { uploadFile } = useFireBaseContext();
  const { showTostMsg, setShowTostMsg } = useContext(ShowToastContext);
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const docId = Date.now();

  const onFileUpload = async (file) => {
    try {
      if (file) {

        if(file?.size>1000000)
        {
          setShowTostMsg("File is too large")
          return ;
        }

        
        const result = await uploadFile(
          file,
          "Files",
          docId.toString(),
          parentFolderId
        );
        closeModal(true);
        setShowTostMsg("File Uploaded Successfully!");
      }
    } catch (error) {
      console.log("ERROR WHILE UPLODING THE FILE : ", error);
    }
  };

  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center w-[360px]">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div
          className="w-full items-center 
            flex flex-col justify-center gap-3"
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event) => onFileUpload(event.target.files[0])}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadFileModel;
