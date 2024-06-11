import { Folder } from "@/models/Folder";
import { Label } from "@/models/Label";
import { Note } from "@/models/Note";

export const Colors: string[] = [
     "none",
     "red",
     "blue",
     "orange",
     "yellow",
     "purple",
     "pink",
     "green",
     "gray",
];

export const Labels: Label[] = [
     new Label(1, "React Native"),
     new Label(2, "Final Exam"),
     new Label(3, "Mini Project"),
     new Label(4, "Team Work"),
     new Label(5, "React Basic"),
];

export const Folders: Folder[] = [
     new Folder(1, "Spring 2022",new Date('2024-06-10T12:37:00')),
     new Folder(2, "Fall 2022",new Date('2024-06-10T12:37:00')),
     new Folder(3, "Spring 2023",new Date('2024-06-10T12:37:00')),
     new Folder(4, "Fall 2023",new Date('2024-06-10T12:37:00')),
];

export const Notes: Note[] = [
     new Note(1, "yellow", [1, 2, 3], "React Native is a framework for building mobile applications using JavaScript and React", new Date('2024-04-10T12:30:00'), false, 1),
     new Note(2, "gray", [2], "The final exam will be held on 20th December 2021", new Date('2024-04-10T12:35:00'), true, 3),
     new Note(3, "pink", [3], "The mini project is due on 15th December 2021", new Date('2024-04-10T12:36:00'), true, 3),
     new Note(4, "red", [4], "Team work is important", new Date('2024-04-10T12:40:00'), true, 4),
     new Note(5, "pink", [5], "React is a JavaScript library for building user interfaces", new Date('2024-04-10T12:50:00'), false, 2),
];

export const Trash: Note[] = [
];