import { TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { Fragment, useEffect, useState } from 'react';
import { DrawerActions, useNavigation, } from '@react-navigation/native';
import { StyledComponent } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useFolders, useNotes } from '@/hooks/useContext';
import { Note } from '@/models/Note';
import NoteComponent from '@/components/NoteComponent';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';



export default function Home() {
  const { value: notes, addNote, minusNote } = useNotes();
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'icon');
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const navigation: any = useNavigation();
  const route: any = useRouter();
  useEffect(() => {
  }, [notes, search]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <StyledComponent component={View} tw='flex-1 flex-row justify-between items-center pr-10 ml-[-4]'>
          <StyledComponent component={ThemedView} tw='flex flex-row items-center'>
            <StyledComponent component={Ionicons} name='menu' size={24} color={color} tw='mr-1' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
            <StyledComponent component={ThemedText} type='subtitle'>Notes</StyledComponent>
          </StyledComponent>
          {!focused ? (<StyledComponent component={Feather} name='search' size={24} color={color} tw='mr-1' onPress={() => {
            setFocused(true);
          }} />) :
            (
              <StyledComponent component={View} tw='flex flex-row items-center border-0 rounded-xl bg-slate-200 h-8'>
                <StyledComponent autoFocus={focused} component={TextInput} tw='w-48 px-2' placeholder='Search' onChangeText={(value) => setSearch(value)} onBlur={() => { if (search == '') setFocused(false) }} />
                <StyledComponent component={Feather} name='x' size={24} color={color} tw='mr-1' onPress={() => { setFocused(false); setSearch('') }} />
              </StyledComponent>
            )}
        </StyledComponent>
      ),
    });
  }, [navigation, focused, search, notes, route.params?.folderId]);
  return (
    <ParallaxScrollView
      showButton={true}
      pressButton={() => navigation.navigate('addNote')}
    >
      {notes.length == 0 ? (
        <StyledComponent component={ThemedView} tw='items-center justify-end h-80 bg-transparent'>
          <StyledComponent component={ThemedText} tw='mb-2 text-slate-600' >No notes found</StyledComponent>
          <StyledComponent component={ThemedText} tw='text-slate-600' >Tap + to add notes</StyledComponent>
        </StyledComponent>
      ) : (
        <Fragment key="notes-list">
          <StyledComponent component={ThemedView} tw=' bg-transparent' >
            {search == '' ? (
              <StyledComponent component={ThemedText} type='defaultSemiBold' tw="text-cyan-400">{notes.length} notes</StyledComponent>
            ) : (
              <StyledComponent component={ThemedText} tw="text-cyan-300">{notes.filter(x => x.content.toLowerCase().includes(search.toLowerCase())).length} notes found</StyledComponent>
            )}
          </StyledComponent>
          {notes.map((note: Note) => {
            if (note.content.toLowerCase().includes(search.toLowerCase()))
              return (
                <NoteComponent note={note} key={note.id} />
              )
          })}
        </Fragment>
      )}
    </ParallaxScrollView>
  );
}
