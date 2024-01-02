"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const DropZone = () => {
  const maxSize = 20971520;
  const [isloading, setIsLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onerror = () => console.log("File reading has failed");
      reader.onabort = () => console.log("File reading was aborted");
      reader.onload = async () => {
        await uploadFile(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (selectedFile: File) => {
    if (isloading) return;
    if (!user) return;

    setIsLoading(true);

    // addDoc -> users/user12345/files
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    // add image to the firebase storage
    const imageRef = ref(storage, `/users/${user.id}/files/${docRef.id}`);
    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
    
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    setIsLoading(false);
  };

  return (
    <Dropzone maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex items-center justify-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "text-white animate-pulse bg-[#035FFE]"
                  : "bg-slate-100/50 text-slate-400 dark:bg-slate-800/80"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here to drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger">File to too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};

export default DropZone;
