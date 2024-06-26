import { StyledComponent } from "nativewind";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Note } from "@/models/Note";
import { useLabels } from "@/hooks/useContext";
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "expo-router";
import { calculateTime } from "@/utils/service";
import { PropsWithChildren } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = PropsWithChildren<{
     note: Note;
     disable?: boolean;
}>;
export default function NoteComponent({ note, disable = false }: Props) {
     const navigation: any = useNavigation();
     const { value: labels, addLabel, minusLabel } = useLabels();
     return (
          <StyledComponent component={Ripple} onPress={() => { if (!disable) navigation.navigate('editNote', { id: note.id }) }} rippleContainerBorderRadius={5} rippleColor="rgb(249 168 212)">
               <StyledComponent component={ThemedView} tw='rounded p-5'>
                    <StyledComponent component={ThemedView} tw='flex flex-row items-center mb-1 w-full'>
                         <StyledComponent component={ThemedView} tw='flex flex-row items-center w-1/2'>
                              {note.color != 'none' && <StyledComponent component={ThemedView} tw={`w-4 h-4 rounded-full  mx-2`} style={{ backgroundColor: note.color }}></StyledComponent>}
                              <StyledComponent component={ThemedText} type='hours'>{ }
                                   {calculateTime(note.updateAt as Date)}
                              </StyledComponent>
                         </StyledComponent>
                         {note.isBookmarked &&
                              <StyledComponent component={ThemedView} tw='flex flex-row items-center w-1/2 justify-end'>
                                   <Ionicons name='bookmark' size={18} color='#8b8b8b'></Ionicons>
                              </StyledComponent>}
                    </StyledComponent>
                    <StyledComponent component={ThemedView} tw='flex flex-row flex-wrap gap-2'>
                         {note.labelIds.map((labelId) => {
                              const label = labels.find((label) => label.id === labelId);
                              if (label)
                                   return (
                                        <StyledComponent component={ThemedView} tw='bg-neutral-300 rounded p-1' key={label?.id}>
                                             <StyledComponent component={ThemedText} type='label' tw='px-1'>{label?.name}</StyledComponent>
                                        </StyledComponent>
                                   )
                         })}
                    </StyledComponent>
                    <StyledComponent component={ThemedText} type='default' tw='mt-1'>{note.content}</StyledComponent>
               </StyledComponent>
          </StyledComponent>
     )
}