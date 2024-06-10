import { Stack ,Tabs} from 'expo-router';

export default function Layout() {
     return(
          <Stack>
              <Stack.Screen name="index" />
              <Stack.Screen name="addNote" />
              <Stack.Screen name="editNote" />
              <Stack.Screen name="manageLabel" />
          </Stack>
     )
}