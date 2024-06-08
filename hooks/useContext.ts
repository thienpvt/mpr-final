import { Folder } from "@/models/Folder";
import { Label } from "@/models/Label";
import { Note } from "@/models/Note";
import { createContext, useContext } from "react";

const AppContext = createContext({
     notes: { value: <Note[]>[], addNote: (node:Note) => {}, minusNote: (node:Note) => {} },
     labels: { value: <Label[]>[], addLabel: (label:Label) => {}, minusLabel: (label:Label) => {} },
     folders: { value: <Folder[]>[], addFolder: (folder:Folder) => {}, minusFolder: (folder:Folder) => {} },
     trash: { value: <Note[]>[], addTrash: (note:Note) => {}, minusTrash: (note:Note) => {} },
});

export function useAppContext() {
     return AppContext;
}

export function useNotes() {
     return useContext(AppContext).notes;
}

export function useLabels() {
     return useContext(AppContext).labels;
}

export function useFolders() {
     return useContext(AppContext).folders;
}

export function useTrash() {
     return useContext(AppContext).trash;
}