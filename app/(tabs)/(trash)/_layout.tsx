import { Stack, Tabs } from 'expo-router';

export default function Layout() {
     return (
          <Stack>
               <Stack.Screen name="index" options={{ headerShown: true, title: 'Trash' , }}/>
               <Stack.Screen name="editNote" />
               <Stack.Screen name="manageLabel" />
          </Stack>
     )
}