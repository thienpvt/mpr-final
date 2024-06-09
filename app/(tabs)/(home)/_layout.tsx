import { Stack ,Tabs} from 'expo-router';

export default function Layout() {
     return(
          <Stack>
              <Stack.Screen name="index" />
              <Stack.Screen name="addNote" />
              <Tabs.Screen name="editNote" />
          </Stack>
     )
}