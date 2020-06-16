import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerText,
} from './styles';

import api from '../../services/api';

interface RouteParams {
  provider_id: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvaliabilityItem {
  hour: number;
  avaliable: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [avaliability, setAvaliability] = useState<AvaliabilityItem[]>([]);

  const routeParams = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.provider_id,
  );

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-avaliability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvaliability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((prevState) => !prevState);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const morningAvaliability = useMemo(() => {
    return avaliability
      .filter(({ hour }) => {
        return hour < 12;
      })
      .map(({ hour, avaliable }) => {
        return {
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
          avaliable,
        };
      });
  }, [avaliability]);

  const afternoonAvaliability = useMemo(() => {
    return avaliability
      .filter(({ hour }) => {
        return hour >= 12;
      })
      .map(({ hour, avaliable }) => {
        return {
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
          avaliable,
        };
      });
  }, [avaliability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
      <Calendar>
        <Title>Escolha a data</Title>
        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerText>Selecionar data</OpenDatePickerText>
        </OpenDatePickerButton>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            textColor="#f4ede8"
            value={selectedDate}
            onChange={handleDateChanged}
          />
        )}
      </Calendar>
      {morningAvaliability.map(({ hourFormatted }) => (
        <Title key={hourFormatted}>hourFormatted</Title>
      ))}
      {afternoonAvaliability.map(({ hourFormatted }) => (
        <Title key={hourFormatted}>hourFormatted</Title>
      ))}
    </Container>
  );
};

export default CreateAppointment;
