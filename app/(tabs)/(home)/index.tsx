import { TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyledComponent } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNotes } from '@/hooks/useContext';
import { Note } from '@/models/Note';
import NoteComponent from '@/components/NoteComponent';



export default function Home({ route }: any) {
  const { value: notes, addNote, minusNote } = useNotes();
  const color = useThemeColor({ light: 'black', dark: 'white' },'icon');
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const navigation :any = useNavigation();
  useEffect(() => {
  }, [notes, search]);
  useEffect(() => {
    navigation.setOptions({
    headerTitle: () => (
      <StyledComponent component={View} tw='flex-1 flex-row justify-between items-center pr-10 ml-[-4]'>
        <StyledComponent component={ThemedView} tw='flex flex-row items-center'>
        <StyledComponent component={Feather} name='menu' size={24} color={color} tw='mr-1' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
          <StyledComponent component={ThemedText} type='subtitle'>Notes</StyledComponent>
        </StyledComponent>
        {!focused ? (<StyledComponent component={Feather} name='search' size={24} color={color} tw='mr-1' onPress={() => {
          setFocused(true);
        }} />) :
          (
            <StyledComponent component={View} tw='flex flex-row items-center border-0 rounded-xl bg-slate-200 h-8'>
              <StyledComponent  autoFocus={focused} component={TextInput} tw='w-48 px-2' placeholder='Search' onChangeText={(value) => setSearch(value)} onBlur={() => console.log("Focus Lost")}/>
              <StyledComponent component={Feather} name='x' size={24} color={color} tw='mr-1' onPress={() => setFocused(false)} />
            </StyledComponent>
          )}
      </StyledComponent>
    ),
  });
  },[navigation,focused,search,notes]);
  return (
    <ParallaxScrollView
      showButton={true}
      pressButton={() => navigation.navigate('addNote')}
      >
      <StyledComponent component={ThemedView} tw=' bg-transparent' >
        <StyledComponent component={ThemedText} type='defaultSemiBold' tw="text-cyan-400">{notes.length} notes</StyledComponent>
      </StyledComponent>
      {notes.map((note:Note) => {
        return(
          <NoteComponent {...note} key={note.id}/>
        )
      })}

    </ParallaxScrollView>
  );
}
