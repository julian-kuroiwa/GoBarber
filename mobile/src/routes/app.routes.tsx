import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import AppointmentCreate from '../pages/AppointmentCreate';
import CreateAppointment from '../pages/CreateAppointment';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Auth.Screen name="Dashboard" component={Dashboard} />
      <Auth.Screen name="AppointmentCreate" component={AppointmentCreate} />
      <Auth.Screen name="CreateAppointment" component={CreateAppointment} />
      <Auth.Screen name="Profile" component={Profile} />
    </Auth.Navigator>
  );
};

export default AppRoutes;
