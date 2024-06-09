import { Folder } from "@/models/Folder";
import { Label } from "@/models/Label";
import { Note } from "@/models/Note";
import { createContext, useContext } from "react";

const AppContext = createContext({
     notes: { value: <Note[]>[], addNote: (node:Note) => {}, minusNote: (node:Note) => {}, updateNote: (node:Note) => {}},
     labels: { value: <Label[]>[], addLabel: (label:Label) => {}, minusLabel: (label:Label) => {}, updateLabel: (label:Label) => {}},
     folders: { value: <Folder[]>[], addFolder: (folder:Folder) => {}, minusFolder: (folder:Folder) => {}, updateFolder: (folder:Folder) => {}},
     trash: { value: <Note[]>[], addTrash: (note:Note) => {}, minusTrash: (note:Note) => {}, updateTrash: (note:Note) => {}},
     colors: { value: <string[]>[]},
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

export function useColors() {
     return useContext(AppContext).colors;
}