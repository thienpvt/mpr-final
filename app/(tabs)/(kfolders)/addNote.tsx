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
import { Folder } from "@/models/Folder";

export default function AddNote() {
     const { value: folders, addFolder, minusFolder, updateFolder } = useFolders();
     const { value: notes, addNote, minusNote } = useNotes();
     const { value: trash, addTrash, minusTrash } = useTrash();
     const [alertVisible, setAlertVisible] = useState(false);
     const [alertContent, setAlertContent] = useState('');
     const getId = () => {
          const noteMax=notes.reduce((max, note) => note.id > max ? note.id : max, 0) + 1;
          const trashMax=trash.reduce((max, note) => note.id > max ? note.id : max, 0) + 1;
          return noteMax > trashMax ? noteMax : trashMax;
     }
     const navigation: any = useNavigation();
     const route: any = useRoute();
     const folderId = route.params?.folderId;
     const folder: any = folders.find(f => f.id == parseInt(folderId));
     const tmpNote: Note = new Note(getId(), 'none', [], '', new Date(), false, parseInt(folderId));
     const handleSubmit = (note: Note) => {
          if (note.content.trim() === '') {
               setAlertContent('Content of the note must not be empty');
               setAlertVisible(true);
               return;
          } else if (notes.find((n) => n.content === note.content) !== undefined){
               setAlertContent('Content of the note must be unique');
               setAlertVisible(true);

               return;
          }
          note.updateAt = new Date();
          addNote(note);
          updateFolder({...folder,updatedAt:new Date()});
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
                    title={alertContent}
                    message="Content of the note must not be empty"
                    onConfirm={() => setAlertVisible(false)}
                    onCancel={() => setAlertVisible(false)}
               />
          </ParallaxScrollView>
     )
}