import { StyledComponent } from "nativewind";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Note } from "@/models/Note";
import { useLabels } from "@/hooks/useContext";
import Ripple from 'react-native-material-ripple';
import { useNavigation } from "expo-router";
import { calculateTime } from "@/utils/service";

export default function NoteComponent(note: Note) {
     const navigation :any = useNavigation();
     const { value: labels, addLabel, minusLabel } = useLabels();
     return (
          <StyledComponent component={Ripple} onPress={() => navigation.navigate('editNote',{id: note.id})} rippleContainerBorderRadius={5} rippleColor="rgb(249 168 212)">
               <StyledComponent component={ThemedView} tw='rounded p-3'>
                    <StyledComponent component={ThemedView} tw='flex flex-row items-center mb-1'>
                    {note.color!='none'&&<StyledComponent component={ThemedView} tw={`w-4 h-4 rounded-full  mr-2`} style={{backgroundColor:note.color}}></StyledComponent>}
                    <StyledComponent component={ThemedText} type='hours'>{ }
                         {calculateTime(note.updateAt as Date)}
                    </StyledComponent>
                    </StyledComponent>
                    <StyledComponent component={ThemedView} tw='flex flex-row flex-wrap gap-2'>
                         {note.labelIds.map((labelId) => {
                              const label = labels.find((label) => label.id === labelId);
                              if(label)
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