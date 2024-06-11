import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Modal, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxView from '@/components/ParallaxView';
import { useLabels } from '@/hooks/useContext';
import { StyledComponent } from 'nativewind';
import Ripple from 'react-native-material-ripple';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Label } from '@/models/Label';
import { useNavigation } from 'expo-router';

export default function LabelsScreen() {
  const { value: labels, addLabel, minusLabel,updateLabel } = useLabels();
  const [newLabel, setNewLabel] = useState('');
  const [label, setLabel] = useState(new Label(0, '') as Label);
  const [isVisible, setIsVisible] = useState(false);
  const handleSelected=(selected:any)=> {
    label.id=selected.id;
    label.name=selected.name;
    setIsVisible(true);
    // throw new Error('Function not implemented.');
  }
  const handleInsert=()=> {
    if(newLabel.trim()==='') return;
    addLabel(new Label(labels[labels.length-1].id+1,newLabel));
  }
  const handleEdit=()=> {
    console.log(label);
    updateLabel(label);
    setIsVisible(false);
    setLabel(new Label(0,''));
    // throw new Error('Function not implemented.');
  }

  const handleDelete=()=> {
    labels.splice(labels.findIndex((l)=>l.id===label.id),1);
    minusLabel(label);
    setLabel(new Label(0,''));
    setIsVisible(false);
  }
  useEffect(() => {
    setNewLabel('')
  },[])
  return (
    <ParallaxView
    >
      <StyledComponent component={ThemedView} tw='flex flex-row items-center ' >
        <StyledComponent component={TextInput} onChangeText={(val)=>setNewLabel(val)} tw='w-full px-3 text-base h-14' placeholder='Search or create label...' defaultValue={newLabel}></StyledComponent>
      </StyledComponent>
      <StyledComponent component={ThemedView} tw='container bg-transparent gap-3 px-4' >
        <StyledComponent component={ThemedView} tw='bg-transparent' >
          <StyledComponent component={ThemedText} type='default'>{labels.length} totals</StyledComponent>
        </StyledComponent>
        <StyledComponent component={Ripple} tw='bg-transparent' rippleSize={150} onPress={handleInsert}>
          <StyledComponent component={ThemedText} type='default' tw='text-blue-400'>+ Create label {newLabel}</StyledComponent>
        </StyledComponent>
        <StyledComponent component={ThemedView} tw='flex flex-row bg-transparent flex-wrap'>
          {labels.map((label) => {
            if(label.name.toLowerCase().includes(newLabel.toLowerCase())===false) return;
            return (
              <StyledComponent component={Ripple} tw='bg-sky-400 rounded mr-2 p-1 my-1' key={label.id} onPress={()=>handleSelected(label)}>
                <StyledComponent component={ThemedText} type='label' tw='px-1 text-white'>{label.name}</StyledComponent>
              </StyledComponent>
            )
          })}
        </StyledComponent>
      </StyledComponent>
      <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade" // or 'slide'
      onRequestClose={()=>setIsVisible(false)}
    >
      <StyledComponent component={ThemedView} tw="flex-1 justify-center items-center" style={styles.centeredView}>
        <StyledComponent component={ThemedView} style={styles.modalView}>
          <StyledComponent component={ThemedView} tw="mb-7 w-full mt-2">
            <StyledComponent component={TextInput} tw="text-lg text-gray-500" placeholder='Enter label name' onChangeText={(val)=>label.name=val}>{label.name}</StyledComponent>
          </StyledComponent>
          <StyledComponent component={ThemedView} tw="flex flex-row justify-between items-center w-full">
            <StyledComponent component={Ripple} onPress={handleEdit}>
              <StyledComponent component={ThemedText} tw="font-bold text-cyan-500 px-6">OK</StyledComponent>
            </StyledComponent>
            <StyledComponent component={Ripple}  onPress={handleDelete}>
              <StyledComponent component={ThemedText}  tw="font-bold text-red-600 px-6">Delete</StyledComponent>
            </StyledComponent>
          </StyledComponent>
        </StyledComponent>
      </StyledComponent>
    </Modal>
    </ParallaxView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
