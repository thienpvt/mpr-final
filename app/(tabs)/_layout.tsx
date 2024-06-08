import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { DrawerItemList } from '@react-navigation/drawer';
import { StyledComponent } from 'nativewind';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';


export default function Layout() {
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const [focused, setFocused] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const searchField = React.useRef<HTMLInputElement>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <Drawer
        drawerContent={(props) => {
          return (
            <SafeAreaView style={{ flex: 1 }}>
              {props.state.routes[props.state.index].name === 'index' && (
                <StyledComponent component={Text} tw="text-xl font-bold text-center text-teal-500" >Notes App</StyledComponent>
              )}
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }
        }
        screenOptions={{ drawerStatusBarAnimation: 'fade', headerTitleAlign: "center" }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            headerTitle() {
              return (
                <StyledComponent component={View} tw='flex flex-row justify-between w-full items-center'>
                  <StyledComponent component={ThemedText} type='subtitle'>Notes</StyledComponent>
                  {!focused ? (<StyledComponent component={Feather} name='search' size={24} color={color} tw='mr-1' onPress={() => {
                    setFocused(true);
                  }} />):
                  (
                  <StyledComponent component={View} tw='flex flex-row items-center border-0 rounded-xl bg-slate-200 h-8'>
                    <StyledComponent onBlur={()=>setFocused(false)} autoFocus={focused} component={TextInput} tw='w-48 px-2' placeholder='Search' onTextInput={(value)=>setSearch(value.toString())}/>
                    <StyledComponent component={Feather} name='x' size={24} color={color} tw='mr-1' onPress={() => setFocused(false)}/>
                  </StyledComponent>
                    )}
                </StyledComponent>
              );
            },
            headerTitleAlign: "left",
            // header: () => <><Text>ádasđsa</Text></>,
            drawerIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
            
          }}
          initialParams={{ search: search }}
        />
        <Drawer.Screen
          name="folders" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Folders',
            title: 'Folders',
            drawerIcon: ({ color }) => <Feather name="folder" size={28} color={color} />,
          }}
        />
        <Drawer.Screen
          name="labels" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Labels',
            title: 'Labels',
            drawerIcon: ({ color }) => <Feather name="tag" size={28} color={color} />,
          }}

        />
        <Drawer.Screen
          name="trash" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Trash',
            title: 'Trash',

            drawerIcon: ({ color }) => <Feather name="trash-2" size={28} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}