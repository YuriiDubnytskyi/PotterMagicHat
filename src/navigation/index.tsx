import { Pressable, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREEN } from '../constants/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home';
import { ListScreen } from '../screens/List';
import { DetailsScreen } from '../screens/Details';
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

const ListStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function ListStackScreen() {
  const { t } = useTranslation('list');
  return (
    <ListStack.Navigator initialRouteName={SCREEN.LIST.HOME}>
      <ListStack.Screen
        name={SCREEN.LIST.HOME}
        component={ListScreen}
        options={{
          title: t('listScreen'),
          headerRight: () => <Pressable />,
          headerTitleAlign: 'center',
        }}
      />
      <ListStack.Screen
        name={SCREEN.LIST.DETAILS}
        component={DetailsScreen}
        options={({ navigation, route }) => ({
          title: (route?.params as { title?: string })?.title,
          headerBackTitle: t('common:back'),
          headerLeft: (props: HeaderBackButtonProps) => (
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{ color: 'black' }}>
                <Icon name="chevron-left" size={15} color={'black'} /> {props.label}
              </Text>
            </Pressable>
          ),
          headerTitleAlign: 'center',
        })}
      />
    </ListStack.Navigator>
  );
}

const HomeStackScreen = () => {
  const { t } = useTranslation('home');
  return (
    <HomeStack.Navigator initialRouteName={SCREEN.HOME}>
      <HomeStack.Screen
        name={SCREEN.HOME}
        component={HomeScreen}
        options={{
          title: t('homeScreen'),
          headerRight: () => <Pressable />,
          headerTitleAlign: 'center',
        }}
      />
    </HomeStack.Navigator>
  );
};

export const Init = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={SCREEN.HOME}
          component={HomeStackScreen}
          options={{
            title: t('home:home'),
            tabBarIcon: ({ focused }) => <Icon name="home" size={25} color={focused ? 'black' : 'grey'} />,
            tabBarActiveTintColor: 'black',
          }}
        />
        <Tab.Screen
          name={SCREEN.LIST.HOME}
          component={ListStackScreen}
          options={{
            title: t('list:list'),
            tabBarIcon: ({ focused }) => <Icon name="list" size={20} color={focused ? 'black' : 'grey'} />,
            tabBarActiveTintColor: 'black',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
