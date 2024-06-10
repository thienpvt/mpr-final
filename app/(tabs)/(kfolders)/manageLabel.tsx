import { ThemedText } from "@/components/ThemedText";
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "expo-router";
import { StyledComponent } from "nativewind";
import { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useNotes,  useLabels } from "@/hooks/useContext";
import { Note } from "@/models/Note";

import { useRoute } from '@react-navigation/native';

import ParallaxView from "@/components/ParallaxView";


export default function EditNote() {

     const { value: notes, addNote, minusNote, updateNote } = useNotes();
     const { value: labels, addLabel, minusLabel } = useLabels();
     const route: any = useRoute();
     const [note, setNote] = useState<Note>(notes.find((note) => note.id ==route.params.id) as Note);
     const [noteLabel, setNoteLabel] = useState<number[]>(note.labelIds as []);
     const navigation: any = useNavigation();
     const handleAddLabel = (labelId: number) => () => {
          setNoteLabel((prevNoteLabel) => {
               const newNoteLabel = prevNoteLabel.includes(labelId)
                 ? prevNoteLabel.filter((id) => id !== labelId)
                 : [...prevNoteLabel, labelId];
           
               return newNoteLabel; // Update the local noteLabel state
          });
     }
     const handleSubmit = (note:Note,label:any) => {
          if (note.content.trim() === '') {
               return;
          }
          note.updateAt = new Date();
          note.labelIds = label;
           updateNote(note);
     }
     useEffect(() => {
          navigation.setOptions({
               headerTitle: 'Manage labels',
               headerLeft: () => (
                    <StyledComponent component={Ripple} tw='p-2' onPress={() => { handleSubmit(note,noteLabel); navigation.goBack() }} rippleSize={100}>
                         <StyledComponent component={ThemedText} tw="text-sky-400">
                              Note
                         </StyledComponent>
                    </StyledComponent>
               ),
          });
     }, [navigation, note, noteLabel]);

     return (
          <ParallaxView
          >
               <StyledComponent component={ThemedText} tw="p-4 pb-0">{labels.length} total, {noteLabel.length} selected</StyledComponent>
               <StyledComponent component={ThemedView} tw='flex flex-row bg-transparent flex-wrap gap-4 p-4'>
                    {labels.map((label) => {
                         if(noteLabel.includes(label.id))
                              return (
                                   <StyledComponent component={Ripple} tw='bg-sky-400 rounded mr-1 p-1' key={label?.id} onPress={handleAddLabel(label?.id)}>
                                        <StyledComponent component={ThemedText} type='label' tw='px-1 text-white'>{label?.name}</StyledComponent>
                                   </StyledComponent>
                              )
                         else
                         return (
                              <StyledComponent component={Ripple} tw='bg-sky-200 rounded mr-1 p-1' key={label?.id} onPress={handleAddLabel(label?.id)}>
                                   <StyledComponent component={ThemedText} type='label' tw='px-1 text-blue-500'>{label?.name}</StyledComponent>
                              </StyledComponent>
                         )
                    })}
               </StyledComponent>
          </ParallaxView>
     )
}
