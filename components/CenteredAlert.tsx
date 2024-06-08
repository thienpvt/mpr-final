import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CenteredAlert({ isVisible, title, message, onConfirm, onCancel }:any) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade" // or 'slide'
      onRequestClose={onCancel} // Close on hardware back button
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonOK}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    padding: 20,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red'
  },
  message: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
  },
  buttonOK: {
    color: 'rgb(14 165 233)',
    fontWeight: 'bold',
  },
  buttonCancel: {
    color: 'rgb(147 51 234)',
    fontWeight: 'bold',
  },
});

export default CenteredAlert;