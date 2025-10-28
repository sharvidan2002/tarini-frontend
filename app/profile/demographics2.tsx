import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';

export default function Demographics2Screen() {
  const router = useRouter();
  const [maritalStatus, setMaritalStatus] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepPattern, setSleepPattern] = useState('');
  const [chronicIllness, setChronicIllness] = useState('');
  const [mentalHealth, setMentalHealth] = useState('');

  const handleSave = () => {
    // Save to context/backend later
    router.push('/profile/occupational');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab]}>
          <Text style={styles.tabText}>Demographics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Occupational</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.sectionTitle}>Demographics Information</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.description}>Already collected during signup</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.description}>Already collected during signup</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Relationship Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={maritalStatus}
              onValueChange={setMaritalStatus}
              style={styles.picker}
            >
              <Picker.Item label="Select..." value="" />
              <Picker.Item label="Single" value="single" />
              <Picker.Item label="Married" value="married" />
              <Picker.Item label="Divorced" value="divorced" />
              <Picker.Item label="Widowed" value="widowed" />
            </Picker>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>How many hours do you sleep</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sleepHours}
              onValueChange={setSleepHours}
              style={styles.picker}
            >
              <Picker.Item label="Select..." value="" />
              <Picker.Item label="7 - 8 hours" value="7-8" />
              <Picker.Item label="Less than 7 hours" value="<7" />
            </Picker>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Sleep Pattern</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sleepPattern}
              onValueChange={setSleepPattern}
              style={styles.picker}
            >
              <Picker.Item label="Select..." value="" />
              <Picker.Item label="Sleep well at night" value="well" />
              <Picker.Item label="Irregular sleep" value="irregular" />
            </Picker>
          </View>
        </View>

        <View style={styles.highlightField}>
          <Text style={styles.label}>Chronic Illness</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={chronicIllness}
              onValueChange={setChronicIllness}
              style={styles.picker}
            >
              <Picker.Item label="Select..." value="" />
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Yes" value="yes" />
            </Picker>
          </View>
        </View>

        <View style={styles.highlightField}>
          <Text style={styles.label}>Mental Health Issues</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mentalHealth}
              onValueChange={setMentalHealth}
              style={styles.picker}
            >
              <Picker.Item label="Select..." value="" />
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Yes" value="yes" />
            </Picker>
          </View>
        </View>

        <Button title="Save" onPress={handleSave} />
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <View style={styles.navIcon} />
        </View>
        <View style={styles.navItem}>
          <View style={styles.navIcon} />
        </View>
        <View style={styles.navItem}>
          <View style={styles.navIcon} />
        </View>
        <View style={styles.navItem}>
          <View style={styles.navIcon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  activeTabText: {
    color: Colors.white,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  highlightField: {
    backgroundColor: '#FFFACD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.tertiary,
  },
  picker: {
    height: 50,
  },
  spacer: {
    height: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
});