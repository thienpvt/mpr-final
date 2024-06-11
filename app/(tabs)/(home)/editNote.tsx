import { ThemedText } from "@/components/ThemedText";
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "expo-router";
import { StyledComponent } from "nativewind";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { View, Text, TextInput, Alert, Button, Keyboard, useWindowDimensions, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useNotes, useTrash, useLabels, useColors, useFolders } from "@/hooks/useContext";
import { Note } from "@/models/Note";
import CenteredAlert from "@/components/CenteredAlert";
import { useRoute } from '@react-navigation/native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import ParallaxView from "@/components/ParallaxView";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/utils/dummyData";
import { Ionicons } from "@expo/vector-icons";
import { calculateTime } from "@/utils/service";


export default function EditNote() {
     const { value: folders, addFolder, minusFolder , updateFolder} = useFolders();
     const { value: notes, addNote, minusNote, updateNote } = useNotes();
     const { value: labels, addLabel, minusLabel } = useLabels();
     const { value: trash, addTrash, minusTrash } = useTrash();
     const [colors] = useState(Colors)
     const [alertVisible, setAlertVisible] = useState(false);
     const [showHeader, setShowHeader] = useState(true);
     const route: any = useRoute();
     const [note, setNote] = useState<Note>(notes.find((note) => note.id ==route.params.id) as Note);
     const folder: any= folders.find(f => f.id == note.folderId);
     const navigation: any = useNavigation();
     const sheetRef = useRef<BottomSheet>(null);
     // variables
     const snapPoints = useMemo(() => ["10%", "52%"], []);

     // callbacks
     const handleSheetChange = useCallback((index: any) => {
          if (index === 0) {
               setShowHeader(true);
          } else {
               setShowHeader(false);
          }
     }, []);
     const handleSnapPress = useCallback((index: any) => {
          sheetRef.current?.snapToIndex(index);
     }, []);
     const handleManageLabels =() => {
          handleSubmit(note);
          navigation.navigate('manageLabel', { id: note.id });
     };
     const handleSubmit = (note: Note) => {
          if (note.content.trim() === '') {
               setAlertVisible(true);
               return;
          }
          updateFolder({...folder,updatedAt:new Date()});
          note.updateAt = new Date();
          updateNote(note);
     }
     const deleteNote = () => {
          addTrash(note);
          minusNote(note);
          navigation.goBack();
     }
     useEffect(() => {
          navigation.setOptions({
               headerTitle: 'Note',
               headerLeft: () => (
                    <StyledComponent component={Ripple} tw='p-2' onPress={() => { handleSubmit(note); navigation.goBack() }} rippleSize={100}>
                         <StyledComponent component={ThemedText} tw="text-sky-400">
                              Home
                         </StyledComponent>
                    </StyledComponent>
               ),
          });
     }, [navigation,note]);

     return (
          <ParallaxView
          >
               <StyledComponent component={ThemedView} tw='flex flex-row bg-transparent flex-wrap gap-2 pt-4 px-4'>
                    {note.labelIds.map((labelId) => {
                         const label = labels.find((label) => label.id === labelId);
                         if (label)
                              return (
                                   <StyledComponent component={ThemedView} tw='bg-neutral-300 rounded mr-1 p-1' key={label?.id}>
                                        <StyledComponent component={ThemedText} type='label' tw='px-1'>{label?.name}</StyledComponent>
                                   </StyledComponent>
                              )
                    })}
               </StyledComponent>
               <StyledComponent component={TextInput} tw='bg-transparent px-4 w-full text-gray-500'
                    placeholder="Enter something"
                    onChangeText={(val) => { note.content = val; console.log(note) }}
                    defaultValue={note.content}
                    multiline={true}
               >
               </StyledComponent>
               <CenteredAlert
                    isVisible={alertVisible}
                    title="Warning"
                    message="Are you sure you want to delete this note?"
                    showCancel={true}
                    onConfirm={() => deleteNote()}
                    onCancel={() => setAlertVisible(false)}
               />
               <BottomSheet
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    onChange={handleSheetChange}
                   
                    handleComponent={() => null}
                    keyboardBehavior={undefined}
                    enableOverDrag={false}
               // detached={true}
               >
                    <StyledComponent component={BottomSheetView} tw='flex-1'>
                         {showHeader ? (<StyledComponent component={ThemedView} tw=' h-14 items-center space-x-2 flex flex-row px-3'>
                              <StyledComponent component={ThemedText} type="hours" tw='basis-1/2'>Edited {calculateTime(note.updateAt)}</StyledComponent>
                              <StyledComponent component={ThemedView} tw='basis-1/4 items-center bg-transparent'><Ripple rippleContainerBorderRadius={50}><Feather name='bookmark' size={24} tw='text-white'></Feather></Ripple></StyledComponent>
                              <StyledComponent component={ThemedView} tw='basis-1/4 items-center bg-transparent'><Ripple rippleContainerBorderRadius={50} onPress={() => handleSnapPress(1)}><Feather name='more-vertical' size={24} tw='text-white'></Feather></Ripple></StyledComponent>
                         </StyledComponent>) :
                              (<StyledComponent component={ThemedView}>
                                   <StyledComponent component={ThemedView} tw=' h-16 pb-2 pt-4'>
                                        <StyledComponent component={BottomSheetScrollView} tw='px-3 space-x-3' horizontal showsHorizontalScrollIndicator={false} >
                                             {colors.map((color) => {
                                                  return (

                                                       // <StyledComponent component={ThemedView} tw={`h-9 w-9 ${color}`} key={color}>
                                                       <StyledComponent
                                                            key={color}
                                                            component={Ripple}
                                                            tw={`flex justify-center h-9 w-9 items-center rounded-full relative `} // Use the color string directly
                                                            style={{ backgroundColor: color }}
                                                            rippleContainerBorderRadius={50}
                                                            onPress={() => { note.color=color;setNote((prevNote) => ({ ...prevNote, color })); }}
                                                       >

                                                            {color == 'none' && <StyledComponent component={Feather} name='slash' size={38} ></StyledComponent>}
                                                            {note.color == color && <StyledComponent component={Feather} name='check' size={22} tw="absolute top-2 left-2" ></StyledComponent>}
                                                       </StyledComponent>
                                                       // </StyledComponent> 

                                                  );
                                             })}
                                        </StyledComponent>
                                   </StyledComponent>
                                   <StyledComponent component={ThemedView} tw="h-12 py-2">
                                        <StyledComponent component={BottomSheetScrollView} tw='px-3 space-x-3' horizontal showsHorizontalScrollIndicator={false} >
                                             {note.labelIds.map((labelId) => {
                                                  const label = labels.find((label) => label.id === labelId);
                                                  return (
                                                       <StyledComponent component={ThemedView} tw='bg-neutral-300 rounded mr-1 p-1' key={label?.id}>
                                                            <StyledComponent component={ThemedText} type='label' tw='px-1'>{label?.name}</StyledComponent>
                                                       </StyledComponent>
                                                  )
                                             })}
                                             <StyledComponent component={Ripple} tw='bg-neutral-300 rounded mr-1 p-1' key='manage-label' rippleContainerBorderRadius={10} onPress={handleManageLabels}>
                                                  <StyledComponent component={ThemedText} type='label' tw='px-1'>+ Manage labels</StyledComponent>
                                             </StyledComponent>
                                        </StyledComponent>
                                   </StyledComponent>

                                   <StyledComponent component={Ripple} tw=' h-12 items-center px-2 flex flex-row'>
                                        <Ionicons name='clipboard-outline' size={24} color="rgb(107 114 128)"></Ionicons>
                                        <StyledComponent component={ThemedText} tw='px-2'>Copy to clipboard</StyledComponent>
                                   </StyledComponent>

                                   <StyledComponent component={Ripple} tw=' h-12 items-center px-2 flex flex-row'>
                                        <Ionicons name='share-social-outline' size={24} color="rgb(107 114 128)"></Ionicons>
                                        <StyledComponent component={ThemedText} tw='px-2'>Share</StyledComponent>
                                   </StyledComponent>

                                   <StyledComponent component={Ripple} tw=' h-12 items-center px-2 flex flex-row' onPress={()=>setAlertVisible(true)}>
                                        <Ionicons name='trash-outline' size={24} color="rgb(107 114 128)"></Ionicons>
                                        <StyledComponent component={ThemedText} tw='px-2'>Delete</StyledComponent>
                                   </StyledComponent>

                                   <StyledComponent component={Ripple} tw=' h-12 items-center px-2 flex flex-row'>
                                        <Ionicons name='copy-outline' size={24} color="rgb(107 114 128)"></Ionicons>
                                        <StyledComponent component={ThemedText} tw='px-2'>Make a copy</StyledComponent>
                                   </StyledComponent>

                                   <StyledComponent component={Ripple} tw=' h-12 items-center px-2 flex flex-row'>
                                        <Ionicons name='pin-outline' size={24} color="rgb(107 114 128)"></Ionicons>
                                        <StyledComponent component={ThemedText} tw='px-2'>Pin</StyledComponent>
                                   </StyledComponent>

                                   <StyledComponent component={Ripple} tw=' h-12 items-center px-2 flex flex-row'>
                                        <Ionicons name='alarm-outline' size={24} color="rgb(107 114 128)"></Ionicons>
                                        <StyledComponent component={ThemedText} tw='px-2'>Add a reminder</StyledComponent>
                                   </StyledComponent>
                              </StyledComponent>
                              )}
                    </StyledComponent>
               </BottomSheet>
          </ParallaxView>
     )
}
