import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Drawer } from 'expo-router/drawer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text,View } from 'react-native';
import Feather  from '@expo/vector-icons/Feather';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <Drawer screenOptions={{ drawerStatusBarAnimation: 'fade', headerTitleAlign: "center"}}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Notes',
            // header: () => <><Text>ádasđsa</Text></>,
            drawerIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
          }}
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