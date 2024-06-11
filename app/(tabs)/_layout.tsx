import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { DrawerItemList } from '@react-navigation/drawer';
import { StyledComponent } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';



export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <Drawer
        drawerContent={(props) => {
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <StyledComponent component={Text} tw="text-xl font-bold text-center text-teal-500" >Notes App</StyledComponent>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }
        }
        screenOptions={{ drawerStatusBarAnimation: 'fade', headerTitleAlign: "center" }}
      >
        <Drawer.Screen
          // This is the name of the page and must match the url from root
          name="(home)"
          options={{
            drawerLabel: 'Home',
            headerShown: false,
            // header: () => <><Text>ádasđsa</Text></>,
            drawerIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
          }}

        />
        <Drawer.Screen
          name="(kfolders)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Folders',
            headerShown: false,
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
          name="(trash)" // This is the name of the page and must match the url from root
          options={{
            headerShown: false,
            drawerLabel: 'Trash',
            title: 'Trash',
            drawerIcon: ({ color }) => <Feather name="trash-2" size={28} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>

  );
}