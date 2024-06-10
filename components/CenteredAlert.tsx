import { StyledComponent } from 'nativewind';
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

function CenteredAlert({ isVisible, title, message, onConfirm, onCancel, type='text-red-600', showCancel=false }:any) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade" // or 'slide'
      onRequestClose={onCancel} // Close on hardware back button
    >
      <StyledComponent component={ThemedView} tw="flex-1 justify-center items-center" style={styles.centeredView}>
        <StyledComponent component={ThemedView} style={styles.modalView}>
          <StyledComponent component={ThemedView} tw="mb-5">
            <StyledComponent component={ThemedText} tw={`text-xl font-bold text-center ${type}`}>{title}</StyledComponent>
            <StyledComponent component={ThemedText} tw="text-gray-500">{message}</StyledComponent>
          </StyledComponent>
          <StyledComponent component={ThemedView} tw="flex-row justify-center items-center gap-5">
            <StyledComponent component={TouchableOpacity} onPress={onConfirm}>
              <StyledComponent component={ThemedText} tw="font-bold text-cyan-500">OK</StyledComponent>
            </StyledComponent>
            {showCancel&&(<StyledComponent component={TouchableOpacity}  onPress={onCancel}>
              <StyledComponent component={ThemedText}  tw="font-bold">Cancel</StyledComponent>
            </StyledComponent>)}
          </StyledComponent>
        </StyledComponent>
      </StyledComponent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
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
  titleDanger: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(239 68 68)'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(56 189 248)'
  },
  message: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    
  },
  button: {
    // margin: 5,
    padding: 10,
    backgroundColor: 'rgb(56 189 248)',
    width: '20%',
  },
  buttonOK: {
    fontWeight: 'bold',
  },
  buttonCancel: {

    fontWeight: 'bold',
  },
});

export default CenteredAlert;