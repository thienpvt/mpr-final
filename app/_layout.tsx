import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/hooks/useContext';
import { Note } from '@/models/Note';
import { Label } from '@/models/Label';
import { Folder } from '@/models/Folder';
import {Notes, Labels, Folders, Trash, Colors} from '@/utils/dummyData';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Context = useAppContext();

export default function RootLayout() {
  const [notes1, setNotes] = useState<Note[]>(Array.from(Notes));
  const [labels1, setLabels] = useState<Label[]>(Array.from(Labels));
  const [folders, setFolders] = useState<Folder[]>(Array.from(Folders));
  const [trashes1, setTrash] = useState<Note[]>(Array.from(Trash));
  const [colors] = useState<string[]>(Colors);

  const addNote = (note: Note) => {
    setNotes([...notes1, note]);
  }

  const minusNote = (note: Note) => {
    setNotes(notes1.filter(n => n.id !== note.id));
  }

  const updateNote = (note: Note) => {
    setNotes(notes1.map(n => n.id === note.id ? note : n));
  }

  const addAllNotes = (notes: Note[]) => {
    setNotes([...notes1, ...notes]);
  }

  const addLabel = (label: Label) => {
    setLabels([...labels1, label]);
  }

  const minusLabel = (label: Label) => {
    setLabels(labels1.filter(l => l.id !== label.id));
  }

  const updateLabel = (label: Label) => {
    setLabels(labels1.map(l => l.id === label.id ? label : l));
  }

  const addFolder = (folder: Folder) => {
    setFolders([...folders, folder]);
  }

  const minusFolder = (folder: Folder) => {
    setFolders(folders.filter(f => f.id !== folder.id));
  }

  const updateFolder = (folder: Folder) => {
    setFolders(folders.map(f => f.id === folder.id ? folder : f));
  }

  const addTrash = (note: Note) => {
    setTrash([...trashes1, note]);
  }

  const minusTrash = (note: Note) => {
    setTrash(trashes1.filter(n => n.id !== note.id));
  }

  const updateTrash = (note: Note) => {
    setTrash(trashes1.map(n => n.id === note.id ? note : n));
  }

  const emptyTrash = () => {
    setTrash([]);
  }

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Context.Provider value={{
      notes: {
        value: notes1, addNote, minusNote, updateNote, addAllNotes
      },
      labels: {
        value: labels1, addLabel, minusLabel, updateLabel
      },
      folders: {
        value: folders, addFolder, minusFolder, updateFolder
      },
      trash: {
        value: trashes1, addTrash, minusTrash, updateTrash, emptyTrash
      },
      colors: {
        value: colors
      }
    }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Context.Provider>
  );
}
