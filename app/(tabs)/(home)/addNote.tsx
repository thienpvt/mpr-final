import { ThemedText } from "@/components/ThemedText";
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "expo-router";
import { StyledComponent } from "nativewind";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useNotes, useTrash } from "@/hooks/useContext";
import { Note } from "@/models/Note";
import CenteredAlert from "@/components/CenteredAlert";

export default function AddNote() {
     const { value: notes, addNote, minusNote } = useNotes();
     const { value: trash, addTrash, minusTrash } = useTrash();
     const [alertVisible, setAlertVisible] = useState(false);
     const getId = () => {
          return trash.length > 0 ? (trash[trash.length - 1].id>notes[notes.length-1].id?trash[trash.length-1].id:notes[notes.length-1].id)+1 : notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
     }
     const tmpNote: Note = {
          id: getId(),
          content: '',
          labelIds: [],
          updateAt: new Date(),
          color: '',
          isBookmarked: false,
          folderId: null
     }
     const navigation: any = useNavigation();
     const handleSubmit = (note: Note) => {
          if (note.content.trim() === '') {
               setAlertVisible(true);
               return;
          }
          addNote(note);
          navigation.goBack();
     }
     useEffect(() => {
          navigation.setOptions({
               headerTitle: 'New Note',
               headerLeft: () => (
                    <StyledComponent component={Ripple} tw='p-2' onPress={() => navigation.goBack()} rippleSize={100}>
                         <StyledComponent component={ThemedText} tw="text-sky-400">
                              Home
                         </StyledComponent>
                    </StyledComponent>
               ),
          });
     }, [navigation]);
     return (
          <ParallaxScrollView
               showButton={true}
               icon="check"
               pressButton={() => handleSubmit(tmpNote)}
          >
               <StyledComponent component={TextInput} tw='bg-transparent' placeholder="Enter something" onChangeText={(val) => { tmpNote.content = val }}>
               </StyledComponent>
               <CenteredAlert
                    isVisible={alertVisible}
                    title="Warning"
                    message="Content of the note must not be empty"
                    onConfirm={() => setAlertVisible(false)}
                    onCancel={() => setAlertVisible(false)}
               />
          </ParallaxScrollView>
     )
}