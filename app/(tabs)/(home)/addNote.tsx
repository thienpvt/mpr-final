import { ThemedText } from "@/components/ThemedText";
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "expo-router";
import { StyledComponent } from "nativewind";
import { useEffect, useState, useCallback, useRef, useMemo  } from "react";
import { View, Text, TextInput, Alert, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useNotes, useTrash } from "@/hooks/useContext";
import { Note } from "@/models/Note";
import CenteredAlert from "@/components/CenteredAlert";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function AddNote() {
     const { value: notes, addNote, minusNote } = useNotes();
     const { value: trash, addTrash, minusTrash } = useTrash();
     const [alertVisible, setAlertVisible] = useState(false);
     const [alertContent, setAlertContent] = useState('');
     const getId = () => {
          const noteMax=notes.reduce((max, note) => note.id > max ? note.id : max, 0) + 1;
          const trashMax=trash.reduce((max, note) => note.id > max ? note.id : max, 0) + 1;
          return noteMax > trashMax ? noteMax : trashMax;
     }
     const tmpNote: Note =new Note( getId(), 'none', [], '', new Date(), false, null);
     
     const navigation: any = useNavigation();
     const handleSubmit = (note: Note) => {
          if (note.content.trim() === '') {
               setAlertContent('Content of the note must not be empty');
               setAlertVisible(true);
               console.log('empty');
               return;
          } else if (notes.find((n) => n.content === note.content) !== undefined){
               setAlertContent('Content of the note must be unique');
               setAlertVisible(true);
               console.log('unique');
               return;
          }
          note.updateAt = new Date();
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
               <StyledComponent component={TextInput} multiline={true} tw='bg-transparent p-2 w-full text-gray-500' placeholder="Enter something" onChangeText={(val) => { tmpNote.content = val }}>
               </StyledComponent>
               <CenteredAlert
                    isVisible={alertVisible}
                    title="Warning"
                    message={alertContent}
                    onConfirm={() => setAlertVisible(false)}
                    onCancel={() => setAlertVisible(false)}
               />
          </ParallaxScrollView>
     )
}