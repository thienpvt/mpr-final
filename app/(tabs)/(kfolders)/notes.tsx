import { TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { StyledComponent } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useFolders, useNotes } from '@/hooks/useContext';
import { Note } from '@/models/Note';
import NoteComponent from '@/components/NoteComponent';
import { useLocalSearchParams, useRouter, useNavigation, } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';



export default function NotesScreen() {
  const { value: notes, addNote, minusNote } = useNotes();
  const { value: folders, addFolder, minusFolder } = useFolders();
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'icon');
  const navigation: any = useNavigation();
  const route: any = useRouter();
  const id: string = useLocalSearchParams().id?.toString() || '';

  useEffect(() => {
    if (!id || id == '') navigation.goBack();
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <StyledComponent component={ThemedView} tw='flex-1 flex-row items-center'>
          <StyledComponent component={Ionicons} name='arrow-back-outline' size={24} tw='mr-5 text-slate-500' onPress={() => navigation.goBack()} />
          <StyledComponent component={ThemedText} type='subtitle' tw='text-slate-500 font-medium'>{folders.find(f => f.id == parseInt(id))?.name}</StyledComponent>
        </StyledComponent>
      ),
    });
  }, [navigation, notes, route.params?.id, notes]);
  return (
    <ParallaxScrollView
      showButton={true}
      pressButton={() => navigation.navigate('addNote', { folderId: id })}
    >
      {notes.filter((note) => note.folderId == parseInt(id)).length == 0 ? (
        <StyledComponent component={ThemedView} tw='items-center justify-end h-80 bg-transparent'>
          <StyledComponent component={ThemedText} tw='mb-2 text-slate-600' >No notes in this folder</StyledComponent>
          <StyledComponent component={ThemedText} tw='text-slate-600' >Tap + to add notes in this folder</StyledComponent>
        </StyledComponent>
      ) : (
        <React.Fragment key="notes-list">
          <StyledComponent component={ThemedView} tw=' bg-transparent' >
            <StyledComponent component={ThemedText} type='defaultSemiBold' tw="text-cyan-400">{notes.filter((note) => note.folderId == parseInt(id)).length} notes</StyledComponent>
          </StyledComponent>
          {notes.map((note: Note) => {
            if (note.folderId == parseInt(id))
              return (
                <NoteComponent note={note} key={note.id} />
              )
          })}
        </React.Fragment>
      )}

    </ParallaxScrollView>
  );
}
