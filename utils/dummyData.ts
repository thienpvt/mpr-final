import { Folder } from "@/models/Folder";
import { Label } from "@/models/Label";
import { Note } from "@/models/Note";

export const Colors: string[] = [
     "none",
     "bg-red-400",
     "bg-orange-500",
     "bg-amber-400",
     "bg-lime-400",
     "bg-green-400",
     "bg-teal-400",
     "bg-cyan-400",
     "bg-indigo-400",
];

export const Labels: Label[] = [
     new Label(1, "React Native"),
     new Label(2, "Final Exam"),
     new Label(3, "Mini Project"),
     new Label(4, "Team Work"),
     new Label(5, "React Basic"),
];

export const Folders: Folder[] = [
     new Folder(1, "Spring 2022"),
     new Folder(2, "Fall 2022"),
     new Folder(3, "Spring 2023"),
     new Folder(4, "Fall 2023"),
];

export const Notes: Note[] = [
     new Note(1, "bg-red-400", [1, 2, 3], "React Native is a framework for building mobile applications using JavaScript and React", new Date('2024-04-10T12:30:00'), false, 1),
     new Note(2, "bg-orange-500", [2], "The final exam will be held on 20th December 2021", new Date('2024-04-10T12:35:00'), false, 3),
     new Note(3, "bg-amber-400", [3], "The mini project is due on 15th December 2021", new Date('2024-04-10T12:36:00'), false, 3),
     new Note(4, "bg-lime-400", [4], "Team work is important", new Date('2024-04-10T12:40:00'), false, 4),
     new Note(5, "bg-indigo-400", [5], "React is a JavaScript library for building user interfaces", new Date('2024-04-10T12:50:00'), false, 2),
];

export const Trash: Note[] = [
];