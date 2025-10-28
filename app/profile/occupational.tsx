import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';

export default function OccupationalScreen() {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [classSize, setClassSize] = useState('');
  const [yearsInSchool, setYearsInSchool] = useState('');
  const [teachesOther, setTeachesOther] = useState(false);

  const qualifications = ['Trainee Grad', 'Grad', 'Trained', 'Other'];
  const experiences = ['<1', 'Early Career 1-3', 'Mid 2-23', 'Late 24-40'];
  const classSizes = ['<30', '>30'];
  const schoolYears = ['<7', '>7 years'];

  const handleSave = async () => {
    try {
      await updateProfile({
        occupational: {
          qualification,
          teachingExperience: experience,
          classSize,
          yearsInCurrentSchool: yearsInSchool,
          teachesOtherSubjects: teachesOther,
        },
      });
      router.push('/assessment/bat-questions');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Demographic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Occupational</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.highlightSection}>
          <Text style={styles.sectionTitle}>Occupational Information</Text>
          <Text style={styles.sectionSubtitle}>Cultural / Social Factors</Text>
          <Text style={styles.sectionSubtitle}>Life Stage / Career Stage</Text>
          <Text style={styles.highlight}>
            Early career workers → higher stress from learning demands.
          </Text>
          <Text style={styles.highlight}>
            Mid-career → juggling career and family can increase burnout.
          </Text>
          <Text style={styles.sectionSubtitle}>Late career</Text>
          <Text style={styles.description}>
            Expectations of constant productivity → higher risk
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Qualification as a teacher</Text>
          <Text style={styles.sublabel}>
            (trainee grad, grad, trained, other) - teaching exp (&lt;1, early carer 1-3, mid 2-23,
            late 24-40) - how any students in the class &lt;30, &gt;30
          </Text>
          <View style={styles.optionsContainer}>
            {qualifications.map((q) => (
              <TouchableOpacity
                key={q}
                style={[styles.option, qualification === q && styles.optionSelected]}
                onPress={() => setQualification(q)}
              >
                <Text style={styles.optionText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Years in the current school</Text>
          <Text style={styles.sublabel}>&lt;7/&gt;7 yrs</Text>
          <View style={styles.optionsContainer}>
            {schoolYears.map((y) => (
              <TouchableOpacity
                key={y}
                style={[styles.option, yearsInSchool === y && styles.optionSelected]}
                onPress={() => setYearsInSchool(y)}
              >
                <Text style={styles.optionText}>{y}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Teach any other subject in addition to the main subject</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.option, teachesOther && styles.optionSelected]}
              onPress={() => setTeachesOther(true)}
            >
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, !teachesOther && styles.optionSelected]}
              onPress={() => setTeachesOther(false)}
            >
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
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
  highlightSection: {
    backgroundColor: '#FFFACD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  highlight: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: Colors.text,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  sublabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.tertiary,
  },
  optionSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.text,
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