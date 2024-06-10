import { ThemedText } from "@/components/ThemedText";
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "expo-router";
import { StyledComponent } from "nativewind";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { View, Text, TextInput, Alert, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useFolders, useNotes, useTrash } from "@/hooks/useContext";
import { Note } from "@/models/Note";
import CenteredAlert from "@/components/CenteredAlert";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function AddNote() {
     const { value: folders, addFolder, minusFolder } = useFolders();
     const { value: notes, addNote, minusNote } = useNotes();
     const { value: trash, addTrash, minusTrash } = useTrash();
     const [alertVisible, setAlertVisible] = useState(false);
     const getId = () => {
          return trash.length > 0 ? (trash[trash.length - 1].id > notes[notes.length - 1].id ? trash[trash.length - 1].id : notes[notes.length - 1].id) + 1 : notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
     }
     const navigation: any = useNavigation();
     const route: any = useRoute();
     const folderId = route.params?.folderId;
     const tmpNote: Note = new Note(getId(), 'none', [], '', new Date(), false, parseInt(folderId));
     console.log(folderId);
     const handleSubmit = (note: Note) => {
          if (note.content.trim() === '') {
               setAlertVisible(true);
               console.log('empty');
               return;
          }
          tmpNote.updateAt = new Date();
          addNote(note);
          navigation.goBack();
     }
     useEffect(() => {
          navigation.setOptions({
               headerTitle: '',
               headerLeft: () => (
                    <StyledComponent component={ThemedView} tw='flex-1 flex-row items-center'>
                         <StyledComponent component={Ionicons} name='arrow-back-outline' size={24} tw='mr-5 text-slate-500' onPress={() => navigation.goBack()} />
                         <StyledComponent component={ThemedText} tw='text-slate-500'>Add note to {folders.find(f => f.id == parseInt(folderId))?.name}</StyledComponent>
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
                    message="Content of the note must not be empty"
                    onConfirm={() => setAlertVisible(false)}
                    onCancel={() => setAlertVisible(false)}
               />
          </ParallaxScrollView>
     )
}