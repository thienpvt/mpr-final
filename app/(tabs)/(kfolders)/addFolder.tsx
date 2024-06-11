
import { useNavigation } from "expo-router";
import { StyledComponent } from "nativewind";
import { useEffect, useState,} from "react";
import {  TextInput, } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useFolders, } from "@/hooks/useContext";
import CenteredAlert from "@/components/CenteredAlert";
import { useRoute } from "@react-navigation/native";
import { Folder } from "@/models/Folder";

export default function addFolder() {
     const { value: folders, addFolder, minusFolder } = useFolders();
     const [alertVisible, setAlertVisible] = useState(false);
     const getId = () => {
          const folderMax = folders.reduce((max, folder) => folder.id > max ? folder.id : max, 0) + 1;
          return folderMax;
     }
     const navigation: any = useNavigation();
     const route: any = useRoute();
     const folderId = route.params?.folderId;
     const tmpFolder: Folder = new Folder(getId(), '',  new Date());
     const handleSubmit = (folder: Folder) => {
          if (folder.name.trim() === '') {
               setAlertVisible(true);
               return;
          }
          folder.updatedAt = new Date();
          addFolder(folder);
          navigation.goBack();
     }
     useEffect(() => {
          navigation.setOptions({
               headerTitle: 'Add folder',
          });
     }, [navigation]);
     return (
          <ParallaxScrollView
               showButton={true}
               icon="check"
               pressButton={() => handleSubmit(tmpFolder)}
          >
               <StyledComponent component={TextInput} multiline={true} tw='bg-transparent p-2 w-full text-gray-500' placeholder="Enter folder name" onChangeText={(val) => { tmpFolder.name = val }}>
               </StyledComponent>
               <CenteredAlert
                    isVisible={alertVisible}
                    title="Warning"
                    message="Content of the note must not be empty"
                    onConfirm={() => setAlertVisible(false)}
                    onCancel={() => setAlertVisible(false)}
               />
          </ParallaxScrollView>
     )
}