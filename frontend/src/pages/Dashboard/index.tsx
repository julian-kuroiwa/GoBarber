import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {isToday, format, parseISO, isAfter} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, {DayModifiers} from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {Container, Header, HeaderContainer, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment} from './styles';

import LogoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

interface MonthAvaliabilityItem {
  day: number;
  avaliable: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [monthAvaliability, setMonthAvaliability] = useState<MonthAvaliabilityItem[]>([]);
  const {signOut, user} = useAuth();

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.avaliable && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(()=> {
    api.get(`/providers/${user.id}/month-avaliability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      }
    }).then(response => {
      setMonthAvaliability(response.data);
    });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api.get<Appointment[]>('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      const appointmentsFormatted = response.data.map(appointment => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }
      })
      setAppointments(response.data);
    })
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvaliability
      .filter(monthDay => !monthDay.avaliable)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      })

      return dates;
  }, [monthAvaliability, currentMonth]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {locale: ptBR})
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {locale: ptBR})
  }, [selectedDate])

  const morningAppoitments = useMemo(() => {
    return appointments.filter(appointment => parseISO(appointment.date).getHours() < 12)
  }, [appointments]);

  const afternoonAppoitments = useMemo(() => {
    return appointments.filter(appointment => parseISO(appointment.date).getHours() > 12)
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()))
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <img src={LogoImg} alt="GoBarber"/>

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContainer>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
          {isToday(selectedDate) && nextAppointment &&
          (<NextAppointment>
            <strong>Agendamento a seguir</strong>
            <div>
              <img src={nextAppointment?.user.avatar_url} alt={nextAppointment?.user.name} />
              <strong>{nextAppointment?.user.name}</strong>
              <span>
                <FiClock />
                {nextAppointment?.hourFormatted}
              </span>
            </div>
          </NextAppointment>)}
          <Section>
            <strong>Manhã</strong>
            { morningAppoitments.length === 0 && (<p>Nenhum agendamento disponível</p>)}

            {morningAppoitments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.date}
                </span>

                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name}/>
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}


          </Section>

          <Section>
            <strong>Tarde</strong>
            { afternoonAppoitments.length === 0 && (<p>Nenhum agendamento disponível</p>)}


            {afternoonAppoitments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.date}
                </span>

                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name}/>
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Outubro',
              'Novembro',
              'Dezembro'
            ]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0,6]}, ...disabledDays]}
            modifiers={{
              avaliable: {daysOfWeek: [1,2,3,4,5]}
            }}
            onDayClick={handleDayChange}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  )
};

export default Dashboard;
