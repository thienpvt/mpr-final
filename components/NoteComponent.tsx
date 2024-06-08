import { StyledComponent } from "nativewind";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Note } from "@/models/Note";
import { useLabels } from "@/hooks/useContext";

export default function NoteComponent(note: Note) {
     const { value: labels, addLabel, minusLabel } = useLabels();
     const calculateTime = (date: Date) => {
          const now = new Date();
          const diff = now.getTime() - date.getTime();
          const hours = Math.floor(diff / 1000 / 60 / 60);
          if (hours < 24) return `${hours} hrs ago`;
          const days = Math.floor(hours / 24);
          if (days < 7) return `${days} days ago`;
          const weeks = Math.floor(days / 7);
          if (weeks < 4) return `${weeks} weeks ago`;
          const months = Math.floor(weeks / 4);
          if (months < 12) return `${months} months ago`;
          const years = Math.floor(months / 12);
          return `${years} years ago`;
     }
     return (
          <StyledComponent component={ThemedView} tw='rounded p-3'>
               <StyledComponent component={ThemedText} type='hours'>{ }
                    {calculateTime(note.updateAt)}
               </StyledComponent>
               <StyledComponent component={ThemedView} tw='flex flex-row'>
                    {note.labelIds.map((labelId) => {
                         const label = labels.find((label) => label.id === labelId);
                         return (
                              <StyledComponent component={ThemedView} tw='bg-neutral-300 rounded mr-1' key={label.id}>
                                   <StyledComponent component={ThemedText} type='label' tw='px-1'>{label?.name}</StyledComponent>
                              </StyledComponent>
                         )
                    })}
               </StyledComponent>
               <StyledComponent component={ThemedText} type='default' tw='mt-1'>{note.content}</StyledComponent>
          </StyledComponent>
     )
}