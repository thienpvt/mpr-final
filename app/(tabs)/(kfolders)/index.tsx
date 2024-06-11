
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFolders, useNotes } from '@/hooks/useContext';
import { calculateTime } from '@/utils/service';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/routers';
import { router, useNavigation } from 'expo-router';
import { StyledComponent } from 'nativewind';
import { useEffect } from 'react';
import { StyleSheet, Image, Platform, KeyboardAvoidingView, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { ScreenStackHeaderLeftView } from 'react-native-screens';

export default function FoldersScreen() {
  const { value: folders, addFolder, minusFolder } = useFolders();
  const { value: notes } = useNotes();
  const navigation:any = useNavigation();
  const calculatedTotals = (id: number) => {
    return notes.filter((note) => note.folderId === id).length;
  }
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Folders',
      headerLeft: () => (
        <Ionicons name='menu' size={24} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      ),
      screenOptions: {
        // ScreenStackHeaderLeftView: () => (<Ionicons name='search'></Ionicons>)
        
      },
    });
  })
  return (
    <ParallaxScrollView
      showButton={true}
      padding={false}
      pressButton={() => router.push('addFolder')}
    >
      <StyledComponent component={ThemedView} tw=' bg-transparent p-4' >
        <StyledComponent component={ThemedText} type='defaultSemiBold' tw="text-cyan-400">{folders.length} folders</StyledComponent>
      </StyledComponent>
      {folders.map((folder) => {
        return (
          <StyledComponent component={ThemedView} tw='flex flex-row flex-wrap justify-between h-20 my-[1px]' key={folder.id}>
            <StyledComponent component={ThemedView} tw='w-4/5 h-full justify-center p-4'>
              <StyledComponent component={ThemedText}>{folder.name}</StyledComponent>
              <StyledComponent component={ThemedView} tw='flex flex-row items-center'>
                <StyledComponent component={ThemedText} tw='text-sm text-cyan-400'>{calculatedTotals(folder.id)} notes </StyledComponent>
                <StyledComponent component={ThemedText} tw='text-sm'>{calculateTime(folder.updatedAt)}</StyledComponent>
              </StyledComponent>
            </StyledComponent>
            <StyledComponent component={Ripple}
              tw='w-1/5 h-full items-center justify-center'
              rippleContainerBorderRadius={50} rippleSize={60}
              onPress={() => {
                router.push('notes?id=' + folder.id);
              }}
            >
              <Ionicons name='chevron-forward-outline' size={24} color='black' />
            </StyledComponent>
          </StyledComponent>
        )
      })}
    </ParallaxScrollView>
  );
}
