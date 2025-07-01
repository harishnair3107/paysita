import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ViewPlans = ({ route }) => {
  const { operatorName, phoneNumber, plans, selectedOperatorId } = route.params;
  const navigation = useNavigation();
function getCallsInfo(desc) {
  if (!desc) return 'N/A';

  const lowerDesc = desc.toLowerCase();

  // Check for 'unlimited' and 'calls' together for more accuracy
  if (lowerDesc.includes('unlimited') && lowerDesc.includes('calls')) {
    return 'Unlimited';
  }

  // You can add more parsing logic here if needed for other cases

  return 'N/A';
}

  const transformedPlans = useMemo(() => {
    if (!plans || !plans.info) return {};
    return Object.entries(plans.info)
      .filter(([_, value]) => Array.isArray(value))
      .reduce((acc, [category, planList]) => {
        acc[category] = planList.map((plan) => {
          const description = plan.description || plan.desc || '';
          // Extract daily data GB/day and days, e.g. "1.5GB/day for 28 days"
          const dailyDataMatch = description.match(/(\d+\.?\d*)\s*GB\/day.*?(\d+\s*days)/i);
          const dailyData = dailyDataMatch ? `${dailyDataMatch[1]}GB/day for ${dailyDataMatch[2]}` : '';

          const pillTags = [];
          if (dailyData) pillTags.push(dailyData);
          if (plan.validity) pillTags.push(plan.validity);

          return {
            amount: plan.rs || plan.amount || 'N/A',
            description,
            validity: plan.validity || 'N/A',
            data: plan.data || '',
            isPopular: plan.isPopular || /popular/i.test(description),
            pillTags: [...new Set(pillTags)],
            // unlimitedFeatures removed per your request
          };
        });
        return acc;
      }, {});
  }, [plans]);

const categories = Object.keys(transformedPlans || {});
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
  const [searchText, setSearchText] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredPlans = useMemo(() => {
    if (!selectedCategory) return [];
    return transformedPlans[selectedCategory].filter(
      (plan) =>
        plan.description.toLowerCase().includes(searchText.toLowerCase()) ||
        plan.amount.toString().includes(searchText)
    );
  }, [selectedCategory, searchText, transformedPlans]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Plans for {operatorName}</Text>
      <Text style={styles.subHeader}>Phone: {phoneNumber}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TextInput
        placeholder="Search plans..."
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.section}>
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan, index) => {
            const isExpanded = expandedIndex === index;
            const shortDesc =
              plan.description.length > 60 && !isExpanded
                ? plan.description.substring(0, 60) + '...'
                : plan.description;

            return (
         <TouchableOpacity
  key={index}
  style={styles.planCard}
  onPress={() =>
    navigation.navigate('MobileDetailsScreen', {
      operatorName,
      phoneNumber,
      category: selectedCategory,
      selectedOperatorId,
      selectedPlan: plan,
    })
  }
>
  <View style={styles.infoRow}>
    <Text style={styles.planAmount}>₹{plan.amount}</Text>

    <View style={styles.infoColumns}>
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Validity</Text>
        <Text style={styles.value}>{plan.validity || 'N/A'}</Text>
      </View>

<View style={styles.infoBlock}>
  <Text style={styles.label}>Data</Text>
  <Text style={styles.value}>
    {(
      plan.data?.match(/\d+\s*GB/i)?.[0] ||
      plan.pillTags?.find(tag => /\d+\s*GB/i.test(tag))?.match(/\d+\s*GB/i)?.[0] ||
      plan.desc?.match(/\d+\s*GB/i)?.[0] ||  // <-- check desc for GB
      'N/A'
    )}
  </Text>
</View>



      {/* New Calls info block */}
     
    </View>
  </View>

  {/* Description */}
  <Text style={styles.description}>
    {isExpanded ? plan.description : plan.description.slice(0, 60) + (plan.description.length > 60 ? '...' : '')}
  </Text>

  {/* Expand/Collapse toggle */}
  {/* {plan.description.length > 160 && (
    <TouchableOpacity
      onPress={(e) => {
        e.stopPropagation();
        setExpandedIndex(expandedIndex === index ? null : index);
      }}
    >
      <Text style={styles.expandToggle}>{isExpanded ? '▼ Less' : '► More'}</Text>
    </TouchableOpacity>
  )} */}
</TouchableOpacity>


            );
          })
        ) : (
          <Text style={styles.noPlans}>No plans available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#222',
  },
  infoRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 8,
},

infoColumns: {
  flexDirection: 'row',
  gap: 20,
},

infoBlock: {
  alignItems: 'center',
  marginLeft: 10,
},

label: {
  fontSize: 12,
  color: '#999',
  marginBottom: 2,
},

value: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
},

planAmount: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#000',
},

  subHeader: {
    fontSize: 14,
    marginBottom: 16,
    color: '#666',
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
  },
  categoryButtonActive: {
    backgroundColor: '#673ab7',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  planCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 5,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    width:400
    
  },
topRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  
},

planAmount: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#000',
},

labelRow: {
  flexDirection: 'row',
  gap: 20,
},

label: {
  fontSize: 12,
  color: '#999',
  marginHorizontal:40,
  alignItems:"center",
textAlign:"center"
},

valuesRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
   marginHorizontal:40,
},

placeholder: {
alignItems:"center",
textAlign:"center"},

valueSubRow: {
  flexDirection: 'row',
  
  gap: 20,
},

value: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
  marginHorizontal: 5,
},

description: {
  fontSize: 13,
  color: '#444',
  marginTop: 4,
},

expandToggle: {
  fontSize: 13,
  color: '#673ab7',
  textAlign: 'right',
  marginTop: 6,
},

 
});

export default ViewPlans;