import { TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { DrawerActions, useNavigation, } from '@react-navigation/native';
import { StyledComponent } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useFolders, useNotes, useTrash } from '@/hooks/useContext';
import { Note } from '@/models/Note';
import NoteComponent from '@/components/NoteComponent';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';



export default function TrashScreen() {
  const { value: notes, addTrash, minusTrash } = useTrash();
  const { value: notes2, addNote, minusNote } = useNotes();
  const navigation: any = useNavigation();
  const restore = () => {
    notes.forEach(note => {
      addNote(note);
      minusTrash(note);
    });
  }
  const empty = () => {
    notes.forEach(note => {
      minusTrash(note);
    });
  }
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons name='menu' size={24} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      ),
    });
  })
  return (
    <ParallaxScrollView
      showButton={true}
      pressButton={() => navigation.navigate('addNote')}
    >
      <StyledComponent component={ThemedView} tw='flex flex-row bg-transparent items-center' >
        <StyledComponent component={ThemedText} type='defaultSemiBold' tw="text-cyan-400 w-1/2">{notes.length} notes in trash</StyledComponent>
        <StyledComponent component={ThemedView}  tw="text-cyan-400 w-1/2 flex flex-row space-x-2 justify-end bg-transparent"> 
          <StyledComponent component={Ripple} onPress={() => restore()} tw="items-center  bg-slate-200 p-2 px-4 rounded" rippleContainerBorderRadius={50}>
            <StyledComponent component={ThemedText} >Restore</StyledComponent>
          </StyledComponent>
          <StyledComponent component={Ripple} onPress={() => empty()} tw="items-center bg-red-500 p-2 px-4 rounded" rippleContainerBorderRadius={50}>
            <StyledComponent component={ThemedText} tw='text-white'>Empty</StyledComponent>
          </StyledComponent>
        </StyledComponent>
      </StyledComponent>
      {notes.map((note: Note) => {
        return (
          <NoteComponent note={note} key={note.id}/>
        )
      })}
    </ParallaxScrollView>
  );
}
